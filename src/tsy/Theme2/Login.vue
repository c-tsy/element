<template>
  <div>
    <div class="Ctsy_theme2_block_right_box-body">
      <el-form
        :model="FormData"
        ref="FormData"
        label-width="auto"
        hide-required-asterisk
        :rules="Rules"
        size="small"
      >
        <el-form-item prop="Account">
          <el-input
            v-model="FormData.Account"
            placeholder="请输入账号"
          ></el-input>

        </el-form-item>
        <el-form-item prop="PWD">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="FormData.PWD"
          ></el-input>
        </el-form-item>
        <slot name="item"></slot>
      </el-form>
    </div>
    <div class="Ctsy_theme2_block_right_box-bottom">
      <button
        class="Ctsy_theme2_button"
        @click="Login('FormData')"
      >登录</button>
      <div class="Ctsy_theme2_tp">
        <h6>第三方账号登录</h6>
        <div class="Ctsy_theme2_tp_icon_container">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import ElementFormRules from "../../lib/ElementFormRules/index";
import User from "@ctsy/api-sdk/dist/modules/User";
const ERules = ElementFormRules.defalultRules;
@Component
export default class Login extends Vue {
  svg: { [index: string]: any } = {
    qq: require("../../svg/qq.svg"),
    wechat: require("../../svg/wechat.svg")
  };
  FormData: User.Login = new User.Login();

  @Prop({ default: "" })
  router: string = "";

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
        if (this.router != "") {
          this.$router.push({
            path: "/" + this.router
          });
        }
        this.$emit("success", rs);
      } catch (error) {
        this.$message.error(error.message);
        this.$emit("error", error);
      }
    });
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

<style lang="scss" scoped >
</style>