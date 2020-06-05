<template>
  <el-dialog :visible.sync="show">
    <el-form
      :model="Register"
      ref="form"
      label-width="120px"
      size="small"
      :rules="Rules"
      id="RegisterContainer"
    >
      <!-- 头像 上传  根据传入的参数进行头像是否需要上传 -->
      <el-form-item
        label="头像"
        prop="Name"
      >
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar"
          >
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
          ></i>
        </el-upload>
      </el-form-item>

      <el-row>
        <el-col :span="8">
          <el-form-item
            label="姓名"
            prop="Name"
          >
            <el-input v-model="Register.Name"></el-input>
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
      <el-row>
        <el-col :span="8">
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
            label="手机号码"
            prop="Phone"
          >
            <el-input v-model="Register.Phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="验证码"
            prop="PhoneCode"
          >
            <el-input v-model="Register.PhoneCode"></el-input>

          </el-form-item>
        </el-col>
        <el-col :span="8">
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

      <el-row>
        <el-col :span="8">
          <el-form-item
            label="邮箱"
            prop="Email"
          >
            <el-input v-model="Register.Email"></el-input>

          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="验证码"
            prop="Code"
          >
            <el-input v-model="Register.EmailCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
            <el-input v-model="Register.PWD"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item
            label="确认密码"
            prop="RPWD"
          >
            <el-input v-model="Register.RPWD"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button
          type="primary"
          @click="SubmitRegister"
        >注册</el-button>
        <el-button>返回</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";

@Component({})
export default class UserRister extends Vue {
  @Prop({ default: true })
  value?: boolean;
  @Prop({ default: true }) //是否需要显示头像
  IsHead?: boolean;

  imageUrl: string = "";

  Register: object = {
    Head: "",
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

  handleAvatarSuccess(res, file) {
    this.imageUrl = URL.createObjectURL(file.raw);
  }

  beforeAvatarUpload(file) {
    const isJPG = file.type === "image/jpeg";
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
      this.$message.error("上传头像图片只能是 JPG 格式!");
    }
    if (!isLt2M) {
      this.$message.error("上传头像图片大小不能超过 2MB!");
    }
    return isJPG && isLt2M;
  }

  Rules: object = {
    //表单验证规则
    Name: [
      {
        validator: (r, v, cb) => {
          const reg = /^[\u4E00-\u9FA5]{2,4}$/;
        },
        trigger: "blur"
      }
    ],
    NickName: [
      {
        validator: (r, v, cb) => {
          let reg = /[\u4e00-\u9fa5]*[a-z]*[A-Z]*\\d*-*_*\\s*/;
        },
        trigger: "blur"
      }
    ],
    Account: [
      {
        validator: (r, v, cb) => {
          const reg = /^[A-Za-z0-9]{4,15}$/;
        },
        trigger: "blur"
      }
    ],
    Phone: [
      {
        validator: (rule, val, cb) => {
          const reg = /^[+86]{0,}1\d{10}$/;
          if (!reg.test(val)) {
            cb(new Error("手机号码错误"));
          }
        },
        trigger: "blur"
      }
    ],
    PhoneCode: [
      {
        validator: (r, v, cb) => {
          if (v == "") {
            cb(new Error());
          }
        },
        trigger: "blur"
      }
    ],
    Email: [
      {
        validator: (r, v, cb) => {},
        trigger: "blur"
      }
    ],
    EmailCode: [
      {
        validator: (r, v, cb) => {},
        trigger: "blur"
      }
    ],
    PWD: [
      {
        validator: (r, v, cb) => {
          const reg = /^(?![A-Za-z]+$)(?!\\d+$)(?![\\W_]+$)\\S{6,12}$/;
        },
        trigger: "blur"
      }
    ],
    RPWD: [
      {
        validator: (r, v, cb) => {
          const reg = /^(?![A-Za-z]+$)(?!\\d+$)(?![\\W_]+$)\\S{6,12}$/;
        },
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
  SubmitRegister() {}

  get show() {
    return !!this.value;
  }
  set show(v: boolean) {
    this.$emit("input", v);
  }
}
</script>

<style lang="less" scoped>
#RegisterContainer {
  /deep/.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader,
  .el-upload:hover {
    border-color: #409eff;
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