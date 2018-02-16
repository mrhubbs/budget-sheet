import 'bootstrap/dist/css/bootstrap.css'
import '../../static/fonts.css'

import Vue from 'vue'
import KeenUI from 'keen-ui'
import 'keen-ui/dist/keen-ui.css'

import App from './App'
import store from './store'

Vue.use(KeenUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App ref="app"/>'
})
