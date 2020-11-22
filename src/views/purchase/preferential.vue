<template>
    <div class="container">
        <div class="search-bar">
            <input type="search" placeholder="请输入商品名称搜索" />
        </div>

        <div class="goods-list">
            <list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <router-link
                    tag="div"
                    class="goods-item"
                    v-for="(item, index) in 10"
                    :key="index"
                    to="/goods/detail?id=1"
                >
                    <div class="left">
                        <img src="../../assets/img/分类-商品图.png" alt="" />
                    </div>
                    <div class="right">
                        <div class="name e2">
                            博世 电动工具 3.6V锂电池充电起子 螺丝刀 IXO3
                        </div>
                        <div class="progress">
                            <div class="line">
                                <Progress
                                    :percentage="80"
                                    stroke-width="15px"
                                    color="#2ecb62"
                                    track-color="#dddddd"
                                    :show-pivot="false"
                                />
                                <div class="pro-text">已有2312人抢购</div>
                            </div>
                            <div class="count">还剩321件</div>
                        </div>
                        <div class="bottom">
                            <div class="price">
                                <div class="new"><span>￥</span>199</div>
                                <div class="old">￥299</div>
                            </div>
                            <div class="btn">去抢购</div>
                        </div>
                    </div>
                </router-link>
            </list>
        </div>
    </div>
</template>

<script>
import { List, Progress } from "vant";
export default {
    data() {
        return {
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
    components: { List, Progress },
};
</script>

<style lang="less" scoped>
.search-bar {
    width: 6.356rem;
    height: 0.746rem;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
        width: 5.414rem;
        height: 0.508rem;
        background-color: #f6f6f6;
        border-radius: 0.254rem;
        padding: 0 0.2rem;
        font-size: 0.181rem;
    }
}

.goods-list {
    .goods-item {
        width: 5.814rem;
        height: 1.808rem;
        background-color: #ffffff;
        border-radius: 0.113rem;
        margin: 0.226rem 0.271rem;
        display: flex;
        align-items: center;
        .left {
            width: 1.356rem;
            height: 1.356rem;
            border-radius: 0.056rem;
            margin: 0.226rem;
            img {
                object-fit: cover;
            }
        }
        .right {
            flex: 1;
            height: 1.356rem;
            margin: 0.226rem;
            margin-left: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .name {
                font-size: 0.215rem;
                line-height: 0.271rem;
            }
            .progress {
                display: flex;
                align-items: center;
                font-size: 0.181rem;
                .line {
                    width: 1.469rem;
                    position: relative;
                    /deep/ .van-progress {
                        border-radius: 8px;
                    }
                    .pro-text {
                        width: 1.469rem;
                        display: table-cell;
                        vertical-align: middle;
                        position: absolute;
                        color: #ffffff;
                        font-size: 0.181rem;
                        top: 0;
                        text-align: center;
                    }
                }
                .count {
                    color: #2ecb62;
                    margin-left: 0.1rem;
                }
            }
            .bottom {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                .price {
                    .new {
                        color: #fc0808;
                        font-size: 0.305rem;
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
                .btn {
                    width: 1.243rem;
                    height: 0.452rem;
                    background-color: #2ecb62;
                    border-radius: 0.226rem;
                    font-size: 0.215rem;
                    color: #ffffff;
                    line-height: 0.452rem;
                    text-align: center;
                }
            }
        }
    }
}
</style>