import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/iconfont/iconfont.css'
import '../src/assets/css/style.css'
import AwesomePicker from 'vue-awesome-picker';
import VueClipboard from 'vue-clipboard2'
import filters from '@/utils/filters'
import VueScroller from 'vue-scroller'
import { Dialog, ImagePreview } from 'vant'
import showQr from './components/qr/qr'

import 'vant/lib/index.css';


Vue.use(VueScroller)
Vue.use(VueClipboard)
Vue.use(AwesomePicker);
Vue.use(Dialog)
Vue.use(ImagePreview)
Vue.use(showQr)
Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

//注册全局过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    //定时循环回到顶部
    let scrollToptimer = setInterval(function() {
        // console.log("定时循环回到顶部")
        var top = document.body.scrollTop || document.documentElement.scrollTop;
        var speed = top / 4;
        if (document.body.scrollTop != 0) {
            document.body.scrollTop -= speed;
        } else {
            document.documentElement.scrollTop -= speed;
        }
        if (top == 0) {
            clearInterval(scrollToptimer);
        }
    }, 30);

    next()
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')