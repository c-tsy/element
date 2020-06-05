<template>
  <el-dialog :visible.sync="show">
    <!-- 账号/密码/验证码 -->
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
@Component({})
export default class Login extends Vue {
  @Prop({ default: false })
  value?: boolean;

  get show() {
    return !!this.value;
  }
  set show(v: boolean) {
    this.$emit("input", v);
  }
}
</script>

<style lang="less" scoped>
</style>