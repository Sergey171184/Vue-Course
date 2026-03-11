const goods = {
    state: {
        goods: [],
        current: null
    },
    mutations: {
        setGoodsData(state, data) {
            state.goods = data
        },
        setCurrentGoods(state, goods) {
            state.current = goods
        }
    },
    actions: {
        setGoodsData({ commit }, data) {
            commit('setGoodsData', data)
        },
        async fetchGoodsById({ commit, state }, id) {
            const found = state.goods.find(g => g.id == id)
            if (found) {
                commit('setCurrentGoods', found)
                return
            }
            const res = await fetch(`http://localhost:3000/goods/${id}`)
            const data = await res.json()
            commit('setCurrentGoods', data)
        }
    },
    getters: {
        getGoods(state) {
            return state.goods
        },
        getCurrentGoods(state) {
            return state.current
        }
    }
}

export default goods