import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/workbench'
        },
        {
            path: '/workbench',
            name: 'workbench',
            meta: { title: '工作台' },
            component: () => import('@/views/workbench/index')
        },
        {
            path: '/classify',
            name: 'classify',
            meta: { title: '分类' },
            component: () => import('@/views/classify/index')
        },
        {
            path: '/shopcart',
            name: 'shopcart',
            meta: { title: '购物车' },
            component: () => import('@/views/shopcart/index')
        },
        {
            path: '/purchase',
            name: 'purchase',
            meta: { title: '进货' },
            component: () => import('@/views/purchase/index')
        },
        {
            path: '/workbench/info',
            name: 'info',
            meta: { title: '店铺信息' },
            component: () => import('@/views/workbench/info')
        },
        {
            path: '/workbench/purchase-discount',
            name: 'purchase-discount',
            meta: { title: '进货优惠' },
            component: () => import('@/views/workbench/purchase-discount')
        },
        {
            path: '/workbench/collect',
            name: 'collect',
            meta: { title: '我的收藏' },
            component: () => import('@/views/workbench/collect')
        },
        {
            path: '/workbench/goods',
            name: 'my-goods',
            meta: { title: '管理商品' },
            component: () => import('@/views/workbench/goods')
        },
        {
            path: '/workbench/address',
            name: 'my-address',
            meta: { title: '管理地址' },
            component: () => import('@/views/workbench/address')
        },
        {
            path: '/workbench/address/edit/:id?',
            name: 'my-address-edit',
            meta: { title: '编辑地址' },
            component: () => import('@/views/workbench/address-edit')
        },
        {
            path: '/workbench/shop-coupons',
            name: 'shop-coupons',
            meta: { title: '店铺优惠券' },
            component: () => import('@/views/workbench/shop-coupons')
        },
        {
            path: '/workbench/popularize',
            name: 'popularize',
            meta: { title: '推广中心' },
            component: () => import('@/views/workbench/popularize')
        },
        {
            path: '/workbench/popularize-people',
            name: 'popularize-people',
            meta: { title: '推广人数' },
            component: () => import('@/views/workbench/popularize-people')
        },
        {
            path: '/workbench/popularize-order',
            name: 'popularize-order',
            meta: { title: '推广人订单' },
            component: () => import('@/views/workbench/popularize-order')
        },
        {
            path: '/workbench/shop-orders/:state?',
            name: 'shop-orders',
            meta: { title: '店铺交易订单' },
            component: () => import('@/views/workbench/shop-orders')
        },
        {
            path: '/workbench/shop-order/:orderno',
            name: 'shop-order',
            meta: { title: '店铺交易订单详情' },
            component: () => import('@/views/workbench/shop-order')
        },
        {
            path: '/chooseCity',
            name: 'chooseCity',
            meta: { title: '选择城市' },
            component: () => import('@/views/purchase/choose-city')
        },
        {
            path: '/purchase/brand-zone',
            name: 'brand-zone',
            meta: { title: '品牌商品' },
            component: () => import('@/views/purchase/brand-zone')
        },
        {
            path: '/purchase/search',
            name: 'search',
            meta: { title: '搜索' },
            component: () => import('@/views/purchase/search')
        },
        {
            path: '/purchase/brand-arrives',
            name: 'brand-arrives',
            meta: { title: '大牌驾到' },
            component: () => import('@/views/purchase/brand-arrives')
        },
        {
            path: '/purchase/preferential',
            name: 'preferential',
            meta: { title: '特惠商品' },
            component: () => import('@/views/purchase/preferential')
        },
        {
            path: '/order/confirm/:id',
            name: 'confirm',
            meta: { title: '确认订单' },
            component: () => import('@/views/order/confirm')
        },
        {
            path: '/order/choose-address',
            name: 'choose-address',
            meta: { title: '选择收货地址' },
            component: () => import('@/views/order/choose-address')
        },
        {
            path: '/goods/detail',
            name: 'goods-detail',
            meta: { title: '商品详情' },
            component: () => import('@/views/goods/detail')
        },
        {
            path: '/goods/evaluate',
            name: 'evaluate',
            meta: { title: '用户评价' },
            component: () => import('@/views/goods/evaluate')
        },
        {
            path: '/goods/select-address',
            name: 'select-address',
            meta: { title: '选择配送地址' },
            component: () => import('@/views/goods/select-address')
        },
        {
            path: '/register',
            name: 'register',
            meta: { title: '注册' },
            component: () => import('@/views/login/register')
        },
        {
            path: '/login',
            name: 'login',
            meta: { title: '登录' },
            component: () => import('@/views/login/index')
        },
        {
            path: '/login/forget',
            name: 'forget',
            meta: { title: '忘记密码' },
            component: () => import('@/views/login/forget')
        },
        {
            path: '/login/set',
            name: 'set-pwd',
            meta: { title: '设置新密码' },
            component: () => import('@/views/login/set')
        },
    ],
    linkActiveClass: 'tabbar-active'
})