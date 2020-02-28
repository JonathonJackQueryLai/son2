<template>
  <v-touch v-on:swiperight="swiperright">
    <div>
      <div class="wrapper" >
        <div class="block" @click.stop>
          <van-tabs v-model="actives">
            <van-tab title="保养内容">
              <el-table :data="MaintenanceLoglist" style="width: 100%  ;margin: 0.5rem;">
                <el-table-column prop="id" width="80" label="保养编号"></el-table-column>
                <el-table-column prop="contentCh" width="200" label="保养项目"></el-table-column>
                <el-table-column prop="lastTime" width="200" label="保养时间"></el-table-column>
                <el-table-column prop="useRmk" label="保养备注"></el-table-column>
              </el-table>
            </van-tab>
            <van-tab title="保养项目">
              <el-table :data="Maintenancelist" style="width: 100%;margin: 0.5rem;">
                <el-table-column prop="id" width="80" label="序号"></el-table-column>
                <el-table-column prop="contentCh" width="140" label="保养项目"></el-table-column>
                <el-table-column prop="lastTime" width="140" label="上次保养时间"></el-table-column>
                <el-table-column prop="useTime" label="使用时间"></el-table-column>
                <el-table-column prop="period" label="周期"></el-table-column>
                <el-table-column prop="total" label="总时长"></el-table-column>
                <el-table-column prop="progress" label="保养进度"></el-table-column>
              </el-table>
            </van-tab>
            <van-tab title="维修记录">
              <el-table :data="MaintenanceRecordlist" style="width: 100%;margin: 0.5rem;">
                <el-table-column prop="id" width="80" label="序号"></el-table-column>
                <el-table-column prop="maintenanceItems" width="140" label="维修项目"></el-table-column>
                <el-table-column prop="maintenanceName" width="140" label="维修人员"></el-table-column>
                <el-table-column prop="maintenanceTime" width="200" label="维修时间"></el-table-column>
                <el-table-column prop="maintenanceRemark" label="维修备注"></el-table-column>
              </el-table>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
  </v-touch>
</template>

<script>
import Vue from "vue";
import { List } from "vant";
import { Cell, CellGroup } from "vant";
import { Progress } from "vant";
import { Tab, Tabs } from "vant";
import { Divider } from "vant";
import { Search } from "vant";
import { NoticeBar } from "vant";
import { Tag } from "vant";
import { Row, Col } from "vant";
import { Image } from "vant";
import { DropdownMenu, DropdownItem } from "vant";
import { Icon } from "vant";
import { Collapse, CollapseItem } from "vant";
import { Overlay } from "vant";
import { Toast } from "vant";
import { Sticky } from "vant";
// 引入基本模板
// eslint-disable-next-line no-unused-vars

Vue.use(Sticky);
Vue.use(Toast);
Vue.use(Overlay);
Vue.use(Collapse).use(CollapseItem);
Vue.use(Icon);
Vue.use(DropdownMenu).use(DropdownItem);
Vue.use(Image);
Vue.use(Row).use(Col);
Vue.use(Tag);
Vue.use(NoticeBar);
Vue.use(Search);
Vue.use(Divider);
Vue.use(Tab).use(Tabs);
Vue.use(Progress);
Vue.use(Cell).use(CellGroup);
Vue.use(List);

export default {
  data() {
    return {
      deviceSn: "",
      MaintenanceLoglist: [],
      Maintenancelist: [],
      MaintenanceRecordlist: [],
      actives: 0
    };
  },
  mounted() {
    this.getData(this.$route.params.id);
  },
  methods: {
    swiperright() {
      this.$router.push({ path: "/NewD/" + this.$store.state.deviceSn });
    },
    datatime(date) {
      date = date.replace(/-/g, "/");
      let transTime = this.$moment(new Date(date)).format("YYYY/MM/DD/HH:mm");
      return transTime;
    },
    getData(id) {
      this.$store.state.deviceSn = id;
      this.deviceSn = this.$store.state.deviceSn;
      window.console.log(id);
      this.showMaintenanceLog(this.deviceSn);
    },
    showMaintenanceLog(deviceSn) {
      this.show = true;
      this.MaintenanceLoglist = [];
      this.Maintenancelist = [];
      this.MaintenanceRecordlist = [];
      this.axios
        .get(
          "/api/services/app/HymsonMaintenanceLog/GetHymsonMaintenanceLogForView?deviceSn=" +
            deviceSn
        )
        .then(result => {
          this.MaintenanceLoglist = result.data.result.items;
        });

      this.axios
        .get("/api/services/app/HymsonMaintenance/GetAll")
        .then(result => {
          this.Maintenancelist = result.data.result.items;
        });
      this.axios
        .get(
          "/api/services/app/HymsonMaintenanceRecord/GetAll?Filter=" + deviceSn
        )
        .then(result => {
          window.console.log(result);
          if (result.data.result != null) {
            this.MaintenanceRecordlist = result.data.result.items;
          }
        });
    }
  }
};
</script>

<style>
</style>