<template>
  <v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright">
    <div id="Device" style="background-color: #E9EEF3;">
      <transition name="slide-fade">
        <div class="header" v-if="visible">
          <van-notice-bar :text="GetUserNotificationsmessage" left-icon="volume-o" />
          <van-row>
            <van-col span="2">
              <div style="height: 25px; font-weight: 700; color: white; margin-top: 90px; ">
                <van-icon name="arrow-left" @click="swiperright" />
              </div>
            </van-col>
            <van-col span="12">
              <div class="grid-content bg-purple" style=" text-align: left;  ">
                <br />
                <span
                  style=" color: white ;margin-left: 5px;margin-top: 90px;"
                >型号:{{list.deviceType}}</span>
                <img
                  v-if="list.deviceTypePicture!=null"
                  :src="list.deviceTypePicture"
                  style=" margin-left: 15px;  width:100%;height:100%; margin-top: 30px; "
                />
                <van-loading
                  v-if="list.deviceTypePicture==null"
                  style=" margin-left: 15px;  width:100%;height:120px;"
                  type="spinner"
                />
              </div>
            </van-col>
            <van-col span="8">
              <div
                class="grid-content bg-purple-light"
                style=" 
            text-align: right;
            margin-right: 10px;
            line-height: 25px;"
              >
                <div style=" margin-top: 40px; color: white; ">近期保养时间</div>
                <div style=" color: white;">{{list.lastTime!=null?list.lastTime:datatime()}}</div>
                <div style=" color: white;margin-top: 15px;">近期维修时间</div>
                <div
                  style=" color: white"
                >{{list.maintMaintenanceTime!=null?list.lastTime:datatime()}}</div>
              </div>
            </van-col>
            <van-col span="2">
              <div style="height: 25px; font-weight: 700; color: white; margin-top: 90px; ">
                <van-icon name="arrow" @click="swiperleft" />
              </div>
            </van-col>
          </van-row>
        </div>
      </transition>

      <div>
        <el-card style="margin-top: 1%;height: 35px;   width:95%;display: inline-block;">
          <van-row style="margin-top: -5%;">
            <van-col span="6">
              <!-- 设备运行状态，1为选择，2为复位，3为运行，4为准备，5为停止，6为报警,对应plc字段为rwArrInfoShow[4] -->
              <van-tag size="large" type="success" v-if="plcstate.operateState==2">选择</van-tag>
              <van-tag size="large" type="success" v-else-if="plcstate.operateState==15">复位</van-tag>
              <van-tag size="large" type="success" v-else-if="plcstate.operateState==4">运行</van-tag>
              <van-tag size="large" type="warning" v-else-if="plcstate.operateState==3">准备</van-tag>
              <van-tag size="large" type="warning" v-else-if="plcstate.operateState==5">停止</van-tag>
              <van-tag size="large" type="danger" v-else-if="plcstate.operateState==6">报警</van-tag>
              <van-tag size="large" v-else-if="plcstate.operateState==0">关机</van-tag>
              <van-tag size="large" v-else-if="plcstate.operateState==null">关机</van-tag>
            </van-col>
            <van-col span="18" style="margin-top: 5px;">
              <van-progress
                v-if="plcstate.productionState==2"
                :percentage="plcstate.runProgress?plcstate.runProgress:0"
                color="#7232dd"
                stroke-width="12"
              />
              <van-progress
                v-if="plcstate.productionState==1"
                :percentage="plcstate.runProgress?plcstate.runProgress:0"
                color="#7232dd"
                stroke-width="12"
              />
              <van-progress
                v-if="plcstate.productionState==0"
                :percentage="plcstate.runProgress?plcstate.runProgress:0"
                color="#7232dd"
                stroke-width="12"
              />
              <van-progress
                v-if="plcstate.productionState==null"
                :percentage="plcstate.runProgress?plcstate.runProgress:0"
                color="#7232dd"
                stroke-width="12"
              />
            </van-col>
          </van-row>
        </el-card>
      </div>

      <div style="margin-top: 2%; width:100%; height: 100%;">
        <van-grid :column-num="3" :border="false" :clickable="true">
          <el-card style="width: 32%; margin-left: 2px" v-for="item in itemlist" :key="item.value">
            <div class="griditemClass">
              <van-icon @click="GetPath(item.value)" :name="item.ioc" size="50" color="royalblue" />
            </div>
            <div style=" text-align: center;  font-size: 1rem;">
              <span>{{item.value}}</span>
            </div>
          </el-card>
        </van-grid>
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
  name: "Device",
  data() {
    return {
      active: 0,
      itemlist: [
        { value: "机床状态", ioc: "play-circle" },
        { value: "加工统计", ioc: "setting" },
        { value: "订单分析", ioc: "clock" },
        { value: "人机效率", ioc: "ascending" },
        { value: "机床OEE", ioc: "bar-chart-o" },
        { value: "维护保养", ioc: "comment" },
        { value: "团队", ioc: "manager" },
        { value: "发现", ioc: "search" },
        { value: "商城", ioc: "hot" }
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
      visible: true,
      plcstate: []
    };
  },
  destroyed() {
    clearInterval(this.myInterval);
  },
  methods: {
    swiperleft: function() {
      this.visible = false;

      if (this.$store.state.HymSonDeviceRuntimecoun > 0) {
        this.$store.state.HymSonDeviceRuntimecoun =
          this.$store.state.HymSonDeviceRuntimecoun - 1;
      } else {
        this.$store.state.HymSonDeviceRuntimecoun =
          this.$store.state.HymSonDeviceRuntime.length - 1;
      }
      window.console.log(this.$store.state.HymSonDeviceRuntimecoun);
     
      this.getData(
        this.$store.state.HymSonDeviceRuntime[
          this.$store.state.HymSonDeviceRuntimecoun
        ].deviceSn
      );
       this.getId();
      setTimeout(() => {
        this.visible = true;
      }, 100);
    },
    swiperright: function() {
      this.visible = false;
      if (
        this.$store.state.HymSonDeviceRuntimecoun <
        this.$store.state.HymSonDeviceRuntime.length - 1
      ) {
        this.$store.state.HymSonDeviceRuntimecoun =
          this.$store.state.HymSonDeviceRuntimecoun + 1;
      } else {
        this.$store.state.HymSonDeviceRuntimecoun = 0;
      }
      window.console.log(this.$store.state.HymSonDeviceRuntimecoun);
      this.getData(
        this.$store.state.HymSonDeviceRuntime[
          this.$store.state.HymSonDeviceRuntimecoun
        ].deviceSn
      );
      this.getId();

      setTimeout(() => {
        this.visible = true;
      }, 100);
    },

    datatime() {
      return this.$moment(new Date()).format("YYYY-MM-DD HH:mm");
    },
    getnotificationName() {
      this.axios
        .get(
          "/api/services/app/HymsonLog/GetAllByTenantId?tenantId=" +
            this.$store.state.tenantId +
            "&status=1"
        )
        .then(result => {
          if (result == null) {
            return;
          }

          if (result.data.result.length == 0) {
            this.GetUserNotificationsmessage = "";
          }
          if (result.data.result.length > 0) {
            if (this.Notificacount > result.data.result.length - 1) {
              this.Notificacount = 0;
            }

            this.GetUserNotificationsmessage =
              "设备:" +
              result.data.result[this.Notificacount].deviceSn +
              ",时间:" +
              result.data.result[this.Notificacount].logTime +
              ",异常信息:" +
              result.data.result[this.Notificacount].message;
            this.Notificacount++;
          }
        });
    },
    getData(id) {
      this.$store.state.deviceSn = id;
      this.deviceSn = this.$store.state.deviceSn;
      var url =
        "/api/services/app/HymSonDevice/GetHymSonDeviceForView?deviceSn=";
      url = url + id;

      this.axios.get(url).then(result => {
        window.console.log(result);
        this.list = [];
        this.list = result.data.result;
      });
    },
    onClickLeft() {
      this.$store.state.GetdeviceSn = "";
      this.$store.state.iscolor = false;
      this.$router.push("/home");
    },
    GetPath(aid) {
      this.$store.state.GetdeviceSn = 2;
      switch (aid) {
        case this.itemlist[0].value:
          this.$store.state.GetdeviceSn = 4;
          this.$router.push({ path: "/NewMachine/" + this.deviceSn });
          break;
        case this.itemlist[1].value:
          this.$router.push({ path: "/NewMc/" + this.deviceSn });
          break;
        case this.itemlist[2].value:
          this.$router.push({ path: "/NewMllis/" + this.deviceSn });
          break;
        case this.itemlist[3].value:
          this.$router.push({ path: "/NewEeff/" + this.deviceSn });
          break;
        case this.itemlist[4].value:
          this.$router.push({ path: "/NewOEE/" + this.deviceSn });
          break;
        case this.itemlist[5].value:
          this.$router.push({ path: "/NewMaintenance/" + this.deviceSn });
          break;
        case this.itemlist[6].value:
          this.$store.state.GetdeviceSn = 4;
          this.$router.push({ path: "/team" });
          break;
        case this.itemlist[7].value:
          this.$store.state.GetdeviceSn = 4;
          this.$router.push({ path: "/find" });
          break;
        case this.itemlist[8].value:
          this.$store.state.GetdeviceSn = 4;
          this.$router.push({ path: "/ShoppingMall" });
          break;
        default:
          break;
      }

      //
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
      // 数据全部加载完成

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
          this.Machinestate = [];
          this.Machinestate = result.data.result.items;

          setTimeout(() => {
            let loadingProgressCanvas = document.getElementById(
              this.list.deviceSn
            );
            window.console.log(loadingProgressCanvas);

            var ctx = loadingProgressCanvas.getContext("2d"); // 获取绘制图形的对象(画笔)
            this.progress = 0; // 定义进度
            ctx.fillStyle = "#0000ff"; // 定义画笔颜色, 重新绘制已经加载的进度条
            ctx.rect(0, 0, 300, 40);
            ctx.stroke(); // 绘制定义好的矩形路径
            let count = 0;
            let Getlist = [];
            for (let j = 0; j < this.Machinestate.length; j++) {
              if (this.list.deviceSn == this.Machinestate[j].deviceSn) {
                count++;
                Getlist.push(this.Machinestate[j]);
                window.console.log(count);
              }
            }

            this.GetProgress(ctx, Getlist, count);
          }, 100);
        });
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
    getId() {
      this.axios
        .get(
          "/api/services/app/HymSonDeviceRuntime/GetHymSonDeviceRuntime?DeviceSnFilter=" +
            this.$store.state.HymSonDeviceRuntime[
              this.$store.state.HymSonDeviceRuntimecoun
            ].deviceSn
        )
        .then(result => {
        
          this.plcstate = result.data.result.items[0];
          window.console.log(this.plcstate);
        });
    }
  },
  mounted() {
    this.GetDate();
    if (this.$store.state.tenantId == -1) {
      this.$router.push({ path: "/" });
    }

    this.getData(this.$route.params.id);
    this.getId();
    this.myInterval = window.setInterval(() => {
      setTimeout(() => {
        this.getnotificationName(); //调用接口的方法
        this.getId();
      }, 1);
    }, 12000);
  }
};
</script>
<style >
.header {
  height: 220px;
  width: 100%;
  background-size: 100% 100%;
  background-color: #0074b6;
}
.bottom {
  height: 400px;
}
.griditemClass {
  display: inline-block;
  width: 50px;
  height: 50px;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 2s;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}
</style>