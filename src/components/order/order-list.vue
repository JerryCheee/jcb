<template>
  <div class="common-wrap">
      <payPop v-show="pay_pop" @closePay="pay_pop=false"/>
    <list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-for="(item, index) in list" :key="index">
        <!-- 已完成 -->
        <order-card status="已完成" v-if="item.status == 6" :order="item">
          <!-- <order-btn
            type="plain"
            @click="$router.push(`/order/evaluate?id=${item.id}`)"
          >
            去评价
          </order-btn> -->
        </order-card>

        <!-- 待支付  字蓝-->
        <order-card blue status="待支付" v-if="item.status == 1" :order="item">
          <span class="count-d" v-if="item.paymentMethods != 4">
            <span>剩余时间</span>
            <count-down :time="getTime(item.commitTime)"></count-down>
          </span>
          <order-btn type="primary" v-if="item.paymentMethods != 4" @click="pay(item.orderCode)">
            立即支付
          </order-btn>
          <order-btn type="primary" v-else @click="$router.push({path:'order/detail?id='+item.orderCode})">上传凭证</order-btn>
          <order-btn type="primary" v-if="item.paymentMethods==4" style="margin-left:0.17rem" @click="scanPay">扫码支付</order-btn>
        </order-card>

        <!-- 待发货 字蓝 -->
        <order-card blue status="待发货" v-if="item.status == 2" :order="item">
          <!-- <order-btn
            type="plain"
            style="margin-right: 0.17rem"
            @click="goApplyRefund(item.id)"
          >
            申请退款
          </order-btn>
          <order-btn type="primary">确认收货</order-btn> -->
        </order-card>

        <!-- 待收货 字蓝 -->
        <order-card blue status="待收货" v-if="item.status == 3" :order="item">
          <!-- <order-btn type="plain" style="margin-right: 0.17rem">
            查看物流
          </order-btn>
          <order-btn
            type="plain"
            style="margin-right: 0.17rem"
            @click="goApplyRefund(item.id)"
          >
            申请退款
          </order-btn>
          <order-btn type="primary">确认收货</order-btn> -->
        </order-card>

        <!-- 退款中 字蓝 -->
        <order-card blue status="退款中" v-if="item.status == 5" :order="item">
          <!-- <order-btn type="primary">撤销退款</order-btn> -->
        </order-card>

        <!-- 已取消 -->
        <order-card
          status="已取消"
          v-if="item.status == 0"
          :order="item"
        ></order-card>

        <!-- 待自提 字蓝 -->
        <order-card blue status="待自提" v-if="item.status == 7" :order="item">
          <order-btn
            type="plain"
            style="margin-right: 0.17rem"
            @click="goApplyRefund(item.id)"
          >
            申请退款
          </order-btn>
          <order-btn type="primary" @click="goSelfTake(item.id)">
            取货码
          </order-btn>
        </order-card>
      </div>
    </list>

    
  </div>
</template>

<script>
import { Tab, Tabs, CountDown, List, Toast } from "vant";
import OrderCard from "./order-card";
import OrderBtn from "./order-btn";
import api from "../../api/order";
import payPop from '../../components/pay-pop'
import {invokeWxPay} from '../../utils/wxFn'
export default {
  props: ["status"],
  data() {
    return {
      pay_pop:false,
      list: [],
      loading: false,
      finished: false,
      params: {
        pageNo: 1,
        pageSize: 10,
        sourceType: 2,
        sourceId: this.$store.state.user.userId,
        status: this.status,
      },
    };
  },
  components: {
    Tab,
    Tabs,
    OrderCard,
    OrderBtn,
    CountDown,
    List,
    payPop
  },
  methods: {
      scanPay(){
          this.showQr()
      },
    //0-已取消 1-待付款 2-待发货 3-待收货 4-待评价 5-售后/退款 6-已完成 7-待自提 8-已退款
    async onLoad() {
      this.loading = true;
      var timer = setTimeout(async () => {
        clearTimeout(timer);
        let res = await api.getOrderList(this.params);
        this.loading = false;
        if (!res.success || !res.result || res.result.records.length == 0) {
          this.finished = true;
        } else {
          this.list = [...this.list, ...res.result.records];
        }
        if (!res.success) {
          Toast("获取数据失败!");
          return;
        }
        this.params.pageNo++;
      }, 500);
    },
    getTime(time) {
      var t = new Date(time.replace(/-/g, '/'));
      return t.setDate(t.getDate() + 1) - new Date().getTime();
    },
    //下面为订单的各种方法
    goSelfTake(id) {
      this.$router.push("/selfTake?id=" + id);
    },
    goApplyRefund(id) {
      this.$router.push("/refund/money?id=" + id);
    },
    async pay(id){
        let res = await api.payOrder(id)
            invokeWxPay({
                ...res.result,
                success:res=>{
                this.showToast('支付成功!')
                this.params.pageNo = 1
                this.onLoad()
            }, 
            fail:err=>{
                Dialog.alert({
                message: '支付失败',
                })
            }
            })
    }
  },
};
</script>
<style lang="less" scoped>
.common-wrap {
  padding: 0.23rem 0.27rem;
  box-sizing: border-box;
}
.count-d {
  font-size: 0.21rem;
  margin-right: 0.17rem;
  display: flex;
  line-height: 0.271rem;
  align-items: center;
  /deep/ .van-count-down {
    font-size: 0.21rem;
    line-height: 0.271rem;
  }
}
</style>