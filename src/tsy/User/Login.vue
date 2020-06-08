<template>
  <!-- <el-dialog :visible.sync="show"> -->
  <!-- 账号/密码/验证码 -->
  <el-form
    :model="FormData"
    ref="FormData"
    label-width="80px"
    :rules="Rules"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item
          label="账号"
          prop="Account"
        >
          <el-input
            :size="inputSize"
            v-model="FormData.Account"
          ></el-input>
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
              :size="inputSize"
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
              :size="inputSize"
              v-model="FormData.PhoneCode"
            ></el-input>

          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button
            type="success"
            :size="inputSize"
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
              :size="inputSize"
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
              :size="inputSize"
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

    <el-row>
      <el-col :span="8">
        <el-form-item
          label="密码"
          prop="PWD"
        >
          <el-input
            :size="inputSize"
            type="password"
            v-model="FormData.PWD"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item>
      <el-button
        type="primary"
        @click="Login('FormData')"
        :size="inputSize"
      >登录</el-button>
      <el-button :size="inputSize">取消</el-button>
    </el-form-item>
  </el-form>

  <!-- </el-dialog> -->
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import CustomValidate from "@/lib/Reg/regFun";

@Component({})
export default class Login extends Vue {
  FormData: { [index: string]: any } = {
    Account: "741852",
    // Phone: "",
    // PhoneCode: "",
    // Email: "",
    // EmailCode: "",
    PWD: "asd123"
  };
  inputSize: string = "small";

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
      } catch (e) {
        this.$message.error(e.message);
      }
    });
  }

  /**
   *
   * 表单验证规则
   */
  Rules: object = {
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
}
</script>

<style lang="less" scoped>
</style>