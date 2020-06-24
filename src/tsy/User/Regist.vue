<template>
  <div>

    <div class="Model_Header_Container">
      <h3>
        <i
          class="el-icon-arrow-left"
          @click="$emit('CName','Login')"
        ></i>
        注册
      </h3>
    </div>
    <slot>
      <el-form
        :model="Register"
        ref="Register"
        label-width="auto"
        hide-required-asterisk
        label-position="left"
        :rules="Rules"
      >
        <!-- 头像 上传  根据传入的参数进行头像是否需要上传 -->
        <div class="Ctsy_uploader_avatar_container">
          <img
            :src="URL"
            class="avatar-uploader  avatar"
            @click="chooseImg"
            alt="头像上传"
          >
        </div>

        <!-- <slot name='avatar'>
          <el-form-item label="头像">
           
          </el-form-item>
        </slot> -->

        <el-form-item
          label="姓名"
          prop="Name"
          class="Ctsy_Form_item"
        >
          <el-input
            :size="Size"
            v-model="Register.Name"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="昵称"
          prop="NickName"
          class="Ctsy_Form_item"
        >
          <el-input
            :size="Size"
            v-model="Register.NickName"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="账号"
          prop="Account"
          class="Ctsy_Form_item"
        >
          <el-input
            :size="Size"
            v-model="Register.Account"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="手机号码"
          prop="Phone"
          class="Ctsy_Form_item"
        >
          <el-input
            :size="Size"
            v-model="Register.Phone"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="短信验证码"
          prop="MessageCode"
          class="Ctsy_Form_item"
        >
          <span class="Ctsy_Form_item_button">
            <el-input
              :size="Size"
              v-model="Register.PhoneCode"
            ></el-input>
            <CButton :Time="0"></CButton>
          </span>

        </el-form-item>

        <el-form-item
          label="邮箱"
          prop="Email"
          class="Ctsy_Form_item"
        >
          <el-input
            :size="Size"
            v-model="Register.Email"
          ></el-input>

        </el-form-item>

        <el-form-item
          label="邮箱验证码"
          prop="EmailCode"
          class="Ctsy_Form_item"
        >
          <span class="Ctsy_Form_item_button">
            <el-input
              :size="Size"
              v-model="Register.EmailCode"
            ></el-input>
            <CButton :Time="20"></CButton>
          </span>

        </el-form-item>

        <el-form-item
          label="密码"
          prop="PWD"
          class="Ctsy_Form_item"
        >
          <el-input
            type="password"
            :size="Size"
            v-model="Register.PWD"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="确认密码"
          prop="RPWD"
          class="Ctsy_Form_item"
        >
          <el-input
            type="password"
            :size="Size"
            v-model="Register.RPWD"
          ></el-input>
        </el-form-item>

        <el-button
          type="primary"
          size="medium"
          @click="SubmitRegister('Register')"
        >注册</el-button>
      </el-form>

    </slot>

  </div>

</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";

import Upload from "@ctsy/api-sdk/dist/modules/Upload";
import CustomValidate from "../../lib/Reg/regFun";
import ElementFormRules from "../../lib/ElementFormRules/index";
const ERules = ElementFormRules.defalultRules;
import CButton from "../Base/TimeOutButton.vue";

import User from "@ctsy/vuex/dist/modules/User";

@Component({
  components: {
    CButton
  }
})
export default class UserRister extends Vue {
  /**
   * 输入框大小
   */
  @Prop({ default: "small" })
  Size?: string;

  /**
   *  Avatar
   *  IsPhone
   * IsEmail
   *
   */
  @Prop({
    default: () => ({
      Avatar: false,
      IsPhone: true,
      IsEmail: false
    })
  }) //是否需要显示
  registerProps?: { [index: string]: boolean };

  imageUrl: string = "";

  Register: { [index: string]: any } = {
    Avatar: "",
    Name: "",
    NickName: "",
    Account: "",
    Phone: "",
    PhoneCode: "",
    Email: "",
    EmailCode: "",
    PWD: "",
    RPWD: "",
    Contacts: [], //联系人信息列表
    Sex: "",
    PUID: ""
  };

  /**
   * 对输入的重复密码进行监听
   */
  @Watch("Register.PWD")
  pwd(n: string, o: string) {
    CustomValidate.EnterRPWD.val = n;
  }

  Rules = ERules;

  /**
   * 获取短信验证码
   */
  GetCode(v: string) {}

  /**
   *
   * 提交注册
   */
  SubmitRegister(FormName: string) {
    let refs: any = this.$refs[FormName];
    refs.validate(async (valid: any) => {
      if (!valid) {
        this.$message.error("请完善表单信息");
        return false;
      }

      try {
        if (this.URL.startsWith("data:") && this.File) {
          let { URL } = await Upload.upload_file(this.File, {
            what: "head-img"
          });

          this.Register.Avatar = URL;
        } else {
          this.Register.Avatar = "";
        }

        let rs = await this.$store.dispatch("get_user_register", this.Register);
        this.$message.success("注册成功");
        this.$emit("success");
      } catch (error) {
        this.$emit("error");

        this.$message.error(error.message);
      }
    });
  }

  URL: string = require("../../svg/head.svg");
  File?: File;

  async chooseImg() {
    // if(this.File)
    let files = await Upload.select_file("image/*");
    if (files.length > 0) {
      this.File = files[0];
      this.URL = await Upload.local_img_preview(this.File);
    }
  }
  /**
   * 取消
   */
  Cancel() {
    this.$emit("cancel", false);
  }
}
</script>

<style lang="less" scoped>
.Ctsy_uploader_avatar_container {
  text-align: center;
  .avatar-uploader {
    cursor: pointer;
    width: 60px;
  }
}
</style>