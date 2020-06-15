<template>
  <div>
    <el-dialog
      title=""
      :visible.sync="show"
      width="60%"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >

      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="登录"
          name="login"
        >
          <CtsyLogin
            @cancel="IsVisible"
            key="login"
          ></CtsyLogin>

        </el-tab-pane>
        <el-tab-pane
          label="注册"
          name="register"
        >
          <CtsyRegister
            key="forget"
            @code="getcode"
            :CodeTimeOut="10"
          >
          </CtsyRegister>

        </el-tab-pane>
        <el-tab-pane
          label="找回密码"
          name="forget"
        >
          <CtsyForget key="register"> </CtsyForget>

        </el-tab-pane>

      </el-tabs>

    </el-dialog>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class UserModeule extends Vue {
  @Prop({ default: false })
  visible?: boolean;

  activeName: string = "login";

  getcode(v: any) {
    console.log(v);
  }
  IsVisible(v: boolean) {
    this.visible = v;
  }
  get show() {
    return !!this.visible;
  }
  set show(v) {
    this.$emit("input", v);
  }

  handleClick() {}
}
</script>

<style lang="scss" scoped >
</style>