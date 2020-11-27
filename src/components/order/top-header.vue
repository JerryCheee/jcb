<template>
    <div class="wrap">
        <!-- 订单进度步骤条 -->
        <OrderTop :index="0" v-if="order.status" />
        <div class="top-des" v-else>
            <div class="title">已取消</div>
            <div class="des">取消原因，超时未支付</div>
        </div>

        <!-- 自提地址 -->
        <div class="address-card column sb" v-if="order.selfCarry">
            <div class="top row ac">
                <span>广州市豪迪五金工具有限公司</span>
                <span class="phone">13189619206</span>
            </div>
            <div class="bottom row ac">
                <p class="address-info e2">
                    <i class="iconfont icondizhi"></i>
                    广东省佛山市南海区大沥镇广佛五金城城B区22馆18-33号
                </p>
            </div>
        </div>
        <!-- 收货地址 -->
        <div class="address-card column sb" v-else>
            <div class="top row ac">
                <span>{{ order.receiveBy }}</span>
                <span class="phone">{{ order.receivePhone }}</span>
            </div>
            <div class="bottom row ac">
                <i class="iconfont icondizhi"></i>
                <p class="address-info e1">{{ order.receiveAddress }}</p>
            </div>
        </div>

        <!-- 上传凭证 -->
        <upload-certificate
            v-if="order.paymentMethods == 4 && order.status"
            :order="order"
        />

        <!-- 商品信息 -->
        <goods-info :list="order.productList"></goods-info>

        <!-- 结算 -->
        <settlement :order="order"></settlement>
    </div>
</template>

<script>
import OrderTop from "./order-top";
import goodsInfo from "./goods-info";
import settlement from "./settlement";
import UploadCertificate from "../upload-certificate";
export default {
    props: ["status", "order"],
    components: {
        goodsInfo,
        OrderTop,
        settlement,
        UploadCertificate,
    },
};
</script>

<style lang="less" scoped>
.wrap {
    min-height: 6.78rem;
    background-image: url("../../assets/img/订单详情背景图.png");
    background-size: cover;
    padding: 0 0.27rem;
    color: #ffffff;
}
.address-card {
    // height: 1.36rem;
    background-color: #ffffff;
    border-radius: 0.11rem;
    padding: 0.3rem 0.18rem;
    box-sizing: border-box;
    margin-bottom: 0.226rem;
    color: #000;
    .top {
        .phone {
            margin-left: 0.3rem;
        }
        span {
            font-size: 0.24rem;
            color: #000000;
            font-weight: 500;
        }
    }
    .bottom {
        i {
            font-size: 0.2rem;
            margin-right: 0.17rem;
        }
        p {
            width: 88%;
            font-size: 0.2rem;
            color: #000000;
        }
    }
}
.top-des {
    padding: 0.4rem 0;
    .title {
        font-size: 0.271rem;
        font-weight: bold;
        margin-bottom: 0.15rem;
    }
    .des {
        font-size: 0.215rem;
    }
}
</style>