<template>
  <div
    class="cell amount-cell"
    :class="{ 'amount-cell-total': showTotal, 'amount-cell-nototal': !showTotal }"
  >
    <div :hidden=cell.dead>
      <ui-textbox
        v-model=amount
        class='cell-entry cell-dashed-bottom'
        @change=changeAmount
        :class="{ 'cell-invalid': cell.invalid }"
      />
      <!-- TODO: make this not focusable -->
      <ui-textbox
        v-model='runningTotal'
        class='cell-entry cell-entry-readonly'
        :hidden=!showTotal
        :readonly="true"
        :class="{ 'cell-invalid': cell.invalid }"
      />
    </div>
  </div>
</template>

<script>
  import BaseCell from './BaseCell'

  import { formatMoney } from '../toolbox'

  export default {
    name: 'amount-cell',
    extends: BaseCell,
    props: [
      'cell', 'showTotal', 'catName', 'rowIdx'
    ],
    data () {
      return {
        amount: formatMoney(this.cell.amount)[0]
      }
    },
    methods: {
      changeAmount (stringVal) {
        // At this point, apply formatting
        let v = Number(stringVal)

        if (!Number.isNaN(v)) {
          // round to hundredths
          v = Math.round(v * 100.0) / 100.0

          this.$store.dispatch('setAmount', {
            catName: this.catName,
            rowIdx: this.rowIdx,
            amount: v
          })

          // Now that the new value has "taken", format it
          this.amount = formatMoney(v)[0]
        } else {
          this.$store.dispatch('setAmount', {
            catName: this.catName,
            rowIdx: this.rowIdx,
            invalid: true
          })
        }
      }
    },
    computed: {
      runningTotal () {
        return formatMoney(this.cell.runningTotal)[0]
      }
    },
    watch: {
      'cell.amount' (v) {
        // TODO: create a better prop flow so
        this.amount = formatMoney(v)[0]
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../palette.scss';

  .amount-cell-nototal {
    justify-content: start;
  }

  .amount-cell-total {
    justify-content: space-between;
  }

  // .separator {
  //   font-size: .8rem;
  //   line-height: .4rem;
  //   font-family: monospace;
  //   color: $cell-separator-color;
  // }
</style>
