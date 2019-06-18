<template lang="pug">
    .preload(v-if="load")

</template>

<script>
    import { mapMutations, mapState } from 'vuex'

    export default {
        methods: {
            ...mapMutations({
                offLoad: 'pagePreload/offLoad'
            }),
        },
        computed: {
            ...mapState('pagePreload', [
                'load',
            ]),
        },
        mounted() {
            setTimeout(() => {
                this.offLoad()
            }, 500)
        },
    }
</script>

<style lang="stylus">
    .preload
        position fixed
        top 0
        bottom 0
        left 0
        right 0
        z-index 10000
        background lightgray
</style>
