<template>
    <div class="choose-address-wrap">
        <div class="top">
            <div class="p-wrap">
                <input type="search" placeholder="请输入街道名称" />
                <router-link to="/chooseCity" tag="div" class="provi row ac">
                    <span>佛山市</span>
                    <i class="iconfont iconARROW"></i>
                </router-link>
            </div>
        </div>
        <!-- 定位 -->
        <div class="now-local com column sb">
            <span class="title">当前定位</span>
            <div class="row sb ac">
                <span class="now">广佛新干线</span>
                <span class="reflesh">重新定位</span>
            </div>
        </div>

        <!-- 收货地址 -->
        <div class="address-wrap com">
            <span class="title">收货地址</span>
            <div class="address-item" v-for="item in 4" :key="item">
                <span class="address">地球市地球镇地球村东南西北888号</span>
                <div class="row ac info">
                    <span class="name">张三</span>
                    <span>12345778900</span>
                </div>
            </div>
        </div>

        <router-link to="/editaddress" tag="div" class="add-btn position">
            添加地址
        </router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
};
</script>

<style lang="less" scoped>
.choose-address-wrap {
    height: 100vh;
    background-color: #f6f6f6;
    overflow: scroll;
    padding-bottom: 1.3rem;
    box-sizing: border-box;
    position: relative;
}
.top {
    padding: 0.12rem 0.27rem 0.12rem 0.27rem;
    background-color: #ffffff;

    input {
        height: 0.51rem;
        background-color: #f6f6f6;
        border-radius: 0.25rem;
        font-size: 0.18rem;
        color: #bbbbbb;
        padding-left: 1.26rem;
    }
    .p-wrap {
        position: relative;
        .provi {
            position: absolute;
            left: 0.16rem;
            top: 50%;
            transform: translateY(-50%);
            font-size: 0.18rem;
            color: #1a1a1a;
            font-weight: bold;
            line-height: 1;
            padding-right: 0.05rem;
            border-right: 1px solid #a8a8a8;
            i {
                font-size: 0.1rem;
                transform: rotate(90deg);
                margin-left: 0.05rem;
            }
        }
    }
}
.now-local {
    padding: 0.23rem 0.27rem;
    background-color: #ffffff;
    margin-bottom: 0.23rem;
    .title {
        font-size: 0.2rem;
        color: #a8a8a8;
    }
    & > div {
        margin-top: 0.23rem;
        .now {
            font-size: 0.24rem;
            font-weight: bold;
            color: #1a1a1a;
        }
        .reflesh {
            font-size: 0.21rem;
            color: #2ecb62;
        }
    }
}
.add-btn {
    width: 5.81rem;
    height: 0.56rem;
    background-color: #2ecb62;
    border-radius: 0.28rem;
    // position: absolute;
    left: 50%;
    bottom: 0.7rem;
    transform: translateX(-50%);
    font-size: 0.21rem;
    color: #ffffff;
    line-height: 0.56rem;
    text-align: center;
}
.position {
    position: absolute;
}
.com {
    padding: 0.23rem 0.27rem;
    background-color: #ffffff;
    .title {
        font-size: 0.2rem;
        color: #a8a8a8;
    }
    .address-item {
        padding: 0.23rem 0;
        border-bottom: 1px solid #dddddd;
        color: #1a1a1a;
        .address {
            font-size: 0.24rem;
            font-weight: 500;
        }
        .info {
            margin-top: 0.16rem;
            font-size: 0.21rem;
            .name {
                margin-right: 0.4rem;
            }
        }
    }
}
</style>