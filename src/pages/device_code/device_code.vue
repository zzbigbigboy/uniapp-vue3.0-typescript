<template>
    <view class="body">
        <view class="label">填写设备码</view>
        <view class="msg">设备码印刷在设备底部</view>
        <view class="boxs">
            <input
                class="hide_input"
                type="number"
                maxlength="6"
                v-model="state.value"
                :focus="true"
                @input="onInputChange($event.target.value)"
            />
            <view
                class="box"
                v-for="(item, index) in list"
                :key="`box-${index}`"
                :style="{
                    background: item.value
                        ? '#2F80ED'
                        : 'rgba(47, 128, 237, .1)',
                    border: state.error ? '1px solid #FF5555' : 'none',
                }"
            >
                <view class="text">{{ item.value }}</view>
                <view class="focus" v-show="item.focus"></view>
            </view>
        </view>
        <view class="error" v-show="state.error"> 设备码错误请重新输入！ </view>
    </view>
</template>

<script lang="ts">
interface ListItem {
    focus: boolean;
    value: string;
}

import { defineComponent, reactive } from "vue";
export default defineComponent({
    name: "device_code",
    setup() {
        let list: ListItem[] = [];
        for (let i = 0; i < 6; i++) {
            const obj: ListItem = {
                focus: false,
                value: "",
            };
            if (i === 0) obj.focus = true;
            list.push(obj);
        }
        const data = reactive({ list, state: { error: false, value: "" } });
        function clearList() {
            data.list.forEach((el: ListItem) => {
                el.value = "";
                el.focus = false;
            });
        }
        function isVerifyCode(code: string): boolean {
            if (code === "123456") {
                return true;
            }
            return false;
        }
        const onInputChange = (value: string) => {
            data.state.error = false;
            clearList();
            for (let i = 0; i < value.length; i++) {
                const countValue = value.charAt(i);
                data.list[i].value = countValue;
            }
            if (value.length < data.list.length) {
                data.list[value.length].focus = true;
            } else if (value.length === data.list.length) {
                if (isVerifyCode(value)) {
                    uni.showToast({
                        title: `绑定成功`,
                        icon: "success",
                        duration: 2000,
                        complete: function () {
                            setTimeout(() => {
                                uni.navigateBack({
                                    delta: 1,
                                });
                            }, 2000);
                        },
                    });
                } else {
                    data.state.error = true;
                    data.state.value = "";
                    clearList();
                }
            }
            console.log(data);
        };
        return {
            onInputChange,
            ...data,
        };
    },
});
</script>
<style lang="scss" scoped src="./device_code.scss"></style>
