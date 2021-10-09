import { getAssetSeting } from "@/store/app";
import { upload } from "@/utils/qiniu";
import { AssetTokenResp } from "../model/loginModel";
import { UploadAssetResp } from "../model/uploadModel";

function getUuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export function setQiniuUpload(filePath: string, callProgress: Function): Promise<UploadAssetResp> {
    const assetSeting: AssetTokenResp = getAssetSeting();
    return new Promise<UploadAssetResp>((resolve, reject) => {
        upload({
            filePath: filePath,
            options: {
                key: getUuid(), // 可选
                region: "SCN", // 可选(默认为'ECN')
                domain: `http://${assetSeting.bucket}.bkt.clouddn.com`,
                uptoken: assetSeting.token, // 以下三选一
                uptokenURL: "",
                uptokenFunc: () => {
                    return "[yourTokenString]";
                },
                shouldUseQiniuFileName: false, // 默认true
            },
            before: () => {
                // 上传前
                console.log("before upload");
            },
            success: (res: UploadAssetResp) => {
                //   const sizeKB = res.fsize / 1024;
                resolve(res)
                console.log(res);
                // console.log('file url is: ' + res.fileURL);
            },
            fail: (err: any) => {
                console.log("error:" + err);
                reject(err);
            },
            progress: (res: any) => {
                callProgress(res.progress);
                // console.log('上传进度', res.progress)
                // console.log('已经上传的数据长度', res.totalBytesSent)
                // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
            },
            complete: (err: any) => {
                // 上传结束
                console.log("upload complete");
            },
        });
    })
}