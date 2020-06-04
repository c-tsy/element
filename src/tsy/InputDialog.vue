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
// export default {
//   props: {
//     value: {
//       default: false,
//       type: Boolean,
//       required: true
//     },
//     title: {
//       default: "标题",
//       type: String,
//       required: false
//     },
//     label: {
//       default: "标签",
//       type: String,
//       required: false
//     },
//     edit: {
//       default: "",
//       type: String
//     },
//     more: {
//       default: false,
//       type: Boolean
//     }
//   },
//   data: {
//     pedit: ""
//   },
//   computed: {
//     tags: function() {
//       if (this.pedit.length > 0)
//         return this.pedit.replace(/[，；;、]{1,}/g, ",").split(",");
//       return [];
//     },
//     show: {
//       get: function() {
//         if (this.value) {
//           this.pedit = this.edit || "";
//         }
//         return this.value;
//       },
//       set: function(v) {
//         this.$emit("input", v);
//       }
//     }
//   },
//   methods: {
//     close: function(s: string, k: number) {
//       let t = this.pedit.replace(/[，；;、]{1,}/g, ",").split(",");
//       t.splice(k, 1);
//       this.pedit = t.join(",");
//     },
//     ok() {
//       this.$emit("ok", this.more ? this.tags : this.pedit);
//     }
//   }
// };

import { Component, Vue, Watch, Prop } from "vue-property-decorator";
@Component({})
export default class InputDialog extends Vue {
  @Prop({ default: false })
  value: boolean | any;
  @Prop({ default: "标题内容" })
  title?: string;
  @Prop({ default: "标签内容" })
  label?: string;
  @Prop({ default: "" })
  edit: string | any;
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
    this.$emit("ok", this.more ? this.tags : this.pedit);
  }
}
</script>

<style lang="less" scoped>
</style>