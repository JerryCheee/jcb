import req from '../utils/request'
export default {
    getBanner: (data) => req.post('/carousel/get', data),
    getNotice: (params) => req.get('/notice/get', { params }),

}