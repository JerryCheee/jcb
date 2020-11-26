<template>
    <router-link
        tag="div"
        :to="`/workbench/shop-order/${order.id}`"
        class="order-card"
    >
        <div class="top" v-if="order.getApiVo">
            <div class="shop">
                <i class="iconfont iconshangcheng"></i>
                <span class="shop-name">{{ order.getApiVo.name }}</span>
            </div>
            <div class="status">{{ status[order.status] }}</div>
        </div>
        <div class="products">
            <div class="pro" v-for="(pro, i) in order.productList" :key="i">
                <div class="pro-img">
                    <img :src="pro.productPic" alt="" />
                </div>
                <div class="pro-info">
                    <div class="pro-name e2">
                        {{ pro.productName }}
                    </div>
                    <div class="pro-sku">{{ pro.propertyName }}</div>
                    <div class="pro-num">x{{ pro.number }}</div>
                </div>
            </div>
        </div>

        <div class="bottom">
            <div class="count">共{{ order.productNumber }}件</div>
            <div class="money">
                合计：<span class="red"> ￥{{ order.totalAmount }} </span>
            </div>
        </div>
    </router-link>
</template>

<script>
//0-已取消 1-待付款 2-待发货 3-待收货 4-待评价 5-售后/退款 6-已完成 7-待自提 8-已退款
export default {
    props: ["order"],
    data() {
        return {
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
    methods: {},
    components: {},
};
</script>

<style lang="less" scoped>
.order-card {
    background-color: #ffffff;
    border-radius: 0.113rem;
    margin: 0.226rem 0.271rem;
    padding: 0 0.226rem;
    .top {
        border-bottom: 1px solid #a8a8a8;
        height: 0.672rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .shop {
            color: #000000;
            font-size: 0.203rem;
            .iconfont {
                color: #000000;
                margin-right: 0.1rem;
            }
        }
        .status {
            font-size: 0.203rem;
            color: #000000;
        }
    }
    .products {
        .pro {
            padding: 0.15rem 0;
            display: flex;
            align-items: center;
            .pro-img {
                margin-right: 0.16rem;
                img {
                    width: 1.412rem;
                    height: 1.412rem;
                    border-radius: 0.113rem;
                    padding: 0.034rem;
                }
            }
            .pro-info {
                height: 1.412rem;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .pro-name {
                    color: #1a1a1a;
                    font-size: 0.215rem;
                    line-height: 0.271rem;
                }
                .pro-sku {
                    color: #a8a8a8;
                    font-size: 0.181rem;
                }
                .pro-num {
                    color: #a8a8a8;
                    font-size: 0.215rem;
                }
            }
        }
    }
    .bottom {
        padding: 0.2rem 0 0.3rem 0;
        display: flex;
        justify-content: flex-end;
        color: #1a1a1a;
        font-size: 0.215rem;
    }
}
</style>