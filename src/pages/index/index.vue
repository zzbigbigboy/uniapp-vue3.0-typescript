<template>
    <view class="content">
        <index-header></index-header>
        <box-list></box-list>
    </view>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import IndexHeader from "../../components/index_header/index_header.vue";
    import BoxList from "../../components/box_list/box_list.vue";
    export default defineComponent({
        components: {
            IndexHeader,
            BoxList,
        },
        setup() {
            return {
                title: "hello",
            };
        },
    });
</script>
<style lang="scss" scoped src="./index.scss"></style>
