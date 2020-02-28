<template>
  <v-touch v-on:swiperight="swiperright">
    <div>
      <van-row>
        <van-col span="12">
          <el-date-picker
            v-model="params.beginDate"
            type="date"
            :placeholder="params.beginDate==''?'开始日期':params.beginDate"
            value-format="yyyy-MM-dd"
            style="width: 100%;  padding-top: .0rem"
            :editable="false"
            :picker-options="startTime"
            @change="handleSelect"
          ></el-date-picker>
        </van-col>
        <!-- @blur="btnDatePics" -->
        <van-col span="12">
          <el-date-picker
            v-model="params.endDate"
            type="date"
            style="width: 100%; margin: .0rem;  padding-top: .0rem"
            value-format="yyyy-MM-dd"
            placeholder="结束日期"
            :editable="false"
            @change="handleSelect"
            :picker-options="endTime"
          ></el-date-picker>
        </van-col>
      </van-row>
      <van-cell value="数据统计">
        <van-row>
          <van-col span="10">
            <div id="echart3" style="width: 100%;height: 200px; padding-top: .0rem" />
          </van-col>
          <van-col span="4"></van-col>
          <van-col span="10">
            <div id="echart4" style="width: 100%;height: 200px; padding-top: .0rem" />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="4">
            <van-icon name="passed" size="60" color="royalblue" />
          </van-col>
          <van-col style="margin-left: 10px" span="6">
            <div class="item">加工任务数</div>
            <div>{{processTaskNo}}</div>
          </van-col>
          <van-col span="2"></van-col>
          <van-col span="4">
            <van-icon name="orders-o" size="60" color="royalblue" />
          </van-col>
          <van-col style="margin-left: 10px" span="6">
            <div class="item">开孔数量</div>
            <div>{{openNo}}</div>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="4">
            <!-- <van-image id="img" src=".\img\yunhang.png" /> -->

            <van-icon name="underway-o" size="60" color="royalblue" />
          </van-col>
          <van-col style="margin-left: 10px" span="6">
            <div class="item">运行时长</div>
            <div>{{runTime}}</div>
          </van-col>
          <van-col span="2"></van-col>
          <van-col span="4">
            <van-icon name="underway-o" size="60" color="royalblue" />
          </van-col>
          <van-col style="margin-left: 10px" span="6">
            <div class="item">切割时长</div>
            <div>{{splitTime}}</div>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="4">
            <van-icon name="underway-o" size="60" color="royalblue" />
          </van-col>
          <van-col style="margin-left: 10px" span="6">
            <div class="item">待机时长</div>
            <div>{{readyTime}}</div>
          </van-col>
          <van-col span="2"></van-col>
          <van-col span="4">
            <van-icon name="underway-o" size="60" color="royalblue" />
          </van-col>
          <van-col style="margin-left: 10px" span="6">
            <div class="item">开光时长</div>
            <div>{{openLingtTime}}</div>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="4">
            <van-icon name="more-o" size="60" color="royalblue" />
          </van-col>
          <van-col style="margin-left: 10px" span="6">
            <div class="item">切割长度</div>
            <div>{{splitLength}}</div>
          </van-col>
          <van-col span="2"></van-col>
          <van-col span="4">
            <van-icon name="label-o" size="60" color="royalblue" />
          </van-col>
          <van-col style="margin-left: 10px" span="6">
            <div class="item">空移动长度</div>
            <div>{{spaceLength}}</div>
          </van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <table>
          <thead>
            <th>设备编号</th>
            <th>加工任务数</th>
            <th>开工率</th>
            <th>有效切割</th>
          </thead>
          <tbody>
            <tr v-for="items in StatisticList" :key="items.deviceNo">
              <td>{{items.deviceNo}}</td>
              <td>{{items.processTaskNo}}</td>
              <td>{{items.openRate}}%</td>
              <td>{{items.vailSplitRate}}%</td>
            </tr>
          </tbody>
        </table>
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
import { Cell, CellGroup } from "vant";

Vue.use(Cell).use(CellGroup);
Vue.use(Grid).use(GridItem);
Vue.use(Row).use(Col);
Vue.use(Loading);
Vue.use(Row).use(Col);
Vue.use(Toast);
Vue.use(NavBar);
Vue.use(Sticky);
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/line");
require("echarts/lib/chart/bar");
require("echarts/lib/chart/gauge");
require("echarts/lib/chart/pie");
// 引入提示框和title组件

require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
require("echarts/lib/component/markPoint");
require("echarts/lib/component/toolbox");
export default {
  data() {
    return {
      GetdeviceSn: "",
      processTaskNo: "",
      openNo: 0,
      runTime: 0,
      splitTime: 0,
      readyTime: 0,
      openLingtTime: 0,
      splitLength: 0,
      spaceLength: "",
      StatisticList: [],
      params: {
        endDate: "", //结束时间
        beginDate: "" //开始时间
      },
      startTime: {
        disabledDate: time => {
          if (this.params.endDate) {
            return (
              time.getTime() > new Date(this.params.endDate).getTime() //这里的this.params.endData按自己的字段参数来
            );
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      endTime: {
        disabledDate: time => {
          if (this.params.beginDate) {
            return (
              time.getTime() > Date.now() ||
              time.getTime() < new Date(this.params.beginDate).getTime() //这里的this.params.beginDate按自己的字段参数来
            );
          } else {
            return time.getTime() > Date.now();
          }
        }
      }
    };
  },
  mounted() {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    this.params.endDate = this.$moment(end).format("YYYY-MM-DD");
    this.params.beginDate = this.$moment(start).format("YYYY-MM-DD");
    this.getData(this.$route.params.id);
  },
  methods: {
    swiperright() {
      this.$router.push({ path: "/NewD/" + this.$store.state.deviceSn });
    },
    handleSelect() {
      this.GetProcessStatistic();
    },
    getData(id) {
      this.GetdeviceSn = id;
      this.GetProcessStatistic();
    },
    GetProcessStatistic() {
      let option = {
        tooltip: {
          show: false,
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            name: "有效切割率",
            type: "gauge",
            detail: {
              formatter: "{value}%\n有效切割率",
              fontSize: 12,
              color: "Black"
            },
            data: [{ value: "1" }],
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 10,
                fontSize: 10,
                shadowColor: "#fff", //默认透明
                color: [
                  [0.25, "#ddd"],
                  [1, "#ddd"]
                ]
              }
            },
            pointer: { width: 5, color: "#1e90ff" },
            title: {
              show: false
            },
            itemStyle: {
              //指针样式
              color: "red"
            },
            axisTick: { show: false },
            axisLabel: { show: false },
            splitLine: { show: false }
          }
        ]
      };
      let eChart3 = echarts.init(document.getElementById("echart3"));
      let eChart4 = echarts.init(document.getElementById("echart4"));

      let URL = "/api/services/app/Statistic/GetProcessStatistic";
      let deviceSn = "";
      if (this.GetdeviceSn != "") {
        deviceSn = this.GetdeviceSn;
        URL +=
          "?tenantId=" +
          this.$store.state.tenantId +
          "&startTime=" +
          this.params.beginDate +
          "&endTime=" +
          this.params.endDate +
          "&deviceNo=" +
          deviceSn;
      } else {
        URL +=
          "?tenantId=" +
          this.$store.state.tenantId +
          "&startTime=" +
          this.params.beginDate +
          "&endTime=" +
          this.params.endDate;
      }

      window.console.log(URL);
      this.axios.get(URL).then(result => {
        window.console.log(result);
        if (result == null) {
          return;
        }
        this.processTaskNo = result.data.result.processTaskNo;
        this.openNo = result.data.result.openNo;
        this.runTime = result.data.result.runTime;
        this.splitTime = result.data.result.splitTime;
        this.readyTime = result.data.result.readyTime;
        this.openLingtTime = result.data.result.openLingtTime;
        this.splitLength = result.data.result.splitLength;
        this.spaceLength = result.data.result.spaceLength;
        let Cuttingrate = result.data.result.vailSplitRate / 100;
        var color = new echarts.graphic.LinearGradient(0, 0, 1, 1, [
          {
            offset: 0,
            color: "#fd2c00"
          },
          {
            offset: 1,
            color: "#fd2c00"
          }
        ]);
        option.series[0].axisLine.lineStyle.color[0][0] = Cuttingrate;
        option.series[0].axisLine.lineStyle.color[0][1] = color;
        option.series[0].data[0].value = result.data.result.vailSplitRate;
        eChart3.setOption(option, true);
        option.series[0].detail.formatter = "{value}%\n开机率";
        option.series[0].data[0].value = result.data.result.openRate;
        option.series[0].splitLine = {
          show: true,
          length: 20, // 属性length控制线长
          lineStyle: {
            // 属性lineStyle（详见lineStyle）控制线条样式
            color: "#ddd",
            shadowBlur: 5,
            width: 1, //(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
            shadowColor: "#fff"
          }
        };
        Cuttingrate = result.data.result.openRate / 100;
        color = new echarts.graphic.LinearGradient(0, 0, 1, 1, [
          {
            offset: 0.1,
            color: "#fd2c00"
          },
          {
            offset: 1,
            color: "Blue"
          }
        ]);
        option.series[0].axisLine.lineStyle.color[0][0] = Cuttingrate;
        option.series[0].axisLine.lineStyle.color[0][1] = color;
        eChart4.setOption(option, true);
      });
      this.StatisticList = [];

      URL = "/api/services/app/Statistic/GetProcessStatisticList";
      deviceSn = "";
      if (this.GetdeviceSn != "") {
        deviceSn = this.GetdeviceSn;
        URL +=
          "?tenantId=" +
          this.$store.state.tenantId +
          "&startTime=" +
          this.params.beginDate +
          "&endTime=" +
          this.params.endDate +
          "&deviceNo=" +
          deviceSn;
      } else {
        URL +=
          "?tenantId=" +
          this.$store.state.tenantId +
          "&startTime=" +
          this.params.beginDate +
          "&endTime=" +
          this.params.endDate;
      }

      this.axios.get(URL).then(result => {
        for (let i = 0; i < result.data.result.items.length; i++) {
          this.StatisticList.push(result.data.result.items[i]);
        }
      });
    }
  }
};
</script>


<style  scoped>
.red {
  background: #1ab394;
  color: white;
  text-align: bottom;
}
.blue {
  color: gray;
  font-size: 14px;
  text-align: center;
}
.item {
  display: inline-block;
  color: gray;
  font-size: 14px;
  text-align: left;
  background-color: #ddd;
}
* {
  font-size: 15px;
}
.van-col {
  font-size: 16px;
  text-align: center;
}
.van-row {
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
}
.text {
  text-align: left;
  margin-left: 20px;
  margin-top: 10px;
  font-size: 16px;
  font-weight: 800;
}
table {
  border-collapse: collapse;
  width: 100%;
}
thead {
  color: rosybrown;
  background: white;
}
table,
th,
td {
  border: 1px solid gray;
}
tbody,
tr,
td {
  border: 1px solid gray;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 100%;
  height: auto;
  background-color: #fff;
}
</style>
