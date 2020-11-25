<template>
    <div class="confirm-order">
        <div class="deliver">
            <!-- 无地址情况 -->
            <!-- <div class="no-address row ac jc">+添加地址</div> -->
            <!-- 有地址情况 -->
            <router-link to="/order/choose-address" class="addr-detail">
                <div class="addr-info">
                    <div>
                        <span class="name">张三</span>
                        <span class="tel">13711221122</span>
                    </div>
                    <div class="e2">
                        <i class="iconfont icondizhi1"></i>
                        <span class="address"
                            >地球市地球镇地球村东南西北888号</span
                        >
                    </div>
                </div>
                <i class="iconfont iconARROW"></i>
            </router-link>
        </div>

        <!-- 商品卡片 -->
        <div class="choose-methods-card">
            <div class="company">豪迪五金工具有限公司</div>
            <div class="goods row">
                <img src="../../assets/img/确认订单.png" alt="" />
                <div class="column sb" style="margin-left: 0.23rem">
                    <div class="name e2">
                        博世 电动工具 3.6V锂电池充电起子 螺丝刀 IXO3
                    </div>
                    <div class="sku">规格:220V 颜色:黑色</div>
                    <div class="footer row sb ac">
                        <span class="price">￥298</span>
                        <stepper v-model="form.num" />
                    </div>
                </div>
            </div>

            <div class="selftake-wrap row" v-show="form.deliverWayIdx == 2">
                <div class="info column sb">
                    <div class="title">取货信息</div>
                    <div class="shop-address">
                        <i class="iconfont icondizhi1"></i>
                        <span>地球市地球镇地球村东南西北888号 </span>
                    </div>
                    <div class="user-select row">
                        <div
                            class="take-time column sb"
                            @click="pops.takeTime = true"
                        >
                            <span class="title">自提时间</span>
                            <div class="row">
                                10-30 18:00
                                <i class="iconfont iconARROW"></i>
                            </div>
                        </div>
                        <div class="phone column sb" @click="editHandle">
                            <span class="title">预留手机</span>
                            <input
                                ref="input"
                                type="phone"
                                class="edit-phone"
                                v-model="contact"
                                v-show="editPhone"
                                @blur="checkPhone"
                            />
                            <div class="row" v-show="!editPhone">
                                {{ contact }}<i class="iconfont iconbianji"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 行 -->
            <div class="order-field row sb ac" @click="pops.shop = true">
                <span class="left">优惠</span>
                <div class="right row ac">
                    <span>-￥10.00 </span>
                    <i class="iconfont iconARROW"></i>
                </div>
            </div>
            <div class="order-field row sb ac" @click="pops.way = true">
                <span class="left">
                    配送方式
                    <span class="desc">{{
                        deliverWay[form.deliverWayIdx]
                    }}</span>
                </span>
                <div class="right row ac">
                    <span>￥0 </span>
                    <i class="iconfont iconARROW"></i>
                </div>
            </div>
            <div class="order-field row sb ac" v-show="form.deliverWayIdx == 0">
                <span class="left"
                    >运费险 <span class="desc">货物运输过程中有损，可赔</span>
                </span>
                <span
                    class="right row ac"
                    @click="form.insurance = !form.insurance"
                >
                    ￥10.00
                    <i
                        class="iconfont insurance"
                        :class="[
                            { iconyuan: !form.insurance },
                            { iconxuanzhong: form.insurance },
                        ]"
                    ></i>
                </span>
            </div>
            <div class="order-field row sb ac">
                <span class="left">备注</span>
                <input
                    type="text"
                    placeholder="请输入您备注信息"
                    v-model="form.message"
                />
            </div>
        </div>

        <div class="field-item row sb ac">
            <span class="title">发票</span>
            <span class="shit">如需发票，请联系商家</span>
        </div>
        <div class="field-item">
            <div class="alone-feild row sb ac" @click="pops.pay = true">
                <span class="title row ac">支付方式</span>
                <div class="row ac">
                    <template v-if="payType == 1">
                        <i class="iconfont iconweixin"></i>
                        <span>微信支付</span>
                    </template>
                    <template v-if="payType == 2">
                        <i class="iconfont iconyinhangka2"></i>
                        <span>线下支付</span>
                    </template>
                    <template v-if="payType == 3">
                        <i class="iconfont iconjicaifen"></i>
                        <span>集采分支付</span>
                    </template>
                    <i class="iconfont iconARROW"></i>
                </div>
            </div>
            <div class="point-info" v-if="payType == 3">
                <div class="top">
                    <span>
                        使用集采分
                        <span class="red">(集采分不足)</span>
                    </span>
                    <span>316.8</span>
                </div>
                <div class="desc" v-if="false">
                    你当前可用集采分为50000，本次订单最多可使用316.8分
                </div>
                <div class="desc" v-else>
                    你当前可用集采分为0，本次订单最多可使用316.8分，你的集采分不足，请重新选择支付方式
                </div>
            </div>
            <div class="account-info" v-if="payType == 2">
                <div class="top">选择支付账号</div>

                <div
                    class="account"
                    v-for="(item, index) in 2"
                    :key="index"
                    :class="{ on: index == account_index }"
                    @click="account_index = index"
                >
                    <div class="cell">
                        <span class="title">对公账号</span>
                        <span class="content">1938483739309480</span>
                    </div>
                    <div class="cell">
                        <span class="title">户名</span>
                        <span class="content">豪迪五金工具有限公司</span>
                    </div>
                    <div class="cell">
                        <span class="title">开户行</span>
                        <span class="content">工商银行莲花支行</span>
                    </div>
                    <i class="iconfont iconxuanzhong4"></i>
                </div>
            </div>
        </div>

        <div class="rule row ac">
            <div class="checkbox row ac" @click="agreement = !agreement">
                <i class="iconfont iconxuanzhong3" v-if="agreement"></i>
                <div class="no" v-else></div>
            </div>
            <span>同意</span>
            <span class="agreement">《到店自取服务协议》</span>
        </div>

        <div class="tabbar row sb ac">
            <div class="left row ac">
                <span class="word">合计:</span>
                <span class="money">￥316.8</span>
            </div>
            <div class="buy-btn row ac jc">立即购买</div>
        </div>

        <!-- 又是一堆弹框 x_x -->
        <action-sheet v-model="pops.takeTime" title="选择自提时间">
            <div class="take-time-content row">
                <div class="date">
                    <div
                        class="row ac jc"
                        :class="{ active: i == dayIdx }"
                        v-for="(item, i) in dateList"
                        :key="i"
                        @click="dayIdx = i"
                    >
                        {{ item.month }}-{{ item.day }}
                    </div>
                </div>
                <div class="time">
                    <div class="row sb ac active-time" style="height: 0.68rem">
                        <span>12:00</span>
                        <i class="iconfont iconxuanzhong2"></i>
                    </div>
                    <div class="row sb ac" style="height: 0.68rem">
                        <span>12:30</span>
                        <i class="iconfont iconxuanzhong2"></i>
                    </div>
                </div>
            </div>
        </action-sheet>

        <action-sheet v-model="pops.way" title="配送方式">
            <div class="way-content">
                <div
                    class="way-feild row ac sb"
                    v-for="(item, index) in deliverWay"
                    :key="index"
                    @click="
                        form.deliverWayIdx = index;
                        pops.way = false;
                    "
                >
                    <span class="title">{{ item }}</span>
                    <div class="row ac">
                        <i
                            class="iconfont iconxuanzhong"
                            v-if="form.deliverWayIdx == index"
                        ></i>
                        <i class="iconfont iconradiobuttonunselect" v-else></i>
                    </div>
                </div>
                <div
                    class="confirm-btn row ac jc position"
                    @click="pops.way = false"
                >
                    确定
                </div>
            </div>
        </action-sheet>

        <action-sheet v-model="pops.shop" title="优惠券">
            <div class="shop-content">
                <div
                    class="row ac mb26"
                    v-for="(item, i) in 2"
                    :key="i"
                    @click="shopHandle(i)"
                >
                    <div class="radio row ac">
                        <i
                            class="iconfont iconxuanzhong"
                            v-if="i == form.shopIdx"
                        ></i>
                        <i class="iconfont iconradiobuttonunselect" v-else></i>
                    </div>
                    <div class="coupon-item row ac">
                        <div class="left-top row ac jc">满减券</div>
                        <div class="left row ac jc">￥20</div>
                        <div class="mid column sb">
                            <span>全场通用/满500减20</span>
                            <span>有效期至2020-10-20</span>
                        </div>
                    </div>
                </div>
                <div
                    class="confirm-btn position row ac jc"
                    @click="pops.shop = false"
                >
                    确定
                </div>
            </div>
        </action-sheet>

        <action-sheet v-model="pops.pay" title="支付方式">
            <div class="pay-content">
                <radio-group v-model="payType">
                    <cell-group>
                        <cell title="微信支付" clickable @click="payType = '1'">
                            <template #title>
                                <i class="iconfont iconweixin"></i>
                                <span class="custom-title">微信支付</span>
                            </template>
                            <template #right-icon>
                                <radio name="1" checked-color="#2ecb62" />
                            </template>
                        </cell>
                        <cell title="线下支付" clickable @click="payType = '2'">
                            <template #title>
                                <i class="iconfont iconyinhangka2"></i>
                                <span class="custom-title">线下支付</span>
                            </template>
                            <template #right-icon>
                                <radio name="2" checked-color="#2ecb62" />
                            </template>
                        </cell>
                        <cell
                            title="集采分支付"
                            clickable
                            @click="payType = '3'"
                        >
                            <template #title>
                                <i class="iconfont iconjicaifen"></i>
                                <span class="custom-title">集采分支付</span>
                            </template>
                            <template #right-icon>
                                <radio name="3" checked-color="#2ecb62" />
                            </template>
                        </cell>
                    </cell-group>
                </radio-group>

                <div
                    class="confirm-btn row ac jc position"
                    @click="pops.pay = false"
                >
                    确定
                </div>
            </div>
        </action-sheet>
    </div>
</template>

<script>
import { ActionSheet, Stepper, RadioGroup, Radio, Cell, CellGroup } from "vant";
export default {
    data() {
        return {
            wayIdx: 1,
            agreement: false, //同意协议
            editPhone: false, //编辑手机号
            dateList: [], //日期
            dayIdx: 0, //选中的日期索引
            contact: "12345678900", // 联系电话
            form: {
                platformIdx: -1, //平台优惠券索引
                shopIdx: -1, //店铺优惠券索引
                deliverWayIdx: 0, //配送方式 两种
                num: 1,
                insurance: false, //运费险
                message: "",
            },
            deliverWay: ["快递配送", "物流到付", "上门自提"],
            pops: {
                takeTime: false,
                way: false,
                shop: false,
                pay: false,
            },
            payType: 1,
            account_index: -1, //线下支付账户索引
        };
    },
    methods: {
        getMonthDay() {
            // let date = new Date()
            let oneDay = 86400000; //一天
            let today = Date.now();
            let days = []; //最后数组
            let d = null;
            let month = null;
            let day = null;
            for (let i = 0; i < 31; i++) {
                d = new Date(today + oneDay);
                month = (d.getMonth() + 1).toString().padStart(2, 0);
                day = d.getDate().toString().padStart(2, 0);
                days.push({ month, day });
                today += oneDay;
            }
            // console.log(days)
            this.dateList = days;
        },
        editHandle() {
            if (this.editPhone) return;
            setTimeout(() => {
                this.$refs.input.focus();
            }, 100); //必须要延时一下
            this.editPhone = true;
        },
        checkPhone(e) {
            this.editPhone = false;
        },
        platformHandle(i) {
            // 店铺优惠切换
            if (this.form.platformIdx == i) {
                this.form.platformIdx = -1;
                return;
            }
            this.form.platformIdx = i;
        },
        shopHandle(i) {
            // 店铺优惠切换
            if (this.form.shopIdx == i) {
                this.form.shopIdx = -1;
                return;
            }
            this.form.shopIdx = i;
        },
    },
    mounted() {
        this.getMonthDay();
    },
    components: {
        ActionSheet,
        Stepper,
        RadioGroup,
        Radio,
        Cell,
        CellGroup,
    },
};
</script>

<style lang="less" scoped>
.confirm-order {
    height: 100vh;
    overflow: scroll;
    background-color: #f6f6f6;
    padding: 0.23rem 0.27rem 1rem 0.27rem;
}
.deliver {
    margin-bottom: 0.27rem;
    padding: 0.2rem 0.1rem;
    border-radius: 0.113rem;
    background: #ffffff;
    .no-address {
        height: 0.73rem;
        background-color: #f6f6f6;
        font-size: 0.21rem;
        color: #a8a8a8;
    }
    .addr-detail {
        display: flex;
        align-items: center;
        min-height: 0.836rem;
        .iconARROW {
            font-size: 0.3rem;
            color: #000000;
            margin-left: 0.2rem;
            font-weight: bold;
        }
        .addr-info {
            flex: 1;
            .name,
            .tel {
                color: #000000;
                font-size: 0.237rem;
                font-weight: bold;
                margin-right: 0.2rem;
            }
            .e2 {
                margin-top: 0.1rem;
            }
            .icondizhi1 {
                font-size: 0.22rem;
                margin-right: 0.1rem;
            }
            .address {
                color: #000000;
                font-size: 0.215rem;
            }
        }
    }
}
.selftake-wrap {
    position: relative;
    box-sizing: border-box;
    padding: 0.1rem;
    background-color: #f6f6f6;
    border-radius: 0.113rem;
    .info {
        .title {
            color: #a8a8a8;
            font-size: 0.215rem;
            padding: 0.1rem 0;
        }
        .shop-address {
            font-size: 0.237rem;
            color: #000000;
            i {
                font-size: 0.22rem;
            }
            span {
                margin-left: 0.23rem;
            }
        }
        .user-select {
            margin: 0.1rem 0 0.1rem 0;
            font-size: 0.21rem;
            color: #000000;
            .title {
                color: #000000;
                font-size: 0.215rem;
            }
            .phone {
                margin-left: 0.56rem;
                .edit-phone {
                    border: none;
                    text-align: center;
                    border-bottom: 1px solid #cccccc;
                }
            }
            .row {
                margin-top: 0.06rem;
                justify-content: flex-end;
                line-height: 1;
                i {
                    font-size: 0.2rem;
                    color: #a8a8a8;
                    margin-left: 0.08rem;
                }
            }
        }
    }
    .rule {
        color: #1a1a1a;
        font-size: 0.2rem;
        .checkbox {
            margin-right: 0.14rem;
            .no {
                border: 1px solid #dddddd;
                width: 0.2rem;
                height: 0.2rem;
                box-sizing: border-box;
            }
            i {
                font-size: 0.2rem;
                color: #2ecb62;
            }
        }
        .agreement {
            color: #13438c;
        }
    }
    .r {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 0.4rem;
        font-weight: bold;
    }
}
.choose-methods-card {
    padding: 0.17rem 0.17rem;
    background-color: #ffffff;
    border-radius: 0.11rem;
    margin-bottom: 0.23rem;
    .company {
        font-size: 0.181rem;
        color: #1a1a1a;
        margin-bottom: 0.2rem;
    }
    .goods {
        margin-bottom: 0.2rem;
        img {
            width: 1.41rem;
            height: 1.41rem;
            border-radius: 0.11rem;
        }
        .name {
            font-size: 0.21rem;
            color: #1a1a1a;
        }
        .sku {
            font-size: 0.18rem;
            color: #a8a8a8;
        }
        .price {
            font-size: 0.27rem;
            color: #fc0808;
        }
        /deep/ .van-stepper {
            display: flex;
        }
    }
    .order-field {
        // padding: 0 0.17rem;
        color: #1a1a1a;
        height: 0.68rem;
        font-size: 0.21rem;
        .left {
            position: relative;
            .desc {
                display: block;
                position: absolute;
                left: 1.34rem;
                top: 50%;
                width: 50vw;
                transform: translateY(-50%);
            }
        }
        .desc {
            font-size: 0.21rem;
            color: #a8a8a8;
            // margin-left: 0.54rem;
        }
        .iconARROW {
            color: #a8a8a8;
            font-size: 0.25rem;
            // margin-top: 0.05rem;
        }
        .right {
            .insurance {
                margin-left: 0.1rem;
                &i {
                    font-size: 0.28rem;
                }
                &.iconxuanzhong {
                    color: #2ecb62;
                }
                &.iconradiobuttonunselect {
                    color: #dddddd;
                }
            }
        }
        input {
            width: 80%;
            text-align: right;
        }
    }
}
.alone-feild {
    height: 0.68rem;
}
.field-item {
    padding: 0 0.16rem;
    min-height: 0.68rem;
    font-size: 0.21rem;
    background-color: #ffffff;
    border-radius: 0.11rem;
    margin-bottom: 0.23rem;

    .title {
        color: #1a1a1a;
    }
    .shit {
        color: #a8a8a8;
    }
    .iconweixin,
    .iconyinhangka2,
    .iconjicaifen {
        font-size: 0.35rem;
        margin-right: 0.16rem;
    }
    .iconweixin {
        color: #46bb36;
    }
    .iconyinhangka2 {
        color: #fc0808;
    }
    .iconjicaifen {
        color: #2397e8;
    }
    .iconARROW {
        font-size: 0.28rem;
        color: #a8a8a8;
        font-size: 0.26rem;
        margin-top: 0.05rem;
    }

    .point-info {
        border-top: 1px solid #dddddd;
        padding-bottom: 0.2rem;
        .top {
            display: flex;
            height: 0.67rem;
            align-items: center;
            justify-content: space-between;
        }
        .desc {
            color: #a8a8a8;
            font-size: 0.215rem;
            background-color: #f6f6f6;
            padding: 0.1rem 0.2rem;
            border-radius: 0.1rem;
            position: relative;
            &::after {
                content: "";
                width: 0;
                height: 0;
                border-width: 0 0.15rem 0.15rem;
                border-style: solid;
                border-color: transparent transparent #f6f6f6;
                position: absolute;
                top: -0.14rem;
                left: 0.38rem;
            }
        }
    }

    .account-info {
        border-top: 1px solid #dddddd;
        padding-bottom: 0.2rem;
        .top {
            color: #a8a8a8;
            font-size: 0.203rem;
            line-height: 0.6rem;
        }
        .account {
            background-color: #f6f6f6;
            border-radius: 0.056rem;
            margin-bottom: 0.226rem;
            border: solid 0.017rem #f6f6f6;
            position: relative;
            overflow: hidden;
            .cell {
                line-height: 0.68rem;
                padding: 0 0.15rem;
                .title {
                    width: 1.4rem;
                    display: inline-block;
                    color: #a8a8a8;
                    font-size: 0.215rem;
                }
                .content {
                    color: #1a1a1a;
                    font-size: 0.215rem;
                }
            }
            .iconxuanzhong4 {
                position: absolute;
                display: none;
                right: -0.03rem;
                bottom: -0.04rem;
                font-size: 0.34rem;
                color: #2ecb62;
            }
            &.on {
                border: solid 0.017rem #2ecb62;
                .iconxuanzhong4 {
                    display: block;
                }
            }
        }
    }
}
.tabbar {
    height: 0.83rem;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #ffffff;
    padding: 0 0.27rem;
    box-sizing: border-box;
    .word {
        color: #1a1a1a;
        font-size: 0.27rem;
        margin-right: 0.2rem;
        font-weight: bold;
    }
    .money {
        font-size: 0.27rem;
        font-weight: bold;
        color: #fc0808;
    }
    .buy-btn {
        width: 1.47rem;
        height: 0.56rem;
        background-color: #2ecb62;
        border-radius: 0.28rem;
        font-size: 0.21rem;
        color: #ffffff;
    }
}
</style>

<style lang="less" scoped>
.confirm-btn {
    width: 5.81rem;
    height: 0.56rem;
    background-color: #5ecc26;
    border-radius: 0.28rem;
    // position: absolute;
    bottom: 0.25rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.21rem;
    color: #ffffff;
}
.position {
    position: absolute;
}
.mb26 {
    margin-bottom: 0.26rem;
}
.take-time-content {
    height: 5.64rem;
    .date {
        width: 2.08rem;
        height: 100%;
        overflow: scroll;
        background-color: #f6f6f6;
        div {
            height: 0.68rem;
        }
        .active {
            background-color: #ffffff;
        }
    }
    .time {
        height: 100%;
        overflow: scroll;
        flex: 1;
        padding: 0 0.27rem 0 0.72rem;
        span {
            font-size: 0.27rem;
            color: #1a1a1a;
        }
        i {
            font-size: 0.23rem;
            color: #2ecb62;
            display: none;
        }
        .active-time {
            span {
                color: #2ecb62;
            }
            i {
                display: block;
            }
        }
    }
}
.way-content {
    padding: 0 0.27rem;
    height: 5.64rem;
    box-sizing: border-box;
    position: relative;
    .way-feild {
        margin-bottom: 0.4rem;
        .title {
            font-size: 0.21rem;
            color: #1a1a1a;
        }
        .iconradiobuttonunselect {
            color: #a8a8a8;
            font-size: 0.3rem;
            transform: scale(1.3);
        }
        .iconxuanzhong {
            font-size: 0.28rem;
            color: #5ecc26;
        }
    }
}
.platform-content {
    height: 5.64rem;
    overflow: scroll;
    padding: 0 0.27rem;
    box-sizing: border-box;
    .platform-coupon {
        flex: 1;
        height: 1.47rem;
        background-color: #f6f6f6;
        border-radius: 0.11rem;
        box-sizing: border-box;
        margin-bottom: 0.23rem;
        padding: 0.14rem 0;
        // box-sizing: border-box;
        position: relative;
        .tag {
            position: absolute;
            left: 0;
            top: 0;
            width: 1.47rem;
            height: 0.31rem;
            background-color: #2ecb62;
            font-size: 0.18rem;
            color: #ffffff;
            border-radius: 0.11rem 0rem 0.11rem 0rem;
        }
        .left {
            width: 1.47rem;
            font-size: 0.36rem;
            color: #fc0808;
            font-weight: bold;
        }
        .mid {
            flex: 2;
            font-size: 0.21rem;
            height: 100%;
            color: #1a1a1a;
            margin-left: 0.22rem;
        }
        .right {
            flex: 1;
            .take {
                width: 1.24rem;
                height: 0.45rem;
                background-color: #2ecb62;
                border-radius: 0.23rem;
                font-size: 0.21rem;
                color: #ffffff;
            }
            .took {
                background-color: #a8a8a8;
            }
        }
    }
}
.shop-content {
    height: 5.64rem;
    overflow: scroll;
    padding: 0 0.27rem;
    box-sizing: border-box;
    .coupon-item {
        width: 5.81rem;
        height: 1.47rem;
        background-color: #f6f6f6;
        border-radius: 0.11rem;
        margin-bottom: 0.23rem;
        position: relative;
        box-sizing: border-box;
        padding: 0.38rem 0;
        .left-top {
            width: 1.47rem;
            height: 0.31rem;
            background-color: #fc0808;
            font-size: 0.18rem;
            border-radius: 0.11rem 0rem 0.11rem 0rem;
            color: #ffffff;
            position: absolute;
            left: 0;
            top: 0;
        }
        .left {
            width: 1.47rem;
            font-size: 0.36rem;
            color: #fc0808;
            font-weight: bold;
            margin-right: 0.22rem;
        }
        .mid {
            flex: 2;
            font-size: 0.21rem;
            height: 100%;
            color: #1a1a1a;
        }
        .right {
            flex: 1;
            .take {
                width: 1.24rem;
                height: 0.45rem;
                background-color: #fc0808;
                border-radius: 0.23rem;
                font-size: 0.21rem;
                color: #ffffff;
                margin-right: 0.23rem;
            }
            .took {
                background-color: #a8a8a8;
            }
        }
    }
}
.pay-content {
    height: 6.2rem;
    background-color: #f6f6f6;
    /deep/ .van-cell {
        line-height: 0.678rem;
        background: #ffffff;
    }
    /deep/ .van-cell__title {
        display: flex;
        align-items: center;
    }
    .iconfont {
        font-size: 0.5rem;
        margin-right: 0.1rem;
    }
    .iconweixin {
        color: #46bb36;
    }
    .iconyinhangka2 {
        color: #fc0808;
    }
    .iconjicaifen {
        color: #2397e8;
    }
    .custom-title {
        color: #1a1a1a;
        font-size: 0.215rem;
    }
}
.radio {
    margin-right: 0.27rem;
    width: 0.4rem;
    .iconradiobuttonunselect {
        color: #a8a8a8;
        font-size: 0.3rem;
        transform: scale(1.3);
    }
    .iconxuanzhong {
        font-size: 0.28rem;
        color: #5ecc26;
    }
}
.rule {
    color: #1a1a1a;
    font-size: 0.2rem;
    .checkbox {
        margin-right: 0.14rem;
        .no {
            border: 1px solid #dddddd;
            width: 0.2rem;
            height: 0.2rem;
            box-sizing: border-box;
        }
        i {
            font-size: 0.2rem;
            color: #2ecb62;
        }
    }
    .agreement {
        color: #13438c;
    }
}
</style>