<template>
  <div class='row'>
    <cell
      :text="row.date.format('MM-DD-YY')"
    ></cell>

    <amount-cell v-for="cell in row.transactions"
      :key=cell.id
      :cell=cell
      :rowId=row.id
      :showTotal=row.showRowTotal
    />

    <!-- <cell-spacer/> -->

    <cell
      :text=prettyTotal
      :hidden=!row.showRowTotal
    ></cell>
  </div>
</template>

<script>
import Cell from './Cell'
import AmountCell from './AmountCell'
import CellSpacer from './CellSpacer'

export default {
  name: 'sheet-row',
  components: { AmountCell, Cell, CellSpacer },
  props: [ 'row' ],
  computed: {
    prettyTotal () {
      const total = this.$store.getters.getRowTotal(this.row.id)
      if (total === null) {
        // TODO: error state
        return 'ERR'
      } else {
        return '$' + total.toFixed(2)
      }
    }
  }
}
</script>

<style scoped>
  .row {
    /* display: flex;
    flex-direction: row;
    width: 100%; */
  }
</style>
