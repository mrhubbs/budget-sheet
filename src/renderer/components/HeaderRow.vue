<template>
  <div class="flex flex-row mb-4">
    <note value="" :readonly="true"/>

    <cell
      value="Date"
      :readonly=true
    />

    <cell
      v-for="cat in categories"
      :key=cat.name
      :value=cat.name
      :invalid=cat.invalidName
      @change="renameCategory(cat, $event, cat.name)"
      style="position: relative;"
    >
    </cell>

    <cell
      value="Total"
      :readonly=true
    />
  </div>
</template>

<script>
import Cell from './Cell'
import Note from './Note'

import { showError } from '../EventBus'

export default {
  name: 'header-row',
  props: [ 'categories' ],
  components: { Cell, Note },
  methods: {
    renameCategory (category, newName, curName) {
      try {
        this.$store.dispatch('renameCategory', { category, curName, newName })
      } catch (e) {
        showError(e)
      }
    },
    minimizeCategory () {
      console.log('min')
    }
  }
}
</script>

<style lang='scss' scoped>
  .cat-minus {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
