<template>
  <!-- <el-dialog :visible.sync="show"> -->
  <!-- 账号/密码/验证码 -->

  <el-form :model="FormData" ref="FormData" label-width="80px" :rules="Rules">
    <el-row>
      <el-col :span="12">
        <el-form-item label="账号" prop="Account">
          <el-input :size="Size" v-model="FormData.Account"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12"></el-col>
    </el-row>

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
    </el-row>-->

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

    </el-row>-->

    <el-row>
      <el-col :span="8">
        <el-form-item label="密码" prop="PWD">
          <el-input :size="Size" type="password" v-model="FormData.PWD"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item>
      <el-button type="primary" @click="Login('FormData')" :size="Size">登录</el-button>
      <el-button :size="Size" @click="Cancel">取消</el-button>
    </el-form-item>
  </el-form>

  <!-- </el-dialog> -->
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import ElementFormRules from "../../lib/ElementFormRules/index";

const ERules = ElementFormRules.defalultRules;

@Component({})
export default class Login extends Vue {
  FormData: { [index: string]: any } = {
    Account: "",
    // Phone: "",
    // PhoneCode: "",
    // Email: "",
    // EmailCode: "",
    PWD: ""
  };
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
</style>