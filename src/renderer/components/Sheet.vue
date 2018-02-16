<template>
  <div class='col-12'>
    <sheet-row v-for='row in rows'
      :row=row
      :key=row.id
    />
  </div>
</template>

<script>
  import SheetRow from './SheetRow'

  export default {
    name: 'sheet',
    components: { SheetRow },
    props: ['rows']
  }
</script>

<style>
  .sheet-container {
    display: flex;
    justify-content: flex-start;
    width: 100%;
  }
</style>
