<template>
    <div class="container">
        <div class="search-bar">
            <input type="search" placeholder="请输入商品名称或店铺名称搜索" />
        </div>

        <SortBar />

        <GoodsList />
    </div>
</template>

<script>
import GoodsList from "../../components/goods-card";
import SortBar from "../../components/sort-bar";
export default {
    data() {
        return {};
    },
    components: {
        GoodsList,
        SortBar,
    },
};
</script>

<style lang="less" scoped>
.search-bar {
    width: 6.356rem;
    height: 0.746rem;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
        width: 5.414rem;
        height: 0.508rem;
        background-color: #f6f6f6;
        border-radius: 0.254rem;
        padding: 0 0.2rem;
        font-size: 0.181rem;
    }
}
</style>