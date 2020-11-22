<template>
    <div class="select1">
        <div
            class="s-item"
            :class="{ active: selectIndex == i }"
            v-for="(item, i) in info"
            :key="i"
            @click="checkIt(i)"
        >
            {{
                item.name.length > 4
                    ? item.name.substr(0, 4) + "..."
                    : item.name
            }}
            <i class="iconfont iconxuanzhong4"></i>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectIndex: -1,
        };
    },
    props: ["info"],
    methods: {
        checkIt(i) {
            if (i == this.selectIndex) {
                this.selectIndex = -1;
                return;
            }
            this.selectIndex = i;
            this.$emit("update:index", i);
        },
        reset() {
            this.selectIndex = -1;
        },
    },
};
</script>

<style lang="less" scoped>
.select1 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 0.2rem;
}
.s-item {
    width: 1.19rem;
    height: 0.45rem;
    background-color: #f6f6f6;
    border-radius: 0.06rem;
    color: #a8a8a8;
    font-size: 0.21rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    .iconfont {
        display: none;
        position: absolute;
        right: 0rem;
        bottom: -0.03rem;
        font-size: 0.15rem;
        color: #2ecb62;
    }
}
.s-item.active {
    background-color: #cbffb1;
    color: #2ecb62;
    i {
        display: block;
    }
}
</style>