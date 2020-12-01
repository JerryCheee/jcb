import req from '../utils/request'
export default {
    getBrands: () => req.get('/productBrand/list'),
    getAllList: () => req.get('/productClassify/allList'),
    getGoods: data => req.post('/productInfo/listByClassId', data),
    getRecomBrand: params => req.get('/productBrand/recommend', { params }),
    searchGoods: data => req.post('/supplierEsQuery/screenProduct', data),
    addShopcart: data => req.post('/shopCartApi/addCartCom', data),
    getGoodsDetail: data => req.post('/productInfo/supDetails', data),
    getGoodsList: data => req.post('/productInfo/homeList', data),
    createOrder: data => req.post('/order', data),
    getAllBrand: params => req.get('/productBrand/list', { params }),
    getSupHomeList: data => req.post('/productInfo/supHomeList', data),
    collect: params => req.get('/memberSubApi/collectionCommodity', { params }),
    getSecBrand: params => req.get('/productBrand/tags', { params })
}