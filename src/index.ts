// import * as ElementUI from 'element-ui'
import Vue from 'vue'
import InputDialog from './tsy/Base/InputDialog.vue';
import UserGroupTree from './tsy/User/UserGroupTree.vue';

// Vue.use(ElementUI)

const components: any = {
    InputDialog,
    UserGroupTree
}

export default {
    install: (vue: any, opt: any) => {
        for (let x in components) {
            vue.component('Ctsy' + x, components[x])
        }
        // vue.component('InputDialog', InputDialog);
    }
}