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
import { getAssetToken, loginWx } from "./api/login/login";
import { RespResultCode } from "./utils/http/code";
import { keepAssetSeting, keepOpenid, keepToken } from "./store/app";
import { globalStoreKey, IsTempInfo } from "./store";
import { useStore } from 'vuex';
export default defineComponent({
    async onLaunch() {
        const store = useStore(globalStoreKey);
        console.log("App Launch");
        const isTemp: IsTempInfo = {} as IsTempInfo;
        uni.getSystemInfo({
			success(res: any) {
				let totalTopHeight = 68
				if (res.model.indexOf('iPhone X') !== -1) {
					totalTopHeight = 88
				} else if (res.model.indexOf('iPhone') !== -1) {
					totalTopHeight = 64
				}
				isTemp['statusBarHeight'] = res.statusBarHeight
				isTemp['titleBarHeight'] = totalTopHeight - res.statusBarHeight
				isTemp['allHeight'] = totalTopHeight
                store.commit('UPDATE_IS_TEMP', isTemp);
                console.log(isTemp)
			},
			fail(e) {
                
			}
		})
        // 登录
        uni.login({
            provider: "weixin",
            onlyAuthorize: true,
            success: async function (loginRes) {
                if (loginRes.errMsg.indexOf("ok") > -1) {
                    const code = loginRes.code;
                    const res = await loginWx({ key: code });
                    switch (res.status?.code) {
                        case RespResultCode.Success || undefined:
                            keepToken(res.token)
                            keepOpenid(res.oid);
                            const assetRes = await getAssetToken();
                            keepAssetSeting(assetRes);
                            break;
                        case RespResultCode.NewUser:
                            keepOpenid(res.status?.error);
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
