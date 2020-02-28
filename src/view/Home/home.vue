<template>
  <div id="home">
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper">
        <div class="block" @click.stop>
          <van-tabs v-model="actives">
            <van-tab title="保养内容">
              <table>
                <thead>
                  <th>保养编号</th>
                  <th>保养项目</th>
                  <th>保养时间</th>
                  <th>保养备注</th>
                </thead>
                <tbody>
                  <tr v-for="items in MaintenanceLoglist" :key="items.id">
                    <td>{{items.id}}</td>
                    <td>{{items.contentCh}}</td>
                    <td>{{datatime(items.lastTime)}}</td>
                    <td>{{items.useRmk}}</td>
                  </tr>
                </tbody>
              </table>
            </van-tab>
            <van-tab title="保养项目">
              <table>
                <thead>
                  <th>序号</th>
                  <th>保养项目</th>
                  <th>上次保养时间</th>
                  <th>使用时间</th>
                  <th>周期</th>
                  <th>总时长</th>
                  <th>保养进度</th>
                </thead>
                <tbody>
                  <tr v-for="items in Maintenancelist" :key="items.id">
                    <td>{{items.id}}</td>
                    <td>{{items.contentCh}}</td>
                    <td>{{datatime(items.lastTime)}}</td>
                    <td>{{datatime(items.useTime)}}</td>
                    <td>{{items.period}}</td>
                    <td>{{items.total}}</td>
                    <td>{{items.progress}}</td>
                  </tr>
                </tbody>
              </table>
            </van-tab>
            <van-tab title="维修记录">
              <table>
                <thead>
                  <th>序号</th>
                  <th>维修项目</th>
                  <th>维修人员</th>
                  <th>维修时间</th>
                  <th>维修备注</th>
                </thead>
                <tbody>
                  <tr v-for="items in MaintenanceRecordlist" :key="items.id">
                    <td>{{items.id}}</td>
                    <td>{{items.maintenanceItems}}</td>
                    <td>{{items.maintenanceName}}</td>
                    <td>{{datatime(items.maintenanceTime)}}</td>
                    <td>{{items.maintenanceRemark}}</td>
                  </tr>
                </tbody>
              </table>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </van-overlay>

    <van-tabs @click="SelectTablClick">
      <van-tab
        v-model="active"
        v-for="index in tablsit.length-1"
        :title="tablsit[index]"
        :key="index.id"
        class="tab"
      >
        <div v-if="index==1">
          <van-cell>
            <van-dropdown-menu>
              <van-dropdown-item v-model="SelectIndex" :options="Selectlist" />
              <van-button type="info" @click="getId(true)">查询</van-button>
            </van-dropdown-menu>
          </van-cell>
          <el-card class="box-card" v-for="(item,index) in list" :key="item.deviceSn" :name="index">
            <div slot="header" class="clearfix">
              <van-tag type="success">{{item.deviceSn}}</van-tag>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="GetDevice(item.deviceSn)"
              >详情</el-button>
            </div>

            <van-cell>
              <van-row>
                <van-col span="6">
                  <!-- 设备运行状态，1为选择，2为复位，3为运行，4为准备，5为停止，6为报警,对应plc字段为rwArrInfoShow[4] -->
                  <van-tag type="success" v-if="item.operateState==2">选择</van-tag>
                  <van-tag type="success" v-else-if="item.operateState==15">复位</van-tag>
                  <van-tag type="success" v-else-if="item.operateState==4">运行</van-tag>
                  <van-tag type="warning" v-else-if="item.operateState==3">准备</van-tag>
                  <van-tag type="warning" v-else-if="item.operateState==5">停止</van-tag>
                  <van-tag type="danger" v-else-if="item.operateState==6">报警</van-tag>
                  <van-tag v-else-if="item.operateState==0">关机</van-tag>
                  <van-tag v-else-if="item.operateState==null">关机</van-tag>
                </van-col>
                <van-col span="18">
                  <van-progress
                    v-if="item.productionState==2"
                    :percentage="item.runProgress?item.runProgress:0"
                    color="#f2826a"
                    stroke-width="12"
                  />
                  <van-progress
                    v-if="item.productionState==1"
                    :percentage="item.runProgress?item.runProgress:0"
                    color="#ee0a24"
                    stroke-width="12"
                  />
                  <van-progress
                    v-if="item.productionState==0"
                    :percentage="item.runProgress?item.runProgress:0"
                    color="#7232dd"
                    stroke-width="12"
                  />
                  <van-progress
                    v-if="item.productionState==null"
                    :percentage="item.runProgress?item.runProgress:0"
                    color="#7232dd"
                    stroke-width="12"
                  />
                </van-col>
              </van-row>
            </van-cell>
            <!-- CNC状态，1:启动,0:关闭 -->
            <van-cell type="danger" title="CNC">
              <van-tag type="success" v-if="item.cncState==1">启动</van-tag>
              <van-tag v-else>关闭</van-tag>
            </van-cell>
            <!-- PLC状态，1:启动,0:关闭 -->
            <van-cell type="danger" title="PLC">
              <van-tag type="success" v-if="item.plcState==1">启动</van-tag>
              <van-tag v-else>关闭</van-tag>
            </van-cell>

            <!-- X轴使能状态,1:启动,0:关闭 -->
            <van-cell type="danger" title="X轴使能">
              <van-tag type="success" v-if="item.snState==1">启动</van-tag>
              <van-tag v-else>关闭</van-tag>
            </van-cell>
          </el-card>
        </div>
        <div v-if="index==2">
          <van-cell>
            <van-notice-bar :text="GetUserNotificationsmessage" left-icon="volume-o" />
            <van-cell border:fasle></van-cell>
            <van-row type="flex" justify="space-between">
              <van-col span="4">
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
      </van-tab>
    </van-tabs>
  </div>
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
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/line");
require("echarts/lib/chart/bar");
require("echarts/lib/chart/gauge");
require("echarts/lib/chart/pie");
require("echarts/lib/chart/candlestick");

// 引入提示框和title组件

require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
require("echarts/lib/component/markPoint");
require("echarts/lib/component/toolbox");
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
  name: "home",
  data() {
    return {
      tablsit: ["", "实时信息", "机床状态"],
      Imagelist: [
        "",
        "./images/mian/u150.png",
        "./images/mian/u204.png",
        "./images/mian/u150.png",
        "./images/mian/u202.png"
      ],
      active: 0,
      actives: 0,
      list: [],
      Machinestate: [],
      lists: [],
      loading: false,
      finished: false,
      maching: false,
      machshed: false,
      canvas: false,
      canvading: false,
      value: "",
      nowtime: "",
      onetime: "",
      twotime: "",
      time: "",
      progress: 0,
      Notice: false, // 通知
      SelectIndex: 0, //选择
      Selectlist: [],
      activeNames: ["1"],
      show: false,
      MaintenanceLoglist: [],
      Maintenancelist: [],
      MaintenanceRecordlist: [],
      GetUserNotifications: [],
      GetUserNotificationsmessage: "",
      Notificacount: 0,
      Isequipment: -1
    };
  },

  mounted() {
    this.GetDate();
    this.getnotificationName();
    this.myInterval = window.setInterval(() => {
      setTimeout(() => {
        this.getnotificationName(); //调用接口的方法
        this.getId(true);
      }, 1);
    }, 12000);
    this.onLoad();
  },
  destroyed() {
    clearInterval(this.myInterval);
  },
  methods: {
    datatime(date) {
      date = date.replace(/-/g, "/");
      let transTime = this.$moment(new Date(date)).format("YYYY/MM/DD/HH:mm");
      return transTime;
    },
    GetDevice(deviceSn) {
      if (deviceSn == "") {
        return;
      }
      this.$store.state.iscolor = false;
      this.$store.state.GetdeviceSn = 1;
      this.$router.push({ path: "/NewD/" + deviceSn });
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
            window.console.log(this.Notificacount);
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
    // eslint-disable-next-line no-unused-vars
    SelectTablClick(name) {
      window.console.log(name);
      if (name == 1) {
        this.canvasload();
      }
      // // eslint-disable-next-line no-empty
      // if (name == 0) {
      // }
    },
    canvasload() {
      // 数据全部加载完成

      this.lists = [];
      this.lists = this.list;
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
      }, 300);
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

          // if (date2.getHours() <= date1.getHours()) {
          //   if (date2.getMinutes() == 59) {
          //     date2.setHours(date2.getHours() + 1);
          //   }
          //   if (date2.getSeconds() == 59) {
          //     date2.setMinutes(date2.getMinutes() + 1);
          //   }
          //   date2.setSeconds(date2.getSeconds() + 1);
            // let time = new Date(Getlist[i].updateTime);
            // if (
            //   (time.getHours() * 60 + time.getMinutes())*60 ==
            //   (date2.getHours() * 60 + date2.getMinutes())*60
            // ) 
            // for (let j = 0; j < count; j++) {
            //   let time = new Date(Getlist[j].updateTime);
            //   if (
            //     time.getHours() * 60 + time.getMinutes() ==
            //     date2.getHours() * 60 + date2.getMinutes()
            //   ) {
            //     window.console.log(
            //       "得到时间" + Getlist[i].updateTime + "asdasd"
            //     );
            //     switch (Getlist[i].operateState) {
            //       case 1:
            //         ctx.fillStyle = "#FFFF00";
            //         break;
            //       case 2:
            //         ctx.fillStyle = "#FFFF00";
            //         break;
            //       case 3:
            //         ctx.fillStyle = "#1E90FF";
            //         break;
            //       case 4:
            //         ctx.fillStyle = "#54FF9F";
            //         break;
            //       case 5:
            //         ctx.fillStyle = "#B1FE24";
            //         break;
            //       case 6:
            //         ctx.fillStyle = "Orange";
            //         break;
            //       default:
            //         ctx.fillStyle = "Gray";
            //         break;
            //     }
            //     ctx.moveTo(this.progress, 0); // 移动到上一次绘制的终点,准备绘制下一次的进度
            //     ctx.fillRect(this.progress, 0, 300 / count, 40);
            //     this.progress += 300 / count;

            //   }
            // }
          
        }
      }
    },
    onLoad() {
      this.list = [];
      this.axios
        .get(
          "/api/services/app/HymSonDeviceRuntime/GetHymSonDeviceRuntime?tenantId=" +
            this.$store.state.tenantId
        )
        .then(result => {
          setTimeout(() => {
            this.Selectlist.push({ text: "请选择", value: 0 });
            for (let i = 0; i < result.data.result.items.length; i++) {
              this.list.push(result.data.result.items[i]);
              this.Selectlist.push({
                text: result.data.result.items[i].deviceSn,
                value: i + 1
              });
              if (this.$store.state.UserIdList.length == 0) {
                this.$store.state.UserIdList = [];
                this.$store.state.UserIdList = this.Selectlist;
              }
            }
            // 加载状态结束
            this.loading = false;
            // 数据全部加载完成
            //  window.window.console.log(result.data.result.items.length);
            if (this.list.length >= result.data.result.items.length) {
              this.finished = true;
            }
          }, 500);
        });

      // 异步更新数据
    },
    getId(GetdeviceSndata) {
      if (GetdeviceSndata == false) return;
      
      if (this.Selectlist[this.SelectIndex].text != "请选择") {
        var url =
          "/api/services/app/HymSonDeviceRuntime/GetHymSonDeviceRuntime?DeviceSnFilter=";
        url = url + this.Selectlist[this.SelectIndex].text;
        this.axios.get(url).then(result => {
          window.console.log(result);
          this.list = [];
          this.list = result.data.result.items;
        });
      } else {
        this.axios
          .get(
            "/api/services/app/HymSonDeviceRuntime/GetHymSonDeviceRuntime?tenantId=" +
              this.$store.state.tenantId
          )
          .then(result => {
            window.console.log(result);
            this.list = [];
            this.list = result.data.result.items;
          });
      }
    }
  },
  computed: {}
};
</script>

<style  scoped>
.van-progress {
  margin-top: 3%;
}
* {
  font-size: 12px;
}
.canvas {
  margin: 0;
  padding: 0;
}
[v-cloak] {
  display: none;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.text {
  font-size: 12px;
}

.item {
  margin-bottom: 10px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 95%;
  margin-left: 2.5%;
  margin-top: 10px;
  text-align: left;
}
.block {
  width: 100%;
  height: auto;
  background-color: #fff;
}

table {
  border-collapse: collapse;
  width: 100%;
}
table thead {
  color: grey;
  background: #fff;
}
table thead th {
  color: grey;
  background: #fff;
  width: 40px;
}
</style>