
import moment from 'moment'

import { cacheConfig, loadConfig } from '../fileCacheService'

// These mutations all persist the state changes to a hard drive store.
export default {
  setFileDialog: (state, args) => {
    state.fileDialogs[args.section] = args.path
    cacheConfig()
  },
  recalculate: (state) => {
    // runningTotalsByCategory = {}

    state.sheet.rows.map((row) => {
      row.transactions.reduce((total, cell) => {
        if (!cell.dead) {
          // if (runningTotalsByCategory[cell.catId] === undefined) {
          //   runningTotalsByCategory[cell.catId] = total
          // }

          console.log(cell.id, ':', total, cell.transaction)
          cell.runningTotal = total + cell.transaction
          return cell.runningTotal
        } else {
          return total
        }
      }, 0.00)
    })
  },
  setTransaction: (state, { rowIdx }) => {

  }
}
