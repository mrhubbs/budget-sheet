<template>
  <div class='sheet-container'>
    <div class='cell-col'>
      <date-cell v-for="[idx, date] in dates"
        :key=idx
        :transIdx=idx
        :value="prettyDate(date.date)"
        :invalid="date.invalid"
      />
    </div>

    <!-- Loop through categories (columns) -->
    <div class='cell-col' v-for="[catIdx, cat] in categories">
      <!-- Loop through transactions (rows in the columns) -->
      <amount-cell v-for="[transIdx, cell] in enumerate(cat.transactions)"
        :key="catIdx + '.' + transIdx"
        :cell=cell
        :showTotal="sheet.totalRows.includes(transIdx)"
        :catIdx="catIdx"
        :transIdx="transIdx"
      />
    </div>

    <div class='cell-col'>
      <cell v-for="[idx, total] in totals"
        :key=idx
        :value=formatMoney(total.total)
        :hidden="!sheet.totalRows.includes(idx)"
        :invalid=total.invalid
        :readonly="true"
      />
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import Cell from './Cell'
  import DateCell from './DateCell'
  import AmountCell from './AmountCell'

  import { formatMoney } from '../toolbox'

  export default {
    name: 'sheet',
    components: { Cell, AmountCell, DateCell },
    computed: {
      sheet () {
        return this.$store.state.sheet
      },
      dates () { return this.enumerate(this.sheet.cols.dates) },
      categories () { return this.enumerate(this.sheet.cols.categories) },
      totals () { return this.enumerate(this.sheet.cols.totals) },
      ...mapGetters([ 'sheetAsRows' ])
    },
    methods: {
      prettyDate (d) {
        return d.format('M-D-YY')
      },
      formatMoney (m) {
        const [fm, err] = formatMoney(m)
        // TODO handle err
        if (err) console.error(err)
        return fm
      },
      enumerate (array) {
        // TODO: can this be optimized?
        const it = array.entries()
        let result = []
        for (let item = it.next(); item.done !== true; item = it.next()) {
          result.push(item.value)
        }
        return result
      }
    },
    mounted () {
      this.$store.dispatch('init')
    }
  }
</script>

<style>
  .sheet-container {
    display: flex;
  }

  .cell-col {
    display: flex;
    flex-direction: column;
  }
</style>


  <!-- <div class='col-12'>
    <div class='row' v-for="[idx, row] in enumerate(sheetAsRows)" :key=idx>
      <date-cell
        :key=idx
        :transIdx=idx
        :value="prettyDate(row.date.date)"
        :invalid="row.date.invalid"
      />

      <!-- Loop through categories (columns) -->
      <div v-for="[catIdx, cat] in enumerate(row.categories)">
        <!-- Loop through transactions (rows in the columns) -->
        <amount-cell v-for="[transIdx, cell] in enumerate(cat.transactions)"
          :key="catIdx + '.' + transIdx"
          :cell=cell
          :showTotal="sheet.totalRows.includes(transIdx)"
          :catIdx="catIdx"
          :transIdx="transIdx"
        />
      </div>
    </div>
  </div> -->
