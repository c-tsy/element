<template>
  <div>

    <slot>
      <el-form
        :model="Register"
        ref="Register"
        label-width="120px"
        size="small"
        :rules="Rules"
      >
        <!-- 头像 上传  根据传入的参数进行头像是否需要上传 -->
        <slot name='avatar'>
    <el-form-item
          label="头像"
          v-if="registerProps['Avatar']"
        >

          <img
            :src="URL"
            class="avatar-uploader  avatar"
            @click="chooseImg"
          >
        </el-form-item>
        </slot>
    

        <el-row>
          <el-col :span="12">
            <slot name="Name">
              <el-form-item
                label="姓名"
                prop="Name"
              >
                <el-input v-model="Register.Name"></el-input>
              </el-form-item>
            </slot>

          </el-col>
          <el-col :span="12">
            <slot name="NickName">
              <el-form-item
                label="昵称"
                prop="NickName"
              >
                <el-input v-model="Register.NickName"></el-input>
              </el-form-item>
            </slot>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <slot name="Account">
              <el-form-item
                label="账号"
                prop="Account"
              >
                <el-input v-model="Register.Account"></el-input>
              </el-form-item>
            </slot>
          </el-col>

        </el-row>
        <el-row v-if="registerProps.IsPhone">

          <slot name="Phone">
            <el-col :span="8">
              <el-form-item
                label="手机号码"
                prop="Phone"
              >
                <el-input
                  :size="Size"
                  v-model="Register.Phone"
                ></el-input>
              </el-form-item>

            </el-col>
            <el-col :span="6">

              <el-form-item
                label="短信验证码"
                prop="MessageCode"
              >
                <el-input
                  :size="Size"
                  v-model="Register.PhoneCode"
                ></el-input>

              </el-form-item>

            </el-col>
            <el-col :span="4">
              <CButton :Time="0"></CButton>
            </el-col>
          </slot>
        </el-row>

        <el-row v-if="registerProps.IsEmail">
          <slot name="Email">
            <el-col :span="8">
              <el-form-item
                label="邮箱"
                prop="Email"
              >
                <el-input v-model="Register.Email"></el-input>

              </el-form-item>

            </el-col>
            <el-col :span="6">
              <el-form-item
                label="邮箱验证码"
                prop="EmailCode"
              >
                <el-input v-model="Register.EmailCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <CButton :Time="20"></CButton>
            </el-col>

          </slot>
        </el-row>

        <el-row>
          <el-col :span="8">
            <slot name="PWD">
              <el-form-item
                label="密码"
                prop="PWD"
              >
                <el-input
                  type="password"
                  v-model="Register.PWD"
                ></el-input>
              </el-form-item>
            </slot>

          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <slot name="RPWD">
              <el-form-item
                label="确认密码"
                prop="RPWD"
              >
                <el-input
                  type="password"
                  v-model="Register.RPWD"
                ></el-input>
              </el-form-item>
            </slot>

          </el-col>
        </el-row>

        <el-form-item>
          <slot name="button">
            <el-button
              type="primary"
              @click="SubmitRegister('Register')"
            >注册</el-button>
            <el-button @click="visible =false">返回</el-button>
          </slot>

        </el-form-item>

      </el-form>
    </slot>

  </div>

</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";

import Upload from "@ctsy/api-sdk/dist/modules/Upload";
import CustomValidate from "@/lib/Reg/regFun";
import ElementFormRules from "@/lib/ElementFormRules/index";
const ERules = ElementFormRules.defalultRules;

import CButton from "../Base/TimeOutButton.vue";

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
   * 获取短信验证码之后的倒计时
   */
  @Prop({ default: "" })
  CodeTimeOut?: number;

  defalultCodeTimeOut: number = 5;

  MessageText: string = "获取短信验证码";
  EmailText: string = "获取邮箱验证码";

  isDisabled: string = "";

  /**
   *  Avatar
   *  IsPhone
   * IsEmail
   *
   */
  @Prop({ default: () => {} }) //是否需要显示
  registerProps!: { [index: string]: any };

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
  async SubmitRegister(FormName: string) {
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
      } catch (error) {
        this.$message.error(error.message);
      }
    });
  }

  URL: string = require("@/assets/add.png");
  File?: File;

  async chooseImg() {
    // if(this.File)
    let files = await Upload.select_file("image/*");
    if (files.length > 0) {
      this.File = files[0];
      this.URL = await Upload.local_img_preview(this.File);
    }
  }
}
</script>

<style lang="less" scoped>
</style>