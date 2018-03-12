
// Actions may change the state in an asynchronous manner; actions may go and
// fetch information asynchronously before using mutations to (via calls to
// "commit") to change the state.
// Actions also may call multiple mutations.
//
// Most of the changes in this application are passed through actions because
// they can trigger the primary mutation, and then trigger the one to
// recalculate. To the rest of the code, this makes it look like the sheet is
// recalculated automatically when changes are made.
export default {
  init ( { commit }) {
    commit('recalculate')
  },
  addRow ( { commit }, args) {
    commit('addRow', args)
    commit('recalculate')
  },
  addCategory ( { commit, getters }, args) {
    commit('addCategory', {
      ...args,
      highestOrder: getters.highestCategoryOrder
    })
    commit('recalculate')
  },
  renameCategory ( { commit }, args) {
    commit('renameCategory', args)
  },
  setCategoryStartingAmount ( { commit }, args) {
    commit('setCategoryStartingAmount', args)
    commit('recalculate')
  },
  setAmount ( { commit }, args) {
    commit('setAmount', args)
    commit('recalculate')
  },
  setShowTotal ( { commit }, args) {
    commit('setShowTotal', args)
  },
  setNote ( { commit }, args) {
    commit('setNote', args)
  },
  openBudgetSheet ( { commit }, args) {
    commit('openBudgetSheet', args)
    commit('recalculate')
  },
  saveBudgetSheet ( { commit, state }, args) {
    let path = (args !== undefined && args.path !== undefined) ?
      args.path : state.sheetPath
    commit('saveBudgetSheet', { ...args, path: path })
  }
}
