<template>
  <v-touch v-on:swiperight="swiperright">
    <div>
      <!-- <van-sticky >
      <van-nav-bar :title="GetdeviceSn" left-text="返回" left-arrow @click-left="onClickLeft" />
      </van-sticky>-->
      <!-- <headcontrol :data="this.$store.state.GetdeviceSn"></headcontrol> -->
      <van-overlay :show="show" @click="show = false">
        <div class="wrapper">
          <div class="block" @click.stop>
            <div id="echart6" style="width: 100%;height: 400px; padding-top: .0rem" />
          </div>
        </div>
      </van-overlay>
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
      <div id="echart5" style="width: 100%;height: 400px; padding-top: .0rem" />
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
import { Overlay } from "vant";
import { Collapse, CollapseItem } from "vant";

Vue.use(Collapse).use(CollapseItem);
Vue.use(Overlay);
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
      show: false,
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
        this.GetMaterialStatistic();
      }, 200);
    },
    onClickLeft() {
      this.$router.push({ path: "/NewD/" + this.GetdeviceSn });
    },
    getData(aid) {
      this.GetdeviceSn = aid;
      setTimeout(() => {
        this.GetMaterialStatistic();
      }, 200);
    },
    GetMaterialStatistic() {
      let eChart5 = echarts.init(document.getElementById("echart5"));
      let URL = "/api/services/app/Statistic/GetMaterialStatistic";
      let deviceSn = "";

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

      if (eChart5._$handlers.click) {
        eChart5._$handlers.click.length = 0;
      }
      //点击事件
      this.axios.get(URL).then(result => {
        window.console.log(result)
        eChart5.setOption({
          title: {
            show: false,
            text: "某站点用户访问来源",
            subtext: "纯属虚构",
            x: "center"
          },
          tooltip: {
            show: false,
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            left: "left",
            data: result.data.result.legendData,
            formatter: function(name) {
              var total = 0;
              var target;
              for (
                var i = 0, l = result.data.result.series[0].data.length;
                i < l;
                i++
              ) {
                total += result.data.result.series[0].data[i].value;
                if (result.data.result.series[0].data[i].name == name) {
                  target = result.data.result.series[0].data[i].value;
                }
              }
              return name + " " + ((target / total) * 100).toFixed(2) + "%"+",数量:"+target;
            }
          },
          series: [
            {
              name: result.data.result.series[0].name,
              type: result.data.result.series[0].type,
              radius: "55%",
              center: ["50%", "60%"],
              data: result.data.result.series[0].data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        });
      });

      eChart5.on("click", params => {
        this.show = true;
        setTimeout(() => {
          this.GetThicknessStatistic(params.name, deviceSn);
        }, 200);
      });
    },
    GetThicknessStatistic(materialName, deviceNo) {
      let eChart6 = echarts.init(document.getElementById("echart6"));
      let URL =
        "/api/services/app/Statistic/GetThicknessStatistic?materialName=" +
        materialName +
        "&startTime=" +
        this.params.beginDate +
        "&endTime=" +
        this.params.endDate +
        "&deviceNo=" +
        deviceNo;

      this.axios.get(URL).then(result => {
        eChart6.setOption({
          title: {
            text: materialName + "材料厚度占比",
            x: "center"
          },
          tooltip: {
            show: false,
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            left: "left",
            padding: 20,
            data: result.data.result.legendData
          },
          series: [
            {
              name: result.data.result.series[0].name,
              type: result.data.result.series[0].type,
              radius: "55%",
              center: ["50%", "60%"],
              data: result.data.result.series[0].data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        });
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