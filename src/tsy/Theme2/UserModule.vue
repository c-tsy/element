<template>
  <div>
    <div class="Ctsy_theme2_Container">
      <div
        class="Ctsy_theme2_block_container"
        :style="BackgroundContainer"
      >
        <div class="Ctsy_them2_block">
          <div
            class="Ctsy_theme2_block_left_box"
            :style="Backgroundleft "
          >
            <div class="Ctsy_them2_block_left_box-top">
              <div class="Ctsy_them2_block_left_box-top_logo">
                <img
                  :src="Logo"
                  alt=""
                >
                <h3>欢迎来到{{Company}}管理后台</h3>
              </div>
            </div>
            <div class="Ctsy_them2_block_left_box-bottom">
              <small>
                {{Memo}}
              </small>
            </div>
          </div>
          <div class="Ctsy_theme2_block_right_box">
            <div class="Ctsy_theme2_block_right_box-top">
              <strong>
                <span
                  v-for="(v,i) in list_router "
                  :key="i"
                  @click="showComponent = v.name"
                  :class="showComponent == v.name?'active':'' "
                >
                  {{v.text}}
                </span>
              </strong>
            </div>
            <component
              :props="props"
              :is="`Ctsy${showComponent}_theme1`"
              @success="success"
              @error="error "
            ></component>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
@Component
export default class Name extends Vue {
  showComponent: string = "Login";
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
    switch (this.showComponent) {
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

  success(v: any) {
    this.$emit("success", v);
  }
  error(v: any) {
    this.$emit("error", v);
  }

  @Prop({
    default:
      "   background-image: linear-gradient(to right, #0acffe 0%, #495aff 100%);"
  })
  Backgroundleft?: string;
  @Prop({
    default:
      "   background-image: linear-gradient(to right, #0acffe 0%, #495aff 100%); "
  })
  BackgroundContainer?: string;
  @Prop({
    default: "//www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
  })
  Logo?: string;
  @Prop({ default: "碳素云" })
  Company?: string;
  @Prop({ default: "" })
  Memo?: string;
  @Prop({
    default: () => [
      {
        text: "登录",
        name: "Login"
      },
      {
        text: "注册",
        name: "Register"
      },
      {
        text: "找回密码",
        name: "Forget"
      }
    ]
  })
  list_router?: Array<any>;
}
</script>

 