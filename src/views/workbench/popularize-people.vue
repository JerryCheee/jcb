<template>
    <div class="page">
        <div class="top">
            <div class="title">推广人数</div>
            <div class="count">48</div>
        </div>

        <div class="tabs-list">
            <tabs
                v-model="active"
                swipeable
                animated
                color="#2ecb62"
                line-width="0.452rem"
                line-height="0.068rem"
            >
                <tab v-for="(item, index) in tabs" :key="index" :title="item">
                    <list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                    >
                        <div class="list">
                            <div class="item" v-for="(v, i) in 8" :key="i">
                                <div class="left">
                                    <img
                                        src="../../assets/img/个人中心头像.png"
                                        alt=""
                                    />
                                    <div class="info">
                                        <div class="name">店铺名称</div>
                                        <div class="time">
                                            邀请人:一级用户名称
                                        </div>
                                        <div class="time">2020-10-30</div>
                                    </div>
                                </div>
                                <div class="right">
                                    <span>0人</span>
                                    <span>0单</span>
                                    <span>0元</span>
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
            loading: false,
            finished: false,
            active: 0,
            tabs: ["店铺", "一级", "二级"],
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
.page {
    .top {
        background: url("../../assets/img/推广中心人数-订单页面底图.png");
        background-size: cover;
        height: 1.808rem;
        background-color: #2ecb62;
        padding-left: 0.2rem;
        color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 0.226rem;
        .title {
            font-size: 0.203rem;
        }
        .count {
            font-size: 0.407rem;
            margin-top: 0.1rem;
        }
    }
    .tabs-list {
        background-color: #ffffff;
        /deep/ .van-tab--active {
            font-weight: bold;
        }
        .list {
            .item {
                display: flex;
                justify-content: space-between;
                margin: 0 0.26rem;
                padding: 0.169rem 0;
                border-bottom: 1px solid #dddddd;
                .left {
                    display: flex;
                    align-items: center;
                    img {
                        width: 0.904rem;
                        height: 0.904rem;
                        border-radius: 100%;
                        margin-right: 0.15rem;
                    }
                    .info {
                        .name {
                            color: #1a1a1a;
                            font-size: 0.237rem;
                        }
                        .time {
                            color: #a8a8a8;
                            font-size: 0.181rem;
                            margin-top: 0.05rem;
                        }
                    }
                }
                .right {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    font-size: 0.203rem;
                    span {
                        line-height: 0.32rem;
                    }
                }
            }
        }
    }
}
</style>