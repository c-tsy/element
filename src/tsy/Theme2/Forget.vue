<template>

  <div>
    <div class="Ctsy_theme2_block_right_box-body">
      <el-form
        :model="FormData"
        ref="FormData"
        hide-required-asterisk
        :rules="Rules"
        size="small"
      >
        <el-form-item prop="Account">
          <el-input
            v-model="FormData.Account"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <slot name="email">
        </slot>
        <el-form-item prop="Phone">
          <el-input
            v-model="FormData.Phone"
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="MessageCode">
          <span class="Ctsy_theme2_item_button">
            <el-input
              v-model="FormData.MessageCode"
              placeholder="请输入验证码"
            ></el-input>
            <CButton
              :Time="5"
              ButtonText="发送验证码"
              class="Ctsy_theme2_CButton"
            ></CButton>
          </span>
        </el-form-item>
        <el-form-item
          class="Ctsy_Form_item"
          prop="PWD"
        >
          <el-input
            v-model="FormData.PWD"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="Ctsy_theme2_block_right_box-bottom">
      <button
        class="Ctsy_theme2_button"
        @click="Setting('FormData')"
      >设置</button>
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
    Account: "",
    PWD: "",
    Phone: "",
    MessageCode: ""
  };

  Rules: object = {
    Account: ERules.Account,
    Phone: ERules.Phone,
    MessageCode: ERules.MessageCode,
    PWD: ERules.PWD
  };

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
        this.$message.error(error.message);
        this.$emit("error", error);
      }
    });
  }
}
</script>

<style lang="less" scoped>
</style>