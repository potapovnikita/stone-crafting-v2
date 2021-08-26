<template lang="pug">
.galleryPhotos
    .galleryPhotos__wrapper-slider
        ButtonArrow.galleryPhotos__buttons.left(:onClick="prewSlide")

        .galleryPhotos__slider-contaier
            client-only
                carousel(:paginationEnabled="false" :perPage="1" :loop="true" @pageChange="handlePageChange" ref="photoCarousel")
                    slide(v-for="(imgSrc, index) in imgSrcList" :key="`slide_${index}`")
                        .galleryPhotos__slide
                            img.galleryPhotos__photo(:src="getImg(imgSrc)" alt="img")

        ButtonArrow.galleryPhotos__buttons.right(:onClick="nextSlide" arrowRight)

    .galleryPhotos__info
        .galleryPhotos__buttons-mobile
            ButtonArrow(:onClick="prewSlide")
        span {{`${currentSlide} / ${imgSrcList.length}`}}
        .galleryPhotos__buttons-mobile
            ButtonArrow(:onClick="nextSlide" arrowRight)

</template>
<script>
import { getImgExternal } from '~/plugins/getUrl'
import ButtonArrow from '@/components/ui/ButtonArrow'
export default {
    name: 'GalleryPhotosSlider',
    components: {
        ButtonArrow
    },
    props: {
        imgSrcList: Array
    },
    data() {
        return {
            currentSlide: 1,
        }
    },
    methods: {
        getImg(url) {
            return getImgExternal(url)
        },
        prewSlide() {
            this.currentSlide = this.$refs.photoCarousel.getPreviousPage() + 1
            this.$refs.photoCarousel.goToPage(this.$refs.photoCarousel.getPreviousPage());
        },
        nextSlide() {
            this.currentSlide = this.$refs.photoCarousel.getNextPage() + 1
            this.$refs.photoCarousel.goToPage(this.$refs.photoCarousel.getNextPage());
        },
        handlePageChange(num) {
            this.currentSlide = num + 1
        },
    },
}
</script>
<style lang="stylus" scoped>
.galleryPhotos
    margin-bottom 109px

    &__wrapper-slider
        display flex
        justify-content space-between
        align-items center
        width 1082px
        height 1082px
        margin 0 auto 48px
        border 1px solid rgba(255, 255, 255, 0.07)
        border-radius 50%

    &__buttons
        position relative

        &.left
            right 30px

        &.right
            left 30px

    &__slider-contaier
        flex-basis 962px

    &__slide
        max-width 748px
        max-height 931px

    &__photo
        width 100%

    &__info
        font-family $TenorSans-Regular
        font-weight normal
        font-size 19px
        line-height 140%
        letter-spacing 0.03em
        color goldNew

    &__buttons-mobile
        display none

    @media only screen and (max-width 1440px)
        &__wrapper-slider
            width 802px
            height 802px
            margin 0 auto 48px

        &__slider-contaier
            flex-basis 540px

    @media only screen and (max-width 910px)
        &__buttons
            visibility hidden

        &__info
            display flex
            justify-content: space-around
            align-items: center

        &__buttons-mobile
            display block

    @media only screen and (max-width 850px)
        &__wrapper-slider
            width 600px
            height 600px
            margin 0 auto 48px

        &__slider-contaier
            flex-basis 470px

    @media only screen and (max-width 650px)
        &__wrapper-slider
            width 426px
            height 426px
            margin 0 auto 48px

        &__slider-contaier
            flex-basis 287px

    @media only screen and (max-width 450px)
        &__wrapper-slider
            width 350px
            height 350px
            margin 0 auto 48px

        &__slider-contaier
            flex-basis 268px

</style>
