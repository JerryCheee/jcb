<template>
    <div class="settlement-wrap column sb">
        <div class="set-feild row sb ac">
            <span>商品总价</span>
            <span>￥{{ order.totalAmount }}</span>
        </div>
        <div class="set-feild row sb ac">
            <span>运费</span>
            <span>￥{{ order.freightAmount || 0 }}</span>
        </div>
        <div class="set-feild row sb ac">
            <span>运费险</span>
            <span>￥0.00</span>
        </div>
        <div class="set-feild row sb ac">
            <span>优惠</span>
            <span>-￥0.00</span>
        </div>
        <div class="total">
            <span class="word">合计: </span>
            <span class="money">￥{{ order.paymentAmount }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ["order"],
};
</script>

<style lang="less" scoped>
.settlement-wrap {
    padding: 0.24rem;
    margin-bottom: 0.23rem;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 0.113rem;
    border-bottom-right-radius: 0.113rem;
    .set-feild {
        margin-bottom: 0.2rem;
        span {
            font-size: 0.21rem;
            color: #1a1a1a;
        }
    }
    .total {
        text-align: right;
        span {
            line-height: 1;
            font-size: 0.27rem;
            font-weight: bold;
            color: #1a1a1a;
        }
        .money {
            color: #fc0808;
        }
    }
}
</style>