<template>
    <div class="wait-consignment-wrap">
        <top-header status="退款中" :order="order">
            <!-- <span
                >等待商家确认，剩余
                <count-down
                    endTime="2020/11/12"
                    crowd
                    colonColor="#fff"
                ></count-down
            ></span> -->
        </top-header>

        <div class="content">
            <!-- 物流信息 -->
            <other-info plus :order="order"></other-info>
        </div>
        <div class="footer">
            <order-btn type="primary" @click="cancelRefund">撤销退款</order-btn>
        </div>
    </div>
</template>

<script>
import TopHeader from "../order/top-header";
import GoodsInfo from "../order/goods-info";
import Settlement from "../order/settlement";
import OtherInfo from "../order/other-info";
import OrderBtn from "../order/order-btn";
import { CountDown, Dialog } from "vant";
export default {
    data() {
        return {
            
        };
    },
    props:['order'],
    methods: {
        cancelRefund() {
            Dialog.confirm({
                title: "提示",
                message: "确定撤销退款吗？",
            })
                .then(() => {
                    // on confirm
                })
                .catch(() => {
                    // on cancel
                });
        },
    },
    components: {
        TopHeader,
        GoodsInfo,
        Settlement,
        OtherInfo,
        OrderBtn,
        CountDown,
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