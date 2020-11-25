<template>
    <div class="order-goods-card">
        <!-- 商品 -->
        <div
            class="goods-item row ac"
            v-for="(item, index) in list"
            :key="index"
            @click.stop="goProductDetail(item.orderProductId)"
        >
            <img :src="item.productPic" alt="" />
            <div class="right column sb">
                <div class="column">
                    <span class="name">
                        {{ item.productName }}
                    </span>
                    <span class="sku">
                        {{ item.propertyName }}
                    </span>
                </div>
                <span class="num">x{{ item.number }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["list"],
    data() {
        return {};
    },
    methods: {},
};
</script>

<style lang="less" scoped>
.order-goods-card {
    background-color: #ffffff;
    border-radius: 0.11rem;
    padding: 0.24rem;
    box-sizing: border-box;
    .goods-item {
        margin-bottom: 0.4rem;
        img {
            width: 1.41rem;
            height: 1.41rem;
            border-radius: 0.11rem;
        }
        .right {
            height: 1.41rem;
            margin-left: 0.23rem;
            .name {
                font-size: 0.21rem;
                color: #1a1a1a;
            }
            .sku {
                margin-top: 0.1rem;
                .color {
                    margin-left: 0.22rem;
                }
            }
            .sku,
            .num {
                font-size: 0.18rem;
                color: #a8a8a8;
            }
        }
    }
}
</style>