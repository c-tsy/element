import PublicReg from "@ctsy/vuex/dist/RegExp/index";

const Regs = new PublicReg.Regs();

namespace CustomValidate {
  /**
   * 是否是有重复密码
   */
  export class ISRPWD {
    val?: string;
  }
  /**
   * 输入的重复密码
   */
  export const EnterRPWD = new ISRPWD();

  /**
   * 校验 姓名
   * @param r
   * @param v
   * @param cb
   */
  export function ValiteName(r: any, v: string, cb: Function) {
    const reg = Regs.Name;

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
  export function ValiteNick(r: any, v: string, cb: Function) {
    const reg = Regs.Nick;
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
  export function ValiteAccount(r: any, v: string, cb: Function) {
    const reg = Regs.Account;
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
  export function ValitePhone(rule: any, val: string, cb: Function) {
    const reg = Regs.Phone;
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
  export function ValiteMessage(r: any, v: string, cb: Function) {
    let reg = Regs.MessageCode;
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
  export function ValiteEmail(r: any, v: string, cb: Function) {
    const reg = Regs.Email;
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
  export function ValiteEmailCode(r: any, v: string, cb: Function) {
    let reg = Regs.EmailCode;
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
  export function ValitePWD(r: any, v: string, cb: Function) {
    const reg = Regs.PWD;
    if (!reg.test(v)) {
      cb(new Error("密码必须包含字母、数字"));
      return false;
    }
    if (EnterRPWD.val?.trim()) {
      if (EnterRPWD.val?.trim() !== v.trim()) {
        cb(new Error("两次密码输入不一致"));
        return false;
      }
      cb();
    }
    cb();
  }
}

export default CustomValidate;
