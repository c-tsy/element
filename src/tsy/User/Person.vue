<template>
  <div class="person">
    个人信息

    <el-row>
      <el-col
        class="person_container"
        :xl="8"
        :xs="8"
        :sm="8"
      >
        <div class="avatar_container">
          <el-avatar
            v-if="avatar_url"
            :size="avatar_size"
            :src="avatar_url"
            class="avatar"
          ></el-avatar>
          <p
            class="name"
            :class="!avatar_url ? 'no_avatar' :''"
          >张三</p>
        </div>
        <div class="info_container">

          <ul class="info_ul">
            <li
              v-for="(v,i) in  lable"
              :key="i"
            >
              <span
                class="text"
                :class="`text-${align}`"
              >

                {{v.lable}}
              </span>

              <span
                class="textProp"
                v-if="v.prop === 'Sex'"
              >
                {{v.prop | Sex}}
              </span>
              <span
                class="textProp"
                v-else-if="v.prop === 'Status'"
              >
                {{v.prop|Status}}
              </span>
              <span
                class="textProp"
                v-else
              >
                {{data[v.prop]}}
              </span>

            </li>
          </ul>
        </div>

      </el-col>
    </el-row>

  </div>

</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";

@Component({})
export default class UserSelect extends Vue {
  /**
   * 头像地址
   */
  @Prop({ default: "" })
  avatar_url?: string;

  /**
   * 头像图片大小   number / large / medium / small
   */
  @Prop({ default: 120 })
  avatar_size?: string | number;

  /**
   * 列表名称 字段   [{prop:'Name',lable:'姓名：'}]
   */
  @Prop({ default: () => [] })
  lable?: Array<any>;

  /**
   * 数据
   */
  @Prop({ default: () => [] })
  data?: Array<any>;
  /**
   * 文字居中方式 默认left  可选 left center right
   */
  @Prop({ default: "left" }) //
  align?: string;

  Sex: object = {
    "-1": "未知",
    "0": "男",
    "1": "女"
  };
  Status: object = {
    "1": "正常",
    "-1": "禁用"
  };

  get info() {
    return this.$store.state.User.UserInfo;
  }
}
</script>

<style lang="less" scoped>
p {
  padding: 5px;
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}
ul li {
  list-style: none;
}
.person {
  .text {
    padding: 0 5px;
    width: 75px;
    display: inline-block;
  }
  .textProp {
    color: #303133;
  }
  .text-right {
    text-align: right;
  }
  .text-center {
    text-align: center;
  }
  .text-left {
    text-align: left;
  }

  .name {
    color: #303133;
  }
  .no_avatar {
    width: 40px;
    height: 40px;
    line-height: 40px;
    background: #409eff;
    color: #fff !important;
    display: inline-block;
    margin: auto;
    border-radius: 50%;
    letter-spacing: 2px;
  }
  .person_container {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    border-radius: 2px;
  }
  .avatar_container {
    padding: 10px 0;
    text-align: center;
    .avatar {
      box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);
    }
  }
  .info_ul {
    margin: 0;
    padding: 5px;
    li {
      font-size: 14px;
      color: #1f1c1e;
      border-bottom: 1px solid #6b6a6a26;
      padding: 5px;
    }
  }
}
</style>