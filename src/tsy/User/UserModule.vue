<template>
  <div>
    <el-dialog
      title=""
      :visible.sync="visible"
      width="30%"
      :show-close="false"
    >

      <span slot="footer">
        <el-button @click="visible = false">返回</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class Name extends Vue {
  @Prop({ default: true })
  visible?: boolean;
}
</script>

<style lang="scss" scoped >
</style>