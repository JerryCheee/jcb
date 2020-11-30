<template>
  <div class="container">
    <div class="search-bar">
      <input
        type="text"
        placeholder="请输入商品名称搜索"
        @keyup.enter="search"
        v-model="searchText"
      />
    </div>

    <!-- <div v-show="hasData"> -->
    <div>
      <div class="prepar-wrap row sb ac">
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
            价格
            <preparation
              :status.sync="salesCondition"
              ref="prepa"
            ></preparation>
          </span>
        </div>
        <div class="row right" @click="praparationPop = true">
          <i class="iconfont iconshaixuan"></i> 筛选
        </div>
      </div>
      <!-- <SortBar @show="show" /> -->
      <!-- <waterFall
        @afterFetch="handleFetchResult"
        :req="searchGoods"
        :params="goodsParams"
        ref="waterFall"
      >
        
      </waterFall> -->
      <list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad()">
        <GoodsList :goods_list="goodsList" />
      </list>
      <popup v-model="praparationPop" position="right">
        <PreparationInner
          :info="goodsBrands"
          @close="closePop"
          @reset="resetPop"
          @confirm="confirm"
          ref="prepar"
        />
      </popup>
    </div>
    <!-- <div class="history" v-show="!hasData">
            <div class="title">历史搜索</div>
            <div class="nodata" v-if="history.length == 0">暂无历史记录</div>
            <ul>
                <li
                    v-for="(item, index) in history"
                    :key="index"
                    @click="historySearch(item)"
                >
                    {{ item }}
                </li>
            </ul>
        </div> -->
  </div>
</template>

<script>
import GoodsList from "../../components/goods-card";
import SortBar from "../../components/sort-bar";
import PreparationInner from "../../components/preparation-inner";
import Preparation from "../../components/preparation";
import api from "../../api/product";
import { Popup, List } from "vant";
export default {
  data() {
    return {
      hasData: false,
      goodsList: [], //筛选出来的数组
      goodsBrands: [], //商品品牌列表
      praparationPop: false, //公用筛选弹框
      conditionIdx: 0,
      salesCondition: 0,
      searchText: "",
      brandId: this.$route.query.id,
      goodsParams: {
        keyword: "",
        pageNo:1,
        pageSize:10
      },
      history: [],
      //xin
      loading:false,
      finished:false,
     
    };
  },
  watch: {
    hasData(v) {},
  },
  created() {
    this.getHistory();
    if (this.brandId) {
      this.goodsParams.brandId = this.brandId;
      this.hasData = true;
    }
    this.getBrandRec();
  },
  methods: {
    onLoad(){
        this.loading = true;
      var timer = setTimeout(async () => {
          clearTimeout(timer);
          let res = await api.searchGoods(this.goodsParams);
          this.loading = false;
          if (
              !res.success ||
              !res.result ||
              res.result.lists.length == 0
          ) {
              this.finished = true;
          } else {
              this.goodsList = [...this.goodsList, ...res.result.lists];
          }
          if (!res.success) {
              this.showToast("获取数据失败!");
              return;
          }
          this.goodsParams.pageNo++;
      }, 500);
    },
    //获取历史搜索记录
    getHistory() {
      this.history = JSON.parse(localStorage.getItem("search-history")) || [];
    },
    //设置历史搜索记录
    setHistory(value) {
      if (!value) return;
      var h = JSON.parse(localStorage.getItem("search-history")) || [];
      if (h.includes(value)) {
        for (var i = 0; i < h.length; i++) {
          if (h[i] === value) {
            h.splice(i, 1);
            break;
          }
        }
        h.unshift(value);
        this.history = h;
      } else {
        this.history = [value, ...h];
      }
      localStorage.setItem("search-history", JSON.stringify(this.history));
    },
    show() {
      this.showPop = !this.showPop;
    },
    async getBrandRec() {
      //获取推荐品牌
      let res = await api.getBrands();
      Object.values(res.result).map((v) => {
        this.goodsBrands.push(...v);
      });
    },
    //搜索
    search() {
      this.hasData = true;
      this.goodsParams.keyword = this.searchText;
      this.setHistory(this.searchText);
      this.goodsList = [];
      this.$refs.waterFall.refresh();
    },
    //点击历史搜索
    historySearch(value) {
      this.searchText = value;
      this.search();
    },
    closePop() {
      this.praparationPop = !this.praparationPop;
    },
    resetPop() {
      this.goodsList = [];
      this.goodsParams ={
        keyword: "",
        pageNo:1,
        pageSize:10
      },
    //   this.$refs.prepar.reset() //清除选中记录
      this.onLoad()
    },
    confirm(value, price, tags) {
      //点击筛选后返回的
    //   console.log(value, price, tags)
      this.goodsList = [];
      this.goodsParams.pageNo = 1
      this.goodsParams.type = value[0];
      if (value[1]) {
        this.goodsParams.brandId = value[1].id;
      } else {
        this.goodsParams.brandId = "";
      }
      this.goodsParams.startPrice = price.start || 0;
      this.goodsParams.endPrice = price.end || 0;
      this.goodsParams.tags = tags;
      this.onLoad()
    },
    changeCondition(i) {
      this.conditionIdx = i;
      this.goodsList = [];
      if (i == 0) {
        //总量
        delete this.goodsParams.priceSort;
        this.goodsParams.saleCount = false;
        this.$refs.prepa.reset();
      }
      if (i == 1) {
        // 销量
        delete this.goodsParams.priceSort;
        this.goodsParams.saleCount = true;
        this.$refs.prepa.reset();
      }
      if (i == 2) {
        // 价格
        this.goodsParams.saleCount = false;
        if (this.salesCondition == 0) {
          delete this.goodsParams.priceSort;
        } else if (this.salesCondition == 1) {
          this.goodsParams.priceSort = true;
        } else {
          this.goodsParams.priceSort = false;
        }
      }
      this.$refs.waterFall.refresh();
    },
  },
  components: {
    GoodsList,
    SortBar,
    PreparationInner,
    Preparation,
    Popup,
    List
  },
};
</script>

<style lang="less" scoped>
.search-bar {
  width: 6.356rem;
  height: 0.746rem;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    width: 5.414rem;
    height: 0.508rem;
    background-color: #f6f6f6;
    border-radius: 0.254rem;
    padding: 0 0.2rem;
    font-size: 0.181rem;
  }
}
.history {
  padding: 0.26rem;
  .title {
    font-size: 0.215rem;
    color: #1a1a1a;
  }
  ul {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    li {
      width: 1.3rem;
      height: 0.508rem;
      background-color: #dddddd;
      border-radius: 0.254rem;
      font-size: 0.215rem;
      color: #a8a8a8;
      margin-right: 0.226rem;
      margin-top: 0.226rem;
      line-height: 0.508rem;
      text-align: center;
      &:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
}
.prepar-wrap {
  margin: 0.226rem 0.271rem;
  padding: 0 0.4rem;
  height: 0.68rem;
  background-color: #ffffff;
  border-radius: 0.06rem;
  font-size: 0.21rem;
  color: #1a1a1a;
  line-height: 1;
  .left {
    flex: 3;
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
.active-text {
  color: #2ecb62;
}
</style>