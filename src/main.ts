import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as ElementUI from 'element-ui'
import Ctsy from './index'

Vue.use(ElementUI)

Vue.use(Ctsy)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
