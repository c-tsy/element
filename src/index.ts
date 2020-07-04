// import * as ElementUI from 'element-ui'
// import InputDialog from "./tsy/Base/InputDialog.vue";
// import UserGroupTree from "./tsy/User/UserGroupTree.vue";

import theme1 from "./tsy/Theme2";
// import theme2 from "./tsy/Theme1";

const components: any = {
  ...theme1,
  // ...theme2,
  // InputDialog,
  // UserGroupTree,
};

export default {
  install: (vue: any, opt: any) => {
    for (let x in components) {
      vue.component("Ctsy" + x, components[x]);
    }
    // vue.component('InputDialog', InputDialog);
  },
};
