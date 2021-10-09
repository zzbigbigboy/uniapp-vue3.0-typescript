<template>
    <view class="body">
        <view class="header" :style="{paddingTop: isTemp.statusBarHeight + 'px'}">
            <button open-type="getPhoneNumber" @click="onGetUserInfo"
                    @getphonenumber="decryptPhoneNumber">
                <image
                    mode="widthFix"
                    :src="userInfo.avatarUrl || `/static/img/index-nologin.png`"
                ></image>
                <view class="name">{{ userInfo.nickName || `未登录` }}</view>
            </button>
        </view>
    </view>
</template>

<script lang="ts">
interface UserInfo {
    nickName: string;
    avatarUrl: string;
    gender: number;
    province: string; //性别 0：未知、1：男、2：女
    city: string;
    country: string;
}
import { getOpenid, getUserInfo, keepToken, keepUserInfo } from "@/store/app";
import { defineComponent, ref } from "vue";
import { globalStoreKey } from "@/store";
import { mapGetters, mapState, useStore } from 'vuex';
import { BindPhoneParams, RegisterParams } from "@/api/model/loginModel";
import { bindPhone, registerUser } from "@/api/login/login";
async function setRegisterUser(params: RegisterParams) {
    const res = await registerUser(params);
    const { phoneNumber } = JSON.parse(res.data);
    const bindParams: BindPhoneParams = {
        phone: phoneNumber,
        openid: getOpenid(),
    };
    const bindRes = await bindPhone(bindParams);
    keepToken(bindRes.token);
    uni.navigateBack({delta: 1})
}
export default defineComponent({
    name: "index_header",
    computed: {
        ...mapState({
            userInfo: (state: any) => state.userInfo,
            isTemp: (state: any) => state.isTemp,
        })
    },
    setup() {
        const store = useStore(globalStoreKey)
        function decryptPhoneNumber(e: any) {
            if (store.state.userInfo?.nickName) return;
            const params: RegisterParams = {
                data: e.detail.encryptedData,
                iv: e.detail.iv,
                open: getOpenid(),
            }
            setRegisterUser(params)
        }
        function onGetUserInfo() {
            if (store.state.userInfo?.nickName) return;
            // uni.navigateTo({ url: `/pages/login/login` });
            uni.getUserProfile({
                desc: "Wexin", // 这个参数是必须的
                success: (res: UniApp.GetUserProfileRes) => {
                    const userInfo: UniApp.UserInfo = res.userInfo;
                    keepUserInfo(userInfo);
                    store.commit('UPDATE_USER_INFO', userInfo);
                },
                fail: (err) => {
                    console.log(err);
                },
            });
        }
        return {
            onGetUserInfo, decryptPhoneNumber
        };
    },
});
</script>
<style lang="scss" scoped src="./index_header.scss"></style>
