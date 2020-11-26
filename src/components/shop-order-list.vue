<template>
    <list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
        <ShopOrderCard v-for="(order, n) in list" :key="n" :order="order" />
    </list>
</template>

<script>
import { List } from "vant";
import ShopOrderCard from "./shop-order-card";
import api from "../api/order";
export default {
    props: ["status"],
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            params: {
                getId: this.$store.state.user.storeId,
                pageNo: 1,
                pageSize: 10,
                status: this.status,
            },
        };
    },
    methods: {
        //0-已取消 1-待付款 2-待发货 3-待收货 4-待评价 5-售后/退款 6-已完成 7-待自提 8-已退款
        async onLoad() {
            this.loading = true;
            var timer = setTimeout(async () => {
                clearTimeout(timer);
                let res = await api.getOrderList(this.params);
                this.loading = false;
                if (
                    !res.success ||
                    !res.result ||
                    res.result.records.length == 0
                ) {
                    this.finished = true;
                } else {
                    this.list = [...this.list, ...res.result.records];
                }
                if (!res.success) {
                    Toast("获取数据失败!");
                    return;
                }
                this.params.pageNo++;
            }, 500);
        },
    },
    components: {
        List,
        ShopOrderCard,
    },
};
</script>

<style>
</style>