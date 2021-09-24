import { RespResultCode, RespResultStatus } from "@/utils/http/code";
import { BasicListResult } from "../baseModel";

export interface BoxListItem {
    id: string;
    name: string;
}

// export interface BoxParams {
//     readonly type?: number;
//     readonly app?: string;
//     key: string;
//     value?: string;
// }

export type BoxListResultModel = BasicListResult<BoxListItem>;