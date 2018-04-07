<template>
  <div class='row-ctrls'>
    <ui-icon-button
      icon='keyboard_arrow_up'
      size="small"
      :disabled="rowIdx<1"
      @click=moveUp
    />

    <ui-icon-button
      icon='keyboard_arrow_down'
      size="small"
      :disabled="rowIdx>=lastIdx"
      @click=moveDown
    />
  </div>
</template>

<script>
export default {
  name: 'row-controls',
  props: [ 'rowIdx', 'lastIdx' ],
  methods: {
    moveUp () {
      this.$store.dispatch('row/moveUp', { rowIdx: this.rowIdx })
    },
    moveDown () {
      this.$store.dispatch('row/moveDown', { rowIdx: this.rowIdx })
    }
  }
}
</script>

<style lang="scss" scoped>
  .row-ctrls {
    display: flex;
    flex-direction: column;
  }
</style>
