<template>
    <list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
        <!-- 领券中心 -->
        <template v-if="index == 0">
            <coupon-all-card
                v-for="(item, index) in data"
                :key="index"
                :coupon="item"
            />
        </template>
        <!-- 未使用 -->
        <template v-if="index == 1">
            <coupon-not-card
                v-for="(item, index) in data"
                :key="index"
                :coupon="item"
            />
        </template>
        <!-- 已使用 -->
        <template v-if="index == 2">
            <coupon-used-card
                v-for="(item, index) in data"
                :key="index"
                :coupon="item"
            />
        </template>
        <!-- 已过期 -->
        <template v-if="index == 3">
            <coupon-expired-card
                v-for="(item, index) in data"
                :key="index"
                :coupon="item"
            />
        </template>
    </list>
</template>

<script>
import { List } from "vant";
import CouponAllCard from "./coupon-all-card";
import CouponNotCard from "./coupon-not-card";
import CouponUsedCard from "./coupon-used-card";
import CouponExpiredCard from "./coupon-expired-card";
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
                    state: 0, //0未领取 1已领取
                    range: "全部商品均可使用",
                },
                {
                    type: 2, //1满减 2折扣
                    man: 1000,
                    jian: 20,
                    discount: 9.8,
                    time: "2020-10-30",
                    state: 0, //0未领取 1已领取
                    range: "全部商品均可使用",
                },
                {
                    type: 2, //1满减 2折扣
                    man: 1000,
                    jian: 20,
                    discount: 8.8,
                    time: "2020-10-30",
                    state: 0, //0未领取 1已领取
                    range: "全部商品均可使用",
                },
                {
                    type: 1, //1满减 2折扣
                    man: 1000,
                    jian: 20,
                    time: "2020-10-30",
                    state: 1, //0未领取 1已领取
                    range: "全部商品均可使用",
                },
                {
                    type: 2, //1满减 2折扣
                    man: 1000,
                    jian: 20,
                    discount: 7.8,
                    time: "2020-10-30",
                    state: 1, //0未领取 1已领取
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
        CouponAllCard,
        CouponNotCard,
        CouponUsedCard,
        CouponExpiredCard,
    },
};
</script>

<style lang="less" scoped>
</style>