<template>
    <div class="wait-consignment-wrap">
        <top-header status="已取消">
            <!-- 这里两种 要么超时 要么不显示 -->
            <span>取消原因:超时未支付</span>
            <span></span>
        </top-header>

        <div class="content">
            <!-- 内容区 padding -->
            <goods-info></goods-info>
            <!-- 结算 -->
            <settlement></settlement>
            <!-- 物流信息 -->
            <other-info cancel></other-info>
        </div>
    </div>
</template>

<script>
import topHeader from "../order/top-header";
import goodsInfo from "../order/goods-info";
import settlement from "../order/settlement";
import otherInfo from "../order/other-info";
export default {
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