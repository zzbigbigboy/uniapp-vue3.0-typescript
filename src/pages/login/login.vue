<template>
	<view class="body">
		<view class="header">
				<image mode="widthFix" src="../../static/img/head.jpg"></image>
				<view class="name">aLIEz</view>
		</view>
		<view class="line"></view>
		<view class="content">
			<image mode="widthFix" src="../../static/img/id-card.png"></image>
			<view class="text">请先登录账号</view>
			<view class="login_btn">
				<button class="loginBtn" type="default" open-type="getPhoneNumber"
					@getphonenumber="decryptPhoneNumber">登录</button>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
    import {
        defineComponent
    } from "vue";
    export default defineComponent({
        setup() {
            function decryptPhoneNumber(e: any) {
                console.log(e);
            }

            return {
                title: "hello",
            };
        },
    });
</script>
<style scoped lang="scss" src="./login.scss"></style>
