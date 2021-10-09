
export enum HistoricalTypeEnum {
    GET = 1,
    SET = 2,
    REVERT = 3,
}

export interface HistoricalItemModel {
    id: string;
    date: number; // 操作时间
    name: string; // 箱子名称
    user: string; // 操作用户
    goodName: string; // 物品名称
    type: HistoricalTypeEnum; // 操作类型
    phone: string; // 操作人联系方式
    new: boolean; // 查看过否

    show: boolean; // 显示联系人
}