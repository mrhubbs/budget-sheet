<template>
  <div class='col-12'>
    <!-- header row -->
    <header-row
      :categories=$store.getters.orderedCategories
    />

    <!-- starting amounts -->
    <starting-amount-row
      :categories=$store.getters.orderedCategories
    />

    <div style='overflow: auto; max-height: calc(100vh - 250px);'>
      <!-- transactions -->
      <sheet-row v-for="[rowIdx, row] in enumerate(sheet.rows)"
        :key=rowIdx
        :row=row
        :rowIdx=rowIdx
        />
      </sheet-row>
    </div>
  </div>
</template>

<script>
  import HeaderRow from './HeaderRow'
  import StartingAmountRow from './StartingAmountRow'
  import SheetRow from './SheetRow'

  import { enumerate } from '../toolbox'

  export default {
    name: 'sheet',
    components: { HeaderRow, StartingAmountRow, SheetRow },
    computed: {
      sheet () {
        return this.$store.state.sheet
      }
    },
    methods: {
      enumerate: enumerate
    },
    mounted () {
      this.$store.dispatch('init')
    }
  }
</script>
