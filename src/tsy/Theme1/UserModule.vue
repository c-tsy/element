<template>
  <div class="Ctsy_Background_Container">
    <div
      class="User_Model_Container"
      :style="`background-image:url(${url})`"
    >
      <keep-alive>
        <component
          :is="`Ctsy${compontName}_theme2`"
          @CName="(v)=>{
              compontName = v
              }"
          @success="Success"
          @error="Err"
        ></component>
      </keep-alive>

    </div>
  </div>

</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class UserModeule extends Vue {
  Success(v: any) {
    console.log(v);
  }
  Err(v: any) {
    console.log(v);
  }

  compontName: string = "Login";

  @Prop({ default: require("../../assets/bg1.png") })
  url?: string;

  @Prop({
    default: () => {}
  })
  Login?: { [i: string]: any };
  @Prop({
    default: () => {}
  })
  Register?: { [i: string]: any };
  @Prop({
    default: () => {}
  })
  Forget?: { [i: string]: any };

  get props() {
    switch (this.compontName) {
      case "Login":
        return this.Login;
        break;
      case "Register":
        return this.Register;
      case "Forget":
        return this.Forget;
      default:
        break;
    }
  }

  cbsuccess(v: any) {
    console.log(v);
  }
}
</script>
<style lang="css">
body {
  padding: 0;
  margin: 0;
}
</style>
<style lang="less" scoped >
</style>