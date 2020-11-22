<template>
    <list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
        <div
            class="coupon"
            v-for="(coupon, index) in data"
            :key="index"
            :class="coupon.type == 1 ? 'green' : 'red'"
        >
            <div class="left">
                <div class="jian" v-if="coupon.type == 1">
                    ￥{{ coupon.jian }}
                </div>
                <div class="jian" v-else>{{ coupon.discount }}折</div>
                <div class="man">满{{ coupon.man }}可用</div>
            </div>
            <div class="middle">
                <div class="name">
                    {{ coupon.type == 1 ? "店铺满减券" : "店铺折扣券" }}
                </div>
                <div class="range">{{ coupon.range }}</div>
                <div class="time">有效期至{{ coupon.time }}</div>
            </div>
            <div class="right">
                <div class="surplus">剩余3000</div>
                <div class="progress">
                    <Progress
                        :percentage="80"
                        stroke-width="0.25rem"
                        color="#2ecb62"
                        track-color="#a8a8a8"
                        :show-pivot="false"
                    />
                    <div class="pro-text">已领80%</div>
                </div>
            </div>
        </div>
    </list>
</template>

<script>
import { List, Progress } from "vant";
export default {
    props: ["index"],
    data() {
        return {
            loading: false,
            finished: false,
            data: [
                {
                    type: 1, //1满减 2折扣
                    man: 1000,
                    jian: 20,
                    time: "2020-10-30",
                    range: "全部商品均可使用",
                },
                {
                    type: 2, //1满减 2折扣
                    man: 1000,
                    jian: 20,
                    discount: 9.8,
                    time: "2020-10-30",
                    range: "全部商品均可使用",
                },
                {
                    type: 2, //1满减 2折扣
                    man: 1000,
                    jian: 20,
                    discount: 8.8,
                    time: "2020-10-30",
                    range: "全部商品均可使用",
                },
                {
                    type: 1, //1满减 2折扣
                    man: 1000,
                    jian: 20,
                    time: "2020-10-30",
                    range: "全部商品均可使用",
                },
                {
                    type: 2, //1满减 2折扣
                    man: 1000,
                    jian: 20,
                    discount: 7.8,
                    time: "2020-10-30",
                    range: "全部商品均可使用",
                },
            ],
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
        List,
        Progress,
    },
};
</script>

<style lang="less" scoped>
.coupon {
    margin: 0.2rem 0.271rem;
    width: 5.814rem;
    height: 1.808rem;
    background: none;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    position: relative;
    color: #1a1a1a;
    .left {
        width: 1.7rem;
        text-align: center;
        color: #ffffff;
        .jian {
            font-size: 0.407rem;
            font-weight: bold;
        }
        .man {
            font-size: 0.215rem;
        }
    }
    .middle {
        margin-left: 0.3rem;
        flex: 1;
        font-size: 0.215rem;
        line-height: 0.36rem;
        .name {
            font-size: 0.271rem;
            font-weight: bold;
        }
    }
    .right {
        width: 1.36rem;
        .surplus {
            font-size: 0.181rem;
            text-align: center;
        }
        .progress {
            font-size: 0.181rem;
            margin: 0.08rem auto;
            width: 1.13rem;
            position: relative;
            /deep/ .van-progress {
                border-radius: 8px;
            }
            .pro-text {
                width: 1.13rem;
                display: table-cell;
                vertical-align: middle;
                position: absolute;
                color: #ffffff;
                font-size: 0.181rem;
                top: 0;
                text-align: center;
            }
        }
    }
    &.green {
        background-image: url("../../assets/img/工作台-优惠券.png");
    }
    &.red {
        background-image: url("../../assets/img/工作台-优惠券1.png");
    }
}
</style>