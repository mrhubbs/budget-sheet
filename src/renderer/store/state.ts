import moment from 'moment'

// Root state object.
// Parts of this can be persisted to disk. We can only persist per top-level
// section.
export default {
  // caches the last-open paths for various file dialogs
  fileDialogs: {},
  sheetPath: undefined,
  sheet: {
    // `categories` is an array of objects, each looking like this:
    // {
    //   name: 'saved monthly',
    //   startingAmount: 100,
    //   order: 1,
    //   invalidName: false,
    //   invalidStartingAmount: false
    // },
    // ...
    categories: [],
    // `rows` is an array of objects, each looking like this:
    // {
    //   note: {
    //     note: 'This was the time I did the thing...'
    //   },
    //   date: {
    //     date: moment(),
    //     invalid: false
    //   },
    //   // NOTE: must be same number of transactions as categories
    //   transactions: {
    //     'saved monthly': {
    //       amount: 100,
    //       invalid: false
    //     },
    //     ...
    //   },
    //   total: {
    //     amount: 315,
    //     invalid: false
    //   },
    //   showTotal: true
    // }
    rows: []
  }
}
