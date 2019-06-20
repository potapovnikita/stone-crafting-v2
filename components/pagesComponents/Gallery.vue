<template lang="pug">
        .gallery-container
            .video-section
                .video-wrapper
                    h1 {{ lang === 'ru' ? currentProduct.name : currentProduct.nameEng }}
                    video(loop="true" preload="auto" autoplay="true" muted="muted")
                        source(:src="getImg(currentProduct.video)" type="video/mp4")
            .description-wrapper
                .column
                    .photo
                        img(:src="getImg(currentProduct.imagesFull[1])")
                .column
                    .text
                        .title(v-html="lang === 'ru' ? currentProduct.name : currentProduct.nameEng")
                        .description(v-html="lang === 'ru' ? currentProduct.description : currentProduct.descriptionEng")
                        .about(v-html="lang === 'ru' ? currentProduct.about : currentProduct.aboutEng")
            .photo_gallery
</template>

<script>
    import { mapState } from 'vuex'

    import Header from '~/components/Header.vue'
    import Footer from '~/components/Footer.vue'
    import SplitLine from '~/components/SplitLine.vue'

    import Museum from '~/assets/staticData/museum.json'

    export default {
        data() {
            return {
                products: Museum,
            }
        },
        computed: {
            ...mapState('localization', [
                'lang',
            ]),
            currentProduct() {
                // по id изделия из url находим нужное изделие
                return this.products
                    .find(item => item.id === this.$route.path.split('/').pop())
            }
        },
        methods: {
            getImg(url) {
                console.log(url)
                const imageUrl = require('~/assets/' + `${url}`)
                return url ? `${imageUrl}` : ''
            },
        },
        components: {
            Header,
            Footer,
            SplitLine,
        },
        mounted() {

        },
    }
</script>

<style lang="stylus">
    .gallery-container
        display flex
        flex-direction column
        justify-content center
        text-align center
        text-align -webkit-center
        position relative
        color whiteMain

        h1
            text-transform uppercase
            text-align center
            font-size 36px
            padding 0.9em 1.2em 2.6em 1.2em
            color whiteMain

        .video-section
            position relative
            height 100vh
            .video-wrapper
                position absolute
                overflow hidden
                height 100vh
                top 0
                left 0
                width 100vw

                video {
                    display block
                    position absolute
                    left 50%
                    top 50%
                    transform translate(-50%, -50%)
                    z-index 1
                }
                h1
                    position absolute
                    bottom 0
                    z-index 2
        .description-wrapper
            padding 30px 60px
            display flex
            flex-direction row
            flex-flow wrap
            justify-content center

            .column
                max-width 600px
                flex 50%
                padding 10px

                .photo
                    img
                        max-width 100%
                        max-height 600px
                        box-shadow 0 0 12px -1px rgba(0,0,0,0.8)
                .text
                    text-align left
                    .title
                        margin-bottom 15px


</style>
