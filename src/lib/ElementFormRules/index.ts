import CustomValidate from "../../lib/Reg/regFun";

namespace ElementFromRules {
  /**
   * elementui from  表单校验rules 规则
   */
  export const defalultRules = {
    Name: [
      {
        required: true,
        message: "姓名不能为空",
      },
      {
        validator: CustomValidate.ValiteName,
        trigger: "blur",
      },
    ],
    NickName: [
      {
        required: true,
        message: "昵称不能为空",
      },
      {
        validator: CustomValidate.ValiteNick,
        trigger: "blur",
      },
    ],
    Account: [
      {
        required: true,
        message: "账号不能为空",
      },
      {
        validator: CustomValidate.ValiteAccount,
        trigger: "blur",
      },
    ],
    Phone: [
      {
        required: true,
        message: "电话号码不能为空",
      },
      {
        validator: CustomValidate.ValitePhone,
        trigger: "blur",
      },
    ],
    MessageCode: [
      {
        required: true,
        message: "短信验证码不能为空",
      },
      {
        validator: CustomValidate.ValiteMessage,
        trigger: "blur",
      },
    ],
    Email: [
      {
        required: true,
        message: "邮箱不能为空",
      },
      {
        validator: CustomValidate.ValiteEmail,
        trigger: "blur",
      },
    ],
    EmailCode: [
      {
        required: true,
        message: "邮箱验证码不能为空",
      },
      {
        validator: CustomValidate.ValiteEmailCode,
        trigger: "blur",
      },
    ],
    PWD: [
      {
        required: true,
        message: "密码不能为空",
      },
      {
        validator: CustomValidate.ValitePWD,
        trigger: "blur",
      },
    ],
    RPWD: [
      {
        required: true,
        message: "重复密码不能为空",
      },
      {
        validator: CustomValidate.ValitePWD,
        trigger: "blur",
      },
    ],
  };
}

export default ElementFromRules;
