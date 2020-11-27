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
                            <div class="item" v-for="(v, i) in list" :key="i">
                                <div class="left">
                                    <img :src="v.head" />
                                    <div class="info">
                                        <div class="name">{{ v.name }}</div>
                                        <div class="time">
                                            邀请人:{{ v.sourceName || "" }}
                                        </div>
                                        <div class="time">
                                            {{ v.sourceTime || "2020-10-30" }}
                                        </div>
                                    </div>
                                </div>
                                <div class="right">
                                    <span>{{ v.peopleNumber }}人</span>
                                    <span>{{ v.orderNumber }}单</span>
                                    <span>{{ v.profitAmount }}元</span>
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
import { Tab, Tabs, List, Toast } from "vant";
import api from "../../api/user";
export default {
    data() {
        return {
            loading: false,
            finished: false,
            active: 0,
            tabs: ["店铺", "一级", "二级"],
            params: {
                pageNo: 1,
                pageSize: 10,
                sourceType: 1,
                memberId: this.$store.state.userId,
            },
            list: [],
        };
    },
    methods: {
        onLoad() {
            this.loading = true;
            var timer = setTimeout(async () => {
                clearTimeout(timer);
                let res = await api.getMemberSourceList(this.params);
                this.loading = false;
                if (
                    !res.success ||
                    !res.result ||
                    res.result.records.length == 0
                ) {
                    this.finished = true;
                } else {
                    this.list = [...this.list, ...res.result.records];
                }
                if (!res.success) {
                    Toast("获取数据失败!");
                    return;
                }
                this.params.pageNo++;
            }, 500);
        },
    },
    watch: {
        active(v) {
            this.params.sourceType++;
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
        /deep/ .van-tab__pane-wrapper {
            min-height: 80vh;
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
                    text-align: right;
                    span {
                        line-height: 0.32rem;
                    }
                }
            }
        }
    }
}
</style>