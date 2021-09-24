import { defHttp, UniMethod } from '../../utils/http/index';
import { LoginParams, LoginResp } from '../model/loginModel';

export const loginWx = (params: LoginParams): Promise<LoginResp> => 
    defHttp({url: '/auth/auth/login', params: {...params, app: '', type: 3}, method: UniMethod.POST})