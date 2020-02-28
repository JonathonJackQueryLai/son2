<template>
  <div id="app">
    <headcontrol></headcontrol>
    <router-view></router-view>
  </div>
</template>
<script>
import headcontrol from "@/components/headcontrol";
import Vue from "vue";
import { Sticky } from "vant";
import { Toast } from "vant";
Vue.use(Sticky);
Vue.use(Toast);
export default {
  name: "app",
  components: {
    headcontrol
  },
  mounted() {},
  methods: {}
};
</script>

<style>

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  font-size: 16px;
}
</style>
