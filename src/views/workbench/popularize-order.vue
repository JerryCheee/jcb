<template>
  <div class="page">
    <div class="top">
      <div class="title">推广人订单</div>
      <div class="count">{{$route.query.num}}</div>
    </div>

    <div class="tabs-list">
      <tabs
        v-model="active"
        swipeable
        animated
        color="#2ecb62"
        line-width="0.452rem"
        line-height="0.068rem"
      >
        <tab v-for="(item, index) in tabs" :key="index" :title="item">
          <orderList :sourceType="active+1" />
          <!-- <list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                    >
                        <div class="list">
                            <div class="item" v-for="(v, i) in 4" :key="i">
                                <div class="row ac sb info">
                                    <div class="row ac">
                                        <img
                                            src="../../assets/img/个人中心头像.png"
                                            alt=""
                                        />
                                        <span class="name">用户姓名</span>
                                    </div>
                                    <div class="money">+67.5</div>
                                </div>
                                <div class="row ac sb des">
                                    <span>购买商品</span>
                                    <span>订单金额 4500</span>
                                </div>
                            </div>
                        </div>
          </list>-->
        </tab>
      </tabs>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, List } from "vant";
import api from "../../api/user";
import orderList from "../../components/popularize-order-list";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      active: 0,
      tabs: ["店铺", "一级", "二级"]
    };
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        this.finished = true;
      }, 1500);
    }
  },
  components: {
    Tab,
    Tabs,
    List,
    orderList
  }
};
</script>

<style lang="less" scoped>
.page {
  .top {
    background: url("../../assets/img/推广中心人数-订单页面底图.png");
    background-size: cover;
    height: 1.808rem;
    background-color: #2ecb62;
    padding-left: 0.2rem;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 0.226rem;
    .title {
      font-size: 0.203rem;
    }
    .count {
      font-size: 0.407rem;
      margin-top: 0.1rem;
    }
  }
  .tabs-list {
    background-color: #ffffff;
    /deep/ .van-tab--active {
      font-weight: bold;
    }
    // .list {
    //     .item {
    //         margin: 0 0.26rem;
    //         padding: 0.2rem 0;
    //         border-bottom: 1px solid #dddddd;
    //         .info {
    //             img {
    //                 width: 0.362rem;
    //                 height: 0.362rem;
    //                 border-radius: 100%;
    //             }
    //             .name {
    //                 color: #1a1a1a;
    //                 font-size: 0.237rem;
    //                 margin-left: 0.15rem;
    //             }
    //             .money {
    //                 color: #fc0808;
    //                 color: #fc0808;
    //             }
    //         }
    //         .des {
    //             color: #a8a8a8;
    //             font-size: 0.181rem;
    //             margin-top: 0.2rem;
    //         }
    //     }
    // }
  }
}
</style>