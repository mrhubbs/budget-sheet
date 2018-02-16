import moment from 'moment'

// Root state object.
// Parts of this can be persisted to disk. We can only persist per top-level
// section.
export default {
  // caches the last-open paths for various file dialogs
  fileDialogs: {},
  sheet: {
    // cols: {
    //   dates: [
    //     moment('2018-02-08'),
    //     moment('2018-02-09')
    //   ],
    //   categories: [{
    //     catId: 0,
    //     transactions: [{
    //       amount: 17,
    //     }, {
    //       amount: 10
    //     }]
    //   }, {
    //     catId: 1,
    //     transactions: [{
    //       amount: -20,
    //       amount: 100
    //     }]
    //   }],
    //   totals: [
    //     -3,
    //     107
    //   ]
    // }
    rows: [{
      id: 0,
      transactions: [{
        transaction: 17.00,
        runningTotal: 0.00, id: 0, catId: 0,
      }, {
        transaction: 10.00,
        runningTotal: 0.00, id: 1, catId: 1,
      }, {
        transaction: 10.00,
        runningTotal: 0.00, id: 2, catId: 2,
      }],
      date: moment('2018-02-08'),
    },
    {
      id: 1,
      transactions: [{
        transaction: 10.00,
        runningTotal: 0.00, id: 0, catId: 0,
      }, {
        transaction: 10.00,
        runningTotal: 0.00, id: 1, catId: 1,
      }, {
        transaction: 10.00,
        runningTotal: 0.00, id: 2, catId: 2,
      }],
      date: moment('2018-02-09'),
      showRowTotal: true
    }]
  }
}
