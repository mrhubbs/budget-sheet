<template>
  <ui-textbox
    v-model=localValue
    :readonly=readonly
    :multi-line=true
  />
</template>

<script>
  export default {
    name: 'note',
    props: [ 'value', 'readonly' ],
    computed: {
      localValue: {
        get () { return this.value },
        set (v) { this.$emit('change', v) }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../palette.scss';

  .note {
    width: $cell-width * 2;
  }
</style>
