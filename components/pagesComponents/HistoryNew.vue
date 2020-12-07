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

                    carousel(:paginationEnabled="false" :perPage="1" paginationActiveColor="#b0a74a" :loop="true" ref="historyCarousel")
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
        }
    },
    methods: {
        getImg(url) {
            return getImgLocal(url)
        },
        prewSlide() {
            this.$refs.historyCarousel.goToPage(this.$refs.historyCarousel.getPreviousPage());
        },
        nextSlide() {
            this.$refs.historyCarousel.goToPage(this.$refs.historyCarousel.getNextPage());
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
.histoyAbout
    .slider
        po

        .btn-desktop
            display block

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

    &__container
        display flex
        flex-direction row
        align-items center
        justify-content space-between
        max-width 1100px

    &__content
        text-align left
    
    &__sub-title
        margin-bottom 21px
        font-size 40px
        line-height 60px
        color rgba(255, 255, 255, 0.36)

    &__text
        flex-shrink 2
        max-width 533px
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
    carouselPhoto
        position relative
        width 385px
        min-height 286px

    @media only screen and (max-width 767px)
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