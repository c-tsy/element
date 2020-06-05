<template>
  <el-dialog :visible.sync="show" :title="title">
    <el-form>
      <el-form-item :label="label">
        <el-input v-model="pedit"></el-input>
      </el-form-item>
    </el-form>
    <div v-if="more">
      <el-tag v-for="(v,k) in tags" :key="k" closable @close="close(v,k)">{{v}}</el-tag>
    </div>
    <slot></slot>
    <template slot="footer">
      <el-button @click="show=false">取 消</el-button>
      <el-button type="primary" @click="ok">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
@Component({})
export default class InputDialog extends Vue {
  /**
   * 控制是否显示
   */
  @Prop({ default: false })
  value: boolean | any;
  /**
   * 标题
   */
  @Prop({ default: "标题内容" })
  title?: string;
  /**
   * 标签内容
   */
  @Prop({ default: "标签内容" })
  label?: string;
  /**
   * 编辑模式下的原文内容
   */
  @Prop({ default: "" })
  edit: string | any;
  /**
   * 传递原始数据
   */
  @Prop({ default: () => {} })
  data: string | any;
  /**
   * 是否支持输入
   */
  @Prop({ default: false })
  more: boolean | any;

  pedit: string = "";
  get tags() {
    if (this.pedit.length > 0)
      return this.pedit.replace(/[，；;、]{1,}/g, ",").split(",");
    return [];
  }
  set show(v: boolean) {
    this.$emit("input", v);
  }
  get show() {
    if (this.value) {
      this.pedit = this.edit || "";
    }
    return this.value;
  }
  close(s: string, k: number) {
    let t = this.pedit.replace(/[，；;、]{1,}/g, ",").split(",");
    t.splice(k, 1);
    this.pedit = t.join(",");
  }
  ok() {
    this.$emit("ok", {
      Tags: this.tags,
      Edit: this.pedit,
      Data: this.data || {}
    });
  }
}
</script>

<style lang="less" scoped>
</style>