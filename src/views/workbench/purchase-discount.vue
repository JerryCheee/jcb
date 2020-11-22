<template>
    <div class="coupon-center-wrap">
        <tabs
            v-model="active"
            line-width=""
            color="#2ecb62"
            title-inactive-color="#1a1a1a"
            title-active-color="#1a1a1a"
            animated
            swipeable
        >
            <tab v-for="(item, index) in tabsName" :key="index" :title="item">
                <coupon-list :index="index" />
            </tab>
        </tabs>
    </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import CouponList from "../../components/coupon-list";
export default {
    data() {
        return {
            active: 0,
            tabsName: ["领券中心", "未使用", "已使用", "已过期"],
        };
    },
    components: {
        Tab,
        Tabs,
        CouponList,
    },
};
</script>

<style lang="less" scoped>
</style>