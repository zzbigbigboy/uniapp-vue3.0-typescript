import { RespResultCode, RespResultStatus } from "@/utils/http/code";

export interface LoginParams {
    readonly type?: number;
    readonly app?: string;
    key: string;
    value?: string;
}

export interface LoginResp {
    status: RespResultStatus;
}