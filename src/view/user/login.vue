<template>
  <div id="loagin">
    <div class="login_top">
      <van-image id="img" src=".\img\Logo.jpg" />
    </div>

    <van-row>
      <van-col span="6" style="margin-top: 20px;">
        <span>公司名称:</span>
      </van-col>
      <van-col span="15">
        <el-select
          v-model="value"
          filterable
          remote
          reserve-keyword
          placeholder="请输入公司名称"
          :remote-method="remoteMethod"
          :loading="loading"
          @change="selectQuert"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </van-col>
    </van-row>

    <van-row>
      <van-col span="6" style="margin-top: 20px;">用户名:</van-col>
      <van-col span="15">
        <el-input placeholder="请输用户名" v-model="loginForm.username" clearable></el-input>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="6" style="margin-top: 20px;">密&#8197;码:</van-col>
      <van-col span="15">
        <el-input placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
      </van-col>
    </van-row>

    <el-checkbox v-model="checked">记住密码</el-checkbox>

    <van-cell>
      <van-button type="default" @click="login">登入</van-button>
    </van-cell>
  </div>
</template>

<script>
import Vue from "vue";
import { Grid } from "vant";
import { Field } from "vant";
import { Cell, CellGroup } from "vant";
import { Icon } from "vant";
import { Image } from "vant";
import { PasswordInput, NumberKeyboard } from "vant";
import { Toast } from "vant";
import { mapMutations } from "vuex";
import { Row, Col } from "vant";

Vue.use(Row).use(Col);
Vue.use(Toast);
Vue.use(PasswordInput).use(NumberKeyboard);
Vue.use(Image);
Vue.use(Icon);
Vue.use(Cell).use(CellGroup);
Vue.use(Grid);
Vue.use(Field);
export default {
  name: "app",
  data() {
    return {
      IsTenantId: false,
      checked: true,
      tenantId: "",
      loginForm: {
        username: "admin",
        password: "123qwe"
      },
      showKeyboard: true,
      count: 0,
      meg: "",
      options: [],
      value: [],
      list: [],
      loading: false,
      states: []
    };
  },
  mounted() {
    this.$store.state.tenantId = "";
    this.$store.state.iscolor = true;
    this.$store.state.GetdeviceSn = -1;
    this.$store.state.deviceSn = "";
    this.getCookie();
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    login() {
      localStorage.setItem("Authorization", null);
      let _this = this;
      if (this.loginForm.username == "" || this.loginForm.password == "") {
        return;
      }

      if (this.value == "") {
        Toast.fail("公司名称不能为空");
        return;
      }

      // this.selectQuert(this.value);
      if (this.$store.state.tenantId == "") {
        return;
      }

      let postdata = {
        userNameOrEmailAddress: this.loginForm.username,
        password: this.loginForm.password
      };
      this.meg = "正在登入";
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: this.meg
      });
      this.axios
        .post("/api/TokenAuth/Authenticate", postdata)
        .then(result => {
          if (result.data.error == null) {
            if (this.checked == true) {
              this.setCookie(
                this.loginForm.username,
                this.loginForm.password,
                this.value
              );
            }
            this.meg = "登入成功";
            this.$store.state.GetdeviceSn = 0;
            this.$store.state.iscolor = false;
            _this.userToken = "Bearer " + result.data.result.accessToken;
            _this.changeLogin({ Authorization: _this.userToken });
            this.$store.state.refreshToken = result.data.result.accessToken;
            this.$router.push("/index");
            toast.message = "正在加载数据";
            setTimeout(() => {
              toast.clear();
            }, 1000);
          } else {
            toast.message = result.data.error.details;
            setTimeout(() => {
              toast.clear();
            }, 1000);
          }
        })
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          setTimeout(() => {
            localStorage.setItem("Authorization", "null");
            if (this.count < 5) {
              this.count++;
              this.meg = "重试.." + this.count;
              setTimeout(() => {
                this.login();
              }, 1000);
            } else {
              setTimeout(() => {
                toast.clear();
              }, 1000);
              this.count = 0;
            }
          }, 2000);
        });
    },
    setCookie(c_name, c_pwd, c_tenantId) {
      if (typeof Storage !== "undefined") {
        // window.console.log("支持web存储");

        // window.console.log("记住密码");
        let userinfo = null;
        if (c_tenantId != "") {
          userinfo = {
            username: c_name,
            password: c_pwd,
            checked: true,
            tenantId: c_tenantId
          };
        } else {
          userinfo = { username: c_name, password: c_pwd, checked: true };
        }
        //let userinfo = { username: c_name, password: c_pwd, checked: true,tenantId:c_tenantId};
        localStorage.setItem("userinfo", JSON.stringify(userinfo));
        window.console.log(localStorage.getItem("userinfo"));
      } else {
        window.console.log(" 抱歉! 不支持 web 存储。");
      }
    },
    //读取cookie
    getCookie() {
      let userinfo = localStorage.getItem("userinfo");
      if (userinfo) {
        userinfo = JSON.parse(localStorage.getItem("userinfo"));
        window.console.log(userinfo);
        // window.console.log(":"+this.$store.state.tenantId)
        this.loginForm.username = userinfo.username;
        this.loginForm.password = userinfo.password;
        this.checked = true;
        this.value = userinfo.tenantId;
        if (this.value != null) {
          this.selectQuert(this.value);
        }
      }
    },
    remoteMethod(query) {
      var url = "/api/services/app/Tenant/GetTenants?Filter=";
      url = url + query;
      if (query !== "") {
        //window.console.log(url)
        this.axios.get(url).then(result => {
           window.console.log(result)
          if(result==null) {return;}
          this.states = [];
          for (let i = 0; i < result.data.result.items.length; i++) {
            this.states.push({ value:result.data.result.items[i].tenancyName,label:result.data.result.items[i].name});
          }
         
          this.list = [];
          this.list = this.states.map(item => {
            return { value: `${item.value}`, label: `${item.label}` };
          });
           window.console.log(this.list)
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.list.filter(item => {
              return item.value.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        });
      } else {
        this.options = [];
        this.list = [];
      }
    },
    selectQuert(query) {
      window.console.log(query);

      let postdata = {
        tenancyName: query
      };
      this.axios
        .post("/api/services/app/Account/IsTenantAvailable", postdata)
        .then(result => {
          window.console.log(result.data.result.tenantId);
          this.$store.state.tenantId = result.data.result.tenantId;
        })
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
         
          setTimeout(() => {
            this.$store.state.tenantId = "";
            if (this.count < 5) {
              this.count++;

              setTimeout(() => {
                this.selectQuert(this.value);
              }, 1000);
            } else {
              setTimeout(() => {
                Toast.fail("公司不存在");
              }, 1000);
              this.count = 0;
            }
          }, 2000);
        });
    }
  }
};
</script>

<style scoped>
#loagin {
  font-size: 14px;
  text-align: right;
}
.van-button {
  width: 100px;
  font-size: 18px;
}
.login_content {
  margin-top: 20px;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 95%;
  margin-left: 2.5%;
  margin-top: 40%;
}

.box-cards {
  width: 50%;
  margin-top: -30%;
  margin-left: 20%;
}

.van-image {
  width: 100%;
}
.el-select {
  width: 100%;
  margin-top: 10px;
}
.el-input {
  width: 100%;
  margin-top: 10px;
}
.van-button {
  text-align: center;
  margin-left: 35%;
}
.el-checkbox {
  float: left;
  margin-top: 10px;
  margin-left: 10px;
}
.login_top {
  margin-top: 100px;
}
</style>