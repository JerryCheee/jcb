<template>
    <div class="page">
        <div class="top">
            <div class="order-state">待发货</div>
            <div class="order-des">用户已下单，请及时发货</div>
        </div>
        <div class="products">
            <div class="pro" v-for="(item, index) in 1" :key="index">
                <img src="../../assets/img/分类-商品图.png" alt="" />
                <div class="info">
                    <div class="pro-name e2">
                        博世 电动工具 3.6V锂电池充电起子 螺丝刀 IXO3
                    </div>
                    <div class="pro-sku">规格:220V &emsp; 颜色:黑色</div>
                    <div class="pro-bottom">
                        <span class="price">￥298</span>
                        <div class="count">x1</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="address">
            <div class="name">张三&emsp;13711221122</div>
            <div class="info">
                <i class="iconfont icondizhi1"></i>
                <span>地球市地球镇地球村东南西北888号</span>
            </div>
        </div>

        <div class="block">
            <div class="item">
                <span>订单单号</span>
                <span>1000001</span>
            </div>
            <div class="item">
                <span>支付方式</span>
                <span>微信支付</span>
            </div>
            <div class="item">
                <span>配送方式</span>
                <span>快递</span>
            </div>
            <div class="item">
                <span>下单时间</span>
                <span>2020-10-20 12:00</span>
            </div>
        </div>

        <div class="block">
            <div class="item">
                <span>商品总价</span>
                <span>￥298</span>
            </div>
            <div class="item">
                <span>会员折扣</span>
                <span>9.9折</span>
            </div>
            <div class="item">
                <span>运费</span>
                <span>￥0.00</span>
            </div>
            <div class="item">
                <span>运费险</span>
                <span>￥6.00</span>
            </div>
            <div class="item">
                <span>店铺优惠</span>
                <span>-￥10.00</span>
            </div>
            <div class="item">
                <span>平台优惠</span>
                <span>-￥10.00</span>
            </div>
            <div class="total">合计：<span class="red">￥316.8</span></div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.page {
    margin-bottom: 0.4rem;
}
.top {
    background: url("../../assets/img/交易订单背景.png");
    background-size: cover;
    width: 100%;
    height: 2.35rem;
    .order-state {
        color: #ffffff;
        font-size: 0.271rem;
        padding: 0.4rem 0.25rem 0 0.25rem;
        font-weight: bold;
    }
    .order-des {
        color: #ffffff;
        font-size: 0.215rem;
        margin-top: 0.15rem;
        margin-left: 0.25rem;
    }
}
.products {
    margin: 0 0.27rem;
    background-color: #ffffff;
    border-radius: 0.113rem;
    position: relative;
    bottom: 0.8rem;
    .pro {
        display: flex;
        align-items: center;
        img {
            padding: 0.226rem;
            width: 1.412rem;
            height: 1.412rem;
            border-radius: 0.113rem;
        }
        .info {
            flex: 1;
            height: 1.412rem;
            padding-right: 0.226rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .pro-name {
                font-size: 0.215rem;
                line-height: 0.271rem;
                color: #1a1a1a;
            }
            .pro-sku {
                color: #a8a8a8;
                font-size: 0.181rem;
            }
            .pro-bottom {
                display: flex;
                align-items: center;
                justify-content: space-between;
                .price {
                    color: #fc0808;
                    font-size: 0.271rem;
                }
                .count {
                    color: #a8a8a8;
                    font-size: 0.215rem;
                }
            }
        }
    }
}
.address {
    margin: 0 0.27rem;
    padding: 0.2rem 0.15rem;
    background-color: #ffffff;
    border-radius: 0.113rem;
    margin-top: -0.55rem;
    .name {
        color: #000000;
        font-size: 0.237rem;
        font-weight: bold;
    }
    .info {
        color: #000000;
        font-size: 0.215rem;
        line-height: 0.4rem;
        margin-top: 0.1rem;
        .iconfont {
            font-size: 0.2rem;
            margin-right: 0.1rem;
        }
    }
}

.block {
    margin: 0.226rem 0.27rem 0 0.27rem;
    padding: 0.15rem 0.15rem;
    background-color: #ffffff;
    border-radius: 0.113rem;
    .item {
        height: 0.475rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #1a1a1a;
        font-size: 0.215rem;
    }

    .total {
        display: flex;
        justify-content: flex-end;
        font-size: 0.271rem;
        font-weight: bold;
        padding: 0.1rem 0;
    }
}
</style>