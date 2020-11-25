<template>
    <div class="wait-pay-wrap">
        <top-header status="待支付">
            <div class="timer">
                <span>剩余:</span>
                <count-down :time="getTime(order.commitTime)"></count-down>
            </div>
        </top-header>

        <div class="content">
            <!-- 内容区 padding -->
            <goods-info :list="order.productList"></goods-info>
            <!-- 结算 -->
            <settlement></settlement>
            <!-- 物流信息 -->
            <other-info></other-info>
        </div>
        <div class="footer">
            <order-btn type="plain">取消订单</order-btn>
            <order-btn type="primary">立即支付</order-btn>
        </div>
    </div>
</template>

<script>
import topHeader from "../order/top-header";
import goodsInfo from "../order/goods-info";
import settlement from "../order/settlement";
import otherInfo from "../order/other-info";
import orderBtn from "../order/order-btn";
import { CountDown } from "vant";
export default {
    props: ["order"],
    data() {
        return {};
    },
    methods: {
        getTime(time) {
            var t = new Date(time);
            return t.setDate(t.getDate() + 1) - new Date().getTime();
        },
    },
    components: {
        topHeader,
        CountDown,
        goodsInfo,
        settlement,
        otherInfo,
        orderBtn,
    },
};
</script>

<style lang="less" scoped>
.wait-pay-wrap {
    height: 100vh;
    padding-bottom: 1rem;
    overflow: scroll;
    background-color: #f6f6f6;
}
.timer {
    display: flex;
    align-items: center;
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
/deep/ .van-count-down {
    color: #ffffff;
}
</style>