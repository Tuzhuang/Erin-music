import App from './App'

// #ifndef VUE3
import Vue from 'vue'

import store from '@/store/index.js';

Vue.config.productionTip = false;

Vue.prototype.bus = new Vue();

App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif