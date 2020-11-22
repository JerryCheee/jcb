<template>
    <list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getSupHomeList"
    >
        <GoodsList :goods_list="goodsList" />
    </list>
</template>

<script>
import GoodsList from "./goods-card";
import api from "../api/product";
import { List, Toast } from "vant";
export default {
    data() {
        return {
            goodsList: [],
            loading: false,
            finished: false,
            goodsParams: {
                pageSize: 10,
                pageNo: 1,
                type: 3,
            },
        };
    },
    methods: {
        async getSupHomeList() {
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
        GoodsList,
        List,
    },
};
</script>

<style>
</style>