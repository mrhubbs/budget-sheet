import moment from 'moment'

// Root state object.
// Parts of this can be persisted to disk. We can only persist per top-level
// section.
export default {
  // caches the last-open paths for various file dialogs
  fileDialogs: {},
  sheet: {
    cols: {
      // 'dates', 'categories.transactions', and 'totals' must always be the same length
      dates: [{
          date: moment('2018-02-08'),
          invalid: false
        }, {
          date: moment('2018-02-09'),
          invlaid: false
        }
      ],
      categories: [{
        id: 0,
        transactions: [{
          amount: 17
        }, {
          amount: 10
        }]
      }, {
        id: 1,
        transactions: [{
          amount: -20
        }, {
          amount: 100
        }]
      }],
      totals: [ ]
    },
    // Rows we show the category totals for
    totalRows: [ 1 ]
  }
}
