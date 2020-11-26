<template>
    <div class="mine-wrap">
        <!-- 头部 -->
        <div class="top-info">
            <div class="right">
                <i class="iconfont iconsaoyisao"></i>
                <i class="iconfont iconxiaoxi"></i>
                <router-link
                    to="/workbench/info"
                    class="iconfont iconshezhi"
                ></router-link>
            </div>
            <div class="info row sb">
                <div class="row">
                    <img :src="storeInfo.head" alt />
                    <div class="user-info column sb">
                        <span class="name">{{ storeInfo.name }}</span>
                        <div class="desc">{{ storeInfo.introduce }}</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 数量卡片 -->
        <div class="total-card">
            <div class="item">
                <span>{{ storeInfo.dayTransactionAmount || 0 }}</span>
                <div>今日成交(元)</div>
            </div>
            <router-link to="/#" tag="div" class="item">
                <span>{{ storeInfo.dayOrderNumber || 0 }}</span>
                <div>今日订单</div>
            </router-link>
            <router-link to="/#" tag="div" class="item">
                <span>{{ 0 }}</span>
                <div>本月订单</div>
            </router-link>
        </div>

        <div class="mine-content">
            <!-- 店铺交易订单  -->
            <div class="common-card">
                <span class="title">
                    <span class="title">店铺交易订单</span>
                    <router-link
                        tag="span"
                        to="/workbench/shop-orders"
                        class="right"
                    >
                        全部订单
                        <i class="iconfont icongengduo"></i>
                    </router-link>
                </span>
                <div class="common-wrap">
                    <router-link
                        tag="div"
                        to="/workbench/shop-orders/1"
                        class="common-item"
                    >
                        <i class="iconfont icondaizhifu yellow"></i>
                        <span>待支付</span>
                    </router-link>
                    <router-link
                        tag="div"
                        to="/workbench/shop-orders/2"
                        class="common-item"
                    >
                        <i class="iconfont icondaishouhuo blue"></i>
                        <span>待收货</span>
                    </router-link>
                    <router-link
                        tag="div"
                        to="/workbench/shop-orders/6"
                        class="common-item"
                    >
                        <i class="iconfont iconyiwancheng green"></i>
                        <span>已完成</span>
                    </router-link>
                    <router-link
                        tag="div"
                        to="/workbench/shop-orders/5"
                        class="common-item"
                    >
                        <i class="iconfont icontuihuoshouhou red"></i>
                        <span>退货售后</span>
                    </router-link>
                </div>
            </div>
            <!-- 推广中心 -->
            <router-link
                tag="div"
                to="/workbench/popularize"
                class="common-card"
            >
                <span class="title">推广中心</span>
                <div class="common-wrap">
                    <div class="info-item">
                        <span>0</span>
                        <div>集采分</div>
                    </div>
                    <div class="info-item">
                        <span>{{ storeInfo.sourcePeopleNumber || 0 }}</span>
                        <div>推广人数</div>
                    </div>
                    <div class="info-item">
                        <span>{{ storeInfo.sourceOrderNumber || 0 }}</span>
                        <div>推广人订单</div>
                    </div>
                </div>
            </router-link>
            <!-- 店铺管理 -->
            <div class="common-card">
                <span class="title">店铺管理</span>
                <div class="common-wrap">
                    <router-link tag="div" to="/order" class="common-item">
                        <i class="iconfont iconjinhuodingdan yellow"></i>
                        <span>进货订单</span>
                    </router-link>
                    <router-link
                        tag="div"
                        to="/workbench/address"
                        class="common-item"
                    >
                        <i class="iconfont icondizhi blue"></i>
                        <span>收货地址</span>
                    </router-link>
                    <div
                        @click="wait"
                        to="/workbench/goods"
                        tag="div"
                        class="common-item"
                    >
                        <i class="iconfont iconshangpinguanli green"></i>
                        <span>商品管理</span>
                    </div>
                    <div
                        @click="wait"
                        to="/workbench/shop-coupons"
                        tag="div"
                        class="common-item"
                    >
                        <i class="iconfont iconyouhuiquan red"></i>
                        <span>优惠券</span>
                    </div>
                </div>
            </div>
            <!-- 其他工具 -->
            <div class="common-card">
                <span class="title">其他工具</span>
                <div class="common-wrap">
                    <router-link
                        tag="div"
                        to="/workbench/collect"
                        class="common-item"
                    >
                        <i class="iconfont iconguanzhu blue"></i>
                        <span>我的收藏</span>
                    </router-link>
                    <router-link to="/#" tag="div" class="common-item">
                        <i class="iconfont iconqiehuan green"></i>
                        <span>切换买家端</span>
                    </router-link>
                    <a
                        class="common-item"
                        href="https://yzf.qq.com/xv/web/static/chat/index.html?sign=37ef9b97817257902417cab84fb5e0669798bef57231e621e0439145d414695d3f39810730d2a498603a9ce6257466b3baaefd77"
                    >
                        <i class="iconfont iconkefu yellow"></i>
                        <span>联系客服</span>
                    </a>
                    <div
                        @click="wait"
                        to="/workbench/purchase-discount"
                        tag="div"
                        class="common-item"
                    >
                        <i class="iconfont iconjinhuoyouhui red"></i>
                        <span>进货优惠</span>
                    </div>
                </div>
            </div>
        </div>

        <my-footer></my-footer>
    </div>
</template>

<script>
import myFooter from "../../components/footer";
import api from "../../api/user";
import { Toast } from "vant";
export default {
    name: "mine",
    data() {
        return {
            storeInfo: {},
            storeId: this.$store.state.user.storeId,
        };
    },
    created() {
        this.getStoreCenter();
    },
    methods: {
        async getStoreCenter() {
            let res = await api.getStoreCenter(this.storeId);
            this.storeInfo = res.result || {};
        },
        wait() {
            Toast("此功能暂未开放！");
        },
    },
    components: {
        myFooter,
    },
};
</script>

<style lang="less" scoped>
.mine-wrap {
    height: 100vh;
    background-color: #f6f6f6;
    overflow: auto;
    position: relative;
}
.common-card {
    box-sizing: border-box;
    background-color: #ffffff;
    padding: 0.22rem;
    margin-bottom: 0.23rem;
    .title {
        font-size: 0.26rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .right {
            font-size: 0.18rem;
            color: #a8a8a8;
            i {
                font-size: 0.181rem;
                color: #a8a8a8;
            }
        }
    }
    .common-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .common-item {
            margin-top: 0.27rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            i {
                font-size: 0.4rem;
            }
            span {
                font-size: 0.24rem;
                margin-top: 0.1rem;
            }
        }
        .info-item {
            margin-top: 0.2rem;
            width: 33%;
            text-align: center;
            div {
                margin-top: 0.1rem;
            }
        }
    }
}

.top-info {
    height: 2.621rem;
    background-color: #2ecb62;
    padding: 0 0.27rem;
    border: 1px solid transparent;
    color: #ffffff;
    .right {
        margin-top: 0.26rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .iconfont {
            color: #ffffff;
            font-size: 0.3rem;
            margin-left: 0.23rem;
        }
        .iconshezhi {
            font-size: 0.4rem;
        }
        .iconxiaoxi {
            font-size: 0.4rem;
        }
    }
    .info {
        img {
            width: 0.949rem;
            height: 0.949rem;
            border-radius: 100%;
        }
        .user-info {
            margin-left: 0.18rem;
            .name {
                font-size: 0.271rem;
            }
            .desc {
                width: 2.9rem;
                font-size: 0.181rem;
                line-height: 0.237rem;
                color: #ffffff;
                margin-top: 0.05rem;
            }
            .member {
                width: 1.24rem;
                height: 0.31rem;
                background-color: #1c9544;
                border-radius: 0.15rem;
                font-size: 0.2rem;
                i {
                    font-weight: bold;
                }
            }
        }
    }
}
.mine-content {
    padding: 0.93rem 0 0.82rem 0;
}
.total-card {
    width: 5.085rem;
    height: 1.356rem;
    background-color: #ffffff;
    border-radius: 0.678rem 0rem 0rem 0.678rem;
    transform: translateY(-50%);
    display: flex;
    position: absolute;
    right: -0.01rem;
    .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 0.27rem;
        color: #1a1a1a;
        margin-left: 0.5rem;
        span {
            text-align: left;
            font-size: 0.305rem;
        }
        div {
            font-size: 0.215rem;
            margin-top: 0.1rem;
        }
    }
}
</style>