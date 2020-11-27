<template>
    <div class="goods-info row ac sb">
        <img :src="goods.pic" alt="" />
        <div class="info column sb">
            <div class="name e2" @click.stop="goDetail">
                {{ goods.productName }}
            </div>
            <span class="spec">{{ goods.prop }}</span>
            <div class="row sb">
                <span class="price">￥{{ goods.price || 0 }}</span>
                <stepper :value="goods.count" @change="changeNum" />
            </div>
        </div>
    </div>
</template>

<script>
import { Stepper } from "vant";
export default {
    props: ["goods"],
    data() {
        return {
            num: 1,
        };
    },
    methods: {
        goDetail() {
            this.$router.push("/goods/detail?id=" + this.goods.productId);
        },
        changeNum(v) {
            this.$emit("changeNum", { num: v, id: this.goods.cartId });
        },
    },
    components: {
        Stepper,
    },
};
</script>

<style lang="less" scoped>
.iconxuanzhong {
    font-size: 0.32rem !important;
    color: #2ecb62;
}
.circle {
    width: 0.28rem;
    height: 0.28rem;
    border-radius: 50%;
    border: solid 0.01rem #a8a8a8;
    flex-shrink: 0;
}
.goods-info {
    // background-color: #ffffff;
    // border-radius: 0.11rem;
    // padding: 0.2rem 0.23rem;
    // margin-bottom: 0.23rem;
    img {
        width: 1.41rem;
        height: 1.41rem;
        border-radius: 0.11rem;
        margin-left: 0.1rem;
    }
    .info {
        margin-left: 0.2rem;
        height: 1.48rem;
        flex: 1;
        .name {
            color: #1a1a1a;
            font-size: 0.21rem;
        }
        .spec {
            font-size: 0.18rem;
            color: #a8a8a8;
        }
        .price {
            font-size: 0.27rem;
            color: #fc0808;
        }
        .van-stepper {
            display: flex;
        }
    }
}
</style>