<template lang="pug">
    .common-container.gallery-container
        .bg-bottom
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

        ModelMap(v-if="currentProduct.modelMap" :toreroMap="currentProduct.modelMap")

        .gallerySmi-block(v-if="currentProduct.media")
            h2.gallerySmi-block__title
                | СМИ о тореадоре

            .gallerySmi-block__double-line

            UnitNews(:mediaList="currentProduct.media")

        ToreroShow(:showData="currentProduct.showBlock")

        Footer

</template>
<script>
import { mapState } from 'vuex'
import ButtonArrow from '@/components/ui/ButtonArrow'
import GalleryPhotosSlider from '@/components/blocksComponents/GalleryPhotosSlider'
import UnitNews from '@/components/blocksComponents/UnitNews'
import ModelMap from '@/components/blocksComponents/ModelMap'
import ToreroShow from '@/components/blocksComponents/ToreroShow'
import Footer from '~/components/FooterNew.vue'
import Torero from '~/assets/staticData/models/torero.json'
import JokerNew from '~/assets/staticData/models/jokerNew.json'
import Makedon from '~/assets/staticData/models/makedon.json'
import Genghiskhan from '~/assets/staticData/models/genghiskhan.json'
import Tamerlan from '~/assets/staticData/models/tamerlan.json'
import Schemamonk from '~/assets/staticData/models/schemamonk.json'
import Watery from '~/assets/staticData/models/watery.json'
import Dvorovoy from '~/assets/staticData/models/dvorovoy.json'
import Goldfish from '~/assets/staticData/models/goldfish.json'
import Koschei from '~/assets/staticData/models/koschei.json'
import PussBoots from '~/assets/staticData/models/pussBoots.json'
import Ovinnik from '~/assets/staticData/models/ovinnik.json'
import Bannik from '~/assets/staticData/models/bannik.json'
import Lesovichek from '~/assets/staticData/models/lesovichek.json'
import Rusalka from '~/assets/staticData/models/rusalka.json'
import Snowqueen from '~/assets/staticData/models/snowqueen.json'
import Lebed from '~/assets/staticData/models/lebed.json'
import Suvorov from '~/assets/staticData/models/suvorov.json'
import Scarlet from '~/assets/staticData/models/scarlet.json'
import Babayaga from '~/assets/staticData/models/babayaga.json'
import Kikimora from '~/assets/staticData/models/kikimora.json'
export default {
    name: 'GalleryNew',
    components: {
        GalleryPhotosSlider,
        ModelMap,
        UnitNews,
        ToreroShow,
        Footer,
    },
    data() {
        return {
            models: {
                torero: Torero,
                jokerNew: JokerNew,
                makedon: Makedon,
                genghiskhan: Genghiskhan,
                tamerlan: Tamerlan,
                schemamonk: Schemamonk,
                watery: Watery,
                dvorovoy: Dvorovoy,
                goldfish: Goldfish,
                koschei: Koschei,
                pussBoots: PussBoots,
                ovinnik: Ovinnik,
                bannik: Bannik,
                lesovichek: Lesovichek,
                rusalka: Rusalka,
                snowqueen: Snowqueen,
                lebed: Lebed,
                suvorov: Suvorov,
                scarlet: Scarlet,
                babayaga: Babayaga,
                kikimora: Kikimora,
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
    position relative

    .bg-bottom
        display none

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
            line-height 140%
            margin-bottom 58px

        &__line
            position relative
            width 53px
            height 1px
            margin 0 auto 41px
            background goldNew

        &__sub-title
            font-size 19px
            line-height 140%
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
            line-height 150%
            text-align left

    .gallerySmi-block
        position relative
        padding 110px 20px
        background url('~assets/img/GalleryNew/unit-news-bg.png') no-repeat
        background-size cover

        &__title
            margin-bottom 52px
            line-height 130%

        &__double-line
            width 100px
            height 4px
            border 1px solid goldNew
            border-left none
            border-right none

    
    @media only screen and (max-width 1680px)
        .galleryAbout-block
            justify-content space-between
            padding 130px 42px

            &__content
                padding-left 42px

    @media only screen and (max-width 1280px)
        .header-container
            height 583px

            &__title-container
                position relative
                height 446px
                margin-top 97px
                padding-top 131px

            &__title
                font-size 48px
                margin-bottom 16px

        .galleryAbout-block
            justify-content center
            padding 60px 0

            &__media
                flex-basis 448px

            &__info
                flex-basis 524px

            &__content
                max-width 524px
                padding-left 38px

            &__title
                margin-bottom 41px
                font-size 32px

            &__double-line
                margin-bottom 36px

            &__text
                font-size 16px

        .gallerySmi-block
            padding 67px 20px

            &__title
                margin-bottom 38px

    @media only screen and (max-width 1023px)
        .galleryAbout-block
            padding 40px 0

            &__media
                flex-basis 350px

            &__info
                flex-basis 380px

            &__content
                max-width 380px
                padding-left 15px

            &__title
                margin-bottom 30px
                font-size 27px

            &__double-line
                margin-bottom 25px

            &__text
                font-size 15px

    @media only screen and (max-width 767px)
        .header-container
            height 476px

            &__title-container
                position relative
                height 311px
                margin-top 104px
                padding-top 94px

            &__circle
                width 311px

            &__title
                font-size 28px
                margin-bottom 66px

            &__line
                width 39px
                margin 0 auto 30px

            &__sub-title
                font-size 13px

        .galleryAbout-block
            display block
            max-width 450px
            margin 0 auto
            padding 28px 0

            &__media
                flex-basis unset
                margin-bottom 25px

            &__info
                flex-basis unset

            &__content
                max-width unset
                padding-left 0

            &__title
                margin-bottom 24px
                font-size 22px

            &__double-line
                width 50px
                margin-bottom 31px

            &__text
                font-size 14px

        .gallerySmi-block
            padding 45px 10px 42px
            background-size 100% 50%
            background-position bottom

            &__title
                margin-bottom 24px
                font-size 22px

            &__double-line
                width 50px

        .bg-bottom
            display block
            position absolute
            left 0
            right 0
            bottom 0
            width 100%
            height 563px
            background url('~assets/img/collections/bg-m.png') no-repeat
            background-size cover

    @media only screen and (max-width 490px)
        .galleryAbout-block
            max-width unset
            margin 0
            padding 28px 10px

</style>