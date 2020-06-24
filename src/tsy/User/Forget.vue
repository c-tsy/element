<template>
  <div>
    <slot>
      <div class="Model_Header_Container">
        <h3>
          <i
            class="el-icon-arrow-left"
            @click="$emit('CName','Login')"
          ></i>
          忘记密码
        </h3>
      </div>
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
          ></el-input>
        </el-form-item>
        <el-form-item
          label="验证码"
          prop="MessageCode"
          class="Ctsy_Form_item 
          "
        >
          <span class="Ctsy_Form_item_button">
            <el-input
              :size="Size"
              v-model="FormData.MessageCode"
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
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        @click="ForGet('FormData')"
      >设置</el-button>
    </slot>
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
    Account: "",
    PWD: "",
    MessageCode: "",
    VCode: ""
  };

  Rules: object = {
    Account: ERules.Account,
    Phone: ERules.Phone,
    MessageCode: ERules.MessageCode,
    PWD: ERules.PWD
  };
  @Prop({ default: "small" })
  Size?: string;
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
        let rs = await this.$store.dispatch("get_user_forget", this.FormData);
        this.$message.success("设置成功");
        this.$emit("success");
      } catch (error) {
        this.$message.error(error.message);
        this.$emit("error");
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