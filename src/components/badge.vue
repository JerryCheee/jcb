<template>
    <view class="badge">
        <slot></slot>
        <view class="badge-dot" v-if="dot"></view>
        <view class="badge-count" v-else-if="count">{{ finalCount }}</view>
    </view>
</template>

<script>
export default {
    props: {
        count: {
            type: Number,
            default: 0,
        },
        maxCount: {
            type: Number,
            default: 99,
        },
        dot: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        finalCount() {
            return this.count > this.maxCount
                ? `${this.maxCount}+`
                : this.count;
        },
    },
};
</script>

<style lang="less" scoped>
.badge {
    position: relative;
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
}
.badge-count {
    position: absolute;
    transform: translateX(50%);
    top: -12rpx;
    right: 0;
    height: 30rpx;
    border-radius: 15rpx;
    width: 30rpx;
    background: #dd524d;
    color: #fff;
    line-height: 30rpx;
    text-align: center;
    padding: 0 10rpx;
    font-size: 20rpx;
    white-space: nowrap;
    z-index: 10;
    box-shadow: 0 0 0 1px #fff;
    box-sizing: border-box;
}
.badge-dot {
    position: absolute;
    transform: translateX(-50%);
    top: -8rpx;
    right: -16rpx;
    height: 16rpx;
    width: 16rpx;
    border-radius: 100%;
    background: #dd524d;
    z-index: 10;
    box-shadow: 0 0 0 1rpx #fff;
}
</style>
