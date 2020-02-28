<template>
  <div id="Statistics">
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper">
        <div class="block" @click.stop>
          <div id="echart6" style="width: 100%;height: 400px; padding-top: .0rem" />
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
        <div>
          <van-row>
            <van-col span="24">
              <el-select
                v-model="state"
                style="width: 100%;border-radius: 50%;  padding-top: .0rem"
                @change="handleSelect"
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in restaurants"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </van-col>
          </van-row>
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
        </div>

        <div v-if="index==1">
          <div id="echart" style="width: 100%;height: 450px; padding-top: .6rem" />
        </div>
        <div v-if="index==2">
          <div id="echart1" style="width: 100%;height: 270px; padding-top: .0rem" />
          <div id="echart2" style="width: 100%;height: 270px; padding-top: .0rem" />
        </div>
        <div v-if="index==3">
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
                <van-image id="img" src=".\img\kongxinduigou_1.png" />
              </van-col>
              <van-col style="margin-left: 10px" span="6">
                <div class="item">加工任务数</div>
                <div>{{processTaskNo}}</div>
              </van-col>
              <van-col span="2"></van-col>
              <van-col span="4">
                <van-image id="img" src=".\img\yingyongguanli.png" />
              </van-col>
              <van-col style="margin-left: 10px" span="6">
                <div class="item">开孔数量</div>
                <div>{{openNo}}</div>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="4">
                <van-image id="img" src=".\img\yunhang.png" />
              </van-col>
              <van-col style="margin-left: 10px" span="6">
                <div class="item">运行时长</div>
                <div>{{runTime}}</div>
              </van-col>
              <van-col span="2"></van-col>
              <van-col span="4">
                <van-image id="img" src=".\img\kongxinduigou_1.png" />
              </van-col>
              <van-col style="margin-left: 10px" span="6">
                <div class="item">切割时长</div>
                <div>{{splitTime}}</div>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="4">
                <van-image id="img" src=".\img\tingzhi.png" />
              </van-col>
              <van-col style="margin-left: 10px" span="6">
                <div class="item">待机时长</div>
                <div>{{readyTime}}</div>
              </van-col>
              <van-col span="2"></van-col>
              <van-col span="4">
                <van-image id="img" src=".\img\kongxinduigou_1.png" />
              </van-col>
              <van-col style="margin-left: 10px" span="6">
                <div class="item">开光时长</div>
                <div>{{openLingtTime}}</div>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="4">
                <van-image id="img" src=".\img\kongxinduigou_1.png" />
              </van-col>
              <van-col style="margin-left: 10px" span="6">
                <div class="item">切割长度</div>
                <div>{{splitLength}}</div>
              </van-col>
              <van-col span="2"></van-col>
              <van-col span="4">
                <van-image id="img" src=".\img\kongxinduigou_1.png" />
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
                <th>设配编号</th>
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

        <div v-if="index==4">
          <div id="echart5" style="width: 100%;height: 400px; padding-top: .0rem" />
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
import { Popup } from "vant";
import { DatetimePicker } from "vant";
import { Picker } from "vant";
import { Field } from "vant";
import { Overlay } from "vant";
import { Collapse, CollapseItem } from "vant";

Vue.use(Collapse).use(CollapseItem);
Vue.use(Overlay);
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
Vue.use(Field);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(DatetimePicker);
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
// let moment = require("moment");
export default {
  naem: "Statistics",
  data() {
    return {
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
      },
      activeNames: "1",
      tablsit: ["", "OEE图表", "人机效率", "加工统计", "材料分析"],
      active: 0,
      isshow: false,
      processTaskNo: "",
      openNo: 0,
      runTime: 0,
      splitTime: 0,
      readyTime: 0,
      openLingtTime: 0,
      splitLength: 0,
      spaceLength: "",
      StatisticList: [],
      restaurants: [],
      state: "",
      timeout: null,
      GetdeviceSn: "",
      show: false,
      isbool: false
    };
  },
  mounted() {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    this.params.endDate = this.$moment(end).format("YYYY-MM-DD");
    this.params.beginDate = this.$moment(start).format("YYYY-MM-DD");
    this.axios
      .get(
        "/api/services/app/HymSonDevice/GetAllByTenantId?tenantId=" +
          this.$store.state.tenantId
      )
      .then(result => {
        window.console.log(result)
        this.restaurants = [];
        for (let i = 0; i < result.data.result.length; i++) {
          this.restaurants.push({
            value: result.data.result[i].deviceSn+"|"+result.data.result[i].deviceType
          });
        }
      });

    setTimeout(() => {
      this.drawLine();
    }, 500);
  },
  methods: {
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
              label: {
                formatter: " {per|{d}%}  ",
                rich: {
                  per: {
                    color: "#eee",
                    backgroundColor: "#334455",
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              },
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
    },
    GetMaterialStatistic() {
      let eChart5 = echarts.init(document.getElementById("echart5"));
      let URL = "/api/services/app/Statistic/GetMaterialStatistic";
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
  
      if (eChart5._$handlers.click) {
        eChart5._$handlers.click.length = 0;
      }
      window.console.log(URL);
      //点击事件
      this.axios.get(URL).then(result => {
        eChart5.setOption({
          title: {
            show: false,
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
              return name + " " + ((target / total) * 100).toFixed(2) + "%";
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
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    // eslint-disable-next-line no-unused-vars
    handleSelect(item) {
      window.console.log(this.state);
      if (this.state == "") {
        if (this.active == 0) {
          this.drawLine();
        }
        if (this.active == 1) {
          setTimeout(() => {
            this.drawRJXl();
          }, 500);
        }
        if (this.active == 2) {
          setTimeout(() => {
            this.GetProcessStatistic();
          }, 200);
        }
        if (this.active == 3) {
          this.GetMaterialStatistic();
        }
        return;
      } else {
        this.GetdeviceSn = this.state.split('|')[0];
        if (this.active == 0) {
          this.drawLine();
        }
        if (this.active == 1) {
          setTimeout(() => {
            this.drawRJXl();
          }, 500);
        }
        if (this.active == 2) {
          setTimeout(() => {
            this.GetProcessStatistic();
          }, 200);
        }
        if (this.active == 3) {
          this.GetMaterialStatistic();
        }
        return;
      }
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
                color: [[0.25, "#ddd"], [1, "#ddd"]]
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
      // URL +=
      //   "?tenantId=" +
      //   this.$store.state.tenantId +
      //   "&startTime=" +
      //   this.params.beginDate +
      //   "&endTime=" +
      //   this.params.endDate;
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
      // URL +=
      //   "?tenantId=" +
      //   this.$store.state.tenantId +
      //   "&startTime=" +
      //   this.params.beginDate +
      //   "&endTime=" +
      //   this.params.endDate;

      this.axios.get(URL).then(result => {
        window.console.log(result);
        for (let i = 0; i < result.data.result.items.length; i++) {
          this.StatisticList.push(result.data.result.items[i]);
        }
      });
    },
    SelectTablClick(name) {
      this.active = name;
      if (this.GetdeviceSn != "") {
        if (name == 1) {
          setTimeout(() => {
            this.drawRJXl();
          }, 500);
        } else if (name == 3) {
          setTimeout(() => {
            this.GetMaterialStatistic();
          }, 200);
        }
      } else {
        if (name == 0) {
          setTimeout(() => {
            this.drawLine();
          }, 500);
        } else if (name == 1) {
          setTimeout(() => {
            this.drawRJXl();
          }, 500);
        } else if (name == 3) {
          setTimeout(() => {
            this.GetMaterialStatistic();
          }, 200);
        }
      }
      if (name == 2) {
        setTimeout(() => {
          this.GetProcessStatistic();
        }, 200);
      }
    },
    drawRJXl() {
      let eChart = echarts.init(document.getElementById("echart1"));
      let URL = "/api/services/app/Statistic/GetStatisticPersonEfficiencyRate";

      // URL +=
      //   "?tenantId=" +
      //   this.$store.state.tenantId +
      //   "&startTime=" +
      //   this.params.beginDate +
      //   "&endTime=" +
      //   this.params.endDate;
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

      this.axios.get(URL).then(result => {
        window.console.log(result);
        if (result == null) {
          return;
        }
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
            text: result.data.result.title + "(有效工时/运行时长)",
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
            boundaryGap: false,
            data: result.data.result.categories
            // axisLabel: {
            //   formatter: "{value}",
            //   textStyle: {
            //     fontSize: 10
            //   }
            // }
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
                data: effcoemcyPoint,
                label: {
                  // 图形上的文本标签
                  show: true,
                  position: "inside", // 相对位置
                  rotate: 0, // 旋转角度
                  formatter: function(params) {
                    return params.value;
                  }
                }
              }
            }
          ]
        });
      });
      URL = "/api/services/app/Statistic/GetStatisticPersonEfficiency";

      // URL +=
      //   "?tenantId=" +
      //   this.$store.state.tenantId +
      //   "&startTime=" +
      //   this.params.beginDate +
      //   "&endTime=" +
      //   this.params.endDate;
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
        window.console.log(result);
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
    },

    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let eChart = echarts.init(document.getElementById("echart"));
      let URL = "/api/services/app/Statistic/GetHymSonDeviceStatuseReport";
      // URL +=
      //   "?tenantId=" +
      //   this.$store.state.tenantId +
      //   "&startTime=" +
      //   this.params.beginDate +
      //   "&endTime=" +
      //   this.params.endDate;
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

      this.axios.get(URL).then(result => {
        window.console.log(result);
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
            itemWidth: 13,
            itemHeight: 13,
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
                show: true,
                lineStyle: {
                  color: "#e3e3e3"
                }
              },
              axisLabel: {
                inside: false,
                textStyle: {
                  color: "#999",
                  fontWeight: "normal",
                  fontSize: "13"
                }
              },

              data: result.data.result.categories
            }
          ],
          //   ------   y轴  ----------
          yAxis: [
            {
              position: "left",
              offset: 0,
              type: "value",
              yAxisIndex: 0,
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
                formatter: function(params) {
                  if (params.value > 0) {
                    if (params.value == 100) return params.value + "%";
                    return (params.value % 100) + "%";
                  } else {
                    return "";
                  }
                }
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
                formatter: function(params) {
                  if (params.value > 0) {
                    if (params.value == 100) return params.value + "%";
                    return (params.value % 100) + "%";
                  } else {
                    return "";
                  }
                }
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
                formatter: function(params) {
                  if (params.value > 0) {
                    if (params.value == 100) return params.value + "%";
                    return (params.value % 100) + "%";
                  } else {
                    return "";
                  }
                }
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
                show: result.data.result.series[3].data != 0 ? true : false,
                position: "inside", // 相对位置
                rotate: 0, // 旋转角度
                color: "black",
                formatter: function(params) {
                  if (params.value > 0) {
                    if (params.value == 100) return params.value + "%";
                    return (params.value % 100) + "%";
                  } else {
                    return "";
                  }
                }
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
                formatter: function(params) {
                  if (params.value > 0) {
                    if (params.value == 100) return params.value + "%";
                    return (params.value % 100) + "%";
                  } else {
                    return "";
                  }
                }
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
