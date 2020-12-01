<template>
    <div class="confirm-order">
        <div class="tab-card">
            <div class="title-wrap row">
                <div
                    class="item left"
                    :class="{ active: wayIdx == 0 }"
                    @click="
                        wayIdx = 0;
                        form.deliverWayIdx = 0;
                    "
                >
                    送货上门
                </div>
                <div
                    class="item right"
                    :class="{ active: wayIdx == 1 }"
                    @click="
                        wayIdx = 1;
                        form.deliverWayIdx = 1;
                    "
                >
                    上门自提
                </div>
            </div>
            <div class="wrap-content">
                <div class="deliver" v-show="wayIdx == 0">
                    <!-- 无地址情况 -->
                    <router-link
                        tag="div"
                        to="/workbench/address/edit"
                        class="no-address row ac jc"
                        v-if="!address.id"
                    >
                        +添加地址
                    </router-link>
                    <!-- 有地址情况 -->
                    <router-link
                        :to="'/workbench/address?orderId=' + $route.params.id"
                        class="addr-detail"
                        v-else
                    >
                        <div class="addr-info">
                            <div>
                                <span class="name">{{ address.name }}</span>
                                <span class="tel">{{ address.phone }}</span>
                            </div>
                            <div class="e2">
                                <i class="iconfont icondizhi1"></i>
                                <span class="address">
                                    {{ address.addressName + address.address }}
                                </span>
                            </div>
                        </div>
                        <i class="iconfont iconARROW"></i>
                    </router-link>
                </div>
                <!-- 自提 -->
                <div class="selftake-wrap row" v-show="wayIdx == 1">
                    <div class="info column sb">
                        <div class="des">(17:00前下单，次日可提)</div>
                        <div class="shop-address">
                            <i class="iconfont icondizhi"></i>
                            <span>
                                广东省佛山市南海区大沥镇广佛五金城城B区22馆18-33号（豪迪五金）
                            </span>
                        </div>
                        <div class="user-select row">
                            <div
                                class="take-time column sb"
                                @click="pops.takeTime = true"
                            >
                                <span class="title">自提时间</span>
                                <div class="row" v-if="dateList.length">
                                    {{
                                        `${dateList[dayIdx].month}-${dateList[dayIdx].day}`
                                    }}
                                    {{ options[opIdx] }}
                                    <i class="iconfont iconARROW"></i>
                                </div>
                            </div>
                            <div class="phone column sb" @click="editHandle">
                                <span class="title">联系电话</span>
                                <input
                                    ref="input"
                                    type="phone"
                                    class="edit-phone"
                                    v-model="contact"
                                    v-show="editPhone"
                                    @blur="checkPhone"
                                    placeholder=""
                                />
                                <div class="row" v-show="!editPhone">
                                    {{ contact }}
                                    <i class="iconfont iconbianji"></i>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="rule row ac">
                            <div
                                class="checkbox row ac"
                                @click="agreement = !agreement"
                            >
                                <i
                                    class="iconfont iconxuanzhong3"
                                    v-if="agreement"
                                ></i>
                                <div class="no" v-else></div>
                            </div>
                            同意
                            <span class="agreement">《到店自取服务协议》</span>
                        </div> -->
                    </div>
                    <!-- <i class="iconfont iconARROW r"></i> -->
                </div>
            </div>
        </div>

        <!-- 商品卡片 -->
        <div
            class="choose-methods-card"
            v-for="(item, index) in orderInfo"
            :key="index"
        >
            <div class="goods row" v-for="(v, i) in item.productList" :key="i">
                <img :src="v.productPic" alt="" />
                <div class="column sb" style="margin-left: 0.23rem; flex: 1">
                    <div class="name">
                        {{ v.productName }}
                    </div>
                    <div class="sku">{{ v.propertyName }}</div>
                    <div class="footer row sb ac">
                        <span class="price">￥{{ v.skuPrice }}</span>
                        <Stepper v-model="v.number" :max="v.stock" />
                    </div>
                </div>
            </div>
        </div>
        <div class="choose-methods-card">
            <!-- 行 -->
            <!-- <div class="order-field row sb ac" @click="pops.shop = true">
                <span class="left">优惠</span>
                <div class="right row ac">
                    <span>-￥10.00 </span>
                    <i class="iconfont iconARROW"></i>
                </div>
            </div> -->
            <div
                class="order-field row sb ac"
                @click="pops.way = true"
                v-if="wayIdx == 0"
            >
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
            <!-- <div class="order-field row sb ac" v-show="wayIdx == 0">
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
                            { iconradiobuttonunselect: !form.insurance },
                            { iconxuanzhong: form.insurance },
                        ]"
                    ></i>
                </span>
            </div> -->
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
            <!-- <div class="account-info" v-if="payType == 2">
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
            </div> -->
        </div>

        <div class="tabbar row sb ac">
            <div class="left row ac">
                <span class="word">合计:</span>
                <span class="money">￥{{ totalPrice }}</span>
            </div>
            <div class="buy-btn row ac jc" @click="pay">立即购买</div>
        </div>

        <pay-pop v-if="showEwm" @closePay="closePay"></pay-pop>
        <!-- <div class="pop-ewm" v-if="showEwm">
            <img :src="canvasImg" alt="" v-if="canvasImg">
            <div class="box" id="save-code" v-else>
                <i class="iconfont iconguanbi2" @click="goOrderDetail"></i>
                <div class="title">
                    <span>支付金额：</span
                    ><span class="red">￥{{ totalPrice }}</span>
                </div>
                <div class="store">豪迪五金建材店</div>
                <img src="../../assets/img/payewm.png" alt="" />
                <div class="des">
                    <p>请扫描支付码，支付完成后</p>
                    <p>请到我的订单上传凭证以便客服审核发货！</p>
                </div>
                <div class="icon-title">支持以下付款</div>
                <div class="icons">
                    <div>
                        <img src="../../assets/img/wx.png" alt="" />
                        <img src="../../assets/img/zfb.png" alt="" />
                        <img src="../../assets/img/yl.png" alt="" />
                    </div>
                </div>
            </div>
            <div class="btn" @click="saveImg">保存支付码</div>
        </div> -->

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
                    <div
                        class="row sb ac"
                        style="height: 0.68rem"
                        v-for="(v, i) in options"
                        :key="i"
                        :class="{ 'active-time': i == opIdx }"
                        @click="opIdx = i"
                    >
                        <span>{{ v }}</span>
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
                        <i class="iconfont iconcircle" v-else></i>
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
                        <cell title="微信支付" clickable @click="payType = 1">
                            <template #title>
                                <i class="iconfont iconweixin"></i>
                                <span class="custom-title">微信支付</span>
                            </template>
                            <template #right-icon>
                                <radio :name="1" checked-color="#2ecb62" />
                            </template>
                        </cell>
                        <cell title="线下支付" clickable @click="payType = 2">
                            <template #title>
                                <i class="iconfont iconyinhangka2"></i>
                                <span class="custom-title">线下支付</span>
                            </template>
                            <template #right-icon>
                                <radio :name="2" checked-color="#2ecb62" />
                            </template>
                        </cell>
                        <!-- <cell
                            title="集采分支付"
                            clickable
                            @click="payType = 3"
                        >
                            <template #title>
                                <i class="iconfont iconjicaifen"></i>
                                <span class="custom-title">集采分支付</span>
                            </template>
                            <template #right-icon>
                                <radio name="3" checked-color="#2ecb62" />
                            </template>
                        </cell> -->
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
import {
    ActionSheet,
    Stepper,
    RadioGroup,
    Radio,
    Cell,
    CellGroup,
    Toast,
} from "vant";
import api from "../../api/order";
import userApi from "../../api/user";
import html2canvas from "html2canvas";
import {invokeWxPay} from "../../utils/wxFn";
import payPop from "../../components/pay-pop"
export default {
    data() {
        return {
            showEwm: false,
            orderno: this.$route.params.id,
            orderInfo: [],
            address: {},
            options: [],
            opIdx: 0,
            wayIdx: 0,
            agreement: false, //同意协议
            editPhone: false, //编辑手机号
            dateList: [], //日期
            dayIdx: 0, //选中的日期索引
            contact: "", // 联系电话
            // deliverWay: ["快递配送", "物流到付"],
            deliverWay: ["物流到付"],
            form: {
                shopIdx: -1, //店铺优惠券索引
                deliverWayIdx: 0, //配送方式 两种
                num: 1,
                insurance: false, //运费险
                message: "",
            },
            pops: {
                takeTime: false,
                way: false,
                pay: false,
                shop: false,
            },
            payType: 1,
            account_index: -1, //线下支付账户索引
            canvasImg:''
        };
    },
    created() {
        this.getOrderInfo();
        
        //判断url 来决定调用什么方式来获取地址
        let { addressId } = this.$route.query || "";
        addressId ? this.getAddress() : this.getAddressList();
    },
    methods: {
        async getOrderInfo() {
            let res = await api.getOrderInfo(this.orderno);
            this.orderInfo = res.result;
            this.contact = this.orderInfo[0].phone
            this.getTimeList();
        },
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
            let phone = /^1[0-9]{10}$/.test(this.contact)
            if(!phone) return Toast('手机号无效！')
            this.editPhone = false;
        },
        shopHandle(i) {
            // 优惠券切换
            if (this.form.shopIdx == i) {
                this.form.shopIdx = -1;
                return;
            }
            this.form.shopIdx = i;
        },
        async getAddressList() {
            let res = await userApi.getAddressList({
                memberId: this.$store.state.user.userId,
                pageNo: 1,
                pageSize: 9999,
            });
            let addressList = res.result.records || [];
            if (addressList.length) {
                addressList.forEach((v, i) => {
                    if (i == 0 || v.defaultUse) {
                        this.address = v;
                    }
                });
            }
        },
        async getAddress() {
            let { addressId } = this.$route.query;
            let res = await userApi.getOneAddress(addressId);
            if (res.success) {
                this.address = res.result;
            }
        },
        async pay() {
            if (this.wayIdx) {
                if (!this.contact) return Toast("请填写联系电话!");
                // if (!this.agreement)
                //     return Toast("请先阅读并同意到点自取服务协议！");
            }

            if (!this.wayIdx) {
                if (!this.address.id) return Toast("请先选择收货地址！");
            }

            var orderList = this.orderInfo.map((v) => {
                return {
                    orderId: v.id,
                    productList: v.productList.map((m) => {
                        return {
                            number: m.number,
                            orderProductId: m.orderProductId,
                            skuId: m.skuId,
                            skuPrice: m.skuPrice,
                            templateId: m.templateId,
                        };
                    }),
                };
            });
            let params = {
                discount: 0,
                freightAmount: 0,
                note: this.form.message,
                orderList: orderList,
                paymentMethods:
                    this.payType == 1 ? 1 : this.payType == 2 ? 4 : 3, //支付方式(1-微信支付 2-支付宝支付 3-集采分支付 4-线下支付)
                receiveAddressId: this.wayIdx == 0 ? this.address.id : 0, //收货地址
                // selfCarry: this.wayIdx ? 1 : this.form.deliverWayIdx ? 3 : 2, //配送方式(配送类型 1-买家自提 2-快递配送 3-物流到付
                selfCarry: this.wayIdx ? 1 : 3, //配送方式(配送类型 1-买家自提 2-快递配送 3-物流到付
                selfPhone: this.wayIdx ? this.contact : "", //自提预留手机号
                selfTime: this.wayIdx ? this.getSelfTime() : "", //自提时间
            };

            let res = await api.pay(params);

            if (res.success) {
                if (this.payType == 2) {
                    this.showEwm = true;
                } else {
                    invokeWxPay({
                        ...res.result,
                        success: (e) => {
                            console.log(e);
                            this.$router.replace("/order");
                        },
                        cancel: (e) => {
                            console.log(e);
                            Toast(e);
                        },
                        fail: (e) => {
                            console.log(e);
                            Toast(e);
                        },
                    });
                }
            } else {
                Toast(ress.message);
            }
        },
        getTimeList() {
            let [openHours, closeHours] = ['', '']
            if(this.orderInfo.length>1){
                openHours = "2020/11/22 08:30:00";
                closeHours = "2020/11/22 18:30:00";
            }else{
                openHours = this.orderInfo[0].getApiVo.openHours||''
                closeHours = this.orderInfo[0].getApiVo.closeHours||''
                openHours = '2018/09/01 ' + (openHours||'09:00:00')
                closeHours = '2018/09/01 ' + (closeHours||'17:00:00')
            }
            // let {openHours, closeHours} = this.orderInfo.getApiVo
            // openHours = '2018/09/01 ' + (openHours||'09:00:00')
            // closeHours = '2018/09/01 ' + (closeHours||'17:00:00')
            let [min, max] = [openHours, closeHours].map(
                (v) => new Date(v) * 1
            );
            const halfHours = 30 * 60 * 1000;
            let cur = min;
            let arr = [];
            while (cur <= max) {
                arr.push(cur);
                cur += halfHours;
            }
            this.options = arr.map((s) =>
                new Date(s).toTimeString().substr(0, 5)
            );
        },
        getSelfTime() {
            let year = new Date().getFullYear();
            var timeStr = `${year}-${this.dateList[this.dayIdx].month}-${
                this.dateList[this.dayIdx].day
            } ${this.options[this.opIdx]}:00`;
            return timeStr;
        },
        // saveImg() {
        //     // HTML转canvas
        //     html2canvas(document.querySelector("#save-code"), {
        //         useCORS: true,
        //     }).then((canvas) => {
        //         //$("#save-code").css("display", "none"); // 隐藏目标HTML页面
        //         // document.querySelector("#save-code").style.display = 'none'
        //         this.convertCanvasToImg(canvas); // canvas转图片
        //     });
        // },
        // convertCanvasToImg(canvas) {
        //     // canvas转base64 转 blob
        //     var myBlob = this.dataURLtoBlob(canvas.toDataURL("img/png", 0.92));
        //     //blob转URL对象
        //     var myUrl = URL.createObjectURL(myBlob);
        //     this.canvasImg = myUrl
        //     // 创建a标签，下载图片
        //     // this.downImg(myUrl);
        // },
        // dataURLtoBlob(dataurl) {
        //     var arr = dataurl.split(","),
        //         mime = arr[0].match(/:(.*?);/)[1],
        //         bstr = atob(arr[1]),
        //         n = bstr.length,
        //         u8arr = new Uint8Array(n);
        //     while (n--) {
        //         u8arr[n] = bstr.charCodeAt(n);
        //     }
        //     return new Blob([u8arr], { type: mime });
        // },
        // downImg(url) {
        //     // 创建a标签 并设置其相关属性，最后触发其点击事件
        //     let a = document.createElement("a");
        //     let clickEvent = document.createEvent("MouseEvents");
        //     a.setAttribute("href", url);
        //     a.setAttribute("download", "codeImg");
        //     a.setAttribute("target", "_blank");
        //     clickEvent.initEvent("click", true, true);
        //     a.dispatchEvent(clickEvent);
        // },
        // goOrderDetail() {
        //     this.showEwm = false;
        //     this.$router.replace("/order");
        // },
        closePay(){
            this.showEwm = false
        }
    },
    mounted() {
        this.getMonthDay();
    },
    computed: {
        totalPrice() {
            return this.orderInfo
                .map((o) => o.productList)
                .reduce((a, b) => a.concat(b), [])
                .map((a) => a.skuPrice * a.number)
                .reduce((m, n) => m + n, 0)
                .toFixed(2);
        },
    },
    components: {
        ActionSheet,
        Stepper,
        RadioGroup,
        Radio,
        Cell,
        CellGroup,
        payPop
    },
};
</script>

<style lang="less" scoped>
.confirm-order {
    // height: 100vh;
    // overflow: scroll;
    background-color: #f6f6f6;
    padding: 0.23rem 0.27rem 1rem 0.27rem;
}
.tab-card {
    background-color: #ffffff;
    // width: 100%;
    margin-top: 0.2rem;
    margin-bottom: 20px;
    .title-wrap {
        position: relative;
        .item {
            flex: 1;
            color: #1a1a1a;
            font-size: 0.24rem;
            height: 0.56rem; //60px
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #dddddd;
        }
        .active.left::after {
            content: "";
            position: absolute;
            right: 0;
            top: 0;
            transform: translateX(50%);
            width: 0px;
            height: 0px;
            border-left: 0.26rem solid transparent;
            border-right: 0.26rem solid transparent;
            border-bottom: 0.68rem solid #ffffff;
        }
        .active.right::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 0.26rem solid transparent;
            border-right: 0.26rem solid transparent;
            border-bottom: 0.68rem solid #ffffff;
        }
        .active {
            color: #1a1a1a;
            background-color: #ffffff;
            transform: translateY(-0.1rem);
        }
    }
    .wrap-content {
        box-sizing: border-box;
        padding: 0.26rem 0.18rem;
        background-color: #ffffff;
        .deliver {
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
            padding-right: 0.6rem;
            box-sizing: border-box;
            .info {
                .des {
                    font-size: 0.181rem;
                    color: #2ecb62;
                    margin-bottom: 0.05rem;
                }
                .shop-address {
                    font-size: 0.22rem;
                    color: #000000;
                    i {
                        font-size: 0.22rem;
                    }
                    span {
                        margin-left: 0.23rem;
                    }
                }
                .user-select {
                    // .title{
                    margin: 0.24rem 0 0.23rem 0;
                    font-size: 0.21rem;
                    color: #000000;
                    // }
                    .phone {
                        margin-left: 0.56rem;
                        .edit-phone {
                            border: none;
                            text-align: center;
                            border-bottom: 1px solid #cccccc;
                        }
                    }
                    .row {
                        margin-top: 0.16rem;
                        justify-content: flex-end;
                        line-height: 1;
                        i {
                            font-size: 0.2rem;
                            color: #a8a8a8;
                            margin-left: 0.08rem;
                            // font-weight: bold;
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
                top: 0.45rem;
                right: 0;
                font-size: 0.4rem;
                font-weight: bold;
            }
        }
    }
}
.choose-methods-card {
    padding: 0.17rem 0.17rem;
    background-color: #ffffff;
    border-radius: 0.11rem;
    margin-bottom: 0.23rem;
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
                &.iconcircle {
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
    }
    .money {
        font-size: 0.27rem;
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
/deep/ .van-stepper {
    display: flex;
}

.pop-ewm {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .box {
        width: 5.085rem;
        height: 7.401rem;
        background-color: #f6f6f6;
        border-radius: 0.1rem;
        text-align: center;
        .iconguanbi2 {
            position: relative;
            top: -0.6rem;
            // left: 2.16rem;
            font-size: 0.47rem;
            color: #ffffff;
        }
        .title {
            color: #1a1a1a;
            font-size: 0.271rem;
            font-weight: bold;
        }
        .store {
            color: #a8a8a8;
            font-size: 0.215rem;
            margin: 0.15rem 0 0.45rem 0;
        }
        img {
            width: 3.277rem;
            height: 3.277rem;
            display: block;
            margin: 0 auto;
        }
        .des {
            color: #a8a8a8;
            font-size: 0.181rem;
            line-height: 0.271rem;
            margin: 0.2rem 0 0.3rem 0;
        }
        .icon-title {
            color: #1a1a1a;
            font-size: 0.181rem;
            margin-bottom: 0.2rem;
        }
        .icons {
            div {
                margin: 0 auto;
                display: flex;
                width: 3rem;
                img {
                    width: auto;
                    height: 0.52rem;
                }
            }
        }
    }
    .btn {
        width: 5.085rem;
        height: 0.734rem;
        background-color: #2ecb62;
        border-radius: 0.367rem;
        color: #f6f6f6;
        font-size: 0.215rem;
        text-align: center;
        line-height: 0.734rem;
        margin-top: 0.339rem;
    }
}
</style>