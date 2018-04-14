import 'tailwindcss/dist/preflight.min.css'
import 'tailwindcss/dist/components.min.css'
import 'tailwindcss/dist/utilities.min.css'

import '../../static/fonts.css'

import Vue from 'vue'
import KeenUI from 'keen-ui'
import 'keen-ui/dist/keen-ui.css'

import App from './App'
import store from './store'

// Tell Vue that we're going to be using the Keen-UI components
Vue.use(KeenUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // "inject" the store into the UI tree, so every part of the UI can access it
  store,
  components: { App },
  template: '<App ref="app"/>'
})
