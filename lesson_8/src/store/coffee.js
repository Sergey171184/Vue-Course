const coffee = {
    state: {
        coffee: [
            {
                id: 0,
                name: "Solimo Coffee Beans 2kg",
                price: 10.73,
                image: "coffee-1.jpg",
            },
            {
                id: 1,
                name: "Presto Coffee Beans 1kg",
                price: 15.99,
                image: "coffee-2.jpg",
            },
            {
                id: 2,
                name: "AROMISTICO Coffee 1kg",
                price: 6.99,
                image: "coffee-3.jpg",
            },
            {
                id: 3,
                name: "Solimo Coffee Beans 2kg",
                price: 10.73,
                image: "coffee-1.jpg",
            },
            {
                id: 4,
                name: "Presto Coffee Beans 1kg",
                price: 15.99,
                image: "coffee-2.jpg",
            },
            {
                id: 5,
                name: "AROMISTICO Coffee 1kg",
                price: 6.99,
                image: "coffee-3.jpg",
            },
        ],
    },
    getters: {
        getCoffee(state) {
            return state.coffee
        }
    }
}

export default coffee