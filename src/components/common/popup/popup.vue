<template>
    <transition name="modal-pop">
        <view class="popup" v-if="visible">
            <view class="popup_mask" @click="emit('close', false)"></view>
            <view class="popup_modal">
                <view
                    class="popup_content"
                    :style="{
                        width: width + 'rpx',
                    }"
                >
                    <view class="popup_header">
                        <view class="title" v-show="title">{{title}}</view>
                        <view class="icons">
                            <image
                                class="icon"
                                mode="widthFix"
                                src="/static/img/icon/close.png"
                                @click="emit('close', false)"
                            ></image>
                        </view>
                    </view>
                    <view class="popup_line" v-show="line"></view>
                    <view class="popup_body">
                        <slot></slot>
                    </view>
                    <view class="popup_line" v-show="line"></view>
                    <view class="popup_footer" v-if="footer">
                        <button class="cancel" type="default" @click="emit('close', false)">{{cancelText}}</button>
                        <button class="ok" type="default" @click="emit('ok', false)">{{okText}}</button>
                    </view>
                </view>
            </view>
        </view>
    </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SvgIcon from '../common/svgicon/index.vue'
// props 为响应式Proxy对象，不可解构;
export default defineComponent({
    name: "popup",
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        width: {
            type: Number,
            default: 520
        },
        title: {
            type: String,
            default: ""
        },
        footer: {
            type: Boolean,
            default: false
        },
        okText: {
            type: String,
            default: "确定"
        },
        cancelText: {
            type: String,
            default: "取消"
        },
        line: {
            type: Boolean,
            default: false
        },
    },
    setup(props, { attrs, slots, emit }) {
        return { emit };
    },
});
</script>
<style lang="scss" scoped src="./popup.scss"></style>
