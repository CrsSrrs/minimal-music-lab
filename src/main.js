import Vue from 'vue';
import TonePlugin from './tone';
import ToneUI from './toneui';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(TonePlugin);
Vue.use(ToneUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
