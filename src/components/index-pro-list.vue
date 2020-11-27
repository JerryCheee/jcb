<template>
    <list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
        <GoodsList :goods_list="goodsList" />
    </list>
</template>

<script>
import { List } from "vant";
import GoodsList from "./goods-card";
import api from "../api/product";
export default {
    props: ["type"],
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            goodsList: [],
            goodsParams: { pageNo: 1, pageSize: 10, type: this.type },
        };
    },
    methods: {
        //0-已取消 1-待付款 2-待发货 3-待收货 4-待评价 5-售后/退款 6-已完成 7-待自提 8-已退款
        async onLoad() {
            this.loading = true;
            var timer = setTimeout(async () => {
                clearTimeout(timer);
                let res = await api.getSupHomeList(this.goodsParams);
                this.loading = false;
                if (
                    !res.success ||
                    !res.result ||
                    res.result.lists.length == 0
                ) {
                    this.finished = true;
                } else {
                    this.goodsList = [...this.goodsList, ...res.result.lists];
                }
                if (!res.success) {
                    Toast("获取商品失败!");
                    return;
                }
                this.goodsParams.pageNo++;
            }, 500);
        },
    },
    components: {
        List,
        GoodsList,
    },
};
</script>

<style>
</style>