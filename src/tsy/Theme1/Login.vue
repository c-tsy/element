<template>
  <!-- 账号/密码/验证码 -->
  <div class="Model_Container">
    <div class="Model_Body_Container">
      <h3>
        账户登录
      </h3>
      <el-form
        :model="FormData"
        ref="FormData"
        label-width="40px"
        hide-required-asterisk
        label-position="left"
        size="small"
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
            type="password"
            placeholder="请输入密码"
            v-model="FormData.PWD"
          ></el-input>
        </el-form-item>
        <slot name="item"> </slot>

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
          <img :src="svg.qq">
          <img :src="svg.wechat">
        </div>
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
        this.$message.success("登录成功", rs);
        this.$emit("success", rs);
      } catch (error) {
        this.$message.error(error.message);
        this.$emit("error", error);
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