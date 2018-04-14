<template>
  <div class="flex flex-row">
    <note value="starting amounts" :readonly="true"/>

    <!-- Just an empty cell -->
    <cell
      value=""
      :readonly=true
    />

    <cell
      v-for="[catIdx, cat] in enumerate(categories)"
      :key=cat.name
      :value=cat.startingAmount
      :invalid=cat.invalidStartingAmount
      @change="changeStartingAmount(catIdx, $event)"
    />
  </div>
</template>

<script>
import Cell from './Cell'
import Note from './Note'

import { enumerate } from '../toolbox'

export default {
  name: 'starting-amount-row',
  props: [ 'categories' ],
  components: { Cell, Note },
  methods: {
    enumerate: enumerate,
    changeStartingAmount (catIdx, newValue) {
      // At this point, apply formatting
      let v = Number(newValue)

      if (!Number.isNaN(v)) {
        // round to hundredths
        v = Math.round(v * 100.0) / 100.0

        this.$store.dispatch('setCategoryStartingAmount', {
          catIdx: catIdx,
          startingAmount: v
        })
      } else {
        this.$store.dispatch('setCategoryStartingAmount', {
          catIdx: catIdx,
          invalid: true
        })
      }
    }
  }
}
</script>
