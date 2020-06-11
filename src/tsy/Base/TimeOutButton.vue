
<template>
  <div>
    <el-button
      :type="type||'success'"
      :size="Size || 'small' "
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

import { timeout } from "@ctsy/common";

@Component
export default class Name extends Vue {
  @Prop({ default: "small" })
  Size?: string;
  @Prop({ default: "success" })
  type?: string;
  @Prop({ default: false })
  disabled?: boolean;
  @Prop({ default: 60 })
  Time?: number; //可以传入时间
  @Prop({ default: "获取验证码" })
  ButtonText?: string;

  TimeOutText: string = "";
  DefaultDisabked: boolean = false;
  code = 0;

  async ClickButton() {
    if ("number" == typeof this.Time && this.Time <= 0) {
      return console.error("倒计时时间不能<=0");
    }

    for (let i = this.Time || 60; i >= 0; i--) {
      this.code = i;
      this.DefaultDisabked = true;
      this.TimeOutText = `${this.code}s后可再次获取`;
      if (this.code == 0) {
        this.$emit("TimeEnd");
        this.TimeOutText = "";
        this.DefaultDisabked = false;
      }
      await timeout(1000);
    }

    this.$emit("click");
  }
}
</script>

<style lang="scss" scoped >
</style>