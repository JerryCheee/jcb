<template>
    <router-view v-if="isReady"></router-view>
</template>
<script>
import { initWxConfig } from "./utils/wxFn.js";
import { mapActions } from "vuex";
import { isDeep, listenrPath, iosPositionIssue } from "./utils/iosOnly";
import api from "./api/user";
import { Toast } from "vant";

export default {
    data() {
        return {
            isReady: false,
            storeId: "",
        };
    },
    methods: {
        ...mapActions(["fetchUser"]),
        isDeep,
        listenrPath,
        async initPage() {
            var token = this.$route.query.token;
            if (token) localStorage.setItem("token-store", token);
            let res = await api.getUserInfo();
            if (res.success) {
                let isStore = res.result.memberUserInfoVo.isStore;
                this.userId = res.result.memberUserInfoVo.id;
                if (!isStore) {
                    Toast("您还没有店铺！");
                    setTimeout(() => {
                        history.back(-1);
                    }, 1500);
                    return;
                }
                this.storeId = res.result.memberUserInfoVo.storeId;
                this.$store.commit("SET_STOREID", this.storeId);
                this.$store.commit("SET_USERID", this.userId);
                this.isReady = true;
            } else {
                Toast("登录失败！");
                setTimeout(() => {
                    history.back(-1);
                }, 1500);
            }
        },
    },
    watch: {
        $route(to, from) {
            this.initPage();
            if (to.path.match(/[/]/g).length > 1 && !this.isDeep()) {
                this.listenrPath(to.path);
            }
            // if (to.meta.title) {
            //   document.title = to.meta.title;
            // }
        },
    },
    name: "App",
    created(){
        initWxConfig()
    }
};
</script>

<style>
:root {
    --primary: #3ab1fd;
    --primary-gradient: linear-gradient(0deg, #3ab1fd 0%, #68c2fc 100%);
    --secondary: #ff9f3a;
}
.van-dialog {
    border-radius: 0.11rem !important;
}
</style>
<style lang="less">
.tabbar-active {
    color: #2ecb62 !important;
}
.smooth {
    -webkit-overflow-scrolling: touch;
}
body > * {
    //这一个样式 直接保证使用rem 初始字体不会特别大
    font-size: 0.27rem;
}
html {
    //防止左右活动出现空白
    width: 100vw;
    max-width: 100vw;
    overflow-x: hidden;
}

/** 通用样式 start*/
* {
    -webkit-tap-highlight-color: transparent;
}
.row {
    display: flex;
}
.column {
    display: flex;
    flex-direction: column;
}
.sa {
    justify-content: space-around;
}
.sb {
    justify-content: space-between;
}
.ac {
    align-items: center;
}
.jc {
    justify-content: center;
}
.flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
.limit-line {
    autoprefixer: off;
    -webkit-box-orient: vertical;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-break: break-all;
}
.ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.limited-1 {
    -webkit-line-clamp: 1;
}
.limited-2 {
    -webkit-line-clamp: 2;
}
.rich-text-box {
    background: white;
    & img {
        max-width: 100%;
    }
}
.scroll-x-box {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    display: flex;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
}
.divider {
    background: rgb(247, 247, 247);
}
.safe-space {
    //底部填充
    height: 1.3rem;
}

.e1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.e2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.e3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}

.space {
    width: 100%;
    height: 0.23rem;
    background-color: #f5f5f5;
}
/** 通用样式 end*/

/** 以下为 全局默认 样式 */
#app {
    font-family: SourceHanSansCN-Regular, -apple-system, BlinkMacSystemFont,
        "PingFang SC", "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma,
        Simsun, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-align: center;
    color: #1e1e1e;
}
body {
    background: #f5f5f5;
}
a,
abbr,
acronym,
address,
applet,
article,
aside,
audio,
b,
big,
blockquote,
body,
canvas,
caption,
center,
cite,
code,
dd,
del,
details,
dfn,
div,
dl,
dt,
em,
embed,
fieldset,
figcaption,
figure,
footer,
form,
h1,
h2,
h3,
h4,
h5,
h6,
header,
hgroup,
html,
i,
iframe,
img,
ins,
kbd,
label,
legend,
li,
mark,
menu,
nav,
object,
ol,
output,
p,
pre,
q,
ruby,
s,
samp,
section,
small,
span,
strike,
strong,
sub,
summary,
sup,
table,
tbody,
td,
tfoot,
th,
thead,
time,
tr,
tt,
u,
ul,
var,
video {
    margin: 0;
    padding: 0;
    border: 0;
    list-style: none;
}
a {
    text-decoration: none;
    color: inherit;
    display: block;
    box-sizing: border-box;
}
img {
    display: block;
    width: 100%;
}
input {
    outline: none;
    display: block;
    width: 100%;
    height: 100%;
    border: none;
    -webkit-appearance: none;
}
*::-webkit-scrollbar {
    width: 0px;
    height: 0px;
}
input,
textarea {
    -webkit-user-select: auto;
    -moz-user-select: auto;
    user-select: auto;
}
.blue {
    color: #52bffd;
}
.black {
    color: #333333;
}
.Universal {
    padding: 0 0.17rem; //20
    margin: 0 auto;
}
.ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.border-bottom {
    border-bottom: 0.01rem solid #e7e7e7;
}
.border-top {
    border-top: 0.01rem solid #e7e7e7;
}
.border-left {
    border-left: 0.01rem solid #e7e7e7;
}
.border-right {
    border-right: 0.01rem solid #e7e7e7;
}
.container {
    width: 100%;
}
.nodata {
    padding: 0.27rem;
    color: #999999;
    font-size: 0.22rem;
    text-align: center;
}
.yellow {
    color: #fa991f;
}
.blue {
    color: #2d8ce5;
}
.green {
    color: #2ecb62;
}
.red {
    color: #fc0808;
}

.b-yellow {
    background-color: #fa991f;
}
.b-blue {
    background-color: #2d8ce5;
}
.b-green {
    background-color: #2ecb62;
}
.b-red {
    background-color: #fc0808;
}
</style>

