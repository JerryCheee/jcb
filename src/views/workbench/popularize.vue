<template>
  <div class="page">
    <div class="top">
      <div class="row ac sb">
        <div>
          <div class="title">剩余集采分</div>
          <div class="point">{{ info.canCarryAmount || 0 }}</div>
        </div>
        <!-- <div class="btn">我要提现</div> -->
      </div>

      <div class="row ac sb info">
        <div class="row ac">
          <div class="item">
            <div class="title">{{ info.todayProfit || 0 }}</div>
            <div class="point">今日收益</div>
          </div>
          <div class="item">
            <div class="title">{{ info.monthProfit || 0 }}</div>
            <div class="point">本月收益</div>
          </div>
          <div class="item">
            <div class="title">{{ info.totalProfit || 0 }}</div>
            <div class="point">总收益</div>
          </div>
        </div>
        <i class="iconfont iconerweima"></i>
      </div>
    </div>

    <div class="nav">
      <router-link tag="div" :to="'/workbench/popularize-people?num='+info.recommendedUsers" class="nav-item">
        <i class="iconfont icontuandui"></i>
        <div class="info">
          <div class="count">{{ info.recommendedUsers || 0 }}</div>
          <div class="title">推广人数</div>
        </div>
      </router-link>
      <router-link tag="div" :to="'/workbench/popularize-order'+info.recommendedOrders" class="nav-item">
        <i class="iconfont icondingdan"></i>
        <div class="info">
          <div class="count">{{ info.recommendedOrders || 0 }}</div>
          <div class="title">推广人订单</div>
        </div>
      </router-link>
    </div>

    <div class="tabs-list">
      <tabs
        v-model="active"
        swipeable
        animated
        title-inactive-color="#2ecb62"
        title-active-color="#ffffff"
        color="#2ecb62"
        line-width="0"
        line-height="0"
      >
        <tab v-for="(item, index) in tabs" :key="index" :title="item">
          <popularizeList :status="active" />
        </tab>
      </tabs>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import api from "../../api/user";
import popularizeList from "../../components/popularize-list";
export default {
  data() {
    return {
      id: this.$store.state.user.userId,
      active: 0,
      // tabs: ["全部", "收入", "支出"],
      tabs: ["全部"],
      info: {},
    };
  },
  created() {
    this.getPopularize();
  },
  methods: {
    async getPopularize() {
      let res = await api.getPopularize(this.id);
      this.info = res.result;
    }
  },
  components: {
    Tab,
    Tabs,
    popularizeList
  }
};
</script>

<style lang="less" scoped>
.page {
  margin: 0.28rem 0.271rem;
  .top {
    background: url("../../assets/img/推广中心底图.png");
    background-size: cover;
    width: 5.414rem;
    height: 1.973rem;
    background-color: #2ecb62;
    border-radius: 0.113rem;
    padding: 0.2rem;
    color: #ffffff;
    .title {
      font-size: 0.203rem;
    }
    .point {
      font-size: 0.407rem;
      font-weight: bold;
      margin-top: 0.15rem;
    }
    .btn {
      width: 1.356rem;
      height: 0.508rem;
      background-color: #ffffff;
      border-radius: 0.254rem;
      color: #2ecb62;
      font-size: 0.215rem;
      text-align: center;
      line-height: 0.508rem;
    }
    .info {
      margin-top: 0.4rem;
      .item {
        margin-right: 0.4rem;
        .title {
          font-size: 0.271rem;
        }
        .point {
          font-size: 0.203rem;
          margin-top: 0.05rem;
        }
      }
      .iconerweima {
        font-size: 0.45rem;
      }
    }
  }
  .nav {
    display: flex;
    justify-content: space-between;
    margin: 0.226rem 0 0.452rem 0;
    .nav-item {
      width: 2.791rem;
      height: 1.13rem;
      background-color: #ffffff;
      border-radius: 0.113rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .iconfont {
        font-size: 0.67rem;
        margin-right: 0.2rem;
      }
      .icontuandui {
        color: #2397e8;
      }
      .icondingdan {
        color: #fc6d26;
      }
      .count {
        font-size: 0.305rem;
        color: #1a1a1a;
      }
      .title {
        color: #1a1a1a;
        font-size: 0.203rem;
        margin-top: 0.1rem;
      }
    }
  }

  .tabs-list {
    /deep/ .van-tabs__nav {
      background: none;
    }
    /deep/ .van-tab {
      width: 1.073rem;
      height: 0.452rem;
      border-radius: 0.226rem;
      border: solid 0.006rem #2ecb62;
      flex: none;
      margin-right: 0.226rem;
      font-size: 0.215rem;
    }
    /deep/ .van-tab--active {
      background-color: #2ecb62;
    }

    
  }
}
</style>