<template lang="pug">
    .common-container.main-container
        .video-section
            .video-wrapper
                <!--.image(v-if="!currentProduct.video" :style="{backgroundImage: getBgImg(currentProduct.background)}")-->
                video(loop="true" preload="auto" autoplay="true" muted="muted" playsinline)
                    source(src="~/assets/video/main.mp4" type="video/mp4")



</template>

<script>
    import { mapState } from 'vuex'

    import Company from '~/assets/staticData/company.json'

    export default {
        data() {
            return {
                company: Company,
            }
        },
        components: {
        },
        computed: {
            ...mapState('localization', [
                'lang',
            ]),
        },
    }
</script>

<style lang="stylus">
    .main-container
        zoom 1
        &.main-container
            padding 0
            .video-section
                position relative
                height 100vh
                .video-wrapper
                    position absolute
                    overflow hidden
                    height 100vh
                    top -150px
                    left 0
                    width 100vw
                    @media only screen and (max-width 767px)
                        top 70px

                    .image
                        width: 100%;
                        height: 100%;
                        background-position: center;
                        background-size: cover;
                        background-repeat: no-repeat;

                    video
                        display block
                        position absolute
                        width 100%
                        z-index 1
</style>
