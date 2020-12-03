<template>
    <div class="order-item-wrap" @click.stop="goDetail" v-if="order">
        <div class="top row ac sb">
            <div class="row ac">
                <span>订单单号：{{ order.orderCode }}</span>
            </div>
            <span :class="{ blue }">{{ status }}</span>
        </div>
        <div
            class="pz"
            v-if="
                order.paymentMethods == 4 &&
                order.isPaymentVoucherSrc &&
                order.status == 1
            "
        >
            支付凭证已上传，等待商家处理
        </div>
        <div
            class="pz"
            v-if="
                order.paymentMethods == 4 &&
                order.isPaymentVoucherSrc &&
                order.status > 1
            "
        >
            支付凭证已上传
        </div>
        <div
            class="pz"
            v-if="
                order.paymentMethods == 4 &&
                !order.isPaymentVoucherSrc &&
                order.status == 1
            "
        >
            支付凭证未上传，请及时上传
        </div>
        <!-- 商品 -->
        <div
            class="goods-item row ac"
            v-for="(item, index) in order.productList"
            :key="index"
            @click.stop="goProductDetail(item.productId)"
        >
            <img :src="item.productPic" alt="" />
            <div class="right column sb">
                <div class="column">
                    <span class="name e2">
                        {{ item.productName }}
                    </span>
                    <span class="sku">
                        {{ item.propertyName }}
                    </span>
                </div>
                <span class="num">x{{ item.number }}</span>
            </div>
        </div>
        <!-- 数量 -->
        <div class="footer row ac">
            <span class="count">共{{ order.productNumber }}件</span>
            <span class="price row ac">
                <span class="word"> 合计:</span>
                ￥{{ order.totalAmount }}
            </span>
        </div>
        <!-- 按钮 -->
        <div class="btn-wrap row ac">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    computed: {},
    props: {
        order: {
            type: Object,
        },
        blue: {
            // 状态文字颜色
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            default: "待支付",
        },
    },
    methods: {
        goDetail() {
            this.$router.push("/order/detail?id=" + this.order.id);
        },
        goProductDetail(id) {
            this.$router.push("/goods/detail?id=" + id);
        },
    },
};
</script>

<style lang="less" scoped>
.order-item-wrap {
    background-color: #ffffff;
    padding: 0 0.24rem 0.23rem 0.23rem;
    box-sizing: border-box;
    border-radius: 0.11rem;
    margin-bottom: 0.23rem;
}
.top {
    font-size: 0.2rem;
    color: #000000;
    line-height: 1;
    height: 0.67rem;
    margin-bottom: 0.19rem;
    border-bottom: 0.01rem solid #a8a8a8;
    i {
        font-size: 0.2rem;
        margin-right: 0.12rem;
    }
}
.pz {
    font-size: 0.203rem;
    color: #f5b917;
    margin-bottom: 0.1rem;
}
.goods-item {
    margin-bottom: 0.4rem;
    img {
        width: 1.41rem;
        height: 1.41rem;
        border-radius: 0.11rem;
    }
    .right {
        height: 1.41rem;
        margin-left: 0.23rem;
        .name {
            font-size: 0.21rem;
            color: #1a1a1a;
        }
        .sku {
            margin-top: 0.1rem;
            .color {
                margin-left: 0.22rem;
            }
        }
        .sku,
        .num {
            font-size: 0.18rem;
            color: #a8a8a8;
        }
    }
}
.footer {
    justify-content: flex-end;
    font-size: 0.21rem;
    .count,
    .word {
        color: #1a1a1a;
        margin-right: 0.34rem;
    }
    .word {
        margin-right: 0.1rem;
    }
    .price {
        color: #fc0808;
    }
}
.btn-wrap {
    margin-top: 0.37rem;
    justify-content: flex-end;
}
.blue {
    color: #2ecb62;
}
</style>