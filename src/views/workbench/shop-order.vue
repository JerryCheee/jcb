<template>
    <div class="page">
        <div class="top">
            <div class="order-state">{{ status[order.status] }}</div>
            <div class="order-des" v-if="order.status == 2">
                用户已下单，请及时发货
            </div>
            <div class="order-des" v-if="order.status == 7">用户上门自提</div>
            <div class="order-des" v-if="order.status == 3">
                已发货，等待用户确认收货
            </div>
            <div class="order-des" v-if="order.status == 1">
                <span>等待用户支付，剩余</span>
                <CountDown :time="getTime(order.commitTime)" />
            </div>
            <div class="order-des" v-if="order.status == 5">用户已申请退款</div>
            <div class="order-des" v-if="order.status == 0">交易已关闭</div>
            <div
                class="order-des"
                v-if="order.status == 6 && order.selfCarry != 1"
            >
                交易成功
            </div>
            <div
                class="order-des"
                v-if="order.status == 6 && order.selfCarry == 1"
            >
                用户已取货，交易已完成
            </div>
        </div>
        <div class="products">
            <div
                class="pro"
                v-for="(item, index) in order.productList"
                :key="index"
            >
                <img :src="item.productPic" alt="" />
                <div class="info">
                    <div class="pro-name e2">
                        {{ item.productName }}
                    </div>
                    <div class="pro-sku">{{ item.propertyName }}</div>
                    <div class="pro-bottom">
                        <span class="price">￥{{ item.skuPrice }}</span>
                        <div class="count">x{{ item.number }}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="address" v-if="order.selfCarry == 1 && order.getApiVo">
            <div class="name">{{ order.getApiVo.name }}&emsp;13711221122</div>
            <div class="info">
                <i class="iconfont icondizhi1"></i>
                <span>{{ order.getApiVo.addressName }}</span>
            </div>
        </div>
        <div class="address" v-else>
            <div class="name">
                {{ order.receiveBy }}&emsp;{{ order.receivePhone }}
            </div>
            <div class="info">
                <i class="iconfont icondizhi1"></i>
                <span>{{ order.receiveAddress }}</span>
            </div>
        </div>

        <div class="block">
            <div class="item">
                <span>订单单号</span>
                <span>{{ order.orderCode }}</span>
            </div>
            <div class="item">
                <span>支付方式</span>
                <span>{{
                    order.paymentMethods == 1
                        ? "微信支付"
                        : order.paymentMethods == 4
                        ? "线下支付"
                        : ""
                }}</span>
            </div>
            <div class="item">
                <span>配送方式</span>
                <span>{{
                    order.selfCarry == 1
                        ? "自提"
                        : order.selfCarry == 2
                        ? "快递配送"
                        : "物流到付"
                }}</span>
            </div>
            <div class="item">
                <span>下单时间</span>
                <span>{{ order.commitTime }}</span>
            </div>
        </div>

        <div class="block">
            <div class="item">
                <span>商品总价</span>
                <span>￥{{ order.totalAmount }}</span>
            </div>
            <!-- <div class="item">
                <span>会员折扣</span>
                <span>9.9折</span>
            </div> -->
            <div class="item">
                <span>运费</span>
                <span>￥{{ order.freightAmount || 0 }}</span>
            </div>
            <div class="item">
                <span>运费险</span>
                <span>￥0.00</span>
            </div>
            <!-- <div class="item">
                <span>店铺优惠</span>
                <span>-￥10.00</span>
            </div>
            <div class="item">
                <span>平台优惠</span>
                <span>-￥10.00</span>
            </div> -->
            <div class="total">
                合计：<span class="red">￥{{ order.paymentAmount }}</span>
            </div>
        </div>
    </div>
</template>

<script>
//0-已取消 1-待付款 2-待发货 3-待收货 4-待评价 5-售后/退款 6-已完成 7-待自提 8-已退款
import { CountDown } from "vant";
import api from "../../api/order";
export default {
    data() {
        return {
            id: this.$route.params.id,
            order: {},
            status: [
                "已取消",
                "待付款",
                "待发货",
                "待收货",
                "待评价",
                "售后/退款",
                "已完成",
                "待自提",
                "已退款",
            ],
        };
    },
    created() {
        this.init();
    },
    methods: {
        getTime(time) {
            var t = new Date(time);
            return t.setDate(t.getDate() + 1) - new Date().getTime();
        },
        async init() {
            let res = await api.getOrderDetail(this.id);
            this.order = res.result || {};
        },
    },
    components: {
        CountDown,
    },
};
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
        display: flex;
        align-items: center;
        line-height: 0.271rem;
        /deep/ .van-count-down {
            color: #ffffff;
            font-size: 0.215rem;
            line-height: 0.271rem;
            margin-left: 0.1rem;
        }
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