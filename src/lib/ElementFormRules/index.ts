import CustomValidate from "@/lib/Reg/regFun";

namespace ElementFromRules {
  /**
   * elementui from  表单校验rules 规则
   */
  export class defalultRules {
    Name: Array<any> = [
      {
        required: true,
        message: "姓名不能为空",
      },
      {
        validator: CustomValidate.ValiteName_fun,
        trigger: "blur",
      },
    ];
    NickName: Array<any> = [
      {
        required: true,
        message: "昵称不能为空",
      },
      {
        validator: CustomValidate.ValiteNick_fun,
        trigger: "blur",
      },
    ];
    Account: Array<any> = [
      {
        required: true,
        message: "账号不能为空",
      },
      {
        validator: CustomValidate.ValiteAccount_fun,
        trigger: "blur",
      },
    ];
    Phone: Array<any> = [
      {
        required: true,
        message: "电话号码不能为空",
      },
      {
        validator: CustomValidate.ValitePhone_fun,
        trigger: "blur",
      },
    ];
    MessageCode: Array<any> = [
      {
        required: true,
        message: "短信验证码不能为空",
      },
      {
        validator: CustomValidate.ValiteMessage_fun,
        trigger: "blur",
      },
    ];
    Email: Array<any> = [
      {
        required: true,
        message: "邮箱不能为空",
      },
      {
        validator: CustomValidate.ValiteEmail_fun,
        trigger: "blur",
      },
    ];
    EmailCode: Array<any> = [
      {
        required: true,
        message: "邮箱验证码不能为空",
      },
      {
        validator: CustomValidate.ValiteEmailCode_fun,
        trigger: "blur",
      },
    ];
    PWD: Array<any> = [
      {
        required: true,
        message: "密码不能为空",
      },
      {
        validator: CustomValidate.ValitePWD_fun,
        trigger: "blur",
      },
    ];
    RPWD: Array<any> = [
      {
        required: true,
        message: "重复密码不能为空",
      },
      {
        validator: CustomValidate.ValitePWD_fun,
        trigger: "blur",
      },
    ];
  }
}

export default ElementFromRules;
