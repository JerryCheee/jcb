
//用于 两个页面组件 之间数据共享
export const INIT_USER = 'INIT_USER'
export const SET_STOREID = 'SET_STOREID'
export const SET_USERID = 'SET_USERID'

const state = {
    userId: '',
    storeId: ''
};
const mutations = {
    [SET_STOREID](state, payload) {
        state.storeId = payload
    },
    [SET_USERID](state, payload) {
        state.userId = payload
    },
    [INIT_USER](state, payload) {
        Object.assign(state, payload)
    },
}
const actions = {

}

export default {
    state,
    actions,
    mutations
}