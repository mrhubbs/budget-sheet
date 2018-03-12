
import Vue from 'vue'
import moment from 'moment'
import _ from 'lodash'
import jetpack from 'fs-jetpack'
import yaml from 'js-yaml'

import { cacheConfig, loadConfig } from '../fileCacheService'
import { serializeMomentDate } from '../toolbox'

// Mutations change the state in a synchronous manner. That means applying
// combination of muations on the same starting state is always guaranteed to
// produce the same final result. This is important; mutations need to be
// predictable.
export default {
  setFileDialog: (state, args) => {
    state.fileDialogs[args.section] = args.path
    cacheConfig()
  },
  // TODO: we need some version of this that recomputes only what we need
  recalculate: (state) => {
    // for each category...
    _.each(state.sheet.categories, (category) => {
      let catName = category.name
      let prevInvalid = false

      state.sheet.rows.reduce((runningTotal, row) => {
        // ...compute the running totals and the category total
        const cell = row.transactions[catName]
        // We skip empty, dead and invalid cells. We assume the cell amount is
        // a valid number, otherwise.
        if (cell.amount === '' || cell.dead || cell.invalid) {
        } else {
          runningTotal += cell.amount
        }
        Vue.set(cell, 'runningTotal', runningTotal)

        if (cell.invalid || prevInvalid) {
          prevInvalid = true
          Vue.set(cell, 'invalid', true)
        }

        return runningTotal
      }, category.startingAmount)
    })

    // compute the row totals
    _.each(state.sheet.rows, (row) => {
      let invalid = false

      row.total.amount = _.reduce(row.transactions, (accum, cell) => {
        invalid = cell.invalid ? true : invalid
        if (!cell.invalid) {
          accum += cell.runningTotal
        }
        return accum
      }, 0.00)

      row.total.invalid = invalid
    })
  },
  renameCategory: (state, { category, curName, newName }) => {
    // Check if the `newName` is the name of an existing category
    // ...
    let categories = state.sheet.categories

    const getCat = (catName) => _.reduce(categories, (accum, cat) => {
      if (cat.name == catName) return cat
      else return accum
    }, undefined)

    let catToRename = getCat(curName)

    if (catToRename === undefined) {
      throw new Error(`Cannot rename category "${curName}" to "${newName}", there is no category "${curName}"`)
    }

    const catExists = getCat(newName)

    if (catExists !== undefined && category !== catExists) {
      catToRename.invalid = true
      throw new Error(`Cannot rename category to "${newName}", there is already a category named that.`)
    }
    // else, renaming the category to itself
    // NOTE: this is caused by a "weird" state. An attempt to rename the
    // category to the name of another category won't change the name, but will
    // change the name as shown in the UI. If the user changes it back, it looks
    // to this mutation here like the user is renaming a category to the name
    // of another category, but in fact he/she is renaming the category to
    // itself (which is okay).

    // Rename the category
    catToRename.name = newName
    catToRename.invalid = false

    // Rename the category in all the transactions of all the rows
    _.each(state.sheet.rows, (r) => {
      Vue.set(r.transactions, newName, r.transactions[curName])
      Vue.delete(r.transactions, curName)
    })
  },
  setCategoryStartingAmount: (state, { catIdx, startingAmount, invalid }) => {
    // TODO: bounds-checking
    let category = state.sheet.categories[catIdx]

    if (invalid) {
      Vue.set(category, 'invalidStartingAmount', true)
    } else {
      Vue.set(category, 'startingAmount', startingAmount)
      Vue.set(category, 'invalidStartingAmount', false)
    }
  },
  setAmount: (state, { catName, rowIdx, amount, invalid }) => {
    // TODO: bounds-checking
    let cell = state.sheet.rows[rowIdx].transactions[catName]
    if (invalid === true) {
      Vue.set(cell, 'invalid', true)
    } else {
      Vue.set(cell, 'amount', amount)
      Vue.set(cell, 'invalid', false)
    }
  },
  setDate: (state, { rowIdx, date, invalid }) => {
    // TODO: bounds-checking
    let dateObj = state.sheet.rows[rowIdx].date
    if (invalid === true) {
      Vue.set(dateObj, 'invalid', true)
    } else {
      Vue.set(dateObj, 'date', date)
      Vue.set(dateObj, 'invalid', false)
    }
  },
  addRow: (state) => {
    const newRow = {
      note: {
        note: ''
      },
      date: {
        date: moment(),
        invalid: false
      },
      // create all the transactions, one for each category
      transactions: state.sheet.categories.reduce((accum, cat) => {
        accum[cat.name] = { amount: 0.00 }
        return accum
      }, {}),
      total: {
        amount: 0.00,
        invalid: false
      },
      showTotal: false
    }

    Vue.set(state.sheet.rows, state.sheet.rows.length, newRow)
  },
  setShowTotal: (state, { rowIdx, showTotal }) => {
    state.sheet.rows[rowIdx].showTotal = showTotal
  },
  setNote: (state, { rowIdx, note }) => {
    // TODO: bounds-checking
    state.sheet.rows[rowIdx].note.note = note
  },
  removeRow: (state, { rowIdx } ) => {
    // TODO
    // also clean out this entry in state.sheet.totalRows, if it's in there
  },
  addCategory: (state, { highestOrder } ) => {
    let categories = state.sheet.categories
    let name = `NEW${highestOrder+1}`

    // Add the new category
    Vue.set(categories, categories.length, {
      name: name,
      startingAmount: 0.00,
      order: highestOrder + 1,
      invalid: false
    })

    // Add a new transaction, for the new category, to every row
    _.each(state.sheet.rows, (row) => {
      Vue.set(row.transactions, name, {
        amount: 0.00,
        invalid: false
      })
    })
  },
  removeCategory: (state) => {
    // TODO
  },
  openBudgetSheet: ( state, { path }) => {
    const fileData = jetpack.read(path)
    const sheetData = yaml.safeLoad(fileData)

    if (sheetData === undefined) {
      console.error("Could not load budget sheet from " + path)
    } else {
      // TODO: sanity-check
      state.sheet = {
        ...sheetData.sheet,
        rows: _.map(sheetData.sheet.rows, r => ({
          ...r,
          date: {
            ...r.date,
            // de-serialize the date into a Moment object
            date: moment(r.date.date)
          }
        }))
      }
    }

    state.sheetPath = path
  },
  saveBudgetSheet: ( state, { path }) => {
    // The state is full of getters, so we have to get everything.
    const sheet = state.sheet
    let sheetData = {
      sheet: {
        ...sheet,
        rows: sheet.rows.map(r => ({
          ...r,
          date: {
            ...r.date,
            // Don't save the "raw" Moment object; serialize it to something
            // simple
            date: serializeMomentDate(r.date.date)
          }
        }))
      }
    }
    jetpack.write(path, yaml.dump(sheetData))
  },
}
