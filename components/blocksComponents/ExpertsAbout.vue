<template lang="pug">
    .expertsAbout
        .wrapper
            .circle.mobile-hide
                .wrapper__btn.left
                    ButtonArrow(:onClick="prewSlide")
                .wrapper__btn.right
                    ButtonArrow(:onClick="nextSlide" arrowRight)

            h2.title {{ lang === 'ru' ? 'Эксперты о нас' : 'Experts about us' }}
            client-only
                carousel(:paginationEnabled="false" :perPage="1" :loop="true" ref="expertsCarousel")
                    slide
                        img.photo(src="~/assets/img/about/experts/skurlov.png" alt="skurlov")
                        h3.name(v-html="lang === 'ru' ? company.aboutTitleRu5 : company.aboutTitleEng5")
                        p.text(v-html="lang === 'ru' ? company.aboutRu5 : company.aboutEng5")

                    slide
                        img.photo(src="~/assets/img/about/experts/faberge.png" alt="faberge")
                        h3.name(v-html="lang === 'ru' ? company.aboutTitleRu6 : company.aboutTitleEng6")
                        p.text(v-html="lang === 'ru' ? company.aboutRu6 : company.aboutEng6")

                    slide
                        img.photo(src="~/assets/img/about/experts/eltsina.png" alt="eltsina")
                        h3.name(v-html="lang === 'ru' ? company.aboutTitleRu7 : company.aboutTitleEng7")
                        p.text(v-html="lang === 'ru' ? company.aboutRu7 : company.aboutEng7")

                .control-panel.desktop-hide
                    ButtonArrow(:onClick="prewSlide")
                    ul.slider-pagination(v-if="pageCount > 0")
                        li(v-for="(item, index) in pageCount" :key="`dot_${index}`")
                            .box
                                .dot(:class="{'active': index === currentSlide}" @click="() => navigateTo(index)")
                    ButtonArrow(:onClick="nextSlide" arrowRight)
    
</template>
<script>
import { mapState } from 'vuex'
import Company from '~/assets/staticData/company.json'
import ButtonArrow from '@/components/ui/ButtonArrow'
export default {
    name: 'ExpertsAbout',
    components: {
        ButtonArrow
    },
    data() {
        return {
            company: Company.company,
            currentSlide: 0,
            pageCount: 0,
        }
    },
    methods: {
        prewSlide() {
            this.currentSlide = this.$refs.expertsCarousel.getPreviousPage()
            this.$refs.expertsCarousel.goToPage(this.$refs.expertsCarousel.getPreviousPage());
        },
        nextSlide() {
            this.currentSlide = this.$refs.expertsCarousel.getNextPage()
            this.$refs.expertsCarousel.goToPage(this.$refs.expertsCarousel.getNextPage());
        },
        navigateTo(index) {
            this.currentSlide = index
            this.$refs.expertsCarousel.goToPage(index)
        }
    },
    computed: {
        ...mapState('localization', [
            'lang',
        ]),
    },
    mounted() {
        this.$nextTick(() => {
            const prew = this.$refs.expertsCarousel.getPreviousPage()
            const next = this.$refs.expertsCarousel.getNextPage()
            this.pageCount = this.$refs.expertsCarousel.pageCount
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
.expertsAbout
    .wrapper
        position relative
        padding-top 90px
        padding-bottom 84px

    .circle
        display flex
        justify-content space-between
        align-items center
        position absolute
        top 0
        left 0
        right 0
        margin 0 auto
        width 820px
        height 820px
        border 1px solid rgba(255, 255, 255, 0.07)
        border-radius 50%

    .wrapper__btn
        position relative
        z-index 1

        &.left
            right 30px

        &.right
            left 30px

    .title
        line-height 150%
        margin-bottom 43px

    .photo
        width 344px
        height 344px
        padding 22px
        margin-bottom 36px
        border 1px solid rgba(255, 255, 255, 0.08)
        border-radius 50%

    .name
        margin-bottom 27px
        font-size 26px
        line-height 150%

    .text
        max-width 1130px
        font-size 16px
        line-height 150%

    .control-panel

        &.desktop-hide
            display none

    @media only screen and (max-width 1280px)
        .title
            margin-bottom 55px

        .text
            max-width 974px

    @media only screen and (max-width 1000px)
        .wrapper
            padding 0
            margin 40px 10px 60px

        .circle
            &.mobile-hide
                display none

        .title
            margin-bottom 15px
            font-size 22px
            line-height 29px

        .name
            margin-bottom 33px
            font-size 20px

        .text
            max-width unset
            font-size 14px

        .control-panel

            &.desktop-hide
                display flex
                align-items center
                justify-content center
                padding-top 26px

            .slider-pagination
                display flex
                justify-content center
                padding 0 20px
                list-style-type none

                & li
                    margin-right 8px

                    &.li:last-child
                        margin 0

                .box
                    display flex
                    align-items center
                    justify-content center
                    flex-shrink 0
                    width 16px
                    height 16px

                    .dot
                        width 8px
                        height 8px
                        border 1px solid rgba(143, 143, 143, 0.3)
                        border-radius 50%
                        cursor pointer

                        &.active
                            width 12px
                            height 12px
                            border 1px solid #96785F

</style>