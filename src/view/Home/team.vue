<template>
  <div id="team">
    <van-row type="flex" justify="end">
      <van-col span="3" :class="isshow == 0 ? 'red' : 'blue'" @click="SelectList(0)">本周</van-col>
      <van-col span="3" :class="isshow == 1 ? 'red' : 'blue'" @click="SelectList(1)">本月</van-col>
      <van-col span="3" :class="isshow == 2 ? 'red' : 'blue'" @click="SelectList(2)">全年</van-col>
    </van-row>
    <div style="  margin: 20px;">
      <el-table :data="UserData" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="userName" width="80" label="操作员"></el-table-column>
        <el-table-column prop="rank" width="80" label="名次"></el-table-column>
        <el-table-column prop="totalTime" label="综合产出工时"></el-table-column>
      </el-table>
    </div>

    <!-- <table>
      <thead>
        <th>操作员</th>

        <th>名次</th>
        <th>综合产出工时</th>
      </thead>
      <tbody>
        <tr v-for="item in UserData" :key="item.userId">
          <td>{{item.userName}}</td>
          <td>{{item.rank}}</td>
          <td>{{item.totalTime}}h</td>
        </tr>
      </tbody>
    </table>-->
  </div>
</template>

<script>
import Vue from "vue";
import { Row, Col } from "vant";
import { Cell, CellGroup } from "vant";
Vue.use(Cell).use(CellGroup);
Vue.use(Row).use(Col);
export default {
  name: "team",
  data() {
    return {
     
      UserData: [],
      activeindex: 0,
      isshow: 0
    };
  },
  mounted() {
    this.SelectList(0);
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    GetHymsonPersonEffitive(url) {
      this.axios.get(url).then(reulst => {
        window.console.log(reulst);
        this.UserData = [];
        this.UserData = reulst.data.result.items;
      });
    },
    SelectList(active) {
      this.isshow = active;

      if (active == 0) {
        this.GetHymsonPersonEffitive(
          "/api/services/app/HymsonProductionRunData/GetHymsonPersonEffitive?startTime=" +
            this.GetDate(active)[0].start +
            "&endTime=" +
            this.GetDate(active)[1].end
        );
      } else if (active == 1) {
        //    console.log(this.GetDate(active)[0]);
        // console.log(this.GetDate(active)[1]);
        this.GetHymsonPersonEffitive(
          "/api/services/app/HymsonProductionRunData/GetHymsonPersonEffitive?startTime=" +
            this.GetDate(active)[0].start +
            "&endTime=" +
            this.GetDate(active)[1].end
        );
      } else if (active == 2) {
        //    console.log(this.GetDate(active)[0]);
        // console.log(this.GetDate(active)[1]);
        this.GetHymsonPersonEffitive(
          "/api/services/app/HymsonProductionRunData/GetHymsonPersonEffitive?startTime=" +
            this.GetDate(active)[0].start +
            "&endTime=" +
            this.GetDate(active)[1].end
        );
      }
    },
    GetDate(active) {
      let end = new Date();
      let start = new Date();
      if (active == 0) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        start = this.$moment(start).format("YYYY-MM-DD");
      } else if (active == 1) {
        start = this.$moment(
          this.$moment()
            .month(this.$moment().month())
            .startOf("month")
            .valueOf()
        ).format("YYYY-MM-DD");
      } else if (active == 2) {
        start = this.$moment(
          this.$moment()
            .month(this.$moment().month())
            .startOf("year")
            .valueOf()
        ).format("YYYY/MM/DD");
      }
      end = this.$moment(end).format("YYYY-MM-DD");
      return [{ start }, { end }];
    }
  }
};
</script>

<style scoped>
* {
  font-size: 15px;
}
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
.van-col {
  margin-top: 10px;
  font-size: 16px;
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
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

