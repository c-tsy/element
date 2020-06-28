<template>

  <div class="Model_Container">
    <div class="Model_Body_Container">
      <h3>
        <i
          class="el-icon-arrow-left"
          @click="$emit('CName','Login')"
        ></i>
        忘记密码
      </h3>
      <el-form
        :model="FormData"
        ref="FormData"
        label-width="80px"
        hide-required-asterisk
        label-position="left"
        :rules="Rules"
      >
        <el-form-item
          label="账号"
          prop="Account"
          class="Ctsy_Form_item"
        >
          <el-input
            :size="Size"
            v-model="FormData.Account"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <slot name="email">
        </slot>
        <el-form-item
          label="手机号码"
          class="Ctsy_Form_item"
          prop="Phone"
        >
          <el-input
            :size="Size"
            v-model="FormData.Phone"
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="验证码"
          prop="MessageCode"
          class="Ctsy_Form_item "
        >
          <span class="Ctsy_Form_item_button">
            <el-input
              :size="Size"
              v-model="FormData.MessageCode"
              placeholder="请输入验证码"
            ></el-input>
            <CButton
              :Time="5"
              ButtonText="发送验证码"
            ></CButton>
          </span>

        </el-form-item>
        <el-form-item
          label="新密码"
          class="Ctsy_Form_item"
          prop="PWD"
        >
          <el-input
            :size="Size"
            v-model="FormData.PWD"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        @click="Setting('FormData')"
      >设置</el-button>
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import ElementFormRules from "../../lib/ElementFormRules/index";
const ERules = ElementFormRules.defalultRules;
import CButton from "../Base/TimeOutButton.vue";

@Component({
  components: {
    CButton
  }
})
export default class Forget extends Vue {
  FormData: { [index: string]: any } = {
    Account: "da154654",
    PWD: "d1a34616",
    Phone: "18148407476",
    MessageCode: "1234"
  };

  Rules: object = {
    Account: ERules.Account,
    Phone: ERules.Phone,
    MessageCode: ERules.MessageCode,
    PWD: ERules.PWD
  };
  @Prop({ default: "small" })
  Size?: string;
  @Prop({ default: require("../../assets/bg1.png") })
  url?: string;

  /**
   * 找回密码
   */
  Setting(FormName: any) {
    let refs: any = this.$refs[FormName];
    refs.validate(async (v: any) => {
      if (!v) {
        this.$message.error("请完善信息");
        return false;
      }

      try {
        let rs = await this.$store.dispatch("user_forget", this.FormData);

        this.$message.success("设置成功");
        this.$emit("success", rs);
      } catch (error) {
        console.log(this.FormData);
        this.$message.error(error.message);
        this.$emit("error", error.message);
      }
    });
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
</style>