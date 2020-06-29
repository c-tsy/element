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
                百度（纳斯达克：BIDU）是全球最大的中文搜索引擎，中国最大的以信息和知识为核心的互联网综合服务公司，全球领先的人工智能平台型公司。百度愿景是：成为最懂用户，并能帮助人们成长的全球顶级高科技公司。 [1]
                “百度”二字，来自于八百年前南宋词人辛弃疾的一句词：众里寻他千百度。这句话描述了词人对理想的执着追求。1999年底，身在美国硅谷的李彦宏看到了中国互联网及中文搜索引擎服务的巨大发展潜力，抱着技术改变世界的梦想，他毅然辞掉硅谷的高薪工作，携搜索引擎专利技术，于 2000年1月1日在中关村创建了百度公司。
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
            <component :is="`Ctsy${showComponent}`"></component>
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
  @Prop({
    default: "//www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
  })
  Logo?: string;
  @Prop({ default: "碳素云" })
  Company?: string;
  @Prop({ default: "" })
  Memo?: string;
}
</script>

<style lang="scss" scoped >
</style>