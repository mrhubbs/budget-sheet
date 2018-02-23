
import Vue from 'vue'
import moment from 'moment'
import _ from 'lodash'

import { cacheConfig, loadConfig } from '../fileCacheService'

// These mutations all persist the state changes to a hard drive store.
export default {
  setFileDialog: (state, args) => {
    state.fileDialogs[args.section] = args.path
    cacheConfig()
  },
  // TODO: we need some version of this that recomputes only what we need
  recalculate: (state) => {
    // for each category...
    _.forEach(state.sheet.cols.categories, (cat, idx) => {
      let runningTotal = 0.00
      let prevInvalid = false

      // ...compute the running totals and the category total
      _.forEach(cat.transactions, (cell, tidx) => {
        // We skip empty and dead cells. We assume the cell amount is a valid
        // number, otherwise.
        if (cell.amount !== '' && !cell.dead) {
          runningTotal += cell.amount
          Vue.set(cell, 'runningTotal', runningTotal)
        } else {
          Vue.set(cell, 'runningTotal', runningTotal)
        }

        if (cell.invalid || prevInvalid) {
          prevInvalid = true
          Vue.set(cell, 'invalid', true)
        }
      })
    })

    // TODO: don't run this if we don't have any categories or transactions
    // (zero-length arrays)
    for (let row = 0; row < state.sheet.cols.categories[0].transactions.length; row++) {
      let rowTotal = 0.00
      let rowInvalid = false

      for (let col = 0; col < state.sheet.cols.categories.length; col++) {
        let cell = state.sheet.cols.categories[col].transactions[row]

        if (cell.runningTotal !== '' && !cell.dead) {
          rowTotal += cell.runningTotal
        }

        if (cell.invalid) rowInvalid = true
      }

      Vue.set(state.sheet.cols.totals, row, { total: rowTotal, invalid: rowInvalid })
    }
  },
  setAmount: (state, { catIdx, transIdx, amount, invalid }) => {
    // TODO: bounds-checking
    let cell = state.sheet.cols.categories[catIdx].transactions[transIdx]
    if (invalid === true) {
      Vue.set(cell, 'invalid', true)
    } else {
      Vue.set(cell, 'amount', amount)
      Vue.set(cell, 'invalid', false)
    }
  },
  setDate: (state, { transIdx, date, invalid }) => {
    // TODO: bounds-checking
    let dateObj = state.sheet.cols.dates[transIdx]
    if (invalid === true) {
      Vue.set(dateObj, 'invalid', true)
    } else {
      Vue.set(dateObj, 'date', date)
      Vue.set(dateObj, 'invalid', false)
    }
  },
  addRow: (state) => {
    let cols = state.sheet.cols
    let dates = cols.dates
    let categories = cols.categories
    let totals = cols.totals

    _.forEach(categories, (cat) => {
      Vue.set(cat.transactions, cat.transactions.length, {})
    })

    Vue.set(dates, dates.length, { date: moment(), invalid: false })
    Vue.set(totals, totals.length, { total: 0.00, invalid: false })
  },
  removeRow: (state, { rowIdx } ) => {
    // TODO
    // also clean out this entry in state.sheet.totalRows, if it's in there
  },
  addCategory: (state) => {
    let categories = state.sheet.cols.categories
    // TODO: get ID
    Vue.set(categories, categories.length, {
      id: 101,
      // TODO: handle case if we have no categories yet
      transactions: categories[0].transactions.map(() => { return { amount: 0 } })
    })
  }
}
