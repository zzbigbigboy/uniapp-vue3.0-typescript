import { defHttp, UniMethod } from '../../utils/http/index';
import { BoxListResultModel } from '../model/boxModel';

export const getBoxList = (): Promise<BoxListResultModel> => 
    defHttp({url: '/api/boxs', params: {}, method: UniMethod.POST})