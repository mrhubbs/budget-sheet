<template>
  <div>
    <div class='container'>
      <div class='col-12'>
        <div class='row'>
          <div class='app'>
            <div class='app-header'>
              <h1>{{ appName }}</h1>
            </div>
          </div>
        </div>

        <div class='row'>
          <sheet/>
        </div>

        <ui-button
          @click=addRow
        >
          Add Row
        </ui-button>
      </div>
    </div>

    <ui-snackbar-container
      :duration=3500
      :queue-snackbars=true
      position=center
      ref="snackbarContainer"
    />
  </div>
</template>

<script>
  import Package from './package'
  import Sheet from './components/sheet'
  import EventBus from './EventBus'

  export default {
    name: 'app',
    components: { Sheet },
    data () {
      return {
        appName: Package.productName
      }
    },
    methods: {
      createSnackbar (opts) {
        this.$refs.snackbarContainer.createSnackbar(opts)
      },
      addRow () {
        this.$store.commit('addRow')
      }
    },
    mounted () {
      EventBus.$on('error', (event) => {
        this.createSnackbar({
          message: event.error.message,
          duration: 5000
        })
      })
    }
  }
</script>

<style>
  .app {
    display: flex;
  }

  .app-header {
  }
</style>
