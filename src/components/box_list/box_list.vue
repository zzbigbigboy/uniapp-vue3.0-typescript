<template>
    <view class="body">
        <view class="box" v-for="item in list" :key="item.id" @click="openBox(item)">
            <view class="content">
                <image
                    mode="widthFix"
                    class="icon"
                    src="/static/img/index-box.png"
                />
                <view class="label">{{ item.name }}</view>
                <view class="num">{{ item.num }}<span>件物品</span></view>
            </view>
        </view>
        <view class="box">
            <view class="add_content" @click="onBtnClick()">
                <image
                    mode="widthFix"
                    class="add_icon"
                    src="/static/img/index-addbox.png"
                />
                <view class="label">添加柜子</view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { useUniScanCode } from "@/utils/scan";
import { defineComponent, ref } from "vue";
export default defineComponent({
    name: "box_list",
    setup() {
        const list = ref(<any>[])
        for (let i = 0; i < 3; i++) {
            list.value.push({
                name: `小美保管箱${i}`,
                id: `box-${i}`,
                num: 3,
            });
        }

        const onBtnClick = () => uni.navigateTo({url: `/pages/device_code/device_code`})
        function openBox(item: any) {
            uni.navigateTo({url: `/pages/device_detail/device_detail`})
        }
        return {
            onBtnClick,
            openBox,
            list,
        };
    },
});
</script>
<style lang="scss" scoped src="./box_list.scss"></style>
