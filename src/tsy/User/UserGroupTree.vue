<template>
  <div>
    <el-tree
      :data="UserGroup"
      node-key="UGID"
      @node-click="UserGroupClick"
      :props="{label:'Title'}"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button type="text" size="medium" @click.stop="addGroup(data,node,'add')">
            <i class="el-icon-plus"></i>
          </el-button>
          <el-button
            v-if="data.UGID!=0"
            type="text"
            size="medium"
            @click.stop="opGroup(data,node,'del')"
          >
            <i class="el-icon-minus"></i>
          </el-button>
          <el-button
            v-if="data.UGID!=0"
            type="text"
            size="mini"
            @click.stop="opGroup(data,node,'edit')"
          >
            <i class="el-icon-edit"></i>
          </el-button>
          <!-- <el-button
              v-if="data.UGID!=0"
              type="text"
              size="mini"
              @click.stop="addGroup(data,node,'jurisdiction')"
            >
              <i class="el-icon-s-operation"></i>
          </el-button>-->
        </span>
      </span>
    </el-tree>
    <Dialog @ok="accept" v-model="ShowDialog" title="请输入用户组名称" label="用户组名称" :more="true"></Dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { SearchWhere } from "@ctsy/api-sdk/dist/lib";
import UserApi from "@ctsy/api-sdk/dist/modules/User";
import Dialog from "../Base/InputDialog.vue";
@Component({
  components: {
    Dialog
  }
})
export default class UserGroupTree extends Vue {
  @Prop({ default: 0 })
  PUnitID?: number = 0;
  // Where: SearchWhere = new SearchWhere();
  /**
   * 分组处理
   */
  get UserGroup() {
    return [
      {
        UGID: 0,
        Title: "全部",
        children: []
      },
      ...this.$store.state.UserGroup.Tree
    ];
  }
  //切换每个分组用户显示
  async UserGroupClick(v: any) {
    // this.Where.W.UGID = v.UGID;
  }

  ShowDialog: boolean = false;

  EditUserGroup: UserApi.ClassUserGroup = new UserApi.ClassUserGroup();
  async accept(title: string[] | string) {
    let data = [];
    if (title instanceof Array) {
    } else {
      data.push({
        Title: ""
      });
    }
    await this.$store.dispatch("add_user_groups", title instanceof Array);
  }
  //分组添加及修改和删除
  async opGroup(data: any, node: any, type: string) {
    if (type == "del") {
      try {
        await this.$confirm("是否删除用户组：" + data.Title, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        //TODO 删除操作
        // User.GroupApi.del(data.UGID);
        this.$message.success("操作成功");
        this.$store.dispatch("get_user_group");
      } catch (error) {
        this.$message.error("操作失败:" + error.message);
      }
    } else {
      this.ShowDialog = true;
      if (type == "edit") {
        this.EditUserGroup = data;
      } else {
        this.EditUserGroup = data.UGID;
        this.EditUserGroup = new UserApi.ClassUserGroup();
      }
    }
  }
  mounted() {
    this.$store.dispatch("get_user_group", { PUnitID: this.PUnitID });
  }
}
</script>

<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>