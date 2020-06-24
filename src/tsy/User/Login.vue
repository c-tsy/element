<template>
  <!-- 账号/密码/验证码 -->
  <div>
    <div class="Model_Header_Container">
      <h3>
        登陆
      </h3>
    </div>
    <el-form
      :model="FormData"
      ref="FormData"
      label-width="40px"
      hide-required-asterisk
      label-position="left"
      :rules="Rules"
    >
      <el-form-item
        prop="Account"
        class="Ctsy_Form_item"
        label="账号"
      >
        <el-input
          size="small"
          v-model="FormData.Account"
          placeholder="请输入账号"
        ></el-input>

      </el-form-item>
      <el-form-item
        label="密码"
        prop="PWD"
        class="Ctsy_Form_item"
      >
        <el-input
          :size="Size"
          type="password"
          placeholder="请输入密码"
          v-model="FormData.PWD"
        ></el-input>
      </el-form-item>

      <!-- <el-row>
      <el-col :span="12">
        <el-form-item
          label="账号"
          prop="Account"
        >
          <el-input
            :size="Size"
            v-model="FormData.Account"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row> -->

      <!-- <el-row>
        <el-col :span="8">
          <el-form-item
            label="手机号码"
            prop="Phone"
          >
            <el-input
              :size="Size"
              v-model="FormData.Phone"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="验证码"
            prop="PhoneCode"
          >
            <el-input
              :size="Size"
              v-model="FormData.PhoneCode"
            ></el-input>

          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button
            type="success"
            :size="Size"
            key="Phone"
            style="margin-left:10px"
            @click="GetCode('Phone')"
          >
            获取验证码
          </el-button>
        </el-col>
      </el-row> -->

      <!-- <el-row>
        <el-col :span="8">
          <el-form-item
            label="邮箱"
            prop="Email"
          >
            <el-input
              v-model="FormData.Email"
              :size="Size"
            ></el-input>

          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="验证码"
            prop="EmailCode"
          >
            <el-input
              v-model="FormData.EmailCode"
              :size="Size"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button
            type="success"
            size="small"
            key="Email"
            style="margin-left:10px"
            @click="GetCode('Email')"
          >
            获取验证码
          </el-button>
        </el-col>

      </el-row> -->

      <!-- <el-row>
      <el-col :span="8">
        <el-form-item
          label="密码"
          prop="PWD"
        >
          <el-input
            :size="Size"
            type="password"
            v-model="FormData.PWD"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row> -->

    </el-form>
    <div class="Ctsy_Button_Container">
      <el-button
        type="primary"
        @click="Login('FormData')"
        size="medium"
      >登录</el-button>
      <div class="Ctsy_login_r-f">
        <span>

          <span
            class="Ctsy_router_default"
            @click="$emit('CName','Forget')"
          >
            忘记密码
          </span>

        </span>
        <span>
          <span
            class="Ctsy_router_default"
            @click="$emit('CName','Register')"
          >
            注册
          </span>
        </span>
      </div>
    </div>
    <div class="Ctsy_tp_container">
      <h6>第三方账号登录</h6>
      <div class="Ctsy_tp_icon_container">
        <img
          :src="svg.qq"
          alt=""
        >
        <img
          :src="svg.wechat"
          alt=""
        >

      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import ElementFormRules from "../../lib/ElementFormRules/index";
import User from "@ctsy/api-sdk/dist/modules/User";
const ERules = ElementFormRules.defalultRules;
@Component({})
export default class Login extends Vue {
  svg: { [index: string]: any } = {
    qq: require("../../svg/qq.svg"),
    wechat: require("../../svg/wechat.svg")
  };
  FormData: User.Login = new User.Login();

  @Prop({ default: "small" })
  Size?: string;

  /**
   * 登录
   */
  async Login(FromName: any) {
    let refs: any = this.$refs[FromName];
    refs.validate(async (valid: any) => {
      if (!valid) {
        this.$message.error("请完善登录信息");
        return false;
      }
      try {
        let rs = await this.$store.dispatch("get_user_login", this.FormData);
        this.$message.success("登录成功");
        this.$emit("success", rs);
      } catch (e) {
        this.$message.error(e.message);
        this.$emit("error", "error");
      }
    });
  }

  /**
   * 取消
   */
  Cancel() {
    this.$emit("cancel", false);
  }
  /**
   *
   * 表单验证规则
   */
  Rules: object = {
    Account: ERules.Account,
    PWD: ERules.PWD
  };
}
</script>

<style lang="less" scoped>
.Ctsy_Button_Container {
  padding: 10px 0;
  .Ctsy_login_r-f {
    margin: 10px 0;
    display: flex;
    span {
      flex: 1;

      &:nth-child(1) {
        text-align: left;
      }
      &:nth-child(2) {
        text-align: right;
      }
    }
    .Ctsy_router_default {
      outline: none;
      color: #737373;
      font-size: 12px;
      cursor: pointer;
      text-decoration: none;
    }
  }
}
.Ctsy_tp_container {
  h6 {
    margin: 0;
    padding: 10px 0;
    font-size: 14px;
    font-weight: normal;
    color: #737373;
    letter-spacing: 1px;
    text-indent: 1px;
    text-align: center;
  }
  .Ctsy_tp_icon_container {
    text-align: center;
    img {
      width: 30px;
      height: 30px;
      cursor: pointer;
      margin: 5px;
    }
  }
}
</style>