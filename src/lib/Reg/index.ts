/*
 *
 *公共正则
 */
const Reg: { [index: string]: any } = {
  name: /^[\u4E00-\u9FA5]{2,4}$/, //中文姓名
  nick: /^[\u4E00-\u9FA5]{2,4}$/, //中文昵称
  account: /^[A-Za-z0-9]{4,15}$/, //账号 需要
  phone: /^[+86]{0,}1\d{10}$/, //电话号码
  messageCode: /^\d{4}$/, //短信验证码
  email: /^\w+@[a-z0-9]+(\.[a-z]+){1,3}/, //邮箱
  emailCode: "", //邮箱验证码 无
  pwd: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/, //密码必须包含数字字母
};

export default Reg;
