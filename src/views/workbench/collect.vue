<template>
    <div class="container">
        <!-- <SortBar /> -->

        <list
            v-model="loading"
            :finished="finished"
            :finished-text="emptyText"
            @load="getList"
        >
            <GoodsList :goods_list="list" />

            <empty
                description="暂无收藏"
                v-show="list.length == 0 && finished"
            ></empty>
        </list>
    </div>
</template>

<script>
import GoodsList from "../../components/goods-card";
import SortBar from "../../components/sort-bar";
import api from "../../api/user";
import { Empty, List } from "vant";
export default {
    data() {
        return {
            loading: false,
            finished: false,
            emptyText: "",
            params: {
                pageNo: 1,
                pageSize: 10,
                type: 1,
                source: 2,
            },
            list: [],
        };
    },
    created() {},
    methods: {
        async getList() {
            this.loading = true;
            var timer = setTimeout(async () => {
                clearTimeout(timer);
                let res = await api.getCollectList(this.params);
                this.loading = false;
                if (
                    !res.success ||
                    !res.result ||
                    res.result.lists.length == 0
                ) {
                    this.finished = true;
                } else {
                    var list = res.result.lists;
                    // list = list.map(v=>{
                    //     v.productId = v.commodityId
                    //     // v.commodityId = v.productId
                    //     return v
                    // })
                    list = list.map((v) => {
                        return {
                            productId: v.commodityId,
                            productName: v.commodityName,
                            purchasePrice: v.paymentPrice,
                            saleCount: v.saleCount,
                            pic: v.pic,
                        };
                    });
                    this.list = [...this.list, ...list];
                }
                if (!res.success) {
                    Toast("获取商品失败!");
                    return;
                }
                if (this.list.length > 0) this.emptyText = "没有更多了";
                this.params.pageNo++;
            }, 500);
        },
    },
    components: {
        GoodsList,
        SortBar,
        Empty,
        List,
    },
};
</script>

<style lang="less" scoped>
</style>