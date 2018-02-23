<template>
</template>

<script>
  export default {
    name: 'base-cell'
  }
</script>

<style lang="scss">
  @import '../palette.scss';

  .cell {
    width: $cell-width;
    height: $cell-height;
    border: solid 1px $cell-border-color;

    display: flex;
    flex-direction: column;

    text-align: center;
    font-family: monospace;
    font-size: $cell-font-size-large;
  }

</style>
