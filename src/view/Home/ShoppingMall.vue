<template>
  <div>
    <iframe class="iframecontnent"  src="http://www.hymson-laser.com/Wap/list_139.aspx?lcid=2"></iframe>
  </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
import { Toast } from "vant";
import { Image } from "vant";
import { Lazyload } from "vant";
import { Grid, GridItem } from "vant";
import { Card } from "vant";
import { Icon } from "vant";
import { Sticky } from "vant";
import { NavBar } from "vant";

import { Row, Col } from "vant";

Vue.use(Row).use(Col);

Vue.use(NavBar);
Vue.use(Sticky);
Vue.use(Icon);
Vue.use(Card);
Vue.use(Grid).use(GridItem);
// options 为可选参数，无则不传
Vue.use(Lazyload);
Vue.use(Image);
Vue.use(Toast);
Vue.use(Swipe).use(SwipeItem);
export default {
  data() {
    return {
      list: []
    };
  },
  watch: {
    // this.load("")
  },
  mounted() {},
  methods: {
 onClickLeft() {
      this.$router.push({ path: "/find" });
      this.$store.state.active=3;
    }

  }
};
</script>

<style>
.van-swipe-item {
  width: 80%;
  border-radius: 25px;
}
.van-swipe-item img {
  width: 80%;
  height: 150px;
  border-radius: 25px;
}
.iframecontnent {
  width: 100%;
  height: 700px;
}
</style>