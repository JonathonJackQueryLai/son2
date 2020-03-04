import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);


const Router =new VueRouter({
  mode: 'hash',
    routes:[
      {
        path:"/",
        name:"登入",
        component:()=>import (/* webpackChunkName: "user" */ '@/view/user/login.vue')
      },

      {
        path:"/index",
        name:"首页",
        component:()=>import (/* webpackChunkName: "aa" */ '@/view/Home/index.vue'),
        children:[
          {
            path:"/NewD/:id",
            component:()=>import (/* webpackChunkName: "a" */ '@/view/Home/find/NewDevice.vue'),
          },
          {
            path:"/NewOEE/:id",
            component:()=>import (/* webpackChunkName: "a" */ '@/view/Home/find/NewOEEChart.vue'),
          },
          {
            path:"/NewEeff/:id",
            component:()=>import (/* webpackChunkName: "a" */ '@/view/Home/find/NewErgonomicsefficiency.vue'),
          },
          {
            path:"/NewMllis/:id",
            component:()=>import (/* webpackChunkName: "a" */ '@/view/Home/find/NewMaterialanalysis.vue'),
          },
          {
            path:"/NewDevinfo/:id",
            component:()=>import (/* webpackChunkName: "a" */ '@/view/Home/find/NewDeviceinfo.vue'),
          },
          {
            path:"/NewMc/:id",
            component:()=>import (/* webpackChunkName: "a" */ '@/view/Home/find/Newmachining.vue'),
          },
         
          {
            path:"/NewMachine/:id",
            component:()=>import (/* webpackChunkName: "a" */ '@/view/Home/find/NewMachine.vue'),
          },
          {
            path:"/NewMaintenance/:id",
            component:()=>import (/* webpackChunkName: "a" */ '@/view/Home/find/NewMaintenance.vue'),
          },
          
          {
            path:"/ShoppingMall",
            name:"统计",
            component:()=>import (/* webpackChunkName: "a" */ '@/view/Home/ShoppingMall.vue')
          },  
          {
            path:"/find",
            name:"统计",
            component:()=>import (/* webpackChunkName: "a" */ '@/view/Home/find.vue')
          },  
          {
            path:"/team",
            name:"统计",
            component:()=>import (/* webpackChunkName: "a" */ '@/view/Home/team.vue')
          }, 
          {
            path:"/news/:id",
            component:()=>import (/* webpackChunkName: "a" */ '@/view/Home/find/NewsContnt.vue'),
          },
          {
            path:"/neweb/:id",
            component:()=>import (/* webpackChunkName: "a" */ '@/view/Home/find/NewWeb.vue'),
          },
          
        ]
      }
     
    ]
    });
    
    Router.beforeEach((to, from, next) => {
  
      if (to.path == '/') {
        next();
      } else {
        let token = localStorage.getItem('Authorization');  
        if (token === 'null' || token === ''||token==='undefined') {
          next('/');
        } else {
          next();
        }
      }
    });
     
    export default Router;
    