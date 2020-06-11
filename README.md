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

```js
import TimeOut from "../Base/TimeOutButton.vue";

<TimeOut></TimeOut>;

参数 = {
  Time: 倒计时时间,默认60秒，传入的时间为数字且不能小于等于0,
  Size：按钮大小,参考elementUI<el-button> Size。默认 small,
  type:按钮类型,参考elementUI<el-button> Type, 默认 suceess,
  disabled:是否禁用按钮，默认false,
  ButtonText:按钮文字,
};
监听倒计时结束
@TimeEnd ='方法名'
Component({
  components: {
    TimeOut,
  },
});
```

# 表单校验库

[表单 Rule](https://github.com/Hello-GitHubs/element/blob/master/src/lib/ElementFormRules/index.ts)

- 注意 此表单校验只适用于 ElementUI From 校验
- 引入 import ElementFormRules from "@/lib/ElementFormRules/index";
- 使用 const ERules = ElementFormRules.defalultRules;

### 忘记密码组件-全局组件

```js
说明：
集成 ElementUI form 表单Rule 校验

使用
<CtsyForget></CtsyForget>
参数




```
