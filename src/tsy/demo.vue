<template>
  <div>
    <CtsyUserModule_theme1
      @success="su"
      @error="er"
      :Login="{
        Torouter:'/'
        }"
    ></CtsyUserModule_theme1>
    <!-- <CtsyUserModule_th eme2></CtsyUserModule_theme2> -->

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Name extends Vue {
  su(e: any) {
    console.log(e);
  }
  er(e: any) {
    console.log(e, "123");
  }
}
</script>

<style lang="scss" scoped >
</style>