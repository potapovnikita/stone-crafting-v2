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
        span {{`${currentSlide} / ${imgSrcList.length}`}}

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

</style>