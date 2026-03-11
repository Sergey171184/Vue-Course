import { mapGetters, mapActions } from 'vuex'

export const loadingMixin = {
    computed: {
        ...mapGetters(['isLoading'])
    },
    methods: {
        ...mapActions(['setLoading']),
        startLoading() {
            this.setLoading(true)
        },
        stopLoading() {
            this.setLoading(false)
        }
    }
}