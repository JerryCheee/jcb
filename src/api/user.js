import req from '../utils/request'
export default {
    /**根据已有的token 获取用户信息 */
    getUserInfo: () => req.get('/member/loadMemberInfo'),
    getAddressList: params => req.get('/member/address/list', { params }),
    addAddress: data => req.post('/member/address/add', data),
    setDefault: data => req.put('/member/address/defaultUse', data),
    getOneAddress: id => req.get('/member/address/' + id),
    editAddress: data => req.put('/member/address/' + data.id, data),
    deleteAddress: params => req.delete('/member/address/deleteBatch', { params }),
    getStoreInfo: data => req.post('/store/details', data),
    editStoreInfo: data => req.put('/store/edit', data),
    getStoreCenter: storeId => req.get('/store/getStoreCenter?storeId=' + storeId),
    geographic: params => req.get('/geographic/options', { params }),
    getCollectList: params => req.post('/memberSubApi/listCollectCommodity', params),
    getMemberSourceList: (params) => req.get('/popularize/memberSourceList', { params }), // 推广人列表
    getOrderSourceList: (params) => req.get('/popularize/orderSourceList', { params }), // 推广订单列表
    getPopularize: id => req.get('/popularize/statistics?memberId=' + id),
    getPrifitList: params => req.get('/popularize/amountList', { params }), // 推广收益列表
}