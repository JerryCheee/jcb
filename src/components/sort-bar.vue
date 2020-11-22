<template>
    <div class="sort-bar">
        <div class="default">综合</div>
        <div class="sales">销量</div>
        <div class="price" @click="descChange">
            <span>价格</span>
            <span class="icon-btn">
                <i class="iconfont iconshang" :class="{ on: desc == 1 }"></i>
                <i class="iconfont iconxia" :class="{ on: desc == 2 }"></i>
            </span>
        </div>
        <div class="search" @click="$emit('show')">
            <i class="iconfont iconshaixuan"></i>
            <span>筛选</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sort: 0, //0综合 1销量 2价格
            desc: 0, //0默认 1升 2降
        };
    },
    methods: {
        descChange() {
            if (this.desc == 0) {
                this.desc = 1;
            } else if (this.desc == 1) {
                this.desc = 2;
            } else {
                this.desc = 0;
            }
        },
    },
};
</script>

<style lang="less" scoped>
.sort-bar {
    width: 5.814rem;
    height: 0.678rem;
    background-color: #ffffff;
    border-radius: 0.113rem;
    margin: 0.226rem auto;
    display: flex;
    align-items: center;
    color: #1a1a1a;
    font-size: 0.215rem;
    > div {
        width: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-btn {
            margin-top: 0.05rem;
            display: flex;
            flex-direction: column;
            transform: scale(0.5);
            .on {
                color: #2ecb62;
            }
        }
    }
    .search {
        flex: 1;
        margin-right: 0.4rem;
        margin-left: 0.8rem;
        text-align: right;
        .iconfont {
            font-size: 0.2rem;
            margin-top: 0.08rem;
        }
        span {
            margin-left: 0.1rem;
        }
    }
}
</style>