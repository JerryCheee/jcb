<template>
    <div class="complete-wrap">
        <top-header status="交易成功" :order="order" />

        <div class="content">
            <!-- 物流信息 -->
            <other-info all :order="order"></other-info>
        </div>
        <div class="footer">
            <order-btn
                type="plain"
                @click="$router.push(`/order/evaluate?id=${order.id}`)"
            >
                去评价
            </order-btn>
        </div>
    </div>
</template>

<script>
import topHeader from "../order/top-header";
import goodsInfo from "../order/goods-info";
import settlement from "../order/settlement";
import otherInfo from "../order/other-info";
import orderBtn from "../order/order-btn";
import { Dialog } from "vant";
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
        orderBtn,
    },
};
</script>

<style lang="less" scoped>
.complete-wrap {
    height: 100vh;
    padding-bottom: 1rem;
    overflow: scroll;
    background-color: #f6f6f6;
}
.content {
    margin-top: 0.23rem;
    padding: 0 0.27rem;
}
.footer {
    height: 0.83rem;
    background-color: #ffffff;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>