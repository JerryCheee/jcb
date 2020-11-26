import api from '../api/order';
//用于 两个页面组件 之间数据共享
export const SET_ORDER = 'SET_ORDER'

const state = {
    info: {}
};
const mutations = {
    [SET_ORDER](state, payload) {
        state.info = payload
    },
}
const actions = {
    async getOrderInfo({ commit, state }, id) {
        let res = await api.getOrderDetail(id);
        commit('SET_ORDER', res.result || {})
    }
}

export default {
    state,
    actions,
    mutations
}