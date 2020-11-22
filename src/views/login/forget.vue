<template>
    <div class="forget-wrap">
        <h3>重置密码</h3>
        <div class="form">
            <div class="filed bottom-border">
                <span>手机号码</span>
                <input
                    type="text"
                    placeholder="请输入手机号码"
                    v-model="phone"
                />
            </div>
            <div class="filed">
                <span>验证码</span>
                <div class="code">
                    <input
                        type="text"
                        placeholder="请输入验证码"
                        v-model="verifyMsg"
                    />
                    <div
                        class="send-msg"
                        @click="getMessage"
                        :class="{ disabled: timer }"
                    >
                        {{ waitText }}
                    </div>
                </div>
            </div>
        </div>

        <div class="btn row ac jc" @click="nextStep">下一步</div>
        <div
            class="btn btn-plain row ac jc"
            @click="$router.replace({ name: 'login' })"
        >
            返回
        </div>
    </div>
</template>

<script>
import api from "../../api/login";
import { Toast } from "vant";
export default {
    data() {
        return {
            second: 60,
            timer: null,
            waitText: "获取验证码",
            phone: "",
            verifyMsg: "",
        };
    },
    methods: {
        async getMessage() {
            if (this.timer) return;
            if (!/^1[0-9]{10}$/.test(this.phone))
                return Toast("请输入正确的手机号码！");
            let params = {
                openId: "oM2fl5MDsV8pP-2WivrweUej5L5U",
                phone: this.phone,
                service: 3, //1登录 2注册 3找回
            };
            var res = await api.getMsgCode(params);
            if (!res.success) return Toast(res.message);
            this.timer = setInterval(() => {
                if (this.second <= 1) {
                    clearInterval(this.timer);
                    this.waitText = "获取验证码";
                    this.timer = null;
                    this.second = 60;
                    return;
                }
                this.second -= 1;
                this.waitText = `${this.second}s后重新获取`;
            }, 1000);
        },
        async nextStep() {
            // 下一步
            let params = {
                phone: this.phone,
                code: this.verifyMsg,
            };
            let res = await api.forget(params);
            if (res.success) {
                let code = res.result;
                this.$router.push("/login/set");
            } else {
                this.showToast(res.message);
            }
        },
    },
    created() {
        let { phone } = this.$route.query || "";
        this.phone = phone;
    },
};
</script>

<style lang="less" scoped>
.bottom-border {
    border-bottom: 1px solid #dddddd;
}
.forget-wrap {
    height: 100vh;
    background-color: #ffffff;
    overflow: hidden;
}
h3 {
    font-size: 0.36rem;
    color: #000;
    font-weight: bold;
    margin-left: 0.4rem;
    margin-top: 0.85rem;
}
.form {
    padding: 0 0.27rem;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    .filed {
        margin-top: 0.34rem;
        span {
            font-size: 0.21rem;
            color: #000;
        }
        input {
            outline: none;
            box-sizing: border-box;
            background-color: none;
            color: #1a1a1a;
            font-size: 0.24rem;
            margin-top: 0.28rem;
            padding-bottom: 0.25rem;
            flex: 1;
        }
        .code {
            display: flex;
            align-items: center;
        }
        .send-msg {
            color: #2ecb62;
            font-size: 0.24rem;
            &.disabled {
                color: #999999;
            }
        }
    }
}
.btn {
    width: 5.81rem;
    height: 0.68rem;
    background-color: #2ecb62;
    border-radius: 0.34rem;
    color: white;
    font-size: 0.21rem;
    margin: 0.33rem auto 0 auto;
}
.btn-plain {
    background-color: #ffffff;
    border: 1px solid #2ecb62;
    color: #2ecb62;
}
</style>