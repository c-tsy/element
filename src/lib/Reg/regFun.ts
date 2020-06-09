import Regs from "@/lib/Reg/index";

namespace CustomValidate {
  /**
   * 传入自定义正则
   */
  export class regValidate {
    /**
     * 姓名
     */
    name?: RegExp;
    /**
     * 昵称
     */
    nick?: RegExp;
    /**
     * 账号
     */
    account?: RegExp;
    /**
     * 电话号码
     */
    phone?: RegExp;
    /**
     * 短信验证码
     */
    phoneCode?: RegExp;
    /**
     * 邮箱
     */
    email?: RegExp;
    /**
     * 邮箱验证码
     */
    emailCode?: RegExp;
    /**
     * 密码，重复密码与密码共用
     *      */
    pwd?: RegExp;
  }
  /**
   * 是否是有重复密码
   */
  export class ISRPWD {
    val?: string;
  }
  export const enterPwd = new ISRPWD();

  export const Reg = new regValidate();
  /**
   * 校验 姓名
   * @param r
   * @param v
   * @param cb
   */
  export function ValiteName_fun(r: any, v: string, cb: Function) {
    const reg = Reg.name || Regs.name;

    if (!reg.test(v)) {
      cb(new Error("不合法的输入"));
      return false;
    }
    cb();
  }
  /**
   * 校验 昵称
   * @param r
   * @param v
   * @param cb
   */
  export function ValiteNick_fun(r: any, v: string, cb: Function) {
    const reg = Reg.nick || Regs.nick;
    if (!reg.test(v)) {
      cb(new Error("昵称必须为中文"));
      return false;
    }
    cb();
  }
  /**
   * 校验账号
   * @param r
   * @param v
   * @param cb
   */
  export function ValiteAccount_fun(r: any, v: string, cb: Function) {
    const reg = Reg.account || Regs.account;
    if (!reg.test(v)) {
      cb(new Error("账号格式错误"));
      return false;
    }
    cb();
  }
  /**
   * 校验手机号码
   * @param rule
   * @param val
   * @param cb
   */
  export function ValitePhone_fun(rule: any, val: string, cb: Function) {
    const reg = Reg.phone || Regs.phone;
    if (!reg.test(val)) {
      cb(new Error("手机号码格式错误"));
      return false;
    }
    cb();
  }
  /**
   * 校验短信验证码
   * @param r
   * @param v
   * @param cb
   */
  export function ValiteMessage_fun(r: any, v: string, cb: Function) {
    let reg = Reg.phoneCode || Regs.messageCode;
    if (!reg.test(v)) {
      cb(new Error("短信验证码不合法"));
      return false;
    }
    cb();
  }
  /**
   * 校验邮箱格式
   * @param r
   * @param v
   * @param cb
   */
  export function ValiteEmail_fun(r: any, v: string, cb: Function) {
    const reg = Reg.email || Regs.email;
    if (!reg.test(v)) {
      cb(new Error("邮箱格式错误"));
      return false;
    }
    cb();
  }
  /**
   * 校验 邮箱验证码
   * @param r
   * @param v
   * @param cb
   */
  export function ValiteEmailCode_fun(r: any, v: string, cb: Function) {
    let reg = Reg.emailCode || Regs.emailCode;
    if (!reg.test(v)) {
      cb(new Error("邮箱验证码不合法"));
      return false;
    }
    cb();
  }

  /**
   * 校验 密码
   *
   * enterPwd.val !=""  可以对重复密码进行校验
   *
   * @param r
   * @param v
   * @param cb
   */
  export function ValitePWD_fun(r: any, v: string, cb: Function) {
    const reg = Reg.pwd || Regs.pwd;
    if (!reg.test(v)) {
      cb(new Error("密码必须包含字母、数字"));
      return false;
    }
    if (enterPwd.val?.trim()) {
      if (enterPwd.val?.trim() !== v.trim()) {
        cb(new Error("两次密码输入不一致"));
        return false;
      }
      cb();
    }
    cb();
  }
}

export default CustomValidate;
