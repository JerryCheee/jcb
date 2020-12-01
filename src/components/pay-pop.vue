<template>

  <div class="pop-ewm">
            <div class="box" id="save-code">
                <i class="iconfont iconguanbi2" @click="goOrderDetail"></i>
                <!-- <div class="title">
                    <span>支付金额：</span
                    ><span class="red">￥{{ 'totalPrice' }}</span>
                </div> -->
                <div class="store">豪迪五金建材店</div>
                <img src="../assets/img/payewm.png" alt="" />
                <div class="des">
                    <p>请扫描支付码，支付完成后</p>
                    <p>请到我的订单上传凭证以便客服审核发货！</p>
                </div>
                <div class="icon-title">支持以下付款</div>
                <div class="icons">
                    <div>
                        <img src="../assets/img/wx.png" alt="" />
                        <img src="../assets/img/zfb.png" alt="" />
                        <img src="../assets/img/yl.png" alt="" />
                    </div>
                </div>
            </div>
            <!-- <div class="btn" @click="saveImg">保存支付码</div> -->
            <div class="btn">长按二维码扫码支付</div>
        </div>
</template>

<script>
import {Overlay} from 'vant'
export default {
  data(){
    return{
    }
  },
  methods:{
    goOrderDetail(){
      this.$emit('closePay')
    },
    saveImg() {
            // HTML转canvas
            html2canvas(document.querySelector("#save-code"), {
                useCORS: true,
            }).then((canvas) => {
                //$("#save-code").css("display", "none"); // 隐藏目标HTML页面
                // document.querySelector("#save-code").style.display = 'none'
                this.convertCanvasToImg(canvas); // canvas转图片
            });
        },
        convertCanvasToImg(canvas) {
            // canvas转base64 转 blob
            var myBlob = this.dataURLtoBlob(canvas.toDataURL("img/png", 0.92));
            //blob转URL对象
            var myUrl = URL.createObjectURL(myBlob);
            this.canvasImg = myUrl
            // 创建a标签，下载图片
            // this.downImg(myUrl);
        },
        dataURLtoBlob(dataurl) {
            var arr = dataurl.split(","),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        },
        downImg(url) {
            // 创建a标签 并设置其相关属性，最后触发其点击事件
            let a = document.createElement("a");
            let clickEvent = document.createEvent("MouseEvents");
            a.setAttribute("href", url);
            a.setAttribute("download", "codeImg");
            a.setAttribute("target", "_blank");
            clickEvent.initEvent("click", true, true);
            a.dispatchEvent(clickEvent);
        },
  },
  components:{
    Overlay
  }
}
</script>

<style lang="less" scoped>
.pop-ewm {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .box {
        width: 5.085rem;
        height: 7.401rem;
        background-color: #f6f6f6;
        border-radius: 0.1rem;
        text-align: center;
        .iconguanbi2 {
            position: relative;
            top: -0.6rem;
            // left: 2.16rem;
            font-size: 0.47rem;
            color: #ffffff;
        }
        .title {
            color: #1a1a1a;
            font-size: 0.271rem;
            font-weight: bold;
        }
        .store {
            color: #a8a8a8;
            font-size: 0.215rem;
            margin: 0.15rem 0 0.45rem 0;
        }
        img {
            width: 3.277rem;
            height: 3.277rem;
            display: block;
            margin: 0 auto;
        }
        .des {
            color: #a8a8a8;
            font-size: 0.181rem;
            line-height: 0.271rem;
            margin: 0.2rem 0 0.3rem 0;
        }
        .icon-title {
            color: #1a1a1a;
            font-size: 0.181rem;
            margin-bottom: 0.2rem;
        }
        .icons {
            div {
                margin: 0 auto;
                display: flex;
                width: 3rem;
                img {
                    width: auto;
                    height: 0.52rem;
                }
            }
        }
    }
    .btn {
        width: 5.085rem;
        height: 0.734rem;
        background-color: #2ecb62;
        border-radius: 0.367rem;
        color: #f6f6f6;
        font-size: 0.215rem;
        text-align: center;
        line-height: 0.734rem;
        margin-top: 0.339rem;
    }
}
</style>