<template>
<div>
   <slot> 
   <el-form
    :model="FormData"
    ref="FormData"
    label-width="120px"
    size="small"
    :rules="Rules"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item
          label="账号"
          prop="Account"
        >
          <el-input
            :size="Size"
            v-model="FormData.Account"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <slot name="email">
    </slot>

    <el-row>
      <el-col :span="8">
        <el-form-item
          label="手机号码"
          prop="Phone"
        >
          <el-input
            :size="Size"
            v-model="FormData.Phone"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item
          label="验证码"
          prop="MessageCode"
        >
          <el-input
            :size="Size"
            v-model="FormData.MessageCode"
          ></el-input>

        </el-form-item>
      </el-col>
      <el-col :span="4">
        <CButton
          :Time="5"
        ></CButton>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item
          label="新密码"
          prop="PWD"
        >
          <el-input
            :size="Size"
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
     </slot>
</div>
 

</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import ElementFormRules from "@/lib/ElementFormRules/index";
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
  @Prop({default:'small'})
  Size?: string ;
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
      } catch (error) {
        this.$message.error(error.message);
      }
    });
  }
}
</script>

<style lang="less" scoped>
</style>