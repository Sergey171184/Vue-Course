const coffee = {
    state: {
        coffee: [],
        current: null
    },
    mutations: {
        setCoffeeData(state, data) {
            state.coffee = data
        },
        setCurrentCoffee(state, coffee) {
            state.current = coffee
        }
    },
    actions: {
        setCoffeeData({ commit }, data) {
            commit('setCoffeeData', data)
        },
        async fetchCoffeeById({ commit, state }, id) {
            const found = state.coffee.find(c => c.id == id)
            if (found) {
                commit('setCurrentCoffee', found)
                return
            }
            const res = await fetch(`http://localhost:3000/coffee/${id}`)
            const data = await res.json()
            commit('setCurrentCoffee', data)
        }
    },
    getters: {
        getCoffee(state) {
            return state.coffee
        },
        getCurrentCoffee(state) {
            return state.current
        }
    }
}

export default coffee