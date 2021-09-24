<template>
	<view class="body">
		<view class="box" v-for="item in list" :key="item.id">
            <view class="content">
                <image mode="widthFix" class="icon" src="/static/img/index-box.png" />
                <view class="label">{{ item.name }}</view>
			    <view class="num">{{item.num}}<span>件物品</span></view>
            </view>
		</view>
		<view class="box">
            <view class="add_content">
                <image mode="widthFix" class="add_icon" src="/static/img/index-addbox.png" />
                <view class="label">添加柜子</view>
            </view>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		defineComponent
	} from "vue";
	export default defineComponent({
		name: "box_list",
		setup() {
			const list: any[] = [];
			for (let i = 0; i < 3; i++) {
				list.push({
					name: `小美保管箱${i}`,
					id: `box-${i}`,
					num: 3
				});
			}
			return {
				list,
			};
		},
	});
</script>
<style lang="scss" scoped src="./box_list.scss"></style>
