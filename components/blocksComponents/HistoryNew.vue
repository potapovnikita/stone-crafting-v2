<template lang="pug">
    .histoyAbout
        h2.histoyAbout__title {{ lang === 'ru' ? 'История бренда' : 'Brand history' }}
        .histoyAbout__double-line
        .histoyAbout__slides-panel(v-if="history")
            client-only
                .slider
                    .buttons-desktop.btn-left
                        ButtonArrow(:onClick="prewSlide")
                    .buttons-desktop.btn-right
                        ButtonArrow(:onClick="nextSlide" arrowRight)

                    carousel(:paginationEnabled="false" :perPage="1" :loop="true" ref="historyCarousel")
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

                    .buttons-mobile
                        ButtonArrow(:onClick="prewSlide")
                        ButtonArrow(:onClick="nextSlide" arrowRight)

                .slider-pagination(v-if="pageCount")
                    ul.slider-pagination__list
                        li(v-for="(item, index) in history" :key="`$slide_${index}`")
                            .slider-pagination__box
                                .slider-pagination__label {{item.year}}
                                .slider-pagination__dot(:class="{'active': index === currentSlide}" @click="() => navigateTo(index)")

</template>
<script>
import { mapState } from 'vuex'
import History from '~/assets/staticData/historyNew.json'
import { getImgLocal } from '~/plugins/getUrl'
import ButtonArrow from "@/components/ui/ButtonArrow"

export default {
    name: 'HistoryNew',
    components: {
        ButtonArrow,
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
            return getImgLocal(url)
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
        }
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
    .slider
        .btn-desktop
            display block

    .slider-pagination

        &__list
            display flex
            justify-content center
            padding 0
            list-style-type none

        &__box
            display block

        &__label
            margin-bottom 8px
            font-family $TenorSans-Regular
            font-weight normal
            font-size 20px
            line-height 150%
            text-align center
            letter-spacing 0.03em
            color rgba(255, 255, 255, 0.36)

        &__dot
            width 12px
            height 12px
            border 1px solid #616D76
            border-radius 50%
            cursor pointer

            &.active
                background goldNew


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
        width 385px
        min-height 286px

    @media only screen and (max-width 1280px)
        &__title
            margin-bottom 28px

        &__double-line
            margin-bottom 0

        &__slides-panel
            margin 0 0 50px

            .slider
                padding 0

            .buttons-desktop
                display none

            .buttons-mobile
                display flex
                justify-content space-between
                padding 45px 0 18px

        &__container
            max-width unset

        &__content
            max-width 468px
        
        &__sub-title
            font-size 34px
            line-height 51px

        &__text
            font-size 18px
            line-height 24px

    @media only screen and (max-width 767px)
        &__slides-panel
            margin 0 0 50px
            .slider
                display block

                .btn-desktop
                    display none

        &__double-line
            width 50px

        &__container
            flex-direction column-reverse

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
            width 100%
            height auto
</style>