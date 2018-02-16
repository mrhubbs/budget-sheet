<template>
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
        <sheet
          :rows=$store.state.sheet.rows
        />
      </div>

      <ui-button
        @click=recalculate
      >Recalc</ui-button>

      <ui-snackbar-container
        :duration=3500
        :queue-snackbars=true
        position=center
        ref="snackbarContainer"
      />
    </div>
  </div>

  <!-- <v-dialog
    v-model="popups.error"
    lazy
    absolute
  >
    <v-card class="red lighten-1">
      <v-card-title class="title">Error</v-card-title>
      <v-card-text>{{ popups.errorText }}</v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn flat @click.native.stop="popups.error = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog> -->


</template>

<script>
  import Package from './package'
  import Sheet from './components/sheet'

  export default {
    name: 'app',
    components: { Sheet },
    data () {
      return {
        appName: Package.productName
      }
    },
    methods: {
      recalculate () {
        this.$store.commit('recalculate')
      },
      createSnackbar (opts) {
        this.$refs.snackbarContainer.createSnackbar(opts)
      }
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
