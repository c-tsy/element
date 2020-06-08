<template>
  <el-dialog :visible.sync="show">
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
        <el-col :span="12">

        </el-col>
      </el-row>
      <el-row>
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
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item
            label="新密码"
            prop="PWD"
          >
            <el-input
              :size="inputSize"
              v-model="FormData.PWD"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12"></el-col>
      </el-row>
      <el-form-item>
        <el-button
          type="primary"
          @click="ForGet('FormData')"
        >设置</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import CustomValidate from "@/lib/Reg/regFun";

@Component({})
export default class Forget extends Vue {
  @Prop({ default: false })
  visible?: boolean;
  FormData: { [index: string]: any } = {
    Account: "",
    PWD: "",
    VCode: ""
  };
  Rules: object = {
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
    PWD: [
      {
        required: true,
        message: "密码不能为空"
      },
      {
        validator: CustomValidate.PWD_fun,
        trigger: "blur"
      }
    ]
  };
  inputSize: string = "small";

  // 741852
  // asd456   123
  get show() {
    return !!this.visible;
  }
  set show(v: boolean) {
    this.$emit("input", v);
  }

  /**
   * 找回密码
   */
  ForGet(FormName: any) {
    let refs: any = this.$refs[FormName];
    refs.validate(async (v: any) => {
      if (!v) {
        this.$message.error("请完善信息");
        return false;
      }
      try {
        let rs = await this.$store.dispatch("ForGet", this.FormData);
      } catch (error) {
        this.$message.error(error.message);
      }
    });
  }
}
</script>

<style lang="less" scoped>
</style>