
<template>
  <div>
    <el-button
      :type="inputSize||'success'"
      :size="inputSize || 'small' "
      style="margin-left:10px"
      @click="ClickButton"
      :disabled="disabled||DefaultDisabked"
    >

      {{TimeOutText|| ButtonText}}

    </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class Name extends Vue {
  @Prop()
  inputSize?: string;
  @Prop()
  type?: string;
  @Prop()
  disabled?: boolean;
  @Prop()
  Time?: number;
  @Prop({ default: "获取验证码" })
  ButtonText?: string;

  TimeOutText: string = "";
  DefaultDisabked: boolean = false;

  ClickButton() {
    this.DefaultDisabked = true;
    let time = this.Time || 3;
    let t = setInterval(() => {
      this.TimeOutText = `${time}s后可再次获取`;
      time -= 1;
      if (time < 0) {
        this.TimeOutText = "";
        this.DefaultDisabked = false;
        clearInterval(t);
      }
    }, 1000);
    this.$emit("click");
  }
}
</script>

<style lang="scss" scoped >
</style>