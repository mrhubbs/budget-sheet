<template>
  <div class='cell'>
    <div :hidden=hidden>
      {{ text }}
    </div>
  </div>
</template>

<script>
  import BaseCell from './BaseCell'

  export default {
    name: 'cell',
    extends: BaseCell,
    props: [ 'text', 'hidden' ]
  }
</script>

<style lang="scss" scoped>
  // build upon the base 'cell' class
  .cell {  }
</style>
