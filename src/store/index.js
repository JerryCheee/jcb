import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import shareStation from './shareStation'
import user from './user'
import order from './order'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        order,
        shareStation,
    },
    plugins: [
        persistedState({ storage: window.sessionStorage })
    ]
})

export default store