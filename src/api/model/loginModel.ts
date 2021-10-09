import { RespResultCode, RespResultStatus } from "@/utils/http/code";

export interface LoginParams {
    readonly type?: number;
    readonly app?: string;
    key: string;
    value?: string;
}

export interface LoginResp {
    oid: string;
    token: string;
    status: RespResultStatus;
}

export interface RegisterParams {
    data: string, 
    iv: string, 
    open: string
}

export interface RegisterResp {
    data: string;
    status: RespResultStatus;
}

export interface BindPhoneParams {
    phone: string, 
    openid: string, 
}

export interface BindPhoneResp {
    token: string;
    status: RespResultStatus;
}

export interface AssetTokenResp {
    bucket: string;
    domain: string;
    expire: number;
    limit: number;
    token: string;
    status: RespResultStatus;
}