<template>
    <div class="address-wrap">
        <div class="address-card column sb" v-for="(item, i) in 3" :key="i">
            <div class="top column sb">
                <div class="row ac">
                    <span class="default" v-if="i == 0">默认地址</span>
                    <span class="name">张三</span>
                    <span class="phone">12345678900</span>
                </div>
                <div class="address row ac">
                    <i class="iconfont icondizhi1"></i>
                    <span>地球市地球镇地球村东南西北888号</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            defaultIdx: 0,
        };
    },
};
</script>

<style lang="less" scoped>
.address-wrap {
    padding: 0.23rem 0.27rem;
    background-color: #f6f6f6;
    position: relative;
}
.address-card {
    background-color: #ffffff;
    border-radius: 0.11rem;
    padding: 0.28rem 0.21rem;
    box-sizing: border-box;
    margin-bottom: 0.23rem;
    .top {
        color: #000000;
        font-size: 0.27rem;

        .default {
            width: 1.017rem;
            height: 0.271rem;
            display: inline-block;
            line-height: 0.27rem;
            background-color: rgba(225, 253, 210, 0.4);
            border-radius: 0.023rem;
            font-size: 0.215rem;
            color: #2ecb62;
            text-align: center;
            margin-right: 0.1rem;
        }
        .name {
            margin-right: 0.5rem;
            font-weight: bold;
        }
        .phone {
            font-weight: bold;
        }
        .address {
            font-size: 0.24rem;
            margin-top: 0.14rem;
            font-weight: normal;
        }
        i {
            font-size: 0.24rem;
            margin-right: 0.23rem;
        }
    }
}
</style>