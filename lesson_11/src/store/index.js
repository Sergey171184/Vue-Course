import Vue from 'vue'
import Vuex from 'vuex'

import links from './links'
import goods from './goods'
import coffee from './coffee'
import bestsellers from './bestsellers'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isLoading: false
    },
    mutations: {
        SET_LOADING(state, status) {
            state.isLoading = status
        }
    },
    actions: {
        setLoading({ commit }, status) {
            commit('SET_LOADING', status)
        }
    },
    getters: {
        isLoading: state => state.isLoading
    },
    modules: {
        links, goods, coffee, bestsellers
    }
})

export default store