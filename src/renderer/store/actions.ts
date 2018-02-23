

export default {
  init ( { commit }) {
    commit('recalculate')
  },
  setAmount ( { commit }, args) {
    commit('setAmount', args)
    commit('recalculate')
  }
}
