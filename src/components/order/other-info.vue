<template>
    <div>
        <div class="order-other-info column" v-if="order.note">
            <div class="other-feild row sb ac">
                <span>订单备注</span>
                <span></span>
            </div>
            <div class="remark">
                {{ order.note }}
            </div>
        </div>
        <div class="order-other-info column">
            <div class="other-feild row sb ac">
                <span>订单单号</span>
                <span>{{ order.orderCode }}</span>
            </div>
            <div class="other-feild row sb ac">
                <span>支付方式</span>
                <span>{{
                    order.paymentMethods == 1
                        ? "微信支付"
                        : order.paymentMethods == 4
                        ? "线下支付"
                        : ""
                }}</span>
            </div>
            <div class="other-feild row sb ac">
                <span>配送方式</span>
                <span>{{
                    order.selfCarry == 1
                        ? "自提"
                        : order.selfCarry == 2
                        ? "快递配送"
                        : "物流到付"
                }}</span>
            </div>
            <div class="other-feild row sb ac" v-if="plus || cancel || all">
                <span>物流单号</span>
                <span>SF493772984929 <span class="copy">复制</span></span>
            </div>
            <div class="other-feild row sb ac">
                <span>下单时间</span>
                <span>{{ order.commitTime }}</span>
            </div>
            <div class="other-feild row sb ac" v-if="plus || cancel || all">
                <span>发货时间</span>
                <span>{{ order.deliveryTime }}</span>
            </div>
            <div class="other-feild row sb ac" v-if="cancel">
                <span>退货时间</span>
                <span>2020-10-20 12:00</span>
            </div>
            <div class="other-feild row sb ac" v-if="all">
                <span>收货时间</span>
                <span>{{ order.receiveTime }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {},
    props: {
        plus: {
            // 增加显示 物流单号/发货时间
            type: Boolean,
            default: false,
        },
        cancel: {
            //取消订单
            type: Boolean,
            default: false,
        },
        all: {
            //所有项
            type: Boolean,
            default: false,
        },
        order: {
            type: Object,
        },
    },
};
</script>

<style lang="less" scoped>
.order-other-info {
    padding: 0.24rem;
    margin-bottom: 0.23rem;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 0.113rem;
    .other-feild {
        margin-bottom: 0.28rem;
        span {
            line-height: 1;
            font-size: 0.21rem;
            color: #1a1a1a;
        }
        .copy {
            margin-left: 0.2rem;
            color: #13438c;
        }
    }
    .other-feild:last-child {
        margin-bottom: 0;
    }
    .remark {
        background-color: #f6f6f6;
        border-radius: 0.113rem;
        font-size: 0.215rem;
        color: #1a1a1a;
        padding: 0.1rem 0.15rem;
    }
}
</style>