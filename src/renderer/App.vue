<template>
  <div>
    <div class='container-fluid'>
      <div class='col-12'>
        <div class='row'>
          <div class="col-4">
            <h1>{{ appName }}</h1>
          </div>

          <div class='col-4'>
            <ui-button @click=open>Open</ui-button>
            <ui-button @click=save :disabled="!$store.getters.budgetSheetOpen">Save</ui-button>
            <ui-button @click=saveAs>Save As</ui-button>
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

        <ui-button
          @click=addCategory
        >
          Add Category
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
  import EventBus, { showError, showSuccess } from './EventBus'

  import { openFileDialog, saveFileDialog } from './fileDialogService'

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
        this.$store.dispatch('addRow')
      },
      addCategory () {
        this.$store.dispatch('addCategory')
      },
      open () {
        let sheetPath = openFileDialog('openBudgetSheet')
        if (sheetPath !== undefined) {
          try {
            this.$store.dispatch('openBudgetSheet', { path: sheetPath })
          } catch (e) {
            showError(new Error(`Could not open "${sheetPath}"`))
            console.error(e)
          }
        }
      },
      save () {
        try {
          this.$store.dispatch('saveBudgetSheet')
        } catch (e) {
          showError(new Error('Could not save'))
          console.error(e)
        } finally {
          showSuccess('Saved!')
        }
      },
      saveAs () {
        // TODO: override path to file dialog, if we have a budget sheet open
        // already
        let sheetPath = saveFileDialog('saveBudgetSheet')
        if (sheetPath !== undefined) {
          try {
            this.$store.dispatch('saveBudgetSheet', { path: sheetPath })
          } catch (e) {
            showError(new Error(`Could not save "${sheetPath}"`))
            console.error(e)
          } finally {
            showSuccess('Saved!')
          }
        }
      }
    },
    mounted () {
      EventBus.$on('error', (event) => {
        this.createSnackbar({
          message: event.error.message,
          duration: 5000
        })
      })

      EventBus.$on('success', (event) => {
        this.createSnackbar({
          message: event.msg,
          duration: 5000
        })
      })
    }
  }
</script>

<style>
</style>
