import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 
const store = new Vuex.Store({
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    refreshToken:"",
    UserIdList:[],
    saveUrl:"",
    NewContntlist:[],//新闻列表
    NewCount:0, //新闻刷新次数
    active:0,
    Newdata:[],
    tenantId:-1,
    iscolor:false,
    GetdeviceSn:-1,
    deviceSn:"",
    IsHeadshow:false,
    HymSonDeviceRuntime:[],
    HymSonDeviceRuntimecoun:0
  },
 
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
     
    }
  }
});
 
export default store;