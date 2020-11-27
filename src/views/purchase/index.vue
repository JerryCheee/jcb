<template>
    <div class="mall-wrap">
        <search-top />

        <div class="top-box">
            <!-- 轮播图 -->
            <swipe :autoplay="3000" class="swipe" indicator-color="white">
                <swipe-item v-for="(item, index) in banners" :key="index">
                    <img :src="item.pic" />
                </swipe-item>
            </swipe>

            <!-- 公告/新闻 -->
            <div class="news" v-if="notice">
                <img src="../../assets/img/金材宝资讯.png" alt />
                <NoticeBar
                    style="flex: 1; font-size: 0.215rem"
                    color="#1a1a1a"
                    background="#ffffff"
                    >{{ notice }}</NoticeBar
                >
            </div>

            <!-- 商品分类 -->
            <swipe class="classify" indicator-color="white">
                <swipe-item v-for="(item, index) in classify_list" :key="index">
                    <div class="class-list">
                        <router-link
                            tag="div"
                            :to="`/classify?index=${i}`"
                            class="classify-item"
                            v-for="(v, i) in item"
                            :key="i"
                        >
                            <img :src="v.icon" alt />
                            <div>{{ v.name }}</div>
                        </router-link>
                    </div>
                </swipe-item>
            </swipe>
        </div>

        <!-- 今日特惠 -->
        <div class="block" v-if="false">
            <div class="block-top">
                <div class="left">
                    <div class="title">今日特惠</div>
                    <div class="timer">
                        <count-down :time="1000000000">
                            <template #default="timeData">
                                <span class="num">{{ timeData.hours }}</span>
                                <span class="colon">:</span>
                                <span class="num">{{ timeData.minutes }}</span>
                                <span class="colon">:</span>
                                <span class="num">{{ timeData.seconds }}</span>
                            </template>
                        </count-down>
                    </div>
                </div>
                <router-link
                    tag="div"
                    to="/purchase/preferential"
                    class="right"
                >
                    更多
                    <i class="iconfont icongengduo"></i>
                </router-link>
            </div>

            <div class="goods-list">
                <router-link
                    tag="div"
                    class="goods-item"
                    v-for="(item, index) in 6"
                    :key="index"
                    to="/goods/detail?id=1"
                >
                    <img src="../../assets/img/进货商城-产品图.png" alt />
                    <div class="goods-name e1">博世 电动工具 螺丝刀</div>
                    <div class="goods-price">
                        <span class="text">特惠价:</span>
                        <span class="new">￥399</span>
                        <span class="old">￥499</span>
                    </div>
                </router-link>
            </div>
        </div>

        <!-- 大牌驾到 -->
        <div class="block">
            <div class="block-top">
                <div class="left">
                    <div class="title">大牌驾到</div>
                    <div class="desc">福利天天送</div>
                </div>
                <router-link
                    tag="div"
                    to="/purchase/brand-arrives"
                    class="right"
                >
                    更多
                    <i class="iconfont icongengduo"></i>
                </router-link>
            </div>

            <div class="brand-list">
                <div
                    class="brand-item"
                    v-for="(item, index) in reconBrandList"
                    :key="index"
                    @click="$router.push('/purchase/search?id=' + item.id)"
                >
                    <img :src="item.logo" alt />
                </div>
            </div>
        </div>

        <template v-if="false">
            <!-- 轮播图 -->
            <swipe :autoplay="3000" class="swipe" indicator-color="white">
                <swipe-item>
                    <img src="../../assets/img/banner拷贝.png" alt />
                </swipe-item>
                <swipe-item>
                    <img src="../../assets/img/店铺街banner.png" alt />
                </swipe-item>
                <swipe-item>
                    <img src="../../assets/img/banner拷贝.png" alt />
                </swipe-item>
                <swipe-item>
                    <img src="../../assets/img/店铺街banner.png" alt />
                </swipe-item>
            </swipe>

            <!-- 品牌好物 -->
            <div class="brand-block">
                <div class="title">品牌好物</div>
                <div class="desc">精选产品·精工打造</div>
                <div class="list">
                    <router-link
                        tag="div"
                        class="item-row"
                        to="/goods/detail?id=1"
                    >
                        <img src="../../assets/img/分类-商品图.png" alt />
                        <div class="info">
                            <div class="name e2">博世 电动工 螺 丝刀</div>
                            <div class="price"><span>￥</span>499</div>
                        </div>
                    </router-link>
                    <router-link
                        tag="div"
                        class="item-row"
                        to="/goods/detail?id=1"
                    >
                        <img src="../../assets/img/分类-商品图.png" alt />
                        <div class="info">
                            <div class="name e2">
                                博世 电动工 螺 丝刀世 电动工 螺 丝刀
                            </div>
                            <div class="price"><span>￥</span>499</div>
                        </div>
                    </router-link>
                </div>
                <div class="list">
                    <router-link
                        tag="div"
                        class="item-col"
                        v-for="(item, index) in 4"
                        :key="index"
                        to="/goods/detail?id=1"
                    >
                        <img src="../../assets/img/分类-商品图.png" alt />
                        <div class="info">
                            <div class="name e1">电动螺丝刀</div>
                            <div class="price"><span>￥</span>499</div>
                        </div>
                    </router-link>
                </div>
            </div>

            <!-- 热销产品 -->
            <div class="hot-block">
                <div class="title">热销产品</div>
                <div class="desc">好货物购买必选</div>
                <div class="list">
                    <router-link
                        tag="div"
                        class="item"
                        v-for="(item, index) in 3"
                        :key="index"
                        to="/goods/detail?id=1"
                    >
                        <img src="../../assets/img/分类-商品图.png" alt />
                        <div class="info">
                            <div class="name e2">
                                铁皮打包带专用大力剪刀剪 铁皮带剪刀 钢带剪
                            </div>
                            <div class="price">
                                <span class="new">￥150</span>
                                <span class="old">￥199</span>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </template>
        <!-- 新品推荐/热销排行榜/智能推荐 -->
        <div class="pro-box">
            <tabs v-model="active" swipeable animated line-width="0">
                <tab
                    title="新品推荐"
                    v-for="(item, index) in proTabs"
                    :key="index"
                >
                    <IndexProList :type="active + 1" />
                </tab>
            </tabs>
        </div>

        <my-footer></my-footer>
    </div>
</template>

<script>
import {
    Swipe,
    SwipeItem,
    CountDown,
    Tab,
    Tabs,
    Toast,
    List,
    NoticeBar,
} from "vant";
import myFooter from "../../components/footer";
import searchTop from "../../components/search-top";
import IndexProList from "../../components/index-pro-list";
import api from "../../api/product";
import indexApi from "../../api/index";
export default {
    data() {
        return {
            banners: [],
            notice: [],
            classify_list: [],
            time: 1000000000,
            loading: false,
            finished: false,
            timeData: {
                hours: 0,
                minutes: 0,
                seconds: 0,
            },
            active: 1,
            reconBrandList: [],
            proTabs: ["新品推荐", "热销排行榜", "智能推荐"],
        };
    },
    created() {
        this.getBanner();
        this.getNotice();
        this.getAllClassifyList();
        this.getRecomBrand();
    },
    methods: {
        async getBanner() {
            let res = await indexApi.getBanner({
                field: 1,
                source: 1,
                type: 1,
            });
            this.banners = res.result || [];
        },
        async getNotice() {
            let res = await indexApi.getNotice({
                source: 1,
                type: 1,
            });
            this.notice = (res.result || []).map((v) => v.content).join("   ");
        },
        async getAllClassifyList() {
            let res = await api.getAllList();
            this.classify_list = this.arrTrans(10, res.result || []);
        },
        async getRecomBrand() {
            let res = await api.getRecomBrand();
            this.reconBrandList = res.result || [];
        },
        arrTrans(num, arr) {
            const newArr = [];
            while (arr.length > 0) {
                newArr.push(arr.splice(0, num));
            }
            return newArr;
        },
    },
    components: {
        Swipe,
        SwipeItem,
        searchTop,
        CountDown,
        Tab,
        Tabs,
        myFooter,
        IndexProList,
        List,
        NoticeBar,
    },
};
</script>

<style lang="less" scoped>
.swipe {
    width: 5.814rem;
    height: 2.26rem;
    background-color: #260109;
    border-radius: 0.113rem;
    overflow: hidden;
    margin: 0 auto;
    /deep/ .van-swipe__indicator {
        width: 0.136rem;
        height: 0.034rem;
        border-radius: 0.017rem;
    }
}
.top-box {
    width: 100%;
    height: 5.966rem;
    background: url("../../assets/img/订单详情背景图.png") no-repeat;
    background-size: 100%;
    padding-top: 0.226rem;
    padding-bottom: 0.226rem;

    .news {
        width: 5.814rem;
        height: 0.621rem;
        background-color: #ffffff;
        border-radius: 0.056rem;
        margin: 0.226rem auto 0 auto;
        display: flex;
        align-items: center;
        overflow: hidden;
        img {
            width: 1.062rem;
            height: 0.203rem;
            margin-left: 0.158rem;
        }
    }
    .classify {
        width: 5.814rem;
        margin: 0 auto;
        margin-top: 0.226rem;
        .class-list {
            width: 5.814rem;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .classify-item {
                width: 20%;
                margin-bottom: 0.3rem;
                img {
                    width: 0.723rem;
                    height: 0.723rem;
                    border-radius: 100%;
                    margin: 0 auto;
                }
                div {
                    color: #1a1a1a;
                    font-size: 0.203rem;
                    text-align: center;
                    margin-top: 0.1rem;
                }
            }
        }
        /deep/.van-swipe__indicators {
            bottom: 0;
            .van-swipe__indicator {
                width: 0.25rem;
                height: 0.07rem;
                background-color: #2ecb62;
                border-radius: 0.03rem;
                margin-right: 0;
            }
        }
    }
}

.block {
    margin-top: 0.3rem;
    padding: 0 0.27rem;
    .block-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.15rem;
        .left {
            font-size: 0.271rem;
            color: #1a1a1a;
            display: flex;
            align-items: center;
            .title {
                font-size: 0.271rem;
                font-size: 0.271rem;
                font-weight: bold;
            }
            .desc {
                width: 1.469rem;
                background-color: #fc0808;
                border-radius: 0.107rem;
                color: #ffffff;
                font-size: 0.181rem;
                text-align: center;
                margin-left: 0.1rem;
            }
            .timer {
                margin-left: 0.15rem;
                .colon {
                    display: inline-block;
                    margin: 0 0.06rem;
                    color: #ee0a24;
                }
                .num {
                    display: inline-block;
                    width: 0.32rem;
                    color: #fff;
                    font-size: 0.16rem;
                    text-align: center;
                    background-color: #ee0a24;
                }
            }
        }
        .right {
            color: #a8a8a8;
            font-size: 0.181rem;
            .iconfont {
                font-size: 0.16rem;
                margin-left: 0.1rem;
            }
        }
    }
    .goods-list {
        display: flex;
        flex-wrap: wrap;
        .goods-item {
            width: 2.791rem;
            height: 3.842rem;
            background-color: #ffffff;
            border-radius: 0.113rem;
            overflow: hidden;
            margin-right: 0.226rem;
            margin-bottom: 0.226rem;
            &:nth-child(2n) {
                margin-right: 0;
            }
            img {
                width: 2.808rem;
                height: 2.808rem;
            }
            .goods-name {
                color: #1a1a1a;
                font-size: 0.215rem;
                text-align: center;
                margin: 0.1rem 0.1rem 0.05rem 0.1rem;
            }
            .goods-price {
                text-align: center;
                .text {
                    font-size: 0.181rem;
                    color: #fc0808;
                    font-weight: bold;
                }
                .new {
                    font-size: 0.305rem;
                    color: #fc0808;
                    font-weight: bold;
                }
                .old {
                    color: #a8a8a8;
                    font-size: 0.215rem;
                    text-decoration: line-through;
                }
            }
        }
    }
    .brand-list {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .brand-item {
            overflow: hidden;
            margin-right: 0.22rem;
            margin-bottom: 0.226rem;
            &:nth-child(4n) {
                margin-right: 0;
            }
            img {
                width: 1.288rem;
                height: 1.017rem;
                border-radius: 0.056rem;
            }
        }
    }
}

.brand-block {
    margin: 0.226rem auto;
    background-image: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.6) 0%,
        rgba(0, 0, 0, 0.6) 100%
    );
    width: 5.814rem;
    height: 5.085rem;
    position: relative;
    border-radius: 0.113rem;
    overflow: hidden;
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 5.814rem;
        height: 5.085rem;
        background: url("../../assets/img/品牌好物背景.png");
        z-index: -1;
        background-size: cover;
    }
    .title {
        color: #ffffff;
        font-size: 0.271rem;
        padding-top: 0.33rem;
        text-align: center;
    }
    .desc {
        color: #ffffff;
        font-size: 0.203rem;
        text-align: center;
        margin-bottom: 0.33rem;
    }
    .list {
        margin: 0 0.169rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.169rem;
        .item-row {
            width: 2.655rem;
            height: 1.243rem;
            background-color: #ffffff;
            border-radius: 0.056rem;
            display: flex;
            img {
                width: 1.017rem;
                height: 1.017rem;
                border-radius: 0.056rem;
                padding: 0.113rem;
                padding-right: 0;
            }
            .info {
                padding: 0.113rem;
                padding-left: 0;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .name {
                    color: #1a1a1a;
                    font-size: 0.203rem;
                    line-height: 0.271rem;
                }
                .price {
                    font-size: 0.249rem;
                    color: #fc0808;
                    span {
                        font-size: 0.181rem;
                    }
                }
            }
        }
        .item-col {
            width: 1.243rem;
            height: 1.808rem;
            background-color: #ffffff;
            border-radius: 0.056rem;
            img {
                width: 1.017rem;
                height: 1.017rem;
                background-color: rgba(26, 26, 26, 0.1);
                border-radius: 0.056rem;
                margin: 0.113rem;
            }
            .info {
                text-align: center;
                .name {
                    color: #1a1a1a;
                    font-size: 0.181rem;
                }
                .price {
                    font-size: 0.215rem;
                    color: #fc0808;
                    span {
                        font-size: 0.181rem;
                    }
                }
            }
        }
    }
}
.hot-block {
    margin: 0.226rem auto;
    background-image: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.6) 0%,
        rgba(0, 0, 0, 0.6) 100%
    );
    width: 5.814rem;
    height: 4.407rem;
    position: relative;
    border-radius: 0.113rem;
    overflow: hidden;
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 5.814rem;
        height: 4.407rem;
        background: url("../../assets/img/热销产品背景.png");
        z-index: -1;
        background-size: cover;
    }
    .title {
        color: #ffffff;
        font-size: 0.271rem;
        padding-top: 0.3rem;
        text-align: center;
    }
    .desc {
        color: #ffffff;
        font-size: 0.203rem;
        text-align: center;
        margin-bottom: 0.3rem;
    }

    .list {
        display: flex;
        justify-content: space-between;
        margin: 0 0.169rem;
        .item {
            width: 1.712rem;
            height: 2.825rem;
            background-color: #ffffff;
            border-radius: 0.056rem;
            overflow: hidden;
            img {
                width: 1.712rem;
                height: 1.712rem;
                border-radius: 0.056rem 0.056rem 0rem 0rem;
            }
            .info {
                margin: 0 0.1rem;
                .name {
                    font-size: 0.203rem;
                    color: #1a1a1a;
                    line-height: 0.237rem;
                    margin: 0.05rem 0 0.1rem 0;
                }
                .price {
                    .new {
                        color: #fc0808;
                        font-size: 0.237rem;
                        font-weight: bold;
                    }
                    .old {
                        color: #a8a8a8;
                        font-size: 0.181rem;
                        text-decoration: line-through;
                    }
                }
            }
        }
    }
}

.pro-box {
    margin-bottom: 1rem;
    /deep/ .van-tabs__wrap {
        height: 1.1rem;
    }
    /deep/ .van-tabs__nav {
        background: none;
    }
    /deep/ .van-tab {
        color: #1a1a1a;
        font-size: 0.271rem;
    }

    /deep/ .van-tab::after {
        position: absolute;
        bottom: 0;
        color: #a8a8a8;
        font-size: 0.203rem;
        line-height: 0.3rem;
    }
    /deep/ .van-tab:nth-child(1):after {
        content: "品质无优";
    }
    /deep/ .van-tab:nth-child(2):after {
        content: "人气精选排行 ";
    }
    /deep/ .van-tab:nth-child(3):after {
        content: "为您推荐";
    }
    /deep/ .van-tab--active {
        color: #2ecb62;
        font-weight: bold;
    }
    /deep/ .van-tab--active:after {
        height: 0.282rem;
        background-color: #2ecb62;
        border-radius: 0.141rem;
        color: #ffffff;
        font-size: 0.203rem;
        padding: 0 0.1rem;
    }
    /deep/ .van-tab__pane-wrapper {
        min-height: 80vh;
    }
}
</style>