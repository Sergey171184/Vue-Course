const coffee = {
    state: {
        coffee: [],
        current: null,
        searchValue: '',
        sortValue: ''
    },
    mutations: {
        setCoffeeData(state, data) {
            state.coffee = data
        },
        setCurrentCoffee(state, coffee) {
            state.current = coffee
        },
        setSearchValue(state, value) {
            state.searchValue = value
        },
        setSortValue(state, value) {
            state.sortValue = value
        },
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
        },
        setSearchValue({ commit }, value) {
            commit('setSearchValue', value)
        },
        setSortValue({ commit }, value) {
            commit('setSortValue', value)
        },
    },
    getters: {
        getCoffee(state) {
            return state.coffee
        },
        getCurrentCoffee(state) {
            return state.current
        },
        getSearchValue(state) {
            return state.searchValue
        },
        getSortValue(state) {
            return state.sortValue
        }
    }
}

export default coffee