<template>
  <div class='w-full flex flex-row flex-no-shrink'>
    <note
      :value=row.note.note
      @change="$store.dispatch('setNote', { rowIdx, note: $event })"
    />

    <date-cell
      :rowIdx=rowIdx
      :value="prettyDate(row.date.date)"
      :invalid="row.date.invalid"
    />

    <amount-cell v-for="[catName, cell] in orderedTransactions"
      :key=catName
      :cell=cell
      :showTotal=row.showTotal
      :catName=catName
      :rowIdx=rowIdx
    />

    <cell
      :value="row.total.amount"
      :hidden="!row.showTotal"
      :invalid=row.total.invalid
      :readonly="true"
      :wide="true"
    />

    <div class='opts'>
      <a ref='row-actions-trigger' class='popover-trigger'>
        <i class='material-icons'>more_vert</i>
      </a>
    </div>

    <row-controls
      :rowIdx=rowIdx
      :lastIdx="$store.state.sheet.rows.length-1"
    />

    <ui-popover
      open-on="hover"
      trigger="row-actions-trigger"
      dropdown-position="bottom left"
    >
      <ui-checkbox
        class='menu-opt'
        v-model="showTotal"
      >Sum Categories</ui-checkbox>

      <i class='material-icons'>delete</i>
      <ui-button
        @click=deleteRow
      >Delete Row</ui-button>
    </ui-popover>
  </div>
</template>

<script>
  import Cell from './Cell'
  import DateCell from './DateCell'
  import AmountCell from './AmountCell'
  import Note from './Note'
  import RowControls from './Row/RowControls'

  import { prettyDate, formatMoney, enumerate } from '../toolbox'

  export default {
    name: 'sheet-row',
    components: { Cell, AmountCell, DateCell, Note, RowControls },
    props: [ 'row', 'rowIdx' ],
    computed: {
      showTotal: {
        get () { return this.row.showTotal },
        set (v) {
          this.$store.dispatch(
            'setShowTotal', {
              showTotal: v,
              rowIdx: this.rowIdx
            })
        }
      },
      orderedTransactions () {
        return this.$store.getters.orderedTransactions(this.row.transactions)
      }
    },
    methods: {
      enumerate: enumerate,
      prettyDate: prettyDate,
      formatMoney (m) {
        const [fm, err] = formatMoney(m)
        // TODO handle err
        if (err) console.error(err)
        return fm
      },
      deleteRow () {
        this.$store.dispatch('row/delete', { rowIdx: this.rowIdx })
      }
    }
  }
</script>

<style scoped>
  .opts {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
  }

  .menu-opt {
    padding: .3rem;
  }
</style>
