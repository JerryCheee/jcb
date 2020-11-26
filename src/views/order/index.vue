<template>
    <div class="order-wrap">
        <tabs
            v-model="tabIdx"
            line-width="0.452rem"
            line-height="0.068rem"
            color="#2ecb62"
            animated
            swipeable
            sticky
        >
            <tab
                v-for="(item, index) in tabs"
                :key="index"
                :title="item.title"
                :name="item.name"
            >
                <OrderList :status="tabIdx" />
            </tab>
        </tabs>
    </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import OrderList from "../../components/order/order-list";
export default {
    data() {
        return {
            tabIdx: "",
            tabs: [
                { name: "", title: "全部" },
                { name: "1", title: "待支付" },
                { name: "2", title: "待发货" },
                { name: "6", title: "已完成" },
            ],
        };
    },
    methods: {},
    created() {
        let type = this.$route.query.type || 0;
        this.tabIdx = type;
    },
    components: {
        Tab,
        Tabs,
        OrderList,
    },
};
</script>

<style lang="less" scoped>
.order-wrap {
    background-color: #f6f6f6;
}
.tab {
    height: 0.68rem;
}

/deep/.van-tab {
    color: #1a1a1a;
}
/deep/ .van-tab__pane-wrapper {
    min-height: 80vh;
}
</style>