<template>
    <view class="body">
        <image
            class="icon"
            mode="widthFix"
            :style="{width: width, height: width}"
            src="/static/img/icon/loading.png"
            v-show="loading" 
        ></image>
    </view>
</template>

<script lang="ts">
enum defCoverEnums {
    Def = "/static/img/upload-icon.png",
}
import { UploadAssetResp } from "@/api/model/uploadModel";
import { defineComponent, onMounted, ref, unref, nextTick } from "vue";
import { setQiniuUpload } from "../../../api/upload/upload";
export default defineComponent({
    name: "loading",
    props: {
        loading: {
			type: Boolean,
			default: false
		},
        width: {
			type: String,
			default: "100rpx"
		},
    },
    setup(props, { attrs, slots, emit }) {
        

        return {  };
    },
});
</script>
<style lang="scss" scoped src="./loading.scss"></style>
