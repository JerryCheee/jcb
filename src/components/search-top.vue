<template>
    <!-- 头部搜索 -->
    <div class="header-top row sb ac">
        <input
            type="search"
            placeholder="请输入商品名称搜索"
            @click="$router.push('/purchase/search')"
        />
        <div
            class="address"
            v-if="address"
            @click="$router.push({ name: 'chooseCity' })"
        >
            <i class="iconfont icondizhi"></i>
            <span>佛山</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        address: {
            // 是否显示定位
            type: Boolean,
            default: true,
        },
        search: {
            //  判断需不需要跳到搜索页
            type: Boolean,
            default: true,
        },
    },
    methods: {},
};
</script>

<style lang="less" scoped>
.header-top {
    padding: 0 0.27rem;
    background-color: #ffffff;
    input {
        margin: 0.12rem 0;
        font-size: 0.18rem;
        color: #bbbbbb;
        height: 0.51rem;
        background-color: #f6f6f6;
        border-radius: 0.25rem;
        padding: 0 0.17rem;
        line-height: 0.51rem;
        width: 4.52rem;
    }
    .address {
        width: 1.2rem;
        text-align: right;
        line-height: 0.51rem;
        i {
            font-size: 0.28rem;
        }
        span {
            font-size: 0.24rem;
            color: #1a1a1a;
            margin-left: 0.1rem;
        }
    }
}
</style>