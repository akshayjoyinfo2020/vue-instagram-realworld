import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './assets/scss/app.scss'
import { auth } from './Externals/firebase';
import '../node_modules/nprogress/nprogress.css';

Vue.config.productionTip = false;

Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` is a Vue-specific error info, e.g. which lifecycle hook
  // the error was found in. Only available in 2.2.0+
  console.log('Error Handler ' + err + " " + info);
}

let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
