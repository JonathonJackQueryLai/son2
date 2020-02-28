<template>
  <v-touch v-on:swiperight="swiperright">
    <div class="news">
      <div v-if="ishow">
        <h2>{{list.title}}</h2>
        <div class="cont" v-html="list.newsContent" />
        <van-row>
          <van-col span="11">{{'时间:'+datatime(list.publishTime)}}</van-col>
          <van-col span="5"></van-col>
          <van-col span="10">{{'作者:'+list.createUser}}</van-col>
        </van-row>
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
      inputName: 0
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
      this.list = [];
      var api = "/api/services/app/HymsonNews/GetHymsonNewsForView?id=" + id;
      this.axios
        .get(api)
        .then(response => {
          if (response.data.error != null) {
            this.ishow = false;
            return;
          }

          this.list = response.data.result;
          this.ishow = true;
          // this.$store.state.deviceSn = this.list.title;
        })

        .catch(error => {
          window.console.log(error);
        });
    },
    show() {
      this.ishow = false;
      window.console.log("我是子组件方法");
      window.console.log(this.inputName);
      window.console.log(this.ishow);
      this.getData();
    }
  },
  mounted() {
    this.getData(this.$route.params.id);
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
</style>