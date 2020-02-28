<template >
  <div id="find">
    <!-- <van-popup
      ref="container"
      v-model="show"
      position="right"
      :style="{  width: '100%',height: '100%' }"
    >
      <van-sticky :container="container">
        <van-button type="default" @click="show=false">返回</van-button>
      </van-sticky>
      <NewsContnt ref="child" :style="{  width: '100%',height: '100%' }"></NewsContnt>
    </van-popup>-->

    <div id="newsitem">
      <carousel
        v-if="this.$store.state.NewCount==0"
        id="carousel"
        :data="this.$store.state.Newdata"
      ></carousel>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div
          class="section"
          v-for="(item,index) in this.$store.state.NewContntlist"
          @click="onChange(item.id)"
          :key="index"
        >
          <div class="news">
            <div class="news-left">
              <img v-if="item.smallPic" :src="item.smallPic" />
            </div>
            <div class="news-right">
              <div class="newsTitle">
                <span>{{item.title}}</span>
                <br />
                <span class="span_short">{{item.shortContent}}</span>
              </div>
              <div class="newsMessage">
                <span>{{item.publishTime}}</span>
                <span>{{item.createUser}}</span>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
// import NewsContnt from "@/view/Home/find/NewsContnt";
import carousel from "@/components/carousel";
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
import { Row, Col } from "vant";
import { PullRefresh } from "vant";
import { Skeleton } from "vant";
import { List } from "vant";
import { Popup } from "vant";
import { Tabbar, TabbarItem } from "vant";

Vue.use(Tabbar).use(TabbarItem);
Vue.use(Popup);
Vue.use(List);
Vue.use(Skeleton);
Vue.use(PullRefresh);
Vue.use(Row).use(Col);
Vue.use(Swipe).use(SwipeItem);
export default {
  name: "find",
  components: {
    carousel
    // NewsContnt
  },
  data() {
    return {
      data: [],
      isLoading: false,
      list: [],
      loading: false,
      finished: false,
      ResultCount: 0,
      MaxResultCount: 10,
      Count: 0,
      show: false,
      Gid: -1,
      container: null
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      var api =
        "/api/services/app/HymsonNews/GetAll?MaxResultCount=" +
        this.MaxResultCount * (this.Count + 1) +
        "&SkipCount=" +
        this.Count * 10+"&isPublish=1";
      this.axios
        .get(api)
        .then(response => {
           window.console.log(response);
          setTimeout(() => {
            for (let i = 0; i < response.data.result.items.length; i++) {
              this.$store.state.NewContntlist.push({
                createUser: response.data.result.items[i].createUser,
                id: response.data.result.items[i].id,
                isPublish: response.data.result.items[i].isPublish,
                newsClassId: response.data.result.items[i].newsClassId,
                newsContent: response.data.result.items[i].newsContent,
                pubisher: response.data.result.items[i].pubisher,
                publishTime:this.datatime(response.data.result.items[i].publishTime) ,
                readNumber: response.data.result.items[i].readNumber,
                shortContent:
                  response.data.result.items[i].shortContent.substring(0, 30) +
                  "....",
                smallPic: response.data.result.items[i].smallPic,
                tenantId: response.data.result.items[i].tenantId,
                title: response.data.result.items[i].title
              });
            }
            this.Count++;
            // 加载状态结束
            this.loading = false;
            // 数据全部加载完成
            if (
              this.$store.state.NewContntlist.length >=
              response.data.result.totalCount
            ) {
              this.finished = true;
            }
          }, 500);
        })
        .catch(error => {
          window.console.log(error);
        });
    },

    // eslint-disable-next-line no-unused-vars
    onChange(aid) {
      this.$store.state.GetdeviceSn = 3;
      this.$router.push({ path: "/news/" + aid });
    },
    datatime(date) {
       date= date.replace(/-/g, "/")
      let transTime = this.$moment(date).format("YYYY/MM/DD");
      return transTime;
    },

    getData() {
      if (this.$store.state.Newdata < 1) {
        var api2 = "/api/services/app/HymsonNewsAd/GetAll";
        this.axios
          .get(api2)
          .then(response => {
            
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
    },
    onRefresh() {
      setTimeout(() => {
        // this.$toast("刷新成功" + this.$store.state.NewCount);
        this.isLoading = false;
        this.$store.state.NewCount++;
      }, 500);
    }
  },
  mounted() {
  
    this.getData();
    this.$store.state.NewContntlist = [];
    this.container = this.$refs.container;
  }
};
</script>

<style  scoped>
.section {
  width: 100%;
  border-bottom: 1px solid #ccc;
}
.news {
  margin: 10px;
  height: 6.5rem;
  box-sizing: border-box;
  display: flex;
}
.news-left {
  height: 100%;
  width: 6.5rem;
  display: inline-block;
}
.news-left img {
  width: 100%;
  height: 100%;
}
.news-right {
  flex: 1;
  padding-left: 11px;
}
.newsTitle {
  width: 100%;
  height: 80%;
  color: #404040;
  font-size: 16px;
  overflow: hidden;
  text-align: left;
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
  margin-top: 10px;
  color: #888;
  text-align: left;
  font-size: 12px;
}
</style>>

