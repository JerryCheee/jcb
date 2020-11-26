<template>
    <div>
        <OrderPay
            v-if="order.status == 1 && order.paymentMethods != 4"
            :order="order"
        />
        <OrderReceive v-if="order.status == 3" :order="order" />
        <OrderConsignment v-if="order.status == 2" :order="order" />
        <OrderRefund v-if="order.status == 5" :order="order" />
        <OrderCertificate
            v-if="order.status == 1 && order.paymentMethods == 4"
            :order="order"
        />
        <OrderComplete v-if="order.status == 6" :order="order" />
        <OrderCancel v-if="order.status == 0" :order="order" />
    </div>
</template>

<script>
//0-已取消 1-待付款 2-待发货 3-待收货 4-待评价 5-售后/退款 6-已完成 7-待自提 8-已退款
import api from "../../api/order";
import OrderPay from "../../components/order-vue/wait-pay"; //待支付
import OrderReceive from "../../components/order-vue/wait-receive"; //待收货
import OrderConsignment from "../../components/order-vue/wait-consignment"; //待发货
import OrderRefund from "../../components/order-vue/wait-refund"; //待退款
import OrderCertificate from "../../components/order-vue/certificate"; //上传凭证
import OrderComplete from "../../components/order-vue/complete"; //交易成功
import OrderCancel from "../../components/order-vue/cancel"; //交易取消
import { mapState } from "vuex";
export default {
    data() {
        return {
            id: this.$route.query.id,
        };
    },
    created() {
        this.$store.dispatch("getOrderInfo", this.id);
    },
    computed: {
        order() {
            return this.$store.state.order.info;
        },
    },
    components: {
        OrderPay,
        OrderReceive,
        OrderConsignment,
        OrderRefund,
        OrderCertificate,
        OrderComplete,
        OrderCancel,
    },
};
</script>