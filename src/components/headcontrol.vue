<template>
  <div id="headcontrol">
    <van-sticky>
      <div id="appone" :class="this.$store.state.iscolor == true ? 'appone' : 'appones'"></div>
      <van-nav-bar v-if="this.$store.state.GetdeviceSn==0" style="background-color: #2c3e50;">
        <slot slot="left" name="left">
          <span style="color:white;">
            <van-icon name="bars" @click="showPopup" size="20px" color="white" />
          </span>
        </slot>
        <slot slot="title" name="title">
          <span style="color:white;">{{this.$store.state.deviceSn}}</span>
        </slot>
        <slot slot="right" name="right"></slot>
      </van-nav-bar>

      <van-nav-bar
        style="background-color: #2c3e50;"
        left-arrow
        @click-left="onClick"
        v-if="this.$store.state.GetdeviceSn==1"
      >
        <slot slot="left" name="left">
          <span style="color:white;">
            <van-icon name="arrow-left" color="white" />返回
          </span>
        </slot>
        <slot slot="title" name="title">
          <span style="color:white;">{{this.$store.state.deviceSn}}</span>
        </slot>
        <slot slot="right" name="right"></slot>
      </van-nav-bar>

      <van-nav-bar
        style="background-color: #2c3e50;"
        left-arrow
        @click-left="onClickLeft"
        v-if="this.$store.state.GetdeviceSn==2"
      >
        <slot slot="left" name="left">
          <span style="color:white;">
            <van-icon name="arrow-left" color="white" />返回
          </span>
        </slot>
        <slot slot="title" name="title">
          <span style="color:white;">{{this.$store.state.deviceSn}}</span>
        </slot>
        <slot slot="right" name="right"></slot>
      </van-nav-bar>

      <van-nav-bar
        style="background-color: #2c3e50;"
        left-arrow
        @click-left="onClickFind"
        v-if="this.$store.state.GetdeviceSn==3"
      >
        <slot slot="left" name="left">
          <span style="color:white;">
            <van-icon name="arrow-left" color="white" />返回
          </span>
        </slot>
        <slot slot="title" name="title"></slot>
        <slot slot="right" name="right"></slot>
      </van-nav-bar>

      <van-nav-bar
        style="background-color: #2c3e50;"
        left-arrow
        v-if="this.$store.state.GetdeviceSn==4"
         @click-left="onClickLeft"
      >
        <slot slot="left" name="left">
          <span style="color:white;">
            <van-icon name="arrow-left"  color="white" />返回
          </span>
        </slot>
        <slot slot="title" name="title">
           <span style="color:white;">海目星 APP</span>
        </slot>
        <slot slot="right" name="right"></slot>
      </van-nav-bar>
    </van-sticky>
  </div>
</template>

<script>
import Vue from "vue";
import { Sticky } from "vant";
import { NavBar } from "vant";
import { Toast } from "vant";
import { Row, Col } from "vant";
import { Loading } from "vant";
import { Grid, GridItem } from "vant";
import { Sidebar, SidebarItem } from "vant";
import { Popup } from "vant";
import { Cell, CellGroup } from "vant";

Vue.use(Cell).use(CellGroup);
Vue.use(Popup);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Grid).use(GridItem);
Vue.use(Row).use(Col);
Vue.use(Loading);
Vue.use(Row).use(Col);
Vue.use(Toast);
Vue.use(NavBar);
Vue.use(Sticky);
export default {
  name: "headcontrol",
  data() {
    return {
      active: 0,
      deviceSn: this.$store.state.deviceSn,
      IsHeadshow: false,
      activeKey: 0
    };
  },
  props: ["data"],
  methods: {
    onChange(index) {
      window.console.log(index);
      window.console.log(this.$store.state.deviceSn);
      if (index == 0) {
        this.activeKey = 0;
        this.$router.push({ path: "/" });
        //   this.$store.state.GetdeviceSn = 0;
        //  this.$router.push("/index");
      } else if (index == 1) {
        this.$store.state.GetdeviceSn = 4;
        this.$router.push({ path: "/team" });
      } else if (index == 2) {
        this.$store.state.GetdeviceSn = 4;
        this.$router.push({ path: "/find" });
      } else if (index == 3) {
        this.$store.state.GetdeviceSn = 4;
        this.$router.push({ path: "/ShoppingMall" });
      } else {
        this.activeKey = 0;
        this.$router.push({ path: "/" });
      }
      this.IsHeadshow = false;
    },
    showPopup() {
      this.$router.push({ path: "/" });
      // this.IsHeadshow = true;
    },
    datatime(date) {
      return this.$moment(new Date(date)).format("yyyy-MM-DD HH:mm");
    },
    onClickLeft() {
      this.$router.push({ path: "/NewD/" + this.$store.state.deviceSn });
      this.$store.state.GetdeviceSn = 0;
    },
    onClick() {
      this.$router.push({ path: "/NewD/" + this.$store.state.deviceSn });
      this.$store.state.GetdeviceSn = 0;
      this.$store.state.iscolor = false;
      this.$store.state.active = 0;
    },
    onClickFind() {
      this.activeKey = 0;
      this.$router.push({ path: "/find" });
      this.$store.state.GetdeviceSn = 4;
    }
  }
};
</script>

<style scoped>
.appone {
  width: 100%;
  background-color: white;
  height: 25px;
}
.appones {
  width: 100%;
  background-color: #2c3e50;
  height: 25px;
}
.bardiv {
  background-color: white;
}
.bardivs {
  background-color: #2c3e50;
}
.red {
  background: rgb(111, 183, 224);
  background-color: rgb(111, 183, 224);
  width: 13rem;
  text-align: bottom;

  font-weight: 700;
}
.blue {
  background: white;
  /* background-color: #e9eef3; */
  color: black;
  width: 13rem;
  text-align: bottom;
}
</style>