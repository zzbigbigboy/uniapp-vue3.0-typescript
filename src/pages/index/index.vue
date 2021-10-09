<template>
    <view class="content">
        <index-header></index-header>
        <index-scan ref="RefIndexScan"></index-scan>
    </view>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import IndexHeader from "../../components/index_header/index_header.vue";
import IndexScan from "../../components/index_scan/index_scan.vue";
export default defineComponent({
    name: "index",
    components: {
        IndexHeader,
        IndexScan,
    },
    setup() {
        const RefIndexScan = ref();
        onMounted (() => {
            // 4、调用子组件中的getList()方法
            // console.log(RefIndexScan.value.showSure())
        })
        return {
            RefIndexScan,
        };
    },
});
</script>
<style lang="scss" scoped src="./index.scss"></style>
