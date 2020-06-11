# element

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 倒计时组件-局部组件

**基于 ElementUI el-button 二次封装**

```
import TimeOut from "../Base/TimeOutButton.vue";

<TimeOut></TimeOut>;

Component({
  components: {
    TimeOut,
  },
});
```

| 参数       |                                                    说明 |
| :--------- | ------------------------------------------------------: |
| Time       | 倒计时时间,默认 60 秒，传入的时间为数字且不能小于等于 0 |
| Size       |     按钮大小,参考 elementUI`el-button` Size。默认 small |
| type       |   按钮类型,参考 elementUI`el-button` Type, 默认 suceess |
| disabled   |                                是否禁用按钮，默认 false |
| ButtonText |                                                按钮文字 |
| @TimeEnd   |                      监听倒计时结束 `@TimeEnd='方法名'` |

# 表单校验库 Rules

[表单 Rule](https://github.com/Hello-GitHubs/element/blob/master/src/lib/ElementFormRules/index.ts)

- 校验库中的方法:基于[表单默认定义的一套验证方法](https://github.com/Hello-GitHubs/element/blob/master/src/lib/Reg/regFun.ts)
- 校验库中的正则：基于自定义的[正则库](https://github.com/Hello-GitHubs/castle-vuex/blob/master/src/RegExp/index.ts)
- 注意：此表单校验只适用于 ElementUI Form 校验
- 引入：import ElementFormRules from "@/lib/ElementFormRules/index";
- 使用：const ERules = ElementFormRules.defalultRules;

### 忘记密码组件-全局组件

- 说明：集成 ElementUI form 表单 Rule 校验,开箱即用
  **slot**

  > defalut 默认插槽 可自定义
  > email 具名插槽

  **Props**

  > Size： 输入框大小 参考 elementui

```js
<CtsyForget></CtsyForget>
```
