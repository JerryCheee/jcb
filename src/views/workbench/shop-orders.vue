<template>
    <div class="page">
        <tabs
            v-model="active"
            line-width="0.452rem"
            line-height="0.068rem"
            color="#2ecb62"
            animated
            swipeable
            sticky
            @click="clickHandle"
        >
            <tab
                v-for="(item, index) in tabs"
                :key="index"
                :name="item.name"
                :title="item.title"
                replace
            >
                <ShopOrderList :status="active" />
            </tab>
        </tabs>
    </div>
</template>

<script>
import { Tab, Tabs, List } from "vant";
import ShopOrderList from "../../components/shop-order-list";
export default {
    data() {
        return {
            loading: false,
            finished: false,
            active: "",
            tabs: [
                { name: "", title: "全部" },
                { name: "1", title: "待支付" },
                { name: "2", title: "待收货" },
                { name: "6", title: "已完成" },
                { name: "5", title: "退货售后" },
            ],
        };
    },
    created() {
        this.active = this.$route.params.state;
    },
    methods: {
        clickHandle(e) {
            this.$router.replace("/workbench/shop-orders/" + e);
        },
    },
    components: {
        Tab,
        Tabs,
        ShopOrderList,
    },
};
</script>

<style lang="less" scoped>
/deep/ .van-tab {
    font-size: 0.215rem;
    color: #1a1a1a;
}
/deep/ .van-tab--active {
    font-weight: bold;
}
/deep/ .van-tab__pane-wrapper {
    min-height: 80vh;
}
</style>