<template>
  <div>
    <el-card
      class="box-card"
      v-for="(item,index) in CellTextList"
      :key="item.deviceSn"
      :name="index"
    >
      <van-row>
        <van-col span="2"></van-col>
        <van-col span="22" offset="2">
          <van-cell title="设备编号" :value="item.deviceSn"></van-cell>
          <van-cell title="设备模型" :value="item.deviceType"></van-cell>
          <van-cell title="出厂日期" value />
          <van-cell
            title="总运行时间"
            :value="item.totalRunDay+'天'+item.totalRunTime+'时'+item.totalRunMinute+'分'"
          />
          <van-cell title="设定速度" :value="item.setPower" />
          <van-cell title="设定功率" :value="item.setSpeed" />
        </van-col>
      </van-row>
    </el-card>
  </div>
</template>

<script>
// import headcontrol from "@/components/headcontrol";
import Vue from "vue";
import { Sticky } from "vant";
import { NavBar } from "vant";
import { Toast } from "vant";
import { Row, Col } from "vant";
import { Loading } from "vant";
import { Grid, GridItem } from "vant";
import { Cell, CellGroup } from "vant";

Vue.use(Cell).use(CellGroup);
Vue.use(Grid).use(GridItem);
Vue.use(Row).use(Col);
Vue.use(Loading);
Vue.use(Row).use(Col);
Vue.use(Toast);
Vue.use(NavBar);
Vue.use(Sticky);
export default {
  //  components: {
  //   headcontrol
  // },
  data() {
    return {
      active: 0,
      CellTextList: [],
      deviceSn: ""
    };
  },
  methods: {
    datatime(date) {
      return this.$moment(new Date(date)).format("yyyy-MM-DD HH:mm");
    },
    // eslint-disable-next-line no-unused-vars
    getData(id) {
      this.deviceSn = id;
      var url =
        "/api/services/app/HymSonDevice/GetHymSonDeviceForView?deviceSn=";
      url = url + id;
      window.console.log(url);
      this.axios.get(url)
      .then(resutl => {
        window.console.log(resutl.data.result);
        this.CellTextList = [];
        this.CellTextList.push(resutl.data.result);
        window.console.log(this.CellTextList);
      });
    },
    onClickLeft() {
      this.$router.push({ path: "/NewD/" + this.deviceSn });
    }
  },
  mounted() {
    this.getData(this.$route.params.id);
  }
};
</script>

<style scoped>
.box-card {
  width: 95%;
  margin-left: 2.5%;
  margin-top: 10px;
  text-align: left;
}
</style>