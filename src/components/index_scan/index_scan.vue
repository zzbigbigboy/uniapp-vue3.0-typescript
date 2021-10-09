<template>
    <view class="body">
        <view class="title">
            <i></i>
            <view class="text" @click="cons">小美保管箱</view>
            <view class="icon" @click="onHisClick()">
                <image
                    class="img"
                    mode="widthFix"
                    src="/static/img/index-history.png"
                ></image>
                <view class="num"></view>
            </view>
        </view>
        <view class="btn">
            <button type="default" @click="onBtnClick()">
                <image
                    class="icon"
                    mode="widthFix"
                    src="/static/img/index-scan.png"
                ></image>
                扫码开锁
            </button>
        </view>

        <popup :visible="data.visible" @close="handleCancel()" @ok="handleOk()">
            <view class="open_lock_popup">
                <image
                    class="cover"
                    mode="widthFix"
                    :src="data.lock_cover"
                ></image>
                <view class="label">{{ data.lock_label }}</view>
                <view class="msg">{{ data.lock_msg }}</view>
                <button
                    v-show="data.lock_status == LockStatusEnums.Wait"
                    class="ok"
                    type="default"
                    @click="handleChangeLockStatus(LockStatusEnums.Load)"
                >
                    开锁
                </button>
                <button
                    v-show="data.lock_status == LockStatusEnums.Fail"
                    class="ok"
                    type="default"
                    @click="handleChangeLockStatus(LockStatusEnums.Apply)"
                >
                    申请
                </button>
            </view>
        </popup>
    </view>
</template>

<script lang="ts">
enum LockStatusEnums {
    Wait = 1,
    Load = 2,
    Open = 3,
    Fail = 4,
    Apply = 5,
}
enum LockCoverEnums {
    Power = "open_power",
    Nopower = "open_nopower",
}

import { useUniScanCode } from "@/utils/scan";
import { defineComponent, ref, reactive } from "vue";
import popup from "@/components/common/popup/popup.vue";
import store from "@/store";
export default defineComponent({
    name: "index_scan",
    components: { popup },
    setup() {
        let timer: number;
        const data = reactive({
            data: {
                visible: false,
                lock_status: LockStatusEnums.Wait,
                lock_cover: `/static/img/${LockCoverEnums.Power}.png`,
                lock_time: 10,
                lock_label: "确认开锁",
                lock_msg: "开锁后会生成记录",
            },
        });
        const onBtnClick = () => useUniScanCode((result) => {
            console.log(result)
            handleChangeLockStatus(LockStatusEnums.Wait);
        });
        const onHisClick = () =>
            uni.navigateTo({
                url: `/pages/device_historical/device_historical`,
            });

        const showSure = (val: any) => {
            console.log(val);
        };

        function handleCancel() {
            data.data.visible = false;
        }
        function handleOk() {
            data.data.visible = false;
        }
        function handleChangeLockStatus(status: LockStatusEnums) {
            data.data.lock_status = status;
            if (timer) clearInterval(timer);
            switch (status) {
                case LockStatusEnums.Wait:
                    data.data.visible = true;
                    data.data.lock_label = "确认开锁";
                    data.data.lock_msg = "开锁后会生成记录";
                    data.data.lock_cover = `/static/img/${LockCoverEnums.Power}.png`;
                    data.data.lock_time = 10;
                    break;
                case LockStatusEnums.Load:
                    data.data.lock_label = "开锁中..";
                    data.data.lock_msg = `请在${data.data.lock_time}秒内打开柜门`;
                    data.data.lock_cover = `/static/img/${LockCoverEnums.Power}.png`;
                    timer = setInterval(() => {
                        if (data.data.lock_time > 0) {
                            data.data.lock_time = data.data.lock_time - 1;
                            data.data.lock_msg = `请在${data.data.lock_time}秒内打开柜门`;
                            if(data.data.lock_time < 5) { // 开锁成功
                                clearInterval(timer);
                                handleChangeLockStatus(LockStatusEnums.Open);
                            }
                        } else { // 开锁失败
                            clearInterval(timer);
                            handleChangeLockStatus(LockStatusEnums.Fail);
                        }
                    }, 1000);
                    break;
                case LockStatusEnums.Open:
                    data.data.lock_label = "解锁成功";
                    data.data.lock_msg = "开锁后会生成记录";
                    setTimeout(() => {
                        uni.navigateTo({url: `/pages/goods_list/goods_list`})
                        data.data.visible = false;
                    }, 1500)
                    break;
                case LockStatusEnums.Fail:
                    data.data.lock_label = "解锁失败";
                    data.data.lock_msg = "需向管理员申请权限";
                    data.data.lock_cover = `/static/img/${LockCoverEnums.Nopower}.png`;
                    data.data.lock_time = 10;
                    break;
                case LockStatusEnums.Apply:
                    data.data.visible = false;
                    uni.showToast({
                        title: `已提交申请`,
                        icon: "success",
                        duration: 2000,
                        complete: function () {
                            
                        },
                    });
                    break;
                default:
                    break;
            }
        }
        // function handleApply() {
        //     // uni.navigateTo({
        //     //     url: `/pages/device_historical/device_historical`,
        //     // });
        // }
        function cons () {
            console.log(store.state)
        }
        return {
            ...data,
            onBtnClick,
            onHisClick,
            showSure,
            handleOk,
            handleCancel,
            handleChangeLockStatus,
            LockStatusEnums,
            cons
        };
    },
});
</script>
<style lang="scss" scoped src="./index_scan.scss"></style>
