<template lang="pug">
    .preload(v-if="load")
        video#video(preload="auto" playsinline autoplay muted width="100%")
            source(src="~/assets/video/preload.mp4" type="video/mp4")

</template>

<script>
    import { mapMutations, mapState } from 'vuex'

    export default {
        methods: {
            ...mapMutations({
                offLoad: 'pagePreload/offLoad'
            }),
            getImg(url) {
                const imageUrl = require('~/assets/' + `${url}`)
                return url ? `${imageUrl}` : ''
            },
        },
        computed: {
            ...mapState('pagePreload', [
                'load',
            ]),
        },
        mounted() {
            const vid = document.getElementById("video");
            const interval = setInterval(() => {
                if (vid.ended) {
                    this.offLoad();
                    clearInterval(interval);
                }
            }, 1000);
        },
    }
</script>

<style lang="stylus">
    .preload
        display flex
        position fixed
        top 0
        bottom 0
        left 0
        right 0
        z-index 10000
        background black
</style>
