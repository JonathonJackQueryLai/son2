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
      <div id="echart1" style="width: 100%;height: 270px; padding-top: .0rem" />
      <div id="echart2" style="width: 100%;height: 270px; padding-top: .0rem" />
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
  // components: {
  //   headcontrol
  // },
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
      setTimeout(() => {
        this.drawRJXl();
      }, 500);
    },
    onClickLeft() {
      this.$router.push({ path: "/NewD/" + this.GetdeviceSn });
    },
    getData(aid) {
      this.GetdeviceSn = aid;
      setTimeout(() => {
        this.drawRJXl();
      }, 500);
    },
    drawRJXl() {
      let eChart = echarts.init(document.getElementById("echart1"));
      let URL = "/api/services/app/Statistic/GetStatisticPersonEfficiencyRate";
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
        window.console.log(result);
        let effcoemcyPoint = [];
        for (let i = 0; i < result.data.result.series[0].data.length; i++) {
          effcoemcyPoint.push({
            value: result.data.result.series[0].data[i] + "%",
            xAxis: i,
            yAxis: result.data.result.series[0].data[i]
          });
        }

        eChart.clear();
        eChart.setOption({
          title: {
            text: result.data.result.title,
            textStyle: {
              fontSize: 14
            }
          },
          legend: {
            data: result.data.result.legend,
            itemWidth: 20,
            itemHeight: 20,
            left: "right"
          },
          xAxis: {
            type: "category",
            data: result.data.result.categories
          },
          yAxis: {
            type: "value",
            min: 0,
            max: 100,
            axisLabel: {
              formatter: "{value}%",
              textStyle: {
                color: "#999"
              }
            }
          },
          series: [
            {
              name: result.data.result.series[0].name,
              data: result.data.result.series[0].data,
              type: result.data.result.series[0].type,
              markPoint: {
                symbol: "pin", //标记(气泡)的图形
                symbolSize: 30, //标记(气泡)的大小,
                data: effcoemcyPoint
              }
            }
          ]
        });
      });

      URL = "/api/services/app/Statistic/GetStatisticPersonEfficiency";
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
      }

      this.axios.get(URL).then(result => {
        let efficiency = [];
        // let effcoemcyPoint = [];
        for (let i = 0; i < result.data.result.series[0].data.length; i++) {
          let sum =
            result.data.result.series[0].data[i] /
            result.data.result.series[1].data[i];
          sum = Number(sum * 100).toFixed(1);
          // effcoemcyPoint.push({ value: sum + "%", xAxis: i, yAxis: sum });

          efficiency.push(sum);
        }

        let eChart2 = echarts.init(document.getElementById("echart2"));
        eChart2.clear();
        eChart2.setOption({
          title: {
            text: result.data.result.title,
            textStyle: {
              fontSize: 14
            }
          },
          tooltip: {
            trigger: "axis",
            formatter: function(params) {
              //, ticket, callback
              var htmlStr = "";
              for (var i = 0; i < params.length; i++) {
                var param = params[i];
                var xName = param.name; //x轴的名称
                var seriesName = param.seriesName; //图例名称
                var value = param.value; //y轴值
                var color = param.color; //图例颜色

                if (i === 0) {
                  htmlStr += xName + "<br/>"; //x轴的名称
                }
                htmlStr += "<div>";
                //为了保证和原来的效果一样，这里自己实现了一个点的效果
                htmlStr +=
                  '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' +
                  color +
                  ';"></span>';
                //圆点后面显示的文本
                htmlStr += seriesName + "：" + value;
                htmlStr += "</div>";
                if (i === params.length - 1) {
                  //为了保证和原来的效果一样，这里自己实现了一个点的效果
                  //圆点后面显示的文本
                  htmlStr +=
                    "人机效率" + "：" + efficiency[param.dataIndex] + "%";
                }
              }
              return htmlStr;
            }
          },
          legend: {
            data: result.data.result.legend,
            itemWidth: 20,
            itemHeight: 20,
            left: "right"
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: result.data.result.categories
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value} H"
            }
          },
          series: [
            {
              name: result.data.result.series[0].name,
              type: result.data.result.series[0].type,
              data: result.data.result.series[0].data
            },
            {
              name: result.data.result.series[1].name,
              type: result.data.result.series[1].type,
              data: result.data.result.series[1].data
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