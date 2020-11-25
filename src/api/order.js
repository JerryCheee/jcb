import req from '../utils/request'

export default {
    addStoreOrder: params => req.post('/order/storeAdd', params),
    getOrderInfo: id => req.get('/order/queryByIds?mergeOrderCode=' + id),
    getOrderDetail: id => req.get('/order/' + id),
    pay: params => req.post('/order/storePay', params),
    getOrderList: params => req.get('/order/list', { params })
}