<template>
  <el-row>
    <el-col :span="12">

      <CtsyUserModule>

      </CtsyUserModule>

    </el-col>
    <el-col :span="12">
      {{info}}
      <CtsyPersonInfo
        :lable=test
        :data="info"
        align="center"
        :avatar_url='info.Avatar'
      >

      </CtsyPersonInfo>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  components: {}
})
export default class UserList extends Vue {
  test: any = [
    {
      prop: "Name",
      lable: "姓名:"
    },
    {
      prop: "Nick",
      lable: "昵称:"
    },
    {
      prop: "Sex",
      lable: "性别:"
    },
    {
      prop: "Status",
      lable: "状态:"
    }
  ];

  show: any = {
    Avatar: false,
    IsPhone: false,
    IsEmail: true
  };

  m: any = "";
  arr: any = [
    {
      name: "张三"
    },
    {
      name: "李四"
    }
  ];

  get info() {
    return this.$store.getters.info;
  }
}
</script>

<style lang="less" scoped>
</style>