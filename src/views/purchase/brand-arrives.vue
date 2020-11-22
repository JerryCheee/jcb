<template>
    <div class="choose-wrap">
        <div class="top-search row sb ac">
            <input
                type="search"
                placeholder="请输入品牌名称"
                v-model="searchKey"
            />
        </div>

        <!-- 热门 -->
        <div class="hot">
            <!-- <span class="title">{{ item }}</span> -->
            <div class="wrap">
                <div
                    class="item"
                    v-for="item in recomBrandList"
                    :key="item.id"
                    @click="$router.push('/purchase/search?id=' + item.id)"
                >
                    <img :src="item.logo" />
                </div>
            </div>
        </div>

        <index-bar>
            <div v-for="k in allBrandKeys" :key="k">
                <index-anchor :index="k"></index-anchor>
                <cell
                    v-for="(v, i) in allBrandObj[k]"
                    :key="i"
                    :title="v.name"
                    @click="$router.push('/purchase/search?id=' + v.id)"
                />
            </div>
        </index-bar>
    </div>
</template>

<script>
import { IndexBar, IndexAnchor, Cell } from "vant";
import api from "../../api/product";
export default {
    data() {
        return {
            searchKey: "",
            types: ["电动工具", "电工电器", "机电设备"],
            arr: [
                { name: "A", list: ["得力", "世博"] },
                { name: "B", list: ["得力", "东成", "世博"] },
                { name: "C", list: ["得力", "东成", "世博"] },
                { name: "D", list: ["得力", "东成", "世博"] },
                { name: "F", list: ["得力", "东成", "世博"] },
                { name: "G", list: ["得力", "东成", "世博"] },
                { name: "H", list: ["得力", "东成", "世博"] },
                { name: "J", list: ["得力", "东成", "世博"] },
                { name: "M", list: ["得力", "东成", "世博"] },
            ],
            recomBrandList: [],
            allBrandObj: {},
            allBrandKeys: [],
        };
    },
    methods: {
        async getRecomBrand() {
            let res = await api.getRecomBrand();
            this.recomBrandList = res.result;
        },
        async getAllBrand() {
            let res = await api.getAllBrand();
            this.allBrandObj = res.result;
            this.allBrandKeys = Object.keys(res.result).sort();
        },
    },
    created() {
        this.getRecomBrand();
        this.getAllBrand();
    },
    watch: {
        searchKey(v) {},
    },
    components: {
        IndexBar,
        IndexAnchor,
        Cell,
    },
};
</script>

<style lang="less" scoped>
.choose-wrap {
    height: 100vh;
    background-color: #f6f6f6;
    overflow: scroll;
}
.top-search {
    height: 0.75rem;
    height: 0.51rem;
    background-color: #ffffff;
    padding: 0.12rem 0.27rem;
    margin-bottom: 0.23rem;
    input {
        background-color: #f6f6f6;
        border-radius: 0.25rem;
        font-size: 0.18rem;
        color: #bbbbbb;
        padding-left: 0.2rem;
    }
    span {
        font-size: 0.21rem;
        color: #2ecb62;
    }
}
.hot {
    padding: 0 0.27rem 0.23rem 0.27rem;
    .title {
        font-size: 0.21rem;
        color: #a8a8a8;
    }
    .wrap {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 0.23rem;
        margin-top: 0.18rem;
        .item {
            width: 1.288rem;
            // height: 1.017rem;
            border-radius: 0.056rem;
        }
    }
}
</style>