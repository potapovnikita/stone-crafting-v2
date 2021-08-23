<template lang="pug">
    .histoyAbout
        h2.histoyAbout__title {{ lang === 'ru' ? 'История бренда' : 'Brand history' }}
        .histoyAbout__double-line
        .histoyAbout__slides-panel(v-if="history")
            client-only
                .slider
                    //.buttons-desktop.btn-left
                        ButtonArrow(:onClick="prewSlide")
                    //.buttons-desktop.btn-right
                        ButtonArrow(:onClick="nextSlide" arrowRight)

                    carousel(:paginationEnabled="false" :perPage="1" :loop="true" @pageChange="handlePageChange" ref="historyCarousel")
                        slide(v-for="(item, index) in history" :key="`$slide_${index}`")
                            .histoyAbout__container
                                .histoyAbout__content
                                    h3.histoyAbout__sub-title {{item.year}}
                                    p.histoyAbout__text(v-html="lang === 'ru' ? item.text : item.textEng")
                                .histoyAbout__media
                                    .histoyAbout__circle
                                    img.histoyAbout__photo(v-if="item.img && !item.video" :src="getImg(item.img)" :alt="item.year")
                                    video.histoyAbout__video(v-if="item.video && !item.img" preload="auto" controls autoplay muted playsinline)
                                        source(:src="getImg(item.video)" type="video/mp4" style="zIndex: '-1'")

                                    .histoyAbout__text-photo(v-if="item.textUnderPhoto")
                                        | {{ lang === 'ru' ? item.textUnderPhoto : item.textUnderPhotoEng }}
                    //.buttons-mobile
                        ButtonArrow(:onClick="prewSlide")
                        ButtonArrow(:onClick="nextSlide" arrowRight)

                .slider-pagination(v-if="pageCount")
                    ul.slider-pagination__list
                        li(v-for="(item, index) in history" :key="`$slide_${index}`")
                            .slider-pagination__box
                                .slider-pagination__label(v-if="item.pagination.showLabel") {{item.year}}
                                .slider-pagination__wrapper-dot(:class="item.pagination.class")
                                    .slider-pagination__dot(:class="{'active': index === currentSlide}" @click="() => navigateTo(index)")

                .slider-pagination-width1000
                    HistoryMobileSlider(:dotsCount="8" :currentDot="currentSlide" :slidesList="history" @mobilepaginationclick="navigateTo")

                .slider-pagination-mobile
                    HistoryMobileSlider(:dotsCount="4" :currentDot="currentSlide" :slidesList="history" @mobilepaginationclick="navigateTo")

</template>
<script>
import { mapState } from 'vuex'
import History from '~/assets/staticData/historyNew.json'
import { getImgExternal } from '~/plugins/getUrl'
import ButtonArrow from "@/components/ui/ButtonArrow"
import HistoryMobileSlider from '@/components/blocksComponents/HistoryMobileSlider'

export default {
    name: 'HistoryNew',
    components: {
        ButtonArrow,
        HistoryMobileSlider,
    },
    data() {
        return {
            history: History,
            currentSlide: 0,
            pageCount: 0,
        }
    },
    methods: {
        getImg(url) {
             return getImgExternal(url)
        },
        prewSlide() {
            this.currentSlide = this.$refs.historyCarousel.getPreviousPage()
            this.$refs.historyCarousel.goToPage(this.$refs.historyCarousel.getPreviousPage());
        },
        nextSlide() {
            this.currentSlide = this.$refs.historyCarousel.getNextPage()
            this.$refs.historyCarousel.goToPage(this.$refs.historyCarousel.getNextPage());
        },
        navigateTo(index) {
            this.currentSlide = index
            this.$refs.historyCarousel.goToPage(index)
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
    mounted() {
        this.$nextTick(() => {
            const prew = this.$refs.historyCarousel.getPreviousPage()
            const next = this.$refs.historyCarousel.getNextPage()
            this.pageCount = this.$refs.historyCarousel.pageCount
            if (next === 0 || next > prew) {
                this.currentSlide = prew + 1
                return
            }
            if (next < prew) {
                this.currentSlide = next - 1
                return
            }
        })
    }
}
</script>
<style lang="stylus" scoped>
.histoyAbout
    position relative

    .slider
        .btn-desktop
            display block

    .slider-pagination

        &__list
            display flex
            justify-content center
            padding 0
            list-style-type none

            & > li:first-child
                .slider-pagination__label
                    left 9px

        &__box
            display flex
            align-items flex-end
            position relative
            height 52px

        &__label
            position absolute
            top 0
            left -17px
            font-family $TenorSans-Regular
            font-weight normal
            font-size 20px
            line-height 150%
            text-align center
            letter-spacing 0.03em
            color rgba(255, 255, 255, 0.36)

        &__wrapper-dot
            text-align left

            &.dot-1968
                width 112px
                padding-left 23px
                background url('~assets/img/history/desktopLines/line-1968.png') center no-repeat

            &.dot-1988
                width 97px
                background url('~assets/img/history/desktopLines/line-1988.png') 19px center no-repeat

            &.dot-1991
                width 91px
                background url('~assets/img/history/desktopLines/line-1991.png') 21px center no-repeat

            &.dot-1992
                width 90px
                background url('~assets/img/history/desktopLines/line-1992.png') 18px center no-repeat

            &.dot-1996
                width 98px
                background url('~assets/img/history/desktopLines/line-1996.png') 20px center no-repeat

            &.dot-2000
                width 99px
                background url('~assets/img/history/desktopLines/line-2000.png') 19px center no-repeat

            &.dot-2006
                width 100px
                background url('~assets/img/history/desktopLines/line-2006.png') 27px center no-repeat

            &.dot-2007
                width 51px
                background url('~assets/img/history/desktopLines/line-2007.png') 25px center no-repeat

            &.dot-2007_2
                width 47px
                background url('~assets/img/history/desktopLines/line-2007_2.png') 20px center no-repeat

            &.dot-2010
                width 96px
                background url('~assets/img/history/desktopLines/line-2010.png') 23px center no-repeat

            &.dot-2016
                width 91px
                background url('~assets/img/history/desktopLines/line-2010.png') 22px center no-repeat

            &.dot-2017
                width 44px
                background url('~assets/img/history/desktopLines/line-2017.png') 22px center no-repeat

            &.dot-2017_2
                width 47px
                background url('~assets/img/history/desktopLines/line-2017_2.png') 21px center no-repeat

            &.dot-2018
                width 48px
                background url('~assets/img/history/desktopLines/line-2018.png') 21px center no-repeat

            &.dot-2018_2
                width 48px
                background url('~assets/img/history/desktopLines/line-2018_2.png') 20px center no-repeat

            &.dot-2019
                width 91px
                background url('~assets/img/history/desktopLines/line-2019.png') 23px center no-repeat

            &.dot-2020
                width 70px
                background url('~assets/img/history/desktopLines/line-2020.png') 23px center no-repeat

        &__dot
            width 12px
            height 12px
            border 1px solid #616D76
            border-radius 50%
            cursor pointer

            &.active
                background goldNew

    .slider-pagination-width1000
        display none

    .slider-pagination-mobile
        display none

    &__title
        margin-bottom 18px

    &__double-line
        width 100px
        height 4px
        margin-bottom 19px
        border 1px solid goldNew
        border-left none
        border-right none

    &__slides-panel
        position relative
        margin 19px 40px 90px

        .slider
            padding 0 90px

        .buttons-desktop
            position absolute
            top 0
            display flex
            align-items center
            width 60px
            height 100%

            &.btn-left
                left 0

            &.btn-right
                right 0

        .buttons-mobile
            display none

    &__container
        display flex
        flex-direction row
        align-items center
        justify-content space-between
        max-width 1100px

    &__content
        flex-shrink 2
        max-width 533px
        text-align left

    &__text-photo
        flex-shrink 2
        max-width 533px
        width: 385px
        text-align left
        padding-top 20px
        padding-bottom 25px
        font-style italic


    &__sub-title
        margin-bottom 21px
        font-size 40px
        line-height 150%
        color rgba(255, 255, 255, 0.36)

    &__text
        text-align left

    &__media
        display flex
        justify-content center
        align-items center
        flex-shrink 0
        position relative
        width 430px
        height 430px
        flex-direction column

    &__circle
        position absolute
        top 0
        width 100%
        height 100%
        border 1px solid rgba(255, 255, 255, 0.07)
        border-radius 50%

    &__photo,
    &__video,
    &__carouselPhoto
        position relative
        width 400px
        min-height 286px

    @media only screen and (max-width 1280px)
        &__title
            margin-bottom 28px

        &__double-line
            margin-bottom 0

        &__slides-panel
            margin 0 20px 50px

            .slider
                padding 0

            .buttons-desktop
                display none

            .buttons-mobile
                display flex
                justify-content space-between
                padding 45px 0 18px

            .slider-pagination

                &__list

                    & > li:first-child
                        .slider-pagination__label
                            left 7px

                &__box
                    height 37px

                &__label
                    left -10px
                    font-size 14px

                &__wrapper-dot
                    &.dot-1968
                        width 82px
                        padding-left 18px
                        background url('~assets/img/history/ipadLines/line-1968.png') center no-repeat

                    &.dot-1988
                        width 68px
                        background url('~assets/img/history/ipadLines/line-1988.png') 14px center no-repeat

                    &.dot-1991
                        width 66px
                        background url('~assets/img/history/ipadLines/line-1991.png') 15px center no-repeat

                    &.dot-1992
                        width 65px
                        background url('~assets/img/history/ipadLines/line-1992.png') 13px center no-repeat

                    &.dot-1996
                        width 71px
                        background url('~assets/img/history/ipadLines/line-1996.png') 14px center no-repeat

                    &.dot-2000
                        width 72px
                        background url('~assets/img/history/ipadLines/line-2000.png') 14px center no-repeat

                    &.dot-2006
                        width 73px
                        background url('~assets/img/history/ipadLines/line-2006.png') 19px center no-repeat

                    &.dot-2007
                        width 37px
                        background url('~assets/img/history/ipadLines/line-2007.png') 18px center no-repeat

                    &.dot-2007_2
                        width 34px
                        background url('~assets/img/history/ipadLines/line-2007_2.png') 14px center no-repeat

                    &.dot-2010
                        width 70px
                        background url('~assets/img/history/ipadLines/line-2010.png') 17px center no-repeat

                    &.dot-2016
                        width 66px
                        background url('~assets/img/history/ipadLines/line-2010.png') 16px center no-repeat

                    &.dot-2017
                        width 32px
                        background url('~assets/img/history/ipadLines/line-2017.png') 16px center no-repeat

                    &.dot-2017_2
                        width 34px
                        background url('~assets/img/history/ipadLines/line-2017_2.png') 15px center no-repeat

                    &.dot-2018
                        width 35px
                        background url('~assets/img/history/ipadLines/line-2018.png') 15px center no-repeat

                    &.dot-2018_2
                        width 35px
                        background url('~assets/img/history/ipadLines/line-2018_2.png') 14px center no-repeat

                    &.dot-2019
                        width 66px
                        background url('~assets/img/history/ipadLines/line-2019.png') 17px center no-repeat

                    &.dot-2020
                        width 52px
                        background url('~assets/img/history/ipadLines/line-2020.png') 17px center no-repeat

                &__dot
                    width 9px
                    height 9px

            &.active
                background goldNew

        &__container
            max-width unset
            flex-basis 965px

        &__content
            max-width 468px

        &__sub-title
            font-size 34px
            line-height 51px

        &__text
            font-size 18px
            line-height 24px

    @media only screen and (max-width 1000px)
        &__slides-panel
            .slider
                .buttons-mobile
                    display none

            .slider-pagination
                display none

            .slider-pagination-width1000
                display block
                width 701px
                overflow hidden

    @media only screen and (max-width 767px)
        &__slides-panel
            .slider
                display block

                .buttons-mobile
                    display none

            .slider-pagination-width1000
                display none

            .slider-pagination-mobile
                display block
                margin-left -10px

        &__double-line
            width 50px
            margin-bottom 6px

        &__container
            flex-direction column-reverse

        &__content
            max-width 350px

        &__sub-title
            margin-bottom 5px
            font-size 30px
            line-height 45px

        &__media
            width 100%
            height 322px

        &__circle
            width 322px
            height 322px

        &__photo,
        &__video
            width 350px
            height auto

    @media only screen and (max-width 380px)
        &__content
            max-width unset

        &__photo,
        &__video
            width 100%
            height auto

</style>
