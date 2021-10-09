export interface UploadAssetResp {
    bucket: string;
    fileURL: string;
    hash: string;
    imageURL: string;
    img: UploadAssetImg;
    key: string;
    name: string;
    size: number;
    type: string;
    uuid: string;
}

export interface UploadAssetImg {
    colorModel: string,
    format: string;
    height: number;
    width: number;
    size: number;
}