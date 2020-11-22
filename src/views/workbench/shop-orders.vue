<template>
    <div class="page">
        <tabs
            v-model="active"
            line-width="0.452rem"
            line-height="0.068rem"
            color="#2ecb62"
            animated
            swipeable
            @click="clickHandle"
        >
            <tab
                v-for="(item, index) in tabs"
                :key="index"
                :title="item"
                replace
            >
                <list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                >
                    <ShopOrderCard
                        v-for="(order, n) in 6"
                        :key="n"
                        :order="order"
                    />
                </list>
            </tab>
        </tabs>
    </div>
</template>

<script>
import { Tab, Tabs, List } from "vant";
import ShopOrderCard from "../../components/shop-order-card";
export default {
    data() {
        return {
            loading: false,
            finished: false,
            active: 0,
            tabs: ["全部", "待支付", "待收货", "已完成", "退货售后"],
        };
    },
    created() {
        this.active = Number(this.$route.params.state || 0);
    },
    methods: {
        onLoad() {
            setTimeout(() => {
                this.finished = true;
            }, 1500);
        },
        clickHandle(e) {
            this.$router.push("/workbench/shop-orders/" + e);
        },
    },
    components: {
        Tab,
        Tabs,
        List,
        ShopOrderCard,
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
</style>