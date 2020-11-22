<template>
    <router-link tag="div" to="/workbench/shop-order/1" class="order-card">
        <div class="top">
            <div class="shop">
                <i class="iconfont iconshangcheng"></i>
                <span class="shop-name">豪迪五金店</span>
            </div>
            <div class="status">已完成</div>
        </div>
        <div class="products">
            <div class="pro" v-for="(pro, i) in 2" :key="i">
                <div class="pro-img">
                    <img src="../assets/img/分类-商品图.png" alt="" />
                </div>
                <div class="pro-info">
                    <div class="pro-name e2">
                        博世 电动工具 3.6V锂电池充电起子 螺丝刀 IXO3
                    </div>
                    <div class="pro-sku">规格:220V &emsp; 颜色:黑色</div>
                    <div class="pro-num">x1</div>
                </div>
            </div>
        </div>

        <div class="bottom">
            <div class="count">共2件</div>
            <div class="money">合计：<span class="red">￥694</span></div>
        </div>
    </router-link>
</template>

<script>
export default {
    props: ["order"],
    data() {
        return {};
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