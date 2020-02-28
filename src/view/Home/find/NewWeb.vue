<template>
  <v-touch v-on:swiperight="swiperright">
    <div class="news">
      <div v-if="ishow">
        <iframe class="iframecontnent" :src="urlstr"></iframe>
      </div>
      <div v-else>
        <van-loading type="spinner" />
      </div>
    </div>
  </v-touch>
</template>

<script>
import Vue from "vue";
import { Sticky } from "vant";
import { NavBar } from "vant";
import { Toast } from "vant";
import { Row, Col } from "vant";
import { Loading } from "vant";

Vue.use(Loading);
Vue.use(Row).use(Col);
Vue.use(Toast);
Vue.use(NavBar);
Vue.use(Sticky);
export default {
  name: "child",
  data() {
    return {
      ishow: false,
      inputName: 0,
      urlstr: "#"
    };
  },
  methods: {
    swiperright() {
      this.$router.push({ path: "/NewD/" + this.$store.state.deviceSn });
    },
    datatime(date) {
      date = date.replace(/-/g, "/");
      let transTime = this.$moment(date).format("YYYY/MM/DD");
      return transTime;
    },
    getData(id) {
      var api2 = "/api/services/app/HymsonNewsAd/GetAll?Filter=" + id;

      this.axios.get(api2).then(response => {
        // window.console.log(response)
        window.console.log(response.data.result.items[0].linkUrl);
        this.urlstr = response.data.result.items[0].linkUrl;
        this.ishow = true;
      });
    }
  },
  mounted() {
    this.getData(this.$route.params.id);
    window.console.log(this.$route.params.id);
  }
};
</script>

<style  >
.news {
  background-color: ghostwhite;
}
.cont {
  padding: 0 15px;
  text-align: left;
  line-height: 2em;
  background-color: ghostwhite;
  font-size: 12px;
}
img {
  display: block;
  max-width: 100%;
  height: auto;
}

#ones {
  font-size: 14px;
  font-family: 楷体;
  width: 100%;
  background-color: #2c3e50;
  color: gainsboro;
  background: ghostwhite;
  text-align: left;
}
.van-col {
  font-size: 14px;
}
.iframecontnent {
  width: 100%;
  height: 700px;
}
</style>