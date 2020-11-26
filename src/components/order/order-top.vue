<template>
    <div class="top">
        <div class="item" v-for="(item, i) in states" :key="i">
            <img :src="i <= index ? activedState : emptyState" />
            <div>{{ item }}</div>
        </div>
    </div>
</template>

<script>
import activedState from "../../assets/img/订单详情-订单状态-激活状态.png";
import emptyState from "../../assets/img/订单详情-订单状态-空状态.png";
export default {
    props: {
        index: {
            type: Number,
            default: 1,
        },
    },
    data() {
        return {
            states: ["待支付", "待发货", "待收货", "已完成"],
            activedState,
            emptyState,
        };
    },
};
</script>

<style lang="less" scoped>
.top {
    display: flex;
    align-items: center;
    padding: 0.44rem 0;
    justify-content: center;
    .item {
        width: 1.305rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        &::before {
            content: "";
            width: 0.508rem;
            height: 0.056rem;
            position: absolute;
            top: 0.14rem;
            left: 0;
            background: #ffffff;
        }
        &::after {
            content: "";
            width: 0.508rem;
            height: 0.056rem;
            position: absolute;
            top: 0.14rem;
            right: 0;
            background: #ffffff;
        }
        &:first-child::before {
            content: "";
            width: 0;
        }
        &:last-child::after {
            content: "";
            width: 0;
        }
        img {
            width: 0.328rem;
            height: 0.328rem;
        }
        div {
            margin-top: 0.1rem;
            font-size: 0.215rem;
            color: #ffffff;
        }
    }
}
</style>