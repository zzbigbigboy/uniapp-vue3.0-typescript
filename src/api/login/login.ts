import { globSetting } from '@/utils/http/setting';
import { defHttp, UniMethod } from '../../utils/http/index';
import { AssetTokenResp, BindPhoneParams, BindPhoneResp, LoginParams, LoginResp, RegisterParams, RegisterResp } from '../model/loginModel';

export const loginWx = (params: LoginParams): Promise<LoginResp> =>
    defHttp({ url: '/auth/auth/login', params: { ...params, app: globSetting.app, type: globSetting.type }, method: UniMethod.POST });

export const registerUser = (params: RegisterParams): Promise<RegisterResp> =>
    defHttp({ url: '/auth/auth/decrypt', params, method: UniMethod.POST });

export const bindPhone = (params: BindPhoneParams): Promise<BindPhoneResp> =>
    defHttp({ url: '/auth/auth/bind', params, method: UniMethod.POST });

export const getAssetToken = (): Promise<AssetTokenResp> =>
    defHttp({ url: '/media/asset/token', params: {}, method: UniMethod.POST });
