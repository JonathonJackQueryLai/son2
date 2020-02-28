<template >
  <div id="find">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div id="newsitem">
        <carousel v-if="this.$store.state.NewCount==0" id="carousel" :data="this.$store.state.Newdata"></carousel>
        <div
          class="section"
          v-for="(item,index) in this.$store.state.NewContntlist"
          @click="onChange(item.id)"
          :key="index"
        >
          <div class="news">
            <div class="news-left">
              <img v-if="item.smallPic" :src="item.smallPic" width="100"  height="60"  />
            </div>
            <div class="news-right">
              <div class="newsTitle">
                <span>{{item.title}}</span>
                <br />
                <span class="span_short">{{item.shortContent}}</span>
                <!-- <router-link :to="'/news/'+item.id">{{item.title}}</router-link> -->
              </div>
              <div class="newsMessage">
                <span>{{datatime(item.publishTime)}}</span>
                <span>{{item.createUser}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import carousel from "@/components/carousel";
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
import { Row, Col } from "vant";

import { PullRefresh } from "vant";
import { Skeleton } from "vant";

Vue.use(Skeleton);
Vue.use(PullRefresh);
Vue.use(Row).use(Col);
Vue.use(Swipe).use(SwipeItem);
export default {
  naem: "find",
  components: {
    carousel
  },
  data() {
    return {
      data: [],
      isLoading: false
    };
  },
  methods: {
    onChange(aid) {
      this.$router.push({ path: "/news/" + aid });
    },
    datatime(date) {
      return this.$moment(new Date(date)).format("YYYY-MM-DD HH:mm");
    },

    getData() {
      if (this.$store.state.Newdata<1) {
        var api2 = "/api/services/app/HymsonNewsAd/GetAll";
        this.axios
          .get(api2)
          .then(response => {
            window.console.log(response.data.result.items);
            for (let i = 0; i < response.data.result.items.length; i++) {
              this.$store.state.Newdata.push([
                {
                  pictureUrl: response.data.result.items[i].pictureUrl,
                  shortTitle: response.data.result.items[i].shortTitle,
                  linkUrl: response.data.result.items[i].linkUrl,
                  id: response.data.result.items[i].id
                }
              ]);
            }
          })
          .catch(error => {
            window.console.log(error);
          });
      }
      var api = "/api/services/app/HymsonNews/GetAll";
      this.axios
        .get(api)
        .then(response => {
          this.$store.state.NewContntlist = response.data.result.items;
        })
        .catch(error => {
          window.console.log(error);
        });
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功" + this.$store.state.NewCount);
        this.isLoading = false;
        this.$store.state.NewCount++;
      }, 500);
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style  scoped>
.section {
  width: 100%;
  height: 5.5rem;
  border-bottom: 1px solid #ccc;
}
.news {
  height: 5.5rem;
  box-sizing: border-box;

  display: flex;
}
.news-left {
  margin-top: 2%;
  height: 100%;
  width: 6.5rem;
  display: inline-block;
}
/* .news-left img {
  width: 100%;
  height: 100%;
} */
.news-right {
  flex: 1;
  padding-left: 5px;
}
.newsTitle {
  width: 100%;
  height: 68%;
  color: #404040;
  font-size: 16px;
  overflow: hidden;
}
.newsMessage {
  width: 100%;
  height: 25%;
  display: flex;
  align-items: flex-end;
  color: #888;
  justify-content: space-between;
}
.span_short {
  color: #888;
  text-align: left;
  font-size: 12px;
}
</style>>

