
import _ from 'lodash'

export default {
  // Get the highest category order
  highestCategoryOrder: (state) => {
    let order = -1
    _.each(state.sheet.categories, (cat) => {
      if (cat.order > order) order = cat.order
    })

    return order
  },
  orderedCategories: (state) => _.sortBy(state.sheet.categories, [c => c.order]),
  // Sort the transactions according to the order of the categories
  // This converts the dictionary of transactions into an enumerable (with
  // index) array
  orderedTransactions: (state, { orderedCategories }) => (transactions) => {
    // Build the array of transactions based on the order of categories
    return _.map(orderedCategories, oCat =>
      [oCat.name, transactions[oCat.name]]
    )
  },
  budgetSheetOpen: (state) => state.sheetPath !== undefined
}
