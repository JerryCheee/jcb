<template>
    <div class="classify-wrap column">
        <div class="top row ac jc">
            <input
                type="text"
                class="search"
                placeholder="请输入商品名称或店铺名称搜索"
                @click="$router.push('/purchase/search')"
            />
        </div>
        <!-- icon菜单栏 -->
        <div class="classify-list row">
            <!-- 一级筛选 -->
            <div
                class="classify-item"
                v-for="(item, i) in allList"
                :key="item.id"
                @click="changeOne(i)"
            >
                <img :src="item.icon" alt />
                <span>{{ item.name }}</span>
            </div>
        </div>

        <!-- 筛选区域 -->
        <div class="classify-area row">
            <div class="left-menu" :style="{ height: leftHeight }">
                <div
                    class="menu-item-name row ac jc e1"
                    :class="{ active: i == activeIndex }"
                    v-for="(item, i) in second"
                    :key="i"
                    @click="changeMenu(i)"
                >
                    {{ item.name }}
                </div>
            </div>
            <!-- 文字筛选 -->
            <div class="right-content" ref="rightBox">
                <div class="top-search row" v-show="isThrid" ref="lv3box">
                    <span
                        :class="{ 'active-text': thirdIdx == i }"
                        v-for="(item, i) in third"
                        :key="i"
                        @click="changeThird(i)"
                        >{{ item.name }}</span
                    >
                </div>

                <!-- 条件筛选 -->
                <div class="search-wrap column">
                    <div class="prepar-wrap row sb ac" ref="filterBox">
                        <div class="row left sb">
                            <span
                                :class="{ 'active-text': conditionIdx == 0 }"
                                @click="changeCondition(0)"
                                >综合</span
                            >
                            <span
                                :class="{ 'active-text': conditionIdx == 1 }"
                                @click="changeCondition(1)"
                                >销量</span
                            >
                            <span
                                class="row ac"
                                :class="{ 'active-text': conditionIdx == 2 }"
                                @click="changeCondition(2)"
                            >
                                <span>价格</span>
                                <preparation
                                    :status.sync="salesCondition"
                                    ref="prepa"
                                ></preparation>
                            </span>
                        </div>
                        <div class="row right" @click="isPop = true">
                            <i class="iconfont iconshaixuan"></i> 筛选
                        </div>
                    </div>

                    <!-- 筛选出来的商品 -->
                    <div
                        class="searched-goods"
                        ref="resultBox"
                        :style="`height:${dynamicHeight}px`"
                    >
                        <router-link
                            tag="div"
                            class="goods-card row"
                            v-for="(item, index) in goodsList"
                            :key="index"
                            :to="'/goods/detail?id=' + item.productId"
                        >
                            <img :src="item.pic" alt />
                            <div class="right-info column sb">
                                <span class="name e2">{{
                                    item.productName
                                }}</span>
                                <div class="price row">
                                    <div class="now">
                                        ￥{{ item.purchasePrice }}
                                    </div>
                                    <div class="old" v-if="item.advicePrice">
                                        ￥{{ item.advicePrice || 0 }}
                                    </div>
                                </div>
                            </div>
                        </router-link>
                        <div if="!iphoneX" style="height: 0.82rem"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 占位 -->
        <div class="useless"></div>

        <pop-up :show="isPop" position="right-center" @onModalClick="closePop">
            <preparation-inner
                :info="goodsBrands"
                @close="closePop"
                @reset="resetPop"
                @confirm="confirm"
            ></preparation-inner>
        </pop-up>
        <myFooter></myFooter>
    </div>
</template>

<script>
import myFooter from "../../components/footer";
import preparation from "../../components/preparation";
import popUp from "../../components/popUp";
import preparationInner from "../../components/preparation-inner";
import api from "../../api/product";
import { isIphoneX } from "../../utils/iosOnly";
import { List } from "vant";
export default {
    data() {
        return {
            activeIndex: 0, //二级选中idx
            thirdIdx: -1, //三级筛选 选中id
            fuck: 0,
            isPop: false, //筛选pop弹框
            goodsBrands: [], //商品品牌列表
            conditionIdx: 0, //条件筛选 选中idx
            salesCondition: 0, //筛选状态
            isThrid: true, //三级显示状态
            timer: null,
            iphoneX: isIphoneX(),
            allList: [],
            second: [],
            third: [],
            scroll: null,
            leftHeight: 400,
            dynamicHeight: 400,
            searchParams: {
                pageNo: 1,
                pageSize: 100,
                type: -1,
            },
            goodsList: [],
        };
    },
    async created() {
        this.getAllClassifyList();
        this.getBrandRec();
    },
    methods: {
        async getGoodList() {
            let res = await api.getGoods(this.searchParams);
            this.goodsList = [...this.goodsList, ...res.result.lists];
        },
        changeOne(i) {
            //一级
            this.second = this.allList[i].children;
            // 给二级复位
            this.changeMenu(0);
        },
        changeMenu(i) {
            //二级
            this.third = this.second[i].children;
            this.activeIndex = i;
            this.isThrid = this.third.length > 0;
            // this.resizeCon()
            this.searchParams.id = this.second[i].id;
            console.log(this.second[i].id);
            this.goodsList = [];
            this.getGoodList();
        },
        changeThird(i) {
            this.thirdIdx = i;
            this.searchParams.id = this.third[i].id;
            this.goodsList = [];
            this.getGoodList();
        },
        changeCondition(i) {
            //切换筛选类型
            this.conditionIdx = i;
            if (i == 0) {
                delete this.searchParams.priceSort;
                this.searchParams.saleSort = false;
                this.$refs.prepa.reset();
            }
            if (i == 1) {
                this.searchParams.saleSort = true;
                delete this.searchParams.priceSort;
                this.$refs.prepa.reset();
            }
            if (i == 2) {
                if (this.salesCondition == 0) {
                    delete this.searchParams.priceSort;
                } else if (this.salesCondition == 1) {
                    this.searchParams.priceSort = true;
                } else {
                    this.searchParams.priceSort = false;
                }
            }
            this.goodsList = [];
            this.getGoodList();
        },
        async getAllClassifyList() {
            let res = await api.getAllList();
            this.allList = res.result;
            this.second = this.allList[0].children;
            this.third = this.second.children || [];
            this.isThrid = this.third.length > 0; //判断一开始有莫有三级

            let { index } = this.$route.query;
            if (index) {
                this.changeOne(index);
                return;
            }
            this.changeOne(0);
        },
        updateDynamicHeight() {
            //动态计算 content高度
            let { rightBox, lv3box, filterBox } = this.$refs;
            let rh = rightBox.clientHeight;
            let fh = filterBox.clientHeight;
            let lv3h = lv3box.clientHeight;
            this.dynamicHeight = rh - fh - lv3h;
            this.leftHeight = rh;
        },

        //筛选pop
        closePop() {
            this.isPop = !this.isPop;
        },
        async getBrandRec() {
            //获取品牌
            let res = await api.getBrands();
            Object.values(res.result).map((v) => {
                this.goodsBrands.push(...v);
            });
        },
        resetPop() {
            this.searchParams.startPrice = 0;
            this.searchParams.endPrice = 0;
            this.searchParams.type = -1;
            this.searchParams.brandId = "";
            this.goodsList = [];
            this.getGoodList();
        },
        confirm(value, price) {
            this.searchParams.startPrice = price.start;
            this.searchParams.endPrice = price.end;
            this.searchParams.type = value[0];
            this.searchParams.brandId = value[1].id;
            this.goodsList = [];
            this.getGoodList();
        },
    },
    mounted() {
        this.updateDynamicHeight();
    },
    watch: {
        salesCondition(n) {
            console.log(n);
        },
        isThrid(n) {
            setTimeout(this.updateDynamicHeight, 0);
        },
    },
    components: {
        myFooter,
        preparation,
        popUp,
        preparationInner,
        List,
    },
};
</script>

<style lang="less" scoped>
.useless {
    width: 100%;
    min-height: 0.83rem;
    flex-shrink: 0;
}
.classify-wrap {
    height: 100vh;
    background-color: #ffffff;
    overflow: hidden;
    .top {
        padding: 0.12rem 0.27rem;
        .search {
            height: 0.51rem;
            background-color: #f6f6f6;
            border-radius: 0.25rem;
            padding-left: 0.12rem;
            font-size: 0.18rem;
            color: #bbbbbb;
        }
    }
}
.classify-list {
    padding: 0.23rem 0.3rem;
    // flex: 1;
    overflow: auto;
    flex-shrink: 0;
    .classify-item {
        flex-shrink: 0;
        margin-right: 0.37rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
            width: 0.72rem;
            height: 0.72rem;
        }
        span {
            color: #1a1a1a;
            font-size: 0.2rem;
            margin-top: 0.11rem;
        }
    }
}
.classify-area {
    // padding-bottom: 0.83rem;
    flex-grow: 1;

    .active-text {
        color: #2ecb62;
        font-weight: bold;
    }
    .left-menu {
        width: 1.81rem;
        height: 8.4rem;
        padding-bottom: 0.4rem;
        box-sizing: border-box;
        background-color: #f6f6f6;
        flex-shrink: 0;
        overflow: scroll;
        .menu-item-name {
            height: 0.68rem;
            font-size: 0.21rem;
            color: #a8a8a8;
            &.active {
                background-color: #ffffff;
                color: #1a1a1a;
            }
        }
    }
    .right-content {
        // height: 100%;
        background-color: #ffffff;
        overflow: hidden;
        flex: 1;
        .top-search {
            padding: 0.26rem 0.18rem;
            overflow: auto;
            span {
                box-sizing: border-box;
                font-size: 0.21rem;
                flex-shrink: 0;
                margin-right: 0.42rem;
            }
        }
        .search-wrap {
            box-sizing: border-box;
            padding: 0 0.27rem;
            .prepar-wrap {
                padding: 0 0.16rem;
                height: 0.68rem;
                background-color: #f6f6f6;
                border-radius: 0.06rem;
                font-size: 0.21rem;
                color: #1a1a1a;
                line-height: 1;
                .left {
                    flex: 3;
                    > span {
                        line-height: 0.213rem;
                    }
                }
                .right {
                    flex: 2;
                    justify-content: flex-end;
                    i {
                        font-size: 0.19rem;
                        margin-right: 0.01rem;
                    }
                }
            }
        }
        .searched-goods {
            overflow-y: scroll;
            flex-grow: 1;
            .goods-card {
                margin-top: 0.18rem;
                height: 1.28rem;
                img {
                    width: 1.24rem;
                    height: 1.24rem;
                    border-radius: 0.06rem;
                }
                .right-info {
                    margin-left: 0.17rem;
                    flex: 1;
                    .name {
                        color: #1a1a1a;
                        font-size: 0.24rem;
                    }
                    .price {
                        align-items: flex-end;
                        line-height: 1;
                        .now {
                            font-size: 0.31rem;
                            color: #fc0808;
                        }
                        .old {
                            font-size: 0.18rem;
                            color: #a8a8a8;
                            margin-left: 0.05rem;
                            text-decoration: line-through;
                        }
                    }
                }
            }
        }
    }
}
</style>