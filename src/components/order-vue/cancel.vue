<template>
    <div class="wait-consignment-wrap">
        <top-header status="已取消" :order="order"> </top-header>

        <div class="content">
            <!-- 物流信息 -->
            <other-info cancel :order="order"></other-info>
        </div>
    </div>
</template>

<script>
import topHeader from "../order/top-header";
import goodsInfo from "../order/goods-info";
import settlement from "../order/settlement";
import otherInfo from "../order/other-info";
export default {
    props: ["order"],
    data() {
        return {};
    },
    methods: {},
    components: {
        topHeader,
        goodsInfo,
        settlement,
        otherInfo,
    },
};
</script>

<style lang="less" scoped>
.wait-consignment-wrap {
    height: 100vh;
    overflow: scroll;
    background-color: #f6f6f6;
}
.content {
    margin-top: 0.23rem;
    padding: 0 0.27rem;
}
</style>