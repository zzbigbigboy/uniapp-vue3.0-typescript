<template>
    <view class="un_popups">
        <uni-popup ref="popup_success" type="message">
            <uni-popup-message
                type="success"
                message="操作成功"
                :duration="2000"
            ></uni-popup-message>
        </uni-popup>
        <uni-popup ref="popup_error" type="message">
            <uni-popup-message
                type="error"
                message="操作失败"
                :duration="2000"
            ></uni-popup-message>
        </uni-popup>
    </view>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { loginWx } from "./api/login/login";
import { getBoxList } from "./api/box/box";
import { RespResultCode } from "./utils/http/code";
export default defineComponent({
    async onLaunch() {
        console.log("App Launch");
        // 登录
        // const res = await getBoxList()
        // console.log(res)
        uni.login({
            provider: "weixin",
            onlyAuthorize: true,
            success: async function (loginRes) {
                if (loginRes.errMsg.indexOf("ok") > -1) {
                    const code = loginRes.code;
                    const res = await loginWx({ key: code });
                    switch (res.status.code) {
                        case RespResultCode.Success:
                            break;
                        case RespResultCode.NewUser:
                            const option: UniApp.SetStorageOptions = {key: 'openid', data: res.status.error}; 
                            uni.setStorage(option); // 存储openid
                            // uni.navigateTo({url: `/pages/login/login`})
                            break;
                        default:
                            break;
                    }
                }
            },
            fail: function (error) {
                console.log(error);
            },
        });
    },
    onShow() {
        console.log("App Show");
    },
    onHide() {
        console.log("App Hide");
    },
});
</script>
<style>
/*每个页面公共css */
</style>
