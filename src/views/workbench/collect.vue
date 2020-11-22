<template>
    <div class="container">
        <SortBar />

        <GoodsList v-if="list.length" :goods_list="list" />
        <empty description="暂无收藏" v-show="list.length==0"></empty>
    </div>
</template>

<script>
import GoodsList from "../../components/goods-card";
import SortBar from "../../components/sort-bar";
import api from "../../api/user";
import { Empty } from "vant";
export default {
    data() {
        return {
            params: {
                pageNo: 1,
                pageSize: 10,
                type: 1
            },
            list: []
        };
    },
    created() {
        this.getCollectList();
    },
    methods: {
        async getCollectList() {
            let res = await api.getCollectList(this.params);
            this.list = res.result || [];
        }
    },
    components: {
        GoodsList,
        SortBar,
        Empty
    }
};
</script>

<style lang="less" scoped>
</style>