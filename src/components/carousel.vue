<template>
  <div id="caluser">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <div id="cuarone" @click="onChange(image[0].shortTitle)">
          <img :src="image[0].pictureUrl" width="100%" height="100%" />
          <div id="caruserl">
            <span>{{image[0].shortTitle}}</span>
            <!-- <router-link :to="'/news/'+image.aid"></router-link> -->
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
import { Toast } from "vant";
import { Image } from "vant";
import { Lazyload } from "vant";

// options 为可选参数，无则不传
Vue.use(Lazyload);
Vue.use(Image);
Vue.use(Toast);
Vue.use(Swipe).use(SwipeItem);
export default {
  name: "caluser",
  data() {
    return {
      images: this.data
    };
  },
  props: ["data"],
  methods: {
    onChange(aid) {
      if (aid != "#") {
        window.console.log("转到"+aid)
        this.$store.state.GetdeviceSn = 3;
        this.$router.push({ path: "/neweb/" + aid });
      } else {
         window.console.log("转到1"+aid)
        this.$store.state.GetdeviceSn = 3;
        this.$router.push({ path: "/news/" + aid });
      }
    }
  },
  mounted() {
    // window.console.log(this.data)
  }
};
</script>

<style >
#caruserl {
  float: left;
  position: absolute;
  top: 110px;
  /* background-color: gray; */
  color: gray;
  width: 100%;
  height: 80px;
  text-align: left;
  background-color: rgba(80, 77, 77, 0.5);
  color: aliceblue;
  font-size: 18px;
}
#cuarone {
  position: relative;
  width: 100%;
  height: 160px;
}
.van-swipe-item {
  width: 80%;
  border-radius: 25px;
}
</style>