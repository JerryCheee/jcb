<template>
    <div class="evaluate-wrap">
        <div class="tags-wrap row ac">
            <div
                class="tag row jc ac"
                :class="{ active: tagIdx == i }"
                v-for="(item, i) in tags"
                :key="i"
                @click="tagIdx = i"
            >
                {{ item }}
            </div>
        </div>

        <textarea placeholder="请输入您的内容" v-model="content"></textarea>
        <!-- <div class="anonymous row ac" @click="anonymous = !anonymous">
            <i class="iconfont iconxuanzhong" v-if="anonymous"></i>
            <i class="iconfont iconyuan" v-else></i>
            <span>匿名发表</span>
        </div> -->
        <span class="title">上传照片</span>
        <div class="img-wrap">
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
        <!-- 评分 -->
        <div class="rate-wrap">
            <div class="line row ac">
                <span class="t">店铺评分</span>
                <rate
                    v-model="shop"
                    size="0.25rem"
                    color="#ffd21e"
                    void-icon="star"
                    void-color="#eee"
                ></rate>
            </div>
            <div class="line row ac">
                <span class="t">服务评分</span>
                <rate
                    v-model="serviceAttitude"
                    size="0.25rem"
                    color="#ffd21e"
                    void-icon="star"
                    void-color="#eee"
                ></rate>
            </div>
            <div class="line row ac">
                <span class="t">配送评分</span>
                <rate
                    v-model="deliverySpe"
                    size="0.25rem"
                    color="#ffd21e"
                    void-icon="star"
                    void-color="#eee"
                ></rate>
            </div>
        </div>

        <div class="submit-btn row ac jc" @click="submit">提交</div>
    </div>
</template>

<script>
import { Uploader, Rate, Toast } from "vant";
import api from "../../api/order";
export default {
    data() {
        return {
            id: this.$route.query.id,
            tagIdx: 0,
            tags: ["好评", "中评", "差评"],
            anonymous: false,
            content: "",
            shop: 5,
            serviceAttitude: 5,
            deliverySpe: 5,
            fileList: [],
        };
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
        async submit() {
            if (!this.content) return Toast("请填写评论内容！");
            let res = await api.addComments({
                content: this.content,
                type: 1,
                serviceAttitude: this.serviceAttitude,
                score: this.tagIdx + 1, //总体评分 1-好评 2-中评 3-差评
                pics: this.fileList.map((a) => a.url).join(","),
                orderid: this.id,
                storeRating: this.shop,
                deliverySpe: this.deliverySpe,
            });
            if (res.success) {
                Toast("评价成功!");
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
        Rate,
    },
};
</script>

<style lang="less" scoped>
.evaluate-wrap {
    height: 100vh;
    background-color: #ffffff;
    padding: 0.2rem 0.27rem 1.47rem 0.27rem;
    overflow: scroll;
    box-sizing: border-box;
    position: relative;
}
.tags-wrap {
    height: 0.75rem;
    margin-bottom: 0.23rem;
    .tag {
        width: 1.02rem;
        height: 0.51rem;
        margin-right: 0.17rem;
        background-color: #dddddd;
        border-radius: 0.25rem;
        font-size: 0.21rem;
    }
    .active {
        background-color: #e1fdd2;
        color: #2ecb62;
    }
}
textarea {
    width: 100%;
    height: 2.26rem;
    background-color: #f6f6f6;
    border-radius: 0.11rem;
    border: none;
    padding: 0.15rem;
    box-sizing: border-box;
    font-size: 0.24rem;
    color: #a8a8a8;
    margin-bottom: 0.23rem;
}
.anonymous {
    line-height: 1;
    margin-bottom: 0.5rem;
    .iconxuanzhong {
        font-size: 0.28rem;
        color: #2ecb62;
    }
    .iconyuan {
        color: #cccccc;
        font-size: 0.28rem;
    }
    .no {
        width: 0.22rem;
        height: 0.22rem;
        border-radius: 50%;
        border: 0.01rem solid #cccccc;
    }
    span {
        margin-left: 0.17rem;
    }
}
.title {
    font-size: 0.24rem;
    color: #000000;
    margin-bottom: 0.15rem;
    display: block;
}
.img-wrap {
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
        width: 1.36rem;
        height: 1.36rem;
        background-color: #ffffff;
        border-radius: 0.056rem;
    }
}
.rate-wrap {
    margin-top: 0.6rem;
    .line {
        margin-bottom: 0.2rem;
        .t {
            font-size: 0.24rem;
            color: #000000;
            margin-right: 0.34rem;
        }
    }
}
.submit-btn {
    width: 5.81rem;
    height: 0.56rem;
    background-color: #2ecb62;
    border-radius: 0.28rem;
    font-size: 0.21rem;
    color: #ffffff;
    position: absolute;
    left: 50%;
    bottom: 0.5rem;
    transform: translateX(-50%);
}

/deep/.van-uploader__upload {
    margin: 0;
}
</style>