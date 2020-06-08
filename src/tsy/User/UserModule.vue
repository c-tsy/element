<template>
  <div>
    <el-dialog
      title=""
      :visible.sync="visible"
      width="60%"
      :show-close="false"
      :close-on-click-modal="false"
    >

      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="登录"
          name="login"
        >
          <CtsyLogin key="login"></CtsyLogin>

        </el-tab-pane>
        <el-tab-pane
          label="注册"
          name="register"
        >
          <CtsyRegister
            :registerProps="show"
            key="forget"
          ></CtsyRegister>

        </el-tab-pane>
        <el-tab-pane
          label="找回密码"
          name="forget"
        >
          <CtsyForGet key="register"> </CtsyForGet>

        </el-tab-pane>

      </el-tabs>

    </el-dialog>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class Name extends Vue {
  @Prop({ default: true })
  visible?: boolean;

  activeName: string = "login";

  show: any = {
    Avatar: false,
    IsPhone: true,
    IsEmail: true
  };

  handleClick() {}
}
</script>

<style lang="scss" scoped >
</style>