<template>
  <div>
    <div class="Ctsy_theme2_block_right_box-body">
      <slot>
        <el-form
          :model="FormData"
          ref="FormData"
          hide-required-asterisk
          size="small"
          :rules="Rules"
        >
          <div class="Ctsy_uploader_avatar_container">
            <img :src="URL" class="avatar-uploader avatar" @click="chooseImg" alt="头像上传" />
          </div>
          <el-form-item prop="Name" class="Ctsy_Form_item">
            <el-input v-model="FormData.Name" placeholder="请输入姓名"></el-input>
          </el-form-item>

          <el-form-item prop="NickName" class="Ctsy_Form_item">
            <el-input v-model="FormData.NickName" placeholder="请输入昵称"></el-input>
          </el-form-item>

          <el-form-item prop="Account" class="Ctsy_Form_item">
            <el-input v-model="FormData.Account" placeholder="请输入账号"></el-input>
          </el-form-item>

          <el-form-item prop="Phone" class="Ctsy_Form_item">
            <el-input v-model="FormData.Phone" placeholder="请输入手机号码"></el-input>
          </el-form-item>

          <el-form-item prop="MessageCode" class="Ctsy_Form_item">
            <span class="Ctsy_theme2_item_button">
              <el-input v-model="FormData.PhoneCode" placeholder="请输入短信验证码"></el-input>
              <CButton :Time="Time" class="Ctsy_theme2_CButton"></CButton>
            </span>
          </el-form-item>

          <el-form-item prop="Email" class="Ctsy_Form_item">
            <el-input v-model="FormData.Email" placeholder="请输入邮箱"></el-input>
          </el-form-item>

          <el-form-item prop="EmailCode" class="Ctsy_Form_item">
            <span class="Ctsy_theme2_item_button">
              <el-input v-model="FormData.EmailCode" placeholder="请输入邮箱验证码"></el-input>
              <CButton :Time="Time" class="Ctsy_theme2_CButton"></CButton>
            </span>
          </el-form-item>

          <el-form-item prop="PWD" class="Ctsy_Form_item">
            <el-input type="password" v-model="FormData.PWD" placeholder="请输入密码"></el-input>
          </el-form-item>

          <el-form-item prop="RPWD" class="Ctsy_Form_item">
            <el-input type="password" v-model="FormData.RPWD" placeholder="请输入确认密码"></el-input>
          </el-form-item>
        </el-form>
      </slot>
    </div>
    <div class="Ctsy_theme2_block_right_box-bottom">
      <button class="Ctsy_theme2_button" @click="SubmitRegister('FormData')">注册</button>
    </div>
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
  @Prop({ default: require("../../assets/bg1.png") })
  url?: string;

  @Prop({ default: 30 })
  Time?: number;

  imageUrl: string = "";

  FormData: { [index: string]: any } = {
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
  @Watch("FormData.PWD")
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

          this.FormData.Avatar = URL;
        } else {
          this.FormData.Avatar = "";
        }

        let rs = await this.$store.dispatch("get_user_register", this.FormData);
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
@import "../../common/theme2.less";
.Ctsy_uploader_avatar_container {
  text-align: center;
  .avatar-uploader {
    cursor: pointer;
    width: 60px;
  }
}
</style>