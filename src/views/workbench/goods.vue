<template>
    <div class="goods-box">
        <div class="goods-search">
            <input type="text" placeholder="请输入商品名称搜索" />
        </div>
        <div class="goods-tabs">
            <tabs
                v-model="active"
                line-width="0.452rem"
                line-height="0.068rem"
                color="#2ecb62"
                swipeable
                animated
                title-inactive-color="#1a1a1a"
                title-active-color="#1a1a1a"
            >
                <tab
                    v-for="(item, index) in tabNames"
                    :key="index"
                    :title="item"
                >
                    <list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                    >
                        <div class="goods-list">
                            <div
                                class="goods-card"
                                v-for="(v, i) in 6"
                                :key="i"
                            >
                                <div class="goods-img">
                                    <img
                                        src="../../assets/img/分类-商品图.png"
                                        alt=""
                                    />
                                </div>
                                <div class="goods-info">
                                    <div class="goods-name e2">
                                        博世 电动工具 3.6V锂电池充电起子 螺丝刀
                                        IXO3
                                    </div>
                                    <div class="price">
                                        <div class="new">
                                            <span>￥</span>199
                                        </div>
                                        <div class="old">￥299</div>
                                    </div>
                                    <div class="stock">库存:300</div>
                                </div>
                            </div>
                        </div>
                    </list>
                </tab>
            </tabs>
        </div>
    </div>
</template>

<script>
import { Tab, Tabs, List } from "vant";
export default {
    data() {
        return {
            active: 0,
            tabNames: ["出售中", "已售完", "仓库中", "回收站"],
            loading: false,
            finished: false,
        };
    },
    methods: {
        onLoad() {
            setTimeout(() => {
                this.finished = true;
            }, 1500);
        },
    },
    components: {
        Tab,
        Tabs,
        List,
    },
};
</script>

<style lang="less" scoped>
.goods-box {
    .goods-search {
        padding: 0.12rem 0.271rem;
        background: #ffffff;
        display: flex;
        input {
            flex: 1;
            height: 0.508rem;
            background-color: #f6f6f6;
            border-radius: 0.254rem;
            font-size: 0.181rem;
            line-height: 0.508rem;
            padding: 0 0.22rem;
        }
    }
    .goods-tabs {
        margin-bottom: 0.4rem;
        /deep/ .van-tab {
            font-size: 0.215rem;
        }
        /deep/ .van-tab--active {
            font-weight: bold;
        }
        .goods-list {
            margin: 0 0.271rem;
            .goods-card {
                margin-top: 0.226rem;
                height: 1.469rem;
                padding: 0.226rem;
                background-color: #ffffff;
                border-radius: 0.113rem;
                display: flex;
                align-items: center;
                .goods-img {
                    img {
                        width: 1.469rem;
                        height: 1.469rem;
                        border-radius: 0.056rem;
                    }
                }
                .goods-info {
                    margin-left: 0.1rem;
                    flex: 1;
                    height: 1.469rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .goods-name {
                        font-size: 0.215rem;
                        line-height: 0.271rem;
                    }
                    .price {
                        .new {
                            font-size: 0.305rem;
                            color: #fc0808;
                            display: inline;
                            span {
                                font-size: 0.158rem;
                            }
                        }
                        .old {
                            display: inline;
                            color: #a8a8a8;
                            font-size: 0.181rem;
                            text-decoration: line-through;
                        }
                    }
                    .stock {
                        color: #a8a8a8;
                        font-size: 0.203rem;
                    }
                }
            }
        }
    }
}
</style>