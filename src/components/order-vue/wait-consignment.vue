<template>
    <div class="wait-consignment-wrap">
        <top-header status="待发货" :order="order" />

        <div class="content">
            <!-- 物流信息 -->
            <other-info :order="order"></other-info>
        </div>
        <div class="footer">
            <order-btn
                type="plain"
                @click="$router.push(`/refund/money?id=${order.id}`)"
            >
                申请退款
            </order-btn>
            <order-btn type="primary" @click="receive">确认收货</order-btn>
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
import api from "../../api/order";
export default {
    props: ["order"],
    data() {
        return {};
    },
    methods: {
        receive() {
            Dialog.confirm({
                title: "提示",
                message: "确定收货吗？",
            })
                .then(async () => {
                    // on confirm
                })
                .catch(() => {
                    // on cancel
                });
        },
    },
    components: {
        topHeader,
        goodsInfo,
        settlement,
        otherInfo,
        orderBtn,
        [Dialog.Component.name]: Dialog.Component,
    },
};
</script>

<style lang="less" scoped>
.wait-consignment-wrap {
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