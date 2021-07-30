<template lang="pug">
    .orderModel
        .orderModel__container
            .orderModel__block-text.orderModel__block-text--left.mobile-hide
                h3.orderModel__title {{ lang === 'ru' ? orderItem.features.title : orderItem.features.titleEng }}
                p.orderModel__text(v-html="lang === 'ru' ? orderItem.features.text : orderItem.features.textEng")
            .orderModel__block-media
                .orderModel__wrapper-circle
                    .orderModel__slider-buttons-desktop.btn-left(v-if="orderItem.photos.length > 1")
                        ButtonArrow(:onClick="prewSlide")
                    .orderModel__slider-buttons-desktop.btn-right(v-if="orderItem.photos.length > 1")
                        ButtonArrow(:onClick="nextSlide" arrowRight)

                    client-only
                        carousel(:paginationEnabled="false" :perPage="1" :loop="true" @pageChange="handlePageChange" ref="orderModelCarousel")
                            slide(v-for="(photo, index) in orderItem.photos" :key="`img_${index}`")
                                .orderModel__media-container
                                    img.orderModel__photo(:src="getImg(photo)" alt="modelImg")

                    .orderModel__circle
            .orderModel__control-mobile(v-if="orderItem.photos.length > 1")
                    ButtonArrow(:onClick="prewSlide")
                    .orderModel__slider-dots
                        ul.orderModel__list
                            li(v-for="(photo, index) in orderItem.photos" :key="`dot_${index}`")
                                .orderModel__slider-dot(:class="{'active': index === currentSlide}" @click="() => navigateTo(index)")
                    ButtonArrow(:onClick="nextSlide" arrowRight)
            .orderModel__block-text.orderModel__block-text--right.mobile-hide
                h3.orderModel__title {{ lang === 'ru' ? orderItem.history.title : orderItem.history.titleEng }}
                p.orderModel__text(v-html="lang === 'ru' ? orderItem.history.text : orderItem.history.textEng")
            .orderModel__block-text-mobile
                .orderModel__text-mobile
                    h3.orderModel__title {{ lang === 'ru' ? orderItem.features.title : orderItem.features.titleEng }}
                    p.orderModel__text(v-html="lang === 'ru' ? orderItem.features.text : orderItem.features.textEng")
                .orderModel__text-mobile
                    h3.orderModel__title {{ lang === 'ru' ? orderItem.history.title : orderItem.history.titleEng }}
                    p.orderModel__text(v-html="lang === 'ru' ? orderItem.history.text : orderItem.history.textEng")

        .orderModel__container
            p.orderModel__text(v-if="orderItem.simpleText.text" v-html="lang === 'ru' ? orderItem.simpleText.text : orderItem.simpleText.textEng")

</template>
<script>
import { mapState } from 'vuex'
import { getImgLocal } from '~/plugins/getUrl'
import ButtonArrow from "@/components/ui/ButtonArrow"
export default {
    name: 'OrderModel',
    components: {
        ButtonArrow,
    },
    props: {
        orderItem: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            currentSlide: 0,
            pageCount: 0,
        }
    },
    methods: {
            getImg(url) {
                return getImgLocal(url)
            },
            prewSlide() {
                this.currentSlide = this.$refs.orderModelCarousel.getPreviousPage()
                this.$refs.orderModelCarousel.goToPage(this.$refs.orderModelCarousel.getPreviousPage());
            },
            nextSlide() {
                this.currentSlide = this.$refs.orderModelCarousel.getNextPage()
                this.$refs.orderModelCarousel.goToPage(this.$refs.orderModelCarousel.getNextPage());
            },
            navigateTo(index) {
                this.currentSlide = index
                this.$refs.orderModelCarousel.goToPage(index)
            },
            handlePageChange(num) {
                this.currentSlide = num
            },
        },
    computed: {
        ...mapState('localization', [
            'lang',
        ]),
    },
}
</script>
<style lang="stylus" scoped>
.orderModel
    display block

    &__container
        display flex
        justify-content space-between
        max-width 1680px
        padding 90px 40px 10px

    &__block-text
        display block
        min-width 280px
        margin-top 109px

        &--left
            max-width 339px

        &--right
            max-width 346px

        &--center
            padding-bottom 45px

    &__block-media
        display block
        max-width 664px

    &__media-container
        display block
        height 718px

    &__photo
        width auto
        max-width 586px
        height 100%

    &__title
        margin-bottom 29px
        font-size 26px
        line-height 150%
        text-align left

    &__text
        text-align left

    &__wrapper-circle
        display block
        position relative

    &__slider-buttons-desktop
        position absolute
        top 0
        display flex
        align-items center
        width 60px
        height 100%
        z-index 1

        &.btn-left
            left -30px

        &.btn-right
            right -30px

    &__circle
        position absolute
        top 32px
        width 664px
        height 664px
        border 1px solid rgba(255, 255, 255, 0.07)
        border-radius 50%
        z-index 0

    &__control-mobile
        display none

    &__block-text-mobile
        display none

    @media only screen and (max-width 1590px)
        &__block-text
            flex-basis 280px

    @media only screen and (max-width 1440px)
        &__container
            display block

        &__block-text
            &--left,
            &--right
                &.mobile-hide
                    display none

        &__block-text-mobile
            display flex
            justify-content space-between
            position relative
            bottom 180px

        &__text-mobile
            flex-basis 340px
            flex-shrink 2

    @media only screen and (max-width 1380px)

        &__block-text-mobile
            bottom 90px

        &__text-mobile
            flex-basis 297px

        &__title
            margin-bottom 15px
            font-size 22px
            line-height 150%
            text-align left


    @media only screen and (max-width 1024px)

        &__container
            display block
            padding 63px 27px 0 27px

        &__media-container
            height 661px

        &__slider-buttons-desktop
            top 52px

        &__circle
            top 52px

        &__photo
            max-width 500px
            height 100%

    @media only screen and (max-width 990px)

        &__block-text-mobile
            margin-top 25px
            bottom 0

        &__text-mobile
            flex-basis 380px

    @media only screen and (max-width 890px)

        &__text-mobile
            flex-basis 300px

    @media only screen and (max-width 767px)

        &__container
            padding 35px 11px 45px

        &__block-text-mobile
            display block
            position static

            & > div + div
                margin-top 45px

        &__title
            margin-bottom 20px

        &__block-media
            max-width unset
            height 430px
            margin-bottom 18px

        &__wrapper-circle
            width 352px
            height 352px

        &__circle
            top 25px
            width 352px
            height 352px

        &__slider-buttons-desktop
            display none

        &__media-container
            height 430px

        &__photo
            max-width 350px
            height 100%

        &__control-mobile
            display flex
            align-items center
            justify-content center

        &__list
            display flex
            flex-wrap wrap
            align-items center
            padding 0
            margin 0 25px
            list-style-type none

            & > li + li
                margin-left 15px


        &__slider-dot
            flex-shrink 0
            width 8px
            height 8px
            border 1px solid rgba(143, 143, 143, 0.3)
            border-radius 50%
            cursor pointer

            &.active
                width 12px
                height 12px

</style>
