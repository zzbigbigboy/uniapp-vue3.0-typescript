import { AssetTokenResp } from "@/api/model/loginModel";

let assetSeting: AssetTokenResp;

export enum KeepStorageEnums {
    Openid = 'openid',
    Token = 'token',
    UserInfo = 'userinfo',
}

function keepToken(token: string): void {
    uni.setStorageSync(KeepStorageEnums.Token, token);
}

function getToken(): string {
    return uni.getStorageSync(KeepStorageEnums.Token);
}


function keepOpenid(openid: string): void {
    uni.setStorageSync(KeepStorageEnums.Openid, openid);
}

function getOpenid(): string {
    return uni.getStorageSync(KeepStorageEnums.Openid);
}

function keepAssetSeting(seting: AssetTokenResp): void {
    assetSeting = seting;
}

function getAssetSeting(): AssetTokenResp {
    return assetSeting;
}

function keepUserInfo(userInfo: UniApp.UserInfo): void {
    const str = JSON.stringify(userInfo);
    uni.setStorageSync(KeepStorageEnums.UserInfo, str);
}

function getUserInfo(): UniApp.UserInfo {
    const str = uni.getStorageSync(KeepStorageEnums.UserInfo);
    return str.length ? JSON.parse(str) : null;
}


function clearStorage (): void {
    uni.removeStorageSync(KeepStorageEnums.Token);
    uni.removeStorageSync(KeepStorageEnums.Openid);
    uni.removeStorageSync(KeepStorageEnums.UserInfo);
}


export {
    keepOpenid, getOpenid, keepToken, getToken, keepAssetSeting, 
    getAssetSeting, keepUserInfo, getUserInfo, clearStorage
}