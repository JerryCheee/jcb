<template>
    <div class="shopcart-wrap">
        <div class="shopcart-content" ref="container">
            <empty description="暂无商品" v-if="!list.length"></empty>
            <Sticky v-if="list.length" :container="container">
                <div class="top-control row ac sb">
                    <span>购物车({{ list.length }})</span>
                    <span @click="isEdit = !isEdit">{{
                        isEdit ? "完成" : "管理"
                    }}</span>
                </div>
            </Sticky>

            <div class="content">
                <checkbox-group v-model="result" ref="checkboxGroup">
                    <div
                        class="goods-card"
                        v-for="(item, index) in list"
                        :key="index"
                    >
                        <checkbox
                            :name="item.cartId"
                            checked-color="#2ecb62"
                            :label-disabled="true"
                        >
                            <ShopCartCard
                                :goods="item"
                                @changeNum="changeNum"
                            />
                        </checkbox>
                    </div>
                </checkbox-group>
            </div>
        </div>

        <div class="recommend">
            <!-- 推荐产品 -->
            <h3 class="content title">推荐产品</h3>
            <div>
                <RecommendGoods />
            </div>
        </div>
        <!-- 购物车底部 -->
        <div class="shop-bar row sb ac">
            <div class="select-all row ac" @click="toggleAll">
                <i class="iconfont iconxuanzhong" v-if="isSelectAll"></i>
                <div class="circle" v-else></div>
                <span>全选</span>
            </div>
            <div class="buy-info row ac" v-if="!isEdit">
                <div class="info column">
                    <span>
                        合计:
                        <span class="price">
                            ￥{{ totalPrice.toFixed(2) }}
                        </span>
                    </span>
                    <span class="total">共计{{ totalCount }}个商品</span>
                </div>
                <div class="btn-buy row ac jc" @click="buyNow">立即购买</div>
            </div>
            <div class="buy-info row ac" v-else>
                <div class="del-btn" @click="delShopcartGoods">删除</div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
import MyFooter from "../../components/footer";
import ShopCartCard from "../../components/shopcart-card";
import RecommendGoods from "../../components/recommend-goods";
import { Checkbox, CheckboxGroup, Empty, Toast, Dialog, Sticky } from "vant";
import api from "../../api/shopcart";
import orderApi from "../../api/order";
export default {
    name: "shoppingCar",
    data() {
        return {
            isSelectAll: false,
            isEdit: false,
            result: [],
            list: [],
            totalCount: 0,
            totalPrice: 0,
            container: null,
            originalData: [],
        };
    },
    mounted() {
        this.init();
        this.container = this.$refs.container;
    },
    methods: {
        toggleAll() {
            this.$refs.checkboxGroup.toggleAll(!this.isSelectAll);
        },
        async init() {
            let res = await api.getList({ shopType: 2 });
            this.originalData = res.result || [];
            this.list = res.result
                .map((a) => a.productVoList)
                .reduce((a, b) => a.concat(b));
        },
        changeNum({ num, id }) {
            this.list.find((a, b) => a.cartId == id).count = num;
            this.originalData.forEach((a) => {
                var m = a.productVoList.find((a, b) => a.cartId == id);
                if (m) m.count = num;
            });
            this.getTotal();
        },
        async delShopcartGoods() {
            if (this.result.length == 0) {
                Toast("请勾选需要删除的商品!");
                return;
            }
            Dialog.confirm({
                title: "提示",
                message: "确认删除吗？",
                confirmButtonColor: "#2ecb62",
            })
                .then(async () => {
                    let ids = this.result.join(",");
                    let res = await api.delGoods({ id: ids });
                    if (res.success) {
                        this.init();
                        this.isEdit = false;
                        this.result = [];
                        this.totalCount = 0;
                        this.totalPrice = 0;
                    } else {
                        Toast("删除商品失败！");
                    }
                })
                .catch(() => {
                    // on cancel
                });
        },
        //立即购买
        async buyNow() {
            if (this.result.length == 0) return Toast("请最少选择一个商品！");
            let data = this.originalData
                .map((o) => o.productVoList)
                .map((v) => {
                    return {
                        productList: v
                            .filter((a) => this.result.includes(a.cartId))
                            .map((m) => {
                                return {
                                    productId: m.productId,
                                    number: m.count,
                                    skuPrice: m.price,
                                    skuId: m.skuId,
                                    templateId: m.templateId,
                                };
                            }),
                        sourceType: 2,
                        sourceId: this.$store.state.user.storeId,
                    };
                })
                .filter((a) => a.productList.length);
            let res = await orderApi.addStoreOrder(data);
            if (!res.success) return Toast(res.message);
            this.$router.push({ path: "/order/confirm/" + res.result });
        },
        getTotal() {
            var totalCount = 0,
                totalPrice = 0;
            this.list.forEach((m) => {
                if (this.result.includes(m.cartId)) {
                    totalCount += m.count;
                    totalPrice += m.price * m.count;
                }
            });
            this.totalCount = totalCount;
            this.totalPrice = totalPrice;
        },
    },
    watch: {
        result(v) {
            // console.log(v);
            this.isSelectAll = v.length == this.list.length;
            this.getTotal();
        },
    },
    components: {
        MyFooter,
        ShopCartCard,
        RecommendGoods,
        Checkbox,
        CheckboxGroup,
        Empty,
        Toast,
        Dialog,
        Sticky,
    },
};
</script>

<style lang="less" scoped>
h3 {
    font-size: 0.27rem;
    color: #1a1a1a;
}
.iconxuanzhong {
    font-size: 0.32rem;
    color: #2ecb62;
}
.circle {
    width: 0.28rem;
    height: 0.28rem;
    border-radius: 50%;
    border: solid 0.01rem #a8a8a8;
    flex-shrink: 0;
}
.shopcart-wrap {
    background-color: #f6f6f6;
    padding-bottom: 1.7rem;
    .top-control {
        height: 0.75rem;
        background-color: #ffffff;
        padding: 0 0.27rem;
        span {
            font-size: 0.24rem;
            color: #1a1a1a;
        }
    }
}
.shopcart-content {
    padding-bottom: 0.23rem;
    .content {
        padding: 0 0.27rem;
        margin-top: 0.27rem;
        .goods-card {
            background-color: #ffffff;
            border-radius: 0.11rem;
            padding: 0.2rem 0.23rem;
            margin-bottom: 0.23rem;
        }
    }
    .title {
        margin-top: 0.45rem;
        margin-bottom: 0.23rem;
        font-size: 0.27rem;
        color: #1a1a1a;
        font-weight: bold;
    }
}
.shop-bar {
    box-sizing: border-box;
    width: 100%;
    position: fixed;
    bottom: 0.82rem;
    left: 0;
    background-color: #ffffff;
    height: 0.83rem;
    padding: 0 0.27rem 0 0.5rem;
    .select-all {
        span {
            margin-left: 0.22rem;
            font-size: 0.24rem;
            color: #000000;
        }
    }
    .buy-info {
        font-size: 0.24rem;
        color: #1a1a1a;
        overflow: hidden;
        .info {
            margin-right: 0.11rem;
        }
        .price {
            color: #fc0808;
        }
        .total {
            color: #a8a8a8;
            font-size: 0.2rem;
            text-align: right;
        }
        .del-btn {
            width: 1.469rem;
            height: 0.565rem;
            border-radius: 0.282rem;
            border: solid 0.006rem #1a1a1a;
            text-align: center;
            line-height: 0.565rem;
            text-align: center;
            font-size: 0.215rem;
            color: #1a1a1a;
        }
    }
    .btn-buy {
        width: 1.47rem;
        height: 0.56rem;
        background-color: #2ecb62;
        border-radius: 0.28rem;
        color: #ffffff;
    }
}
.recommend {
    .title {
        padding: 0 0.27rem;
    }
}
/deep/ .van-checkbox__label {
    flex: 1;
}
</style>