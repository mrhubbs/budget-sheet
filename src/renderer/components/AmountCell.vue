<template>
  <div class='cell amount-cell'>
    <div :hidden=cell.inactive>
      <div class='top-slot'>
        {{ prettyTransaction }}
      </div>
      <div class='separator'>- - -</div>
      <div class='bottom-slot'>
        <div :hidden=!showTotal>
          {{ prettyRunningTotal }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BaseCell from './BaseCell'

  export default {
    name: 'amount-cell',
    extends: BaseCell,
    props: [ 'cell', 'rowId', 'showTotal' ],
    computed: {
      prettyTransaction () {
        if (this.cell.transaction === 0.0) return ''
        else return this.cell.transaction.toFixed(2)
      },
      prettyRunningTotal () {
        return this.cell.runningTotal

        // const total = this.$store.getters.getCategoryTotal(this.rowId, this.cell.id)
        // if (total === null) {
        //   // TODO: put into an error state
        //   return 'ERR'
        // } else {
        //   return total.toFixed(2)
        // }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../palette.scss';

  .top-slot {
    color: $cell-text-color;
  }

  .bottom-slot {
    color: $cell-text-color;
  }

  .separator {
    font-size: .8rem;
    line-height: .4rem;
    font-family: monospace;
    color: $cell-separator-color;
  }
</style>
