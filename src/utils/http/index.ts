import { globSetting } from './setting';
import { RespResultCode } from './code';
import { clearStorage, getToken } from '@/store/app';

export enum ContentTypeEnum {
    // json
    JSON = 'application/json;charset=UTF-8',
    // form-data qs
    FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
    // form-data  upload
    FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

export enum UniMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export interface createUniRequestOptions {
    url: string;
    params: any;
    method?: UniMethod;
    header?: any;
}

function createUniRequest(opt: createUniRequestOptions): Promise<any> {
    const defHeader = { 'Content-Type': ContentTypeEnum.JSON, token: getToken() };
    const option = {
        url: `${globSetting.apiUrl}${opt.url}`, //仅为示例，并非真实接口地址。
        data: opt.params,
        method: opt.method || UniMethod.GET,
        header: opt.header || defHeader,
    }
    return new Promise((resolve, reject) => {
        uni.request({
            ...option,
            success: (res: any) => {
                if ([RespResultCode.Success, RespResultCode.NewUser, undefined].includes(res?.data?.status?.code)) {
                    resolve(res.data)
                } else if ([RespResultCode.NoToken].includes(res?.data?.status?.code)) {
                    uni.showModal({
                        title: `请登录`,
                        content: ``,
                        success: function (res) {
                            if (res.confirm) {
                                uni.navigateTo({url: `/pages/login/login`});
                            }
                        },
                    });
                } else if ([RespResultCode.ExitedToken, RespResultCode.TimeExpire].includes(res?.data?.status?.code)) {
                    uni.showModal({
                        title: `登录已过期，请重新登录`,
                        content: ``,
                        success: function (res) {
                            if (res.confirm) {
                                clearStorage() // 登录过期 清除所有Storage;
                                uni.navigateTo({url: `/pages/login/login`});
                            }
                        },
                    });
                } else {
                    uni.showToast({
                        title: `${res?.data?.status?.code} : ${res.errMsg}`,
                        icon: 'error',
                        duration: 2000,
                    })
                }
            },
            fail: (fail) => {
                console.error(fail)
                reject(fail)
            }
        });
    })
}

export const defHttp = createUniRequest;