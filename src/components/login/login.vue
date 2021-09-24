<template>
	<view class="content">
		<view class="">
			<uni-card
			    title="标题文字"
			    mode="style"
			    :is-shadow="true"
			    thumbnail="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
			    extra="Dcloud 2019-05-20 12:32:19"
			    note="Tips"
			>
			        uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可编译到iOS、Android、H5、以及各种小程序等多个平台。即使不跨端，uni-app同时也是更好的小程序开发框架。
			</uni-card>
		</view>
		<button type="default" open-type="getUserInfo" @getuserinfo="decryptUserInfo">获取用户信息</button>
	</view>
</template>

<script lang="ts">
	export default {
		name: "LoginComponent",
		data() {
			return {

			};
		},
		onLoad() {

		},
		methods: {
			decryptUserInfo(e: any) {
				console.log('getUserInfo', e)
			},

			decryptPhoneNumber(e: any) {
				console.log(e)
			}
		}
	}
</script>

<style scoped src="./login.css"></style>
