<template>
    <div class="wait-pay-wrap">
        <top-header status="待支付" :order="order"> </top-header>
        <div class="content">
            <!-- 物流信息 -->
            <other-info :order="order"></other-info>
        </div>
        <div class="footer">
            <div class="timer" v-if="order.paymentMethods != 4">
                <span>剩余时间 </span>
                <count-down :time="getTime(order.commitTime)"></count-down>
            </div>
            <order-btn type="plain" @click="cancel">取消订单</order-btn>
            <order-btn type="primary">立即支付</order-btn>
        </div>
    </div>
</template>

<script>
import topHeader from "../order/top-header";
import goodsInfo from "../order/goods-info";
import otherInfo from "../order/other-info";
import orderBtn from "../order/order-btn";
import { CountDown, Dialog, Toast } from "vant";
import api from "../../api/order";
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
        //取消订单
        async cancel() {
            Dialog.confirm({
                title: "提示",
                message: "真的要取消订单吗？",
            })
                .then(async () => {
                    // on confirm
                    let res = await api.cancelOrder(this.order.id);
                    if (res.successs) {
                        return Toast("订单取消成功！");
                    } else {
                        return Toast("订单取消失败！");
                    }
                })
                .catch(() => {
                    // on cancel
                });
        },
    },
    components: {
        topHeader,
        CountDown,
        goodsInfo,
        otherInfo,
        orderBtn,
        [Dialog.Component.name]: Dialog.Component,
    },
};
</script>

<style lang="less" scoped>
.wait-pay-wrap {
    padding-bottom: 1rem;
    background-color: #f6f6f6;
}
.timer {
    display: flex;
    align-items: center;
    color: #1a1a1a;
    font-size: 0.215rem;
    line-height: 0.271rem;
    /deep/ .van-count-down {
        width: 1rem;
        margin: 0 0.2rem;
        font-size: 0.215rem;
        line-height: 0.271rem;
    }
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
    padding: 0 0.27rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: -webkit-fill-available;
    > div {
        margin-left: 0.169rem;
    }
}
</style>