import Vue from 'vue'
import Vuex from 'vuex'

import links from './links'
import goods from './goods'
import coffee from './coffee'
import bestsellers from './bestsellers'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        links, goods, coffee, bestsellers
    }
})

export default store