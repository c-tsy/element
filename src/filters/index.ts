import { Vue } from "vue-property-decorator";

import User from "@ctsy/api-sdk/dist/modules/User";

/**
 * 对性别进行过滤
 * @param v
 */
export const rSex = (v: number) => {
  return User.Sex[v];
};

/**
 * 对用户状态过滤
 */
export const UserStatus = (v: number) => {
  return User.Status[v];
};
