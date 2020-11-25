<template>
    <div class="wait-consignment-wrap">
        <top-header status="退款中">
            <span
                >等待商家确认，剩余
                <count-down
                    endTime="2020/11/12"
                    crowd
                    colonColor="#fff"
                ></count-down
            ></span>
        </top-header>

        <div class="content">
            <!-- 内容区 padding -->
            <goods-info></goods-info>
            <!-- 结算 -->
            <settlement></settlement>
            <!-- 物流信息 -->
            <other-info plus></other-info>
        </div>
        <div class="footer">
            <order-btn type="primary">撤销退款</order-btn>
        </div>
    </div>
</template>

<script>
import TopHeader from "../order/top-header";
import GoodsInfo from "../order/goods-info";
import Settlement from "../order/settlement";
import OtherInfo from "../order/other-info";
import OrderBtn from "../order/order-btn";
import { CountDown } from "vant";
export default {
    data() {
        return {};
    },
    methods: {},
    components: {
        TopHeader,
        GoodsInfo,
        Settlement,
        OtherInfo,
        OrderBtn,
        CountDown,
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
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>