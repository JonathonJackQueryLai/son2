import Vue from 'vue';
import App from './App.vue';
import store from './store';
import http from './Http';
import router from './routes';

import axios from 'axios';
import VueAxios from 'vue-axios';
import { Button } from 'vant';
import 'vant/lib/index.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment'
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})
VueTouch.config.swipe = {

  threshold: 100 //手指左右滑动距离

}
Vue.prototype.$moment = moment;//赋值使用
Vue.config.productionTip = true
Vue.prototype.$axios = axios
Vue.use(VueAxios,axios);
Vue.use(ElementUI);
import qs from 'qs';
Vue.use(Button);


Vue.prototype.qs = qs  

import VueRouter from 'vue-router';
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
return routerPush.call(this, location).catch(error=> error)
}



new Vue({
  render: h => h(App),
  http,
  store,
  router
}).$mount('#app')

