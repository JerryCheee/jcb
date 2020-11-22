<template>
    <div class="info">
        <div class="form-box">
            <div class="form-item">
                <div class="form-label">店铺LOGO</div>
                <div class="form-input">
                    <img src="../../assets/img/会员中心头像.png" alt class="head" />
                </div>
            </div>
            <div class="form-item">
                <div class="form-label">店铺名称</div>
                <div class="form-input">
                    <input type="text" v-model="info.storeName" />
                </div>
            </div>
            <div class="form-item">
                <div class="form-label">联系人</div>
                <div class="form-input">
                    <input type="text" value="张三" />
                </div>
            </div>
            <div class="form-item column">
                <div class="form-label">店铺简介</div>
                <div class="form-textarea">
                    <textarea placeholder="请输入简介内容" v-model="info.introduce"></textarea>
                </div>
            </div>
        </div>

        <div class="submit-btn">保存</div>
    </div>
</template>

<script>
import { Popup, DatetimePicker } from "vant";
import api from "../../api/user";

export default {
    data() {
        return {
            storeId: this.$store.state.user.storeId,
            info: {}
        };
    },
    created() {
        this.getStoreInfo();
    },
    methods: {
        async getStoreInfo() {
            let res = await api.getStoreInfo({ storeId: this.storeId });
            this.info = res.result || {};
        }
    },
    components: {
        Popup,
        DatetimePicker
    }
};
</script>

<style lang="less" scoped>
.info {
    background: #ffffff;
    min-height: 100vh;
}
.form-box {
    padding: 0.266rem;
    .form-item {
        display: flex;
        align-items: center;
        color: #1a1a1a;
        border-bottom: 1px solid #dddddd;
        min-height: 0.65rem;
        .form-label {
            width: 1.2rem;
            font-size: 0.215rem;
            line-height: 0.65rem;
        }
        .form-input {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            input {
                text-align: right;
                font-size: 0.215rem;
            }
            .head {
                width: 0.814rem;
                height: 0.814rem;
                border-radius: 100%;
                padding: 0.226rem 0;
            }
        }
        .form-textarea {
            textarea {
                width: 5.514rem;
                height: 0.73rem;
                background-color: #f6f6f6;
                border-radius: 0.113rem;
                border: none;
                opacity: 0.6;
                font-size: 0.215rem;
                color: #a8a8a8;
                line-height: 0.271rem;
                padding: 0.15rem;
                resize: none;
            }
        }
        &.column {
            border: none;
            .form-label {
                text-align: left;
                width: 100%;
            }
        }
    }
}
.submit-btn {
    width: 5.814rem;
    height: 0.678rem;
    background-color: #2ecb62;
    border-radius: 0.113rem;
    color: #ffffff;
    font-size: 0.215rem;
    line-height: 0.678rem;
    text-align: center;
    position: fixed;
    bottom: 1rem;
    left: 0.271rem;
}
</style>