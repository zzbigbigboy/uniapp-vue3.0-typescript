export interface RespResultStatus {
  code: RespResultCode,
  error: string,
}

export enum RespResultCode {
  Success = 0,
  NoAdmin = 1,
  NoToken = 6,
  ExitedToken = 8,
  TimeExpire = 20, //登录到期
  NewUser = 99, //新用户
}
