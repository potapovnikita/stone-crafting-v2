<template lang="pug">
    client-only
        .articleSliderMb
            carousel(:paginationEnabled="false" :perPage="1" :loop="true" ref="articlesAbout")
                slide(v-for="(article, index) in currentArticles" :key="`arc_${index}`")
                    .articleSliderMb__article
                        .articleSliderMb__wrapper-pic
                            .articleSliderMb__pic(:style="{backgroundImage: getBgImg(article.background)}")

                        p.articleSliderMb__text
                            | {{article.name}}

                        .articleSliderMb__line

                        a(:href="getImgExternal(article.link)" target="_blank") {{ lang === 'ru' ? 'Подробнее' : 'More' }}

            .control-panel
                ButtonArrow(:onClick="prewSlide")
                ul.slider-pagination(v-if="pageCount > 0")
                    li(v-for="(item, index) in pageCount" :key="`dot_${index}`")
                        .box
                            .dot(:class="{'active': index === currentSlide}" @click="() => navigateTo(index)")
                ButtonArrow(:onClick="nextSlide" arrowRight)

</template>
<script>
import { mapState } from 'vuex'
import ButtonArrow from '@/components/ui/ButtonArrow'
import Company from '~/assets/staticData/company.json'
import {getImgExternal} from "@/plugins/getUrl";
export default {
    name: 'MobileArticleSlider',
    data() {
        return {
            currentArticles: [],
            articles: Company.company.articles,
            articlesEng: Company.company.articlesEng,
            currentSlide: 0,
            pageCount: 0,
        }
    },
    components: {
        ButtonArrow,
    },
    methods: {
        getBgImg(url) {
            const imageUrl = require('~/assets/' + `${url}`)
            return url ? `url(${imageUrl})` : ''
        },
        prewSlide() {
            this.currentSlide = this.$refs.articlesAbout.getPreviousPage()
            this.$refs.articlesAbout.goToPage(this.$refs.articlesAbout.getPreviousPage());
        },
        nextSlide() {
            this.currentSlide = this.$refs.articlesAbout.getNextPage()
            this.$refs.articlesAbout.goToPage(this.$refs.articlesAbout.getNextPage());
        },
        navigateTo(index) {
            this.currentSlide = index
            this.$refs.articlesAbout.goToPage(index)
        },
        getImgExternal(url) {
            return getImgExternal(url)
        },
        initPage() {
            this.currentArticles = this.lang === 'ru' ? this.articles : this.articlesEng;
            this.$nextTick(()=>{
                const prew = this.$refs.articlesAbout.getPreviousPage()
                const next = this.$refs.articlesAbout.getNextPage()
                this.pageCount = this.$refs.articlesAbout.pageCount
                if (next === 0 || next > prew) {
                    this.currentSlide = prew + 1
                    return
                }
                if (next < prew) {
                    this.currentSlide = next - 1
                    return
                }
            })
        },
    },
    computed: {
        ...mapState('localization', [
            'lang',
        ]),
    },
    watch: {
        lang(newVal) {
            this.initPage();
        },
    },
    mounted() {
        this.initPage();
    },
}
</script>
<style lang="stylus" scoped>
.articleSliderMb
    &__article
        max-width 350px
        text-align left

    &__wrapper-pic
        width 350px
        padding 4px
        margin-bottom 30px
        border 1px solid rgba(150, 120, 95, 0.3)

    &__pic
        width 340px
        height 261px
        background-position center
        background-repeat no-repeat
        background-size cover

    &__text
        margin-bottom 24px
        font-size 20px
        line-height 30px
        text-align left

    &__line
        width 38px
        height 1px
        margin-bottom 25px
        background-color goldNew

    a
        font-family $TenorSans-Regular
        font-weight normal
        font-size 18px
        line-height 150%
        letter-spacing 0.03em
        text-align left
        color goldNew

    .control-panel
        display flex
        align-items center
        justify-content center
        padding-top 26px

        .slider-pagination
            display flex
            justify-content center
            flex-wrap wrap
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
