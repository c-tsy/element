import Regs from "@/lib/Reg/index";

// export const CustomValidate = {
//   //     Reg?: { [index: string]: any };

//   //   Name_fun: Function = (r: any, v: string, cb: Function) => {
//   //     const reg = this.Reg?.name || Regs.name;
//   //     if (!reg.test(v)) {
//   //       cb(new Error("不合法的输入"));
//   //       return false;
//   //     }
//   //     cb();
//   //   };
//   Reg: {
//     name: null,
//   },

//   Name_fun: function(r: any, v: string, cb: Function) {
//     const reg = this.Reg.name || Regs.name;
//     if (!reg.test(v)) {
//       cb(new Error("不合法的输入"));
//       return false;
//     }
//     cb();
//   },
// };
namespace CustomValidate {
  export class reg {
    name?: RegExp;
    nick?: RegExp;
    account?: RegExp;
    phone?: RegExp;
    phoneCode?: RegExp;
    email?: RegExp;
    emailCode?: RegExp;
    pwd?: RegExp;
  }
  export class inp_pwd {
    val?: string;
  }
  export const enterPwd = new inp_pwd();
  export const Reg = new reg();
  export function Name_fun(r: any, v: string, cb: Function) {
    const reg = Reg.name || Regs.name;

    if (!reg.test(v)) {
      cb(new Error("不合法的输入"));
      return false;
    }
    cb();
  }
  export function Nick_fun(r: any, v: string, cb: Function) {
    const reg = Reg.nick || Regs.nick;
    if (!reg.test(v)) {
      cb(new Error("昵称必须为中文"));
      return false;
    }
    cb();
  }
  export function Account_fun(r: any, v: string, cb: Function) {
    const reg = Reg.account || Regs.account;
    if (!reg.test(v)) {
      cb(new Error("账号错误"));
      return false;
    }
    cb();
  }
  export function Phone_fun(rule: any, val: string, cb: Function) {
    const reg = Reg.phone || Regs.phone;
    if (!reg.test(val)) {
      cb(new Error("手机号码格式错误"));
      return false;
    }
    cb();
  }

  export function Message_fun(r: any, v: string, cb: Function) {
    let reg = Reg.phoneCode || Regs.messageCode;
    if (!reg.test(v)) {
      cb(new Error("验证码为数字"));
      return false;
    }
    cb();
  }
  export function Email_fun(r: any, v: string, cb: Function) {
    const reg = Reg.email || Regs.email;
    if (!reg.test(v)) {
      cb(new Error("邮箱格式错误"));
      return false;
    }
    cb();
  }
  export function EmailCode_fun(r: any, v: string, cb: Function) {
    let reg = Reg.emailCode || Regs.emailCode;
    if (!reg.test(v)) {
      cb(new Error("验证码格式错误"));
      return false;
    }
    cb();
  }

  export function PWD_fun(r: any, v: string, cb: Function) {
    const reg = Reg.pwd || Regs.pwd;
    if (!reg.test(v.trim())) {
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
