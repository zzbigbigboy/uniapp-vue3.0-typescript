<template>
    <view class="body">
        <view class="upload_box" @click="onUpload()">
            <image
                class="icon"
                mode="widthFix"
                :src="cover"
            ></image>
            <view class="loading">
                <loading :loading="loading" :width="'100%'"></loading>
            </view>
        </view>
        <uni-popup id="popup" ref="popup" type="bottom"
            >底部弹出 Popup</uni-popup
        >
    </view>
</template>

<script lang="ts">
enum defCoverEnums {
    Def = "/static/img/upload-icon.png",
}
import { UploadAssetResp } from "@/api/model/uploadModel";
import { defineComponent, onMounted, ref, unref, nextTick } from "vue";
import { setQiniuUpload } from "../../../api/upload/upload";
import Loading from '../loading/loading.vue'
export default defineComponent({
    name: "upload",
    props: [],
    components: { Loading },
    setup(props, { attrs, slots, emit }) {
        const cover = ref('/static/img/upload-icon.png');
        const loading = ref(false);
        const popup = ref();
        onMounted(() => {});
        function onOpen() {
            console.log(popup);
        }

        function callProgress(progress: number) {
            if(progress >= 100) {
                loading.value = false;
            }
        }

        function onUpload() {
            if(loading.value) return;
            uni.chooseImage({
                success: async (chooseImageRes) => {
                    loading.value = true;
                    const tempFilePaths = chooseImageRes.tempFilePaths;
                    const asset: UploadAssetResp = await setQiniuUpload(tempFilePaths[0], callProgress);
                    console.log('asset', asset)
                    cover.value = tempFilePaths[0];
                },
            });
        }

        return { onOpen, popup, onUpload, cover, loading };
    },
});
</script>
<style lang="scss" scoped src="./upload.scss"></style>
