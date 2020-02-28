<template>
  <v-touch v-on:swiperight="swiperright">
    <div>
      <van-cell>
        <van-cell border:fasle></van-cell>
        <van-row type="flex" justify="space-between">
          <van-col span="4">
            <!-- <van-icon name="stop" size="60" color="royalblue" tag="加工" /> -->
            <van-image width="40" height="40" src=".\images\mian\u248.png" />
          </van-col>
          <van-col span="4">
            <van-image width="40" height="40" src=".\images\mian\u250.png" />
          </van-col>
          <van-col span="4">
            <van-image width="40" height="40" src=".\images\mian\u252.png" />
          </van-col>
          <van-col span="4">
            <van-image width="40" height="40" src=".\images\mian\u254.png" />
          </van-col>
          <van-col span="4">
            <van-image width="40" height="40" src=".\images\mian\u256.png" />
          </van-col>
        </van-row>

        <van-cell v-for="item in lists" :key="item.deviceSn">
          <van-cell>
            <van-row type="flex" justify="space-between">
              <van-col span="5">
                <van-tag>{{item.deviceSn}}</van-tag>
              </van-col>
              <van-col span="10">
                <van-tag type="danger" @click="showMaintenanceLog(item.deviceSn)">保养情况</van-tag>
              </van-col>
            </van-row>
          </van-cell>
          <canvas :id="item.deviceSn" width="300" height="40"></canvas>
          <!-- <div :id="item.deviceSn" style="width: 100%;height: 100%; padding-top: .0rem" /> -->
          <van-row type="flex" justify="space-between">
            <van-col span="6">{{onetime}}</van-col>
            <van-col span="6">{{twotime}}</van-col>
            <van-col span="4">{{time}}</van-col>
          </van-row>
        </van-cell>
      </van-cell>
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
import { Grid, GridItem } from "vant";
import { List } from "vant";
import { Cell, CellGroup } from "vant";
import { Progress } from "vant";
import { Tab, Tabs } from "vant";
import { Divider } from "vant";
import { Search } from "vant";
import { NoticeBar } from "vant";
import { Tag } from "vant";
import { Image } from "vant";
import { DropdownMenu, DropdownItem } from "vant";
import { Icon } from "vant";
import { Collapse, CollapseItem } from "vant";
import { Overlay } from "vant";
import { Popup } from "vant";

Vue.use(Popup);
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
Vue.use(Grid).use(GridItem);
Vue.use(Loading);
Vue.use(NavBar);
export default {
  data() {
    return {
      active: 0,
      itemlist: [
        { value: "设备信息", ioc: "comment" },
        { value: "机床状态", ioc: "play-circle" },
        { value: "人机效率", ioc: "bar-chart-o" },
        { value: "材料分析", ioc: "clock" },
        { value: "加工统计", ioc: "setting" },
        { value: "OEE", ioc: "bar-chart-o" }
      ],
      deviceSn: "",
      list: "",
      GetUserNotificationsmessage: "",
      Notificacount: 0,
      Machinestate: [],
      lists: [],
      nowtime: "",
      onetime: "",
      twotime: "",
      time: "",
      progress: 0,
      listsss: []
    };
  },
  methods: {
    swiperright() {
      this.$router.push({ path: "/NewD/" + this.$store.state.deviceSn });
    },
    GetDate() {
      this.nowtime = new Date();
      this.time = this.nowtime.getHours() + ":" + this.nowtime.getMinutes();
      let times = this.nowtime.getHours() * 60;
      times = times + this.nowtime.getMinutes() - 120;
      this.onetime = parseInt(times / 60) + ":" + (times % 60);
      times = this.nowtime.getHours() * 60;
      times = times + this.nowtime.getMinutes() - 60;
      this.twotime = parseInt(times / 60) + ":" + (times % 60);
    },
    canvasload() {
      this.lists = [];
      this.lists = this.listsss;
      //年月日
      let y = this.nowtime.getFullYear();
      let MM = this.nowtime.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = this.nowtime.getDate();
      d = d < 10 ? "0" + d : d;
      let tiem = y + "-" + MM + "-" + d + " ";

      this.axios
        .get(
          "/api/services/app/HymSonDeviceRuntimeRecord/GetList?startTime=" +
            tiem +
            this.onetime +
            "&endTime=" +
            tiem +
            this.time +
            "&tenantId=" +
            this.$store.state.tenantId
        )
        .then(result => {
          window.console.log(result);
          this.Machinestate = [];
          this.Machinestate = result.data.result.items;
        });

      setTimeout(() => {
        for (let i = 0; i < this.lists.length; i++) {
          let loadingProgressCanvas = document.getElementById(
            this.lists[i].deviceSn
          );
          // window.console.log(loadingProgressCanvas);
          var ctx = loadingProgressCanvas.getContext("2d"); // 获取绘制图形的对象(画笔)
          this.progress = 0; // 定义进度
          ctx.fillStyle = "#0000ff"; // 定义画笔颜色, 重新绘制已经加载的进度条
          ctx.rect(0, 0, 300, 40);
          ctx.stroke(); // 绘制定义好的矩形路径
          let count = 0;
          let Getlist = [];
          for (let j = 0; j < this.Machinestate.length; j++) {
            if (this.lists[i].deviceSn == this.Machinestate[j].deviceSn) {
              count++;
              Getlist.push(this.Machinestate[j]);
            }
          }

          this.GetProgress(ctx, Getlist, count);
        }
      }, 500);
    },
    onLoad() {
      this.listsss = [];
      this.axios
        .get(
          "/api/services/app/HymSonDeviceRuntime/GetHymSonDeviceRuntime?tenantId=" +
            this.$store.state.tenantId
        )
        .then(result => {
          this.listsss = result.data.result.items;
        });

      // 异步更新数据
    },
    GetProgress(ctx, Getlist, count) {
      window.console.log(Getlist);
      let date1 = new Date(); // Fri Jul 05 2019 11:16:00 GMT+0800 (中国标准时间)
      let date2 = new Date(date1);
      date2.setHours(date1.getHours() - 2);
      // operateState:设备运行状态，1为选择(黄色)，2为复位，3为运行（蓝色），4为准备(绿)，5为停止(深绿)，6为报警(橙色)),对应plc字段为rwArrInfoShow[4]
      if (Getlist == "") {
        ctx.fillStyle = "Gray";
        ctx.moveTo(this.progress, 0); // 移动到上一次绘制的终点,准备绘制下一次的进度
        ctx.fillRect(this.progress, 0, 300 / 1, 40);
        this.progress += 300 / 1;
      } else {
        for (let i = 0; i < count; i++) {
          switch (Getlist[i].operateState) {
            case 1:
              ctx.fillStyle = "#FFFF00";
              break;
            case 2:
              ctx.fillStyle = "#AAFF32";
              break;
            case 3:
              ctx.fillStyle = "#1E90FF";
              break;
            case 4:
              ctx.fillStyle = "#43CB80";
              break;
            case 5:
              ctx.fillStyle = "#AAFF32";
              break;
            case 6:
              ctx.fillStyle = "Orange";
              break;
            default:
              ctx.fillStyle = "Gray";
              break;
          }
          ctx.moveTo(this.progress, 0); // 移动到上一次绘制的终点,准备绘制下一次的进度
          ctx.fillRect(this.progress, 0, 300 / count, 40);
          this.progress += 300 / count;
        }
      }
    },
    getData(id) {
      this.$store.state.deviceSn = id;
      this.deviceSn = this.$store.state.deviceSn;
      this.canvasload();
    }
  },
  mounted() {
    this.GetDate();
    this.onLoad();
    if (this.$store.state.tenantId == -1) {
      this.$router.push({ path: "/" });
    }
    setTimeout(() => {
      this.getData(this.$route.params.id);
    }, 500);
  }
};
</script>

<style>
</style>