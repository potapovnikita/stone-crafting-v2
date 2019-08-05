<template lang="pug">
    .common-container.gallery-container
            .video-section
                .video-wrapper
                    h1 {{ lang === 'ru' ? currentProduct.name : currentProduct.nameEng }}
                    .image(v-if="!currentProduct.video" :style="{backgroundImage: getBgImg(currentProduct.background)}")
                    video(v-if="currentProduct.video" loop="true" preload="auto" autoplay="true" muted="muted")
                        source(:src="getImg(currentProduct.video)" type="video/mp4")

            .description-wrapper
                .column
                    .photo(v-if="activePhoto")
                        .img(:style="{backgroundImage: getBgImg(activePhoto)}" @click="selectImg(activeIndex + 1)")
                        .arrow_left(@click="selectImg(activeIndex - 1)")
                        .arrow_right(@click="selectImg(activeIndex + 1)")
                    .slider
                        .photo_preview(v-for="(item, index) in currentProduct.imagesPreview"
                                        @click="selectImg(index)")
                            img(:src="getImg(item)" :class="{active: index === activeIndex}")
                .column
                    .text
                        h2(v-html="lang === 'ru' ? currentProduct.name : currentProduct.nameEng")
                        .line-sm
                        .description.text_default-white(v-html="lang === 'ru' ? currentProduct.description : currentProduct.descriptionEng")
                        .about.text_default-white(v-html="lang === 'ru' ? currentProduct.about : currentProduct.aboutEng")
            .photo_gallery


</template>

<script>
    import { mapState } from 'vuex'

    import Museum from '~/assets/staticData/museum.json'

    // if (process.browser) {
    //     window.onNuxtReady(() => {
    //         const smHousingPic = document.querySelector('.image-prepicture')
    //         if (smHousingPic) smHousingPic.classList.add('faded')
    //     })
    // }

    /**
     * Плавная загрузка изображений
     */
    export default {
        data() {
            return {
                products: Museum,
                activePhoto: '',
                activeIndex: 0
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
            },
        },
        methods: {
            getImg(url) {
                const imageUrl = require('~/assets/' + `${url}`)
                return url ? `${imageUrl}` : ''
            },
            getBgImg(url) {
                const imageUrl = require('~/assets/' + `${url}`)
                return url ? `url(${imageUrl})` : ''
            },
            getActivePhoto(index) {
                this.activeIndex = index
                return this.currentProduct.imagesFull[index]
            },
            selectImg(index) {
                if (index >= this.currentProduct.imagesFull.length) index = 0
                if (index < 0) index = this.currentProduct.imagesFull.length - 1
                this.activePhoto = this.getActivePhoto(index)
            },
        },
        components: {
        },
        mounted() {
            this.activePhoto = this.getActivePhoto(0)
        },
        created() {

        }
    }
</script>

<style lang="stylus">
    $sizeBig = 121px
    $sizeMin = 96px

    .gallery-container
        padding 0
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

                .image
                    width: 100%;
                    height: 100%;
                    background-position: center;
                    background-size: cover;
                    background-repeat: no-repeat;

                    /*&-prepicture
                        filter blur(7px)
                        background-repeat no-repeat
                        background-size cover
                        background-color blackRed
                        width 100%
                        height: 100%;
                        z-index 4
                        opacity 1
                        transition all 2s linear
                        overflow hidden
                        position absolute
                        top 0
                        left 0*/

                video
                    display block
                    position absolute
                    left 50%
                    top 50%
                    transform translate(-50%, -50%)
                    z-index 1

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
                .slider
                    display flex
                    flex-direction row
                    flex-wrap wrap
                    width 100%

                    .photo_preview
                        cursor pointer
                        padding 0 2px 2px 2px
                        img
                            min-width $sizeBig
                            max-width $sizeBig
                            min-height $sizeBig
                            max-height $sizeBig
                            &:hover
                                border 1px solid silverMain
                            &.active
                                border 1px solid silverMain

                .photo
                    height 600px
                    max-height 600px
                    box-shadow 0 0 12px -1px rgba(0,0,0,0.8)
                    border 1px solid black
                    margin-bottom 10px
                    position relative
                    &:hover
                        .arrow_left,
                        .arrow_right
                            background-color darkRed

                    .arrow_left,
                    .arrow_right
                        position absolute
                        top 0
                        bottom 0
                        width 10%
                        opacity 0
                        background-size: 20px;
                        background-position: center;
                        background-repeat: no-repeat;
                        cursor pointer

                    .arrow_left
                        background-image url('~assets/img/left-arrow.png')
                        left 0
                        &:hover
                            opacity 0.4
                    .arrow_right
                        background-image url('~assets/img/right-arrow.png')
                        right  0
                        &:hover
                            opacity 0.4

                    .img
                        background-size: cover;
                        background-position: center;
                        background-repeat: no-repeat;
                        width 100%
                        height 100%
                        cursor pointer
                .slider,
                .photo
                    max-width 500px
                .text
                    text-align left
                    h2
                        margin-bottom 15px
                        text-align left
                    .line-sm
                        width 100px
                        height 1px
                        margin-bottom 15px
                        background silverMain
                    .description
                        margin-bottom 15px


        @media only screen and (max-width 1441px)
            .description-wrapper
                .column
                    .slider
                        .photo_preview
                            img
                                min-width $sizeMin
                                max-width $sizeMin
                                min-height $sizeMin
                                max-height $sizeMin
                    .slider,
                    .photo
                        max-width 400px
                        max-height  450px



</style>
