

export default {
  // Maps the columns-first data into rows first
  sheetAsRows: (state) => {
    console.log('hi')
    let rows = []
    const sheet = state.sheet
    const cols = sheet.cols

    // re-map the data into row-based from column-based
    for (let i = 0; i < cols.dates.length; i++) {
      // TODO: add robustness in case 'dates', 'categories.transactions', and 'totals'
      // are not the same length
      rows.push({
        idx: i,
        date: {
          ...cols.dates[i]
        },
        // TODO: order categories by set order
        categories: cols.categories.map((cat, ci) => {
          return {
            idx: ci,
            ...cat.transactions[i]
          }
        }),
        total: {
          ...cols.totals[i]
        },
        showTotal: sheet.totalRows.includes(i)
      })
    }

    return rows
  }
}
