import { RespResultCode, RespResultStatus } from "@/utils/http/code";

export interface BaseResp {
    [propName: string]: any, //添加任意属性
    status: RespResultStatus;
}

export interface BasicListResult<T extends any> {
    list: T[];
    status: RespResultStatus;
}
  