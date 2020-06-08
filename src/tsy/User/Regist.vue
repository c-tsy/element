<template>
  <el-dialog :visible.sync="show">
    <el-form
      :model="Register"
      ref="Register"
      label-width="120px"
      size="small"
      :rules="Rules"
      id="RegisterContainer"
    >
      <!-- 头像 上传  根据传入的参数进行头像是否需要上传 -->
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

      <el-row>
        <el-col :span="12">
          <el-form-item
            label="姓名"
            prop="Name"
          >
            <el-input v-model="Register.Name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="昵称"
            prop="NickName"
          >
            <el-input v-model="Register.NickName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item
            label="账号"
            prop="Account"
          >
            <el-input v-model="Register.Account"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row v-if="registerProps.IsPhone">
        <el-col :span="8">
          <el-form-item
            label="手机号码"
            prop="Phone"
          >
            <el-input v-model="Register.Phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="验证码"
            prop="PhoneCode"
          >
            <el-input v-model="Register.PhoneCode"></el-input>

          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button
            type="success"
            size="small"
            key="Phone"
            style="margin-left:10px"
            @click="GetCode('Phone')"
          >
            获取验证码
          </el-button>
        </el-col>
      </el-row>

      <el-row v-if="registerProps.IsEmail">
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
            label="验证码"
            prop="EmailCode"
          >
            <el-input v-model="Register.EmailCode"></el-input>
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

      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item
            label="密码"
            prop="PWD"
          >
            <el-input
              type="password"
              v-model="Register.PWD"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item
            label="确认密码"
            prop="RPWD"
          >
            <el-input
              type="password"
              v-model="Register.RPWD"
            ></el-input>
          </el-form-item>
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

  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";

import Regs from "@/lib/Reg/index";
import Upload from "@ctsy/api-sdk/dist/modules/Upload";
import CustomValidate from "@/lib/Reg/regFun";

// CustomValidate.Reg.name = /^\d{4}$/;

@Component({})
export default class UserRister extends Vue {
  @Prop({ default: true })
  visible?: boolean;

  /**
   *  Avatar
   *  IsPhone
   * IsEmail
   *
   */
  @Prop({ default: () => {} }) //是否需要显示
  registerProps?: { [index: string]: any };

  /**
   *
   * account
   * name
   * nick
   * phone
   * email
   * emailcode
   * pwd
   *
   */
  @Prop({ default: () => {} })
  Reg?: { [index: string]: any };

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
    RPWD: ""
  };

  /**
   * 对输入的密码进行监听
   */
  @Watch("Register.PWD")
  pwd(n: string, o: string) {
    CustomValidate.enterPwd.val = n;
  }

  Rules: object = {
    //表单验证规则
    Name: [
      {
        required: true,
        message: "姓名不能为空"
      },
      {
        validator: CustomValidate.Name_fun,
        trigger: "blur"
      }
    ],
    NickName: [
      {
        required: true,
        message: "昵称不能为空"
      },
      {
        validator: CustomValidate.Nick_fun,
        trigger: "blur"
      }
    ],
    Account: [
      {
        required: true,
        message: "账号不能为空"
      },
      {
        validator: CustomValidate.Account_fun,
        trigger: "blur"
      }
    ],
    Phone: [
      {
        required: true,
        message: "电话号码不能为空"
      },
      {
        validator: CustomValidate.Phone_fun,
        trigger: "blur"
      }
    ],
    PhoneCode: [
      {
        required: true,
        message: "短信验证码不能为空"
      },
      {
        validator: CustomValidate.Message_fun,
        trigger: "blur"
      }
    ],
    Email: [
      {
        required: true,
        message: "邮箱不能为空"
      },
      {
        validator: CustomValidate.Email_fun,
        trigger: "blur"
      }
    ],
    EmailCode: [
      {
        required: true,
        message: "邮箱验证码不能为空"
      },
      {
        validator: CustomValidate.EmailCode_fun,
        trigger: "blur"
      }
    ],
    PWD: [
      {
        required: true,
        message: "密码不能为空"
      },
      {
        validator: CustomValidate.PWD_fun,
        trigger: "blur"
      }
    ],
    RPWD: [
      {
        required: true,
        message: "重复密码不能为空"
      },
      {
        validator: CustomValidate.PWD_fun,
        trigger: "blur"
      }
    ]
  };

  /**
   * 获取短信验证码
   */
  GetCode() {}

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

  get show() {
    return !!this.visible;
  }
  set show(v: boolean) {
    this.$emit("input", v);
  }
}
</script>

<style lang="less" scoped>
#RegisterContainer {
  .avatar-uploader,
  .el-upload:hover {
    border-color: #409eff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 154px;
    height: 154px;
    line-height: 154px;
    text-align: center;
  }
  .avatar {
    width: 154px;
    height: 154px;
    display: block;
  }
}
</style>