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
    width: 120px;
    border: solid 1px $cell-border-color;

    display: flex;
    flex-direction: column;
    justify-content: space-around;

    text-align: center;
    font-family: monospace;
    font-size: 1.4rem;
  }

</style>
