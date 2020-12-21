<template lang="pug">
    .common-container.gallery-container
        .header-container
            .header-container__title-container
                .header-container__circle
                h1.header-container__title {{ lang === 'ru' ? currentProduct.name : currentProduct.nameEng }}
                .header-container__line
                p.header-container__sub-title(v-if="currentProduct.creation") {{ lang === 'ru' ? currentProduct.creation.title : currentProduct.creation.titleEng }}

        .galleryAbout-block
            .galleryAbout-block__media
                img.galleryAbout-block__photo(src="~/assets/img/news/torero-prev.png" alt="img")
            .galleryAbout-block__info
                .galleryAbout-block__content
                    h2.galleryAbout-block__title {{ lang === 'ru' ? currentProduct.name : currentProduct.nameEng }}
                    .galleryAbout-block__double-line
                    p.galleryAbout-block__text(v-html="lang === 'ru' ? currentProduct.description : currentProduct.descriptionEng")

        GalleryPhotosSlider(v-if="currentProduct.imagesPreview" :imgSrcList="currentProduct.imagesPreview")

        ToreroMap

        ToreroShow

        Footer

</template>
<script>
import { mapState } from 'vuex'
import ButtonArrow from '@/components/ui/ButtonArrow'
import GalleryPhotosSlider from '@/components/blocksComponents/GalleryPhotosSlider'
import ToreroMap from '@/components/pagesComponents/ToreroMap'
import ToreroShow from '@/components/pagesComponents/ToreroShow'
import Footer from '~/components/FooterNew.vue'
import Torero from '~/assets/staticData/models/torero.json'
import JokerNew from '~/assets/staticData/models/jokerNew.json'
import Makedon from '~/assets/staticData/models/makedon.json'
export default {
    name: 'GalleryNew',
    components: {
        GalleryPhotosSlider,
        ToreroMap,
        ToreroShow,
        Footer,
    },
    data() {
        return {
            models: {
                torero: Torero,
                jokerNew: JokerNew,
                makedon: Makedon,                
            },
        }
    },
    computed: {
        ...mapState('localization', [
            'lang',
        ]),
        currentProduct() {
            // по id изделия из url находим нужное изделие
            return this.models[this.$route.path.split('/').pop()]
        },
    },
}
</script>
<style lang="stylus" scoped>
.gallery-container
    .header-container
        height 683px
        background url('~assets/img/news/header-main.png') top center no-repeat
        background-size cover

        &__title-container
            position relative
            height 446px
            margin-top 136px
            padding-top 101px

        &__circle
            position absolute
            top 0
            left 0
            right 0
            margin 0 auto
            width 446px
            height 100%
            border 1px solid rgba(255, 255, 255, 0.07)
            border-radius 50%

        &__title
            font-size 68px
            line-height 95px
            margin-bottom 58px

        &__line
            position relative
            width 53px
            height 1px
            margin 0 auto 41px
            background goldNew

        &__sub-title
            font-size 19px
            line-height 27px
            letter-spacing 0.3em
            text-transform uppercase
            color goldNew

    .galleryAbout-block
        display flex
        justify-content space-around
        padding 130px 0

        &__media
            flex-basis 798px

        &__photo
            width 100%

        &__info
            flex-basis 718px
            flex-shrink 2
            text-align left

        &__content
            max-width 575px

        &__title
            margin-bottom 52px
            line-height 130%
            text-align left

        &__double-line
            width 100px
            height 4px
            margin-bottom 52px
            border 1px solid goldNew
            border-left none
            border-right none

        &__text
            text-align left

    @media only screen and (max-width 1680px)
        .galleryAbout-block
            justify-content space-between
            padding 130px 42px

            &__content
                padding-left 42px

</style>