<template>
    <div class="list">
        <router-link
            tag="div"
            class="item"
            v-for="(item, index) in goods_list"
            :key="index"
            :to="`/goods/detail?id=${item.productId}`"
        >
            <img :src="item.pic" alt />
            <div class="name e2">{{ item.productName }}</div>
            <div class="info">
                <div class="price">
                    <span class="new" v-if="item.purchasePrice"
                        >￥{{ item.purchasePrice.toFixed(2) }}</span
                    >
                    <!-- <span class="old">￥{{ item.advicePrice }}</span> -->
                </div>
                <div class="count">销量:{{ item.saleCount }}</div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props: ["goods_list"],
};
</script>

<style lang="less" scoped>
.list {
    display: flex;
    flex-wrap: wrap;
    margin: 0.2rem 0.271rem;
    // min-height: 5rem;
    .item {
        width: 2.791rem;
        // height: 4.011rem;
        background-color: #ffffff;
        border-radius: 0.113rem;
        margin-right: 0.2rem;
        margin-bottom: 0.226rem;
        &:nth-child(2n) {
            margin-right: 0;
        }
        img {
            width: 2.791rem;
            height: 2.791rem;
            border-radius: 0.113rem 0.113rem 0rem 0rem;
        }
        .name {
            margin: 0.1rem 0.15rem 0.05rem 0.15rem;
            color: #1a1a1a;
            font-size: 0.215rem;
            line-height: 0.271rem;
            height: 0.5rem;
        }
        .info {
            margin: 0.1rem 0.15rem;
            // display: flex;
            // align-items: center;
            // justify-content: space-between;
            .price {
                .new {
                    color: #fc0808;
                    font-size: 0.249rem;
                }
                .old {
                    color: #a8a8a8;
                    font-size: 0.181rem;
                    text-decoration: line-through;
                }
            }
            .count {
                color: #a8a8a8;
                font-size: 0.169rem;
                margin-top: 0.05rem;
            }
        }
    }
}
</style>