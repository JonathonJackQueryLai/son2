<template>
  <div id="index">
    <div id="tow">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";

import { Icon } from "vant";
import { Tab, Tabs } from "vant";
import { Popup } from "vant";
import { Row, Col } from "vant";
import { Cell, CellGroup } from "vant";
import { Sticky } from "vant";

Vue.use(Sticky);
Vue.use(Icon);
Vue.use(Popup);
Vue.use(Row).use(Col);
Vue.use(Cell).use(CellGroup);
Vue.use(Tab).use(Tabs);
Vue.use(Tabbar).use(TabbarItem);
export default {
  name: "index",
  components: {},
  data() {
    return {
      active: this.$store.state.active,
      show: false,
      Selectlist: []
    };
  },
  mounted() {
    this.getId();
    window.console.log(123123);
  },
  methods: {
    getId() {
      this.axios
        .get(
          "/api/services/app/HymSonDeviceRuntime/GetHymSonDeviceRuntime?tenantId=" +
            this.$store.state.tenantId
        )
        .then(result => {
          window.console.log(result);
          this.list = [];
          this.list = result.data.result.items;

          this.$store.state.HymSonDeviceRuntime = result.data.result.items;
          
          this.$store.state.HymSonDeviceRuntimecoun=0;
          this.GetDevice(result.data.result.items[this.$store.state.HymSonDeviceRuntimecoun].deviceSn);
        });
    },
    GetDevice(deviceSn) {
      if (deviceSn == "") {
        return;
      }
      this.$store.state.iscolor = false;

      this.$router.push({ path: "/NewD/" + deviceSn });
    },
    showPopup() {
      this.show = true;
    },
    showFind() {
      this.$router.push({ path: "/find" });
      this.$store.state.active = 3;
    },
    showHome() {
      this.$router.push({ path: "/home" });
      this.$store.state.active = 0;
    },
    showStatistics() {
      this.$router.push({ path: "/Statistics" });
      this.$store.state.active = 1;
    },
    showteam() {
      this.$router.push({ path: "/team" });
      this.$store.state.active = 2;
    },
    ShoppingMall() {
      this.$router.push({ path: "/ShoppingMall" });
      this.$store.state.active = 4;
    }
  }
};
</script>

<style >
#ioc {
  font-size: 30px;
  margin-top: 5px;
}

#one {
  font-size: 30px;
  font-family: 楷体;
  font-weight: 900;
  /* position: fixed;
  top: 0; */
  /* height: 10%; */
  width: 100%;
  color: rgb(222, 236, 243);
  background: #2c3e50;
}
#tow {
  width: 100%;
  margin-bottom: 60px;
}
/* .appone {
  width: 100%;
  background-color: white;;
  height: 25px;
}
.appones {
  width: 100%;
  background-color: #2c3e50;;
  height: 25px;
} */
</style>
