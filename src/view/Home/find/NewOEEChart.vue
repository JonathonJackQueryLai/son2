<template>
  <v-touch v-on:swiperight="swiperright">
    <div>
      <!-- <van-sticky>
      <van-nav-bar :title="GetdeviceSn" left-text="返回" left-arrow @click-left="onClickLeft" />
      </van-sticky>-->
      <!-- <headcontrol :data="this.$store.state.GetdeviceSn"></headcontrol> -->
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
      <div id="echart" style="width: 100%;height: 450px; padding-top: .6rem" />
    </div>
  </v-touch>
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
// 引入基本模板
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
  components: {
    // headcontrol
  },
  data() {
    return {
      GetdeviceSn: "",
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
      this.drawLine();
    },
    onClickLeft() {
      this.$router.push({ path: "/NewD/" + this.GetdeviceSn });
    },
    getData(aid) {
      this.GetdeviceSn = aid;
      this.drawLine();
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let eChart = echarts.init(document.getElementById("echart"));
      let URL = "/api/services/app/Statistic/GetHymSonDeviceStatuseReport";
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
      }
      window.console.log(URL);
      this.axios.get(URL).then(result => {
        window.console.log(URL);
        eChart.clear();
        // 绘制图表
        eChart.setOption({
          title: {
            text: result.data.result.title,
            textStyle: {
              fontSize: 14
            }
          },
          legend: {
            itemWidth: 10,
            itemHeight: 10,
            left: "right",
            data: result.data.result.legend
          },
          xAxis: [
            {
              type: "category",
              axisTick: {
                show: true
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: "#e3e3e3"
                }
              },
              axisLabel: {
                inside: false,
                textStyle: {
                  color: "#999",
                  fontWeight: "normal",
                  fontSize: "12"
                }
              },

              data: result.data.result.categories
            }
          ],
          //   ------   y轴  ----------
          yAxis: [
            {
              position: "left",
              offset: -5,
              type: "value",
              yAxisIndex: 1,
              min: 0,
              max: 100,
              axisLabel: {
                formatter: "{value}%",
                textStyle: {
                  color: "#999"
                }
              },

              axisLine: {
                lineStyle: {
                  color: "transparent" // 坐标轴线颜色
                }
              }
            }
          ],

          series: [
            {
              name: result.data.result.series[0].name,
              type: result.data.result.series[0].type,
              stack: "业务", //折叠显示
              data: result.data.result.series[0].data,
              barWidth: 25,
              //显示颜色

              label: {
                // 图形上的文本标签
                show: true,
                position: "inside", // 相对位置
                rotate: 0, // 旋转角度
                color: "black",
                formatter: "{c}%"
              },
              itemStyle: {
                normal: { color: "grigio" }
              }
            },
            {
              name: result.data.result.series[1].name,
              type: result.data.result.series[1].type,
              stack: "业务",
              data: result.data.result.series[1].data,
              barWidth: 25,
              label: {
                // 图形上的文本标签
                show: true,
                position: "inside", // 相对位置
                rotate: 0, // 旋转角度
                color: "black",
                formatter: "{c}%"
              },
              itemStyle: {
                normal: { color: "green" }
              }
            },
            {
              name: result.data.result.series[2].name,
              type: result.data.result.series[2].type,
              stack: "业务",
              data: result.data.result.series[2].data,
              barWidth: 25,
              label: {
                // 图形上的文本标签
                show: true,
                position: "inside", // 相对位置
                rotate: 0, // 旋转角度
                color: "black",
                formatter: "{c}%"
              },
              itemStyle: {
                normal: { color: "Blue" }
              }
            },
            {
              name: result.data.result.series[3].name,
              type: result.data.result.series[3].type,
              stack: "业务",
              data: result.data.result.series[3].data,
              barWidth: 25,
              label: {
                // 图形上的文本标签
                show: true,
                position: "inside", // 相对位置
                rotate: 0, // 旋转角度
                color: "black",
                formatter: "{c}%"
              },

              itemStyle: {
                normal: { color: "#FF8849" }
              }
            },
            {
              name: result.data.result.series[4].name,
              type: result.data.result.series[4].type,
              stack: "业务",
              data: result.data.result.series[4].data,
              barWidth: 25,
              label: {
                // 图形上的文本标签
                show: true,
                position: "inside", // 相对位置
                rotate: 0, // 旋转角度
                color: "black",
                formatter: "{c}%"
              },
              itemStyle: {
                normal: { color: "red" }
              }
            }
          ]
        });
      });
    }
  }
};
</script>

<style>
</style>