// import * as ElementUI from 'element-ui'
import Vue from 'vue'
import InputDialog from './tsy/InputDialog.vue';

// Vue.use(ElementUI)

const components: any = {
    InputDialog
}

export default {
    install: (vue: any, opt: any) => {
        for (let x in components) {
            vue.component('Ctsy' + x, components[x])
        }
        // vue.component('InputDialog', InputDialog);
    }
}