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
      <!-- <el-form-item label="头像">
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
      </el-form-item> -->

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
            prop="EmailCode"
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
        <el-button
          type="primary"
          @click="SubmitRegister('Register')"
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

  /**
   *
   * account
   * name
   * nick
   * phone
   * email
   * pwd
   *
   */
  @Prop({ default: () => {} })
  Reg?: { [index: string]: any };

  imageUrl: string = "";

  Register: { [index: string]: any } = {
    Head: "",
    Name: "张三",
    NickName: "张三",
    Account: "1512346412",
    Phone: "18148404472",
    PhoneCode: "1234",
    Email: "4721138@qqq.com",
    EmailCode: "1234",
    PWD: "asd1324",
    RPWD: "asd1324"
  };

  handleAvatarSuccess(res: any, file: any) {
    this.imageUrl = URL.createObjectURL(file.raw);
  }

  beforeAvatarUpload(file: any) {
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
        required: true,
        message: "姓名不能为空"
      },
      {
        validator: (r: any, v: string, cb: Function) => {
          const reg = this.Reg?.name || /^[\u4E00-\u9FA5]{2,4}$/;
          if (!reg.test(v)) {
            cb(new Error("不合法的输入"));
            return false;
          }
          cb();
        },
        trigger: "blur"
      }
    ],
    NickName: [
      {
        required: true,
        message: "昵称不能为空"
      },
      {
        validator: (r: any, v: string, cb: Function) => {
          const reg = this.Reg?.nick || /^[\u4E00-\u9FA5]{2,4}$/;
          if (!reg.test(v)) {
            cb(new Error("昵称"));
            return false;
          }
          cb();
        },
        trigger: "blur"
      }
    ],
    Account: [
      {
        required: true,
        message: "账号不能为空"
      },
      {
        validator: (r: any, v: string, cb: Function) => {
          const reg = this.Reg?.account || /^[A-Za-z0-9]{4,15}$/;
          if (!reg.test(v)) {
            cb(new Error("账号错误"));
            return false;
          }
          cb();
        },
        trigger: "blur"
      }
    ],
    Phone: [
      {
        required: true,
        message: "电话号码不能为空"
      },
      {
        validator: (rule: any, val: string, cb: Function) => {
          const reg = this.Reg?.phone || /^[+86]{0,}1\d{10}$/;
          if (!reg.test(val)) {
            cb(new Error("手机号码错误"));
            return false;
          }
          cb();
        },
        trigger: "blur"
      }
    ],
    PhoneCode: [
      {
        required: true,
        message: "短信验证码不能为空"
      },
      {
        validator: (r: any, v: string, cb: Function) => {
          let reg = this.Reg?.phoneCode || /^\d{4}$/;
          if (reg.test(v)) {
            cb(new Error("验证码为数字"));
            return false;
          }
          cb();
        },
        trigger: "blur"
      }
    ],
    Email: [
      {
        required: true,
        message: "邮箱不能为空"
      },
      {
        validator: (r: any, v: string, cb: Function) => {
          const reg = /^\w+@[a-z0-9]+(\.[a-z]+){1,3}/;
          if (!reg.test(v)) {
            cb(new Error("邮箱格式错误"));
            return false;
          }
          cb();
        },
        trigger: "blur"
      }
    ],
    EmailCode: [
      {
        required: true,
        message: "邮箱验证码不能为空",
        trigger: "blur"
      }
    ],
    PWD: [
      {
        required: true,
        message: "密码不能为空"
      },
      {
        validator: (r: any, v: string, cb: Function) => {
          const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
          if (!reg.test(v)) {
            cb(new Error("密码必须包含字母、数字"));
          }
          cb();
        },
        trigger: "blur"
      }
    ],
    RPWD: [
      {
        required: true,
        message: "重复密码不能为空"
      },
      {
        validator: (r: any, v: string, cb: Function) => {
          const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
          if (!reg.test(v)) {
            cb(new Error("密码必须包含字母、数字"));
            return false;
          }
          if (this.Register.PWD !== this.Register.RPWD) {
            cb(new Error("密码输入不一致"));
          }

          cb();
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
  async SubmitRegister(FormName: string) {
    let refs: any = this.$refs[FormName];
    refs.validate(async (valid: any) => {
      if (!valid) {
        this.$message.error("请完善表单信息");
        return false;
      }

      try {
        let rs = await this.$store.dispatch("REGISTER", this.Register);
        this.$message.success("注册成功");
      } catch (error) {
        this.$message.error(error.message);
      }
    });
  }

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