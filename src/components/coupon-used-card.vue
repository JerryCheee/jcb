<template>
    <div class="coupon disable">
        <div class="tag">{{ coupon.type == 1 ? "满减券" : "折扣券" }}</div>
        <div class="left">
            <div class="jian" v-if="coupon.type == 1">￥{{ coupon.jian }}</div>
            <div class="jian" v-else>{{ coupon.discount }}折</div>
            <div class="man">满{{ coupon.man }}可用</div>
        </div>
        <div class="middle">
            <div class="range">{{ coupon.range }}</div>
            <div class="time">有效期至{{ coupon.time }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["coupon"],
    data() {
        return {};
    },
    methods: {},
};
</script>

<style lang="less" scoped>
.coupon {
    margin: 0.2rem 0.271rem;
    width: 5.814rem;
    height: 1.808rem;
    background: none;
    background-image: url("../assets/img/优惠券背景.png");
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    position: relative;
    color: #1a1a1a;
    .tag {
        position: absolute;
        width: 1.017rem;
        height: 0.271rem;
        background-color: #e1fdd2;
        border-radius: 0rem 0rem 0.056rem 0.056rem;
        font-size: 0.181rem;
        color: #2ecb62;
        line-height: 0.271rem;
        text-align: center;
        top: 0;
        left: 0.339rem;
    }
    .left {
        width: 1.7rem;
        text-align: center;
        .jian {
            font-size: 0.407rem;
            font-weight: bold;
        }
        .man {
            font-size: 0.215rem;
            color: #1a1a1a;
        }
    }
    .middle {
        flex: 1;
        font-size: 0.215rem;
        line-height: 0.36rem;
        margin-left: 0.4rem;
    }
    &.disable {
        position: relative;
        .tag {
            background-color: #dddddd;
            color: #a8a8a8;
        }
        .jian {
            color: #a8a8a8;
        }
        .btn {
            background-color: #a8a8a8;
        }
        &:after {
            content: "";
            background: url("../assets/img/已使用.png");
            background-size: 100%;
            width: 1.017rem;
            height: 0.797rem;
            top: 0.15rem;
            right: 0.1rem;
            position: absolute;
        }
    }
}
</style>