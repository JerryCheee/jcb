<template>
    <div class="certificate">
        <div class="title">上传凭证</div>
        <div class="img-list">
            <uploader
                v-model="fileList"
                accept="image/*"
                :before-read="beforeRead"
                :after-read="afterRead"
                :max-count="4"
                :max-size="5 * 1024 * 1024"
                @oversize="onOversize"
            />
        </div>

        <div class="btn" @click="save">保存</div>
    </div>
</template>

<script>
import { Uploader, Toast } from "vant";
import api from "../api/order";
export default {
    props: ["order"],
    data() {
        return {
            fileList: [],
        };
    },
    created() {
        if (this.order.isPaymentVoucherSrc) {
            this.fileList = this.order.paymentVoucherSrc.split(",").map((a) => {
                return {
                    url: a,
                    message: "上传成功",
                    status: "done",
                };
            });
        }
    },
    methods: {
        // 返回布尔值
        beforeRead(file) {
            if (!/image\/\w+/.test(file.type)) {
                Toast("请上传图片！");
                return false;
            }
            return true;
        },
        async afterRead(file) {
            console.log(file.file);
            file.status = "uploading";
            file.message = "上传中...";
            // 创建form对象
            let param = new FormData();
            param.append("file", file.file);
            let res = await api.upload(param);
            if (res.success) {
                file.status = "done";
                file.message = "上传成功";
                file.url = res.message;
                console.log(this.fileList);
            } else {
                file.status = "failed";
                file.message = "上传失败";
            }
        },
        onOversize(file) {
            Toast("文件大小不能超过 5M");
        },
        async save() {
            if (this.fileList.length == 0) return Toast("请上传支付凭证！");
            let res = await api.uploadCertificate({
                orderId: this.order.id,
                voucherSrc: this.fileList.map((a) => a.url).join(","),
            });
            if (res.success) {
                Toast("支付凭证上传成功，请等待后台审核");
                setTimeout(() => {
                    this.$router.back(-1);
                }, 1000);
            } else {
                Toast(res.message);
            }
        },
    },
    components: {
        Uploader,
    },
};
</script>
<style lang="less" scoped>
.certificate {
    padding: 0 0.226rem;
    background-color: #ffffff;
    border-radius: 0.113rem;
    margin-bottom: 0.226rem;
    padding-bottom: 0.232rem;
    .title {
        height: 0.71rem;
        line-height: 0.71rem;
        font-size: 0.215rem;
        color: #1a1a1a;
        border-bottom: 1px solid #a8a8a8;
    }
    .img-list {
        margin-top: 0.288rem;
    }
    /deep/ .van-uploader__preview {
        border-radius: 0.056rem;
        margin: 0 0.14rem 0.28rem 0;
        &:last-child {
            margin-right: 0;
        }
    }
    /deep/ .van-uploader__upload {
        margin: 0 0 0.28rem 0;
    }
    /deep/ .van-uploader__preview-image {
        width: 1.243rem;
        height: 1.243rem;
        background-color: #ffffff;
        border-radius: 0.056rem;
    }
    .btn {
        width: 3.39rem;
        height: 0.565rem;
        background-color: #2ecb62;
        border-radius: 0.282rem;
        color: #ffffff;
        font-size: 0.215rem;
        line-height: 0.565rem;
        text-align: center;
        margin: 0.232rem auto;
    }
}
</style>