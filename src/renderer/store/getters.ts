

export default {
  getCategoryTotal: (state) => (rowId, cellId) => {
    return state.sheet.rows.reduce((total, row) => {
      // finished summing up to the point we need to...
      if (row.id > rowId) return total

      const cell = row.transactions[cellId]

      if (cell === undefined || cell.inactive) return total
      else return total + cell.transaction
    }, 0.00)
  },
  getRowTotal: (state, getters) => (rowId) => {
    const row = state.sheet.rows[rowId]

    if (row === undefined) return null

    return row.transactions.reduce((total, cell) => {
      if (cell.inactive) return total
      else return total + getters.getCategoryTotal(rowId, cell.id)
    }, 0.00)
  }
}
