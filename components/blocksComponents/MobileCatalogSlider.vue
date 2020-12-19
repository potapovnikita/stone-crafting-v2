<template lang="pug">
    client-only
        .catalogSliderMb
            carousel(:paginationEnabled="false" :perPage="1" :loop="true" ref="catalogsAbout")
                slide(v-for="(catalog, index) in catalogs" :key="`cat_${index}`")
                    .catalogSliderMb__catalog
                        .catalogSliderMb__wrapper-pic
                            .catalogSliderMb__pic(:style="{backgroundImage: getBgImg(catalog.background)}")

                        a(:href="catalog.link" target="_blank")
                            p.catalogSliderMb__text {{ lang === 'ru' ? catalog.name : catalog.nameEng }}

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
export default {
    name: 'MobileArticleSlider',
    data() {
        return {
            catalogs: Company.company.catalogs,
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
            this.currentSlide = this.$refs.catalogsAbout.getPreviousPage()
            this.$refs.catalogsAbout.goToPage(this.$refs.catalogsAbout.getPreviousPage());
        },
        nextSlide() {
            this.currentSlide = this.$refs.catalogsAbout.getNextPage()
            this.$refs.catalogsAbout.goToPage(this.$refs.catalogsAbout.getNextPage());
        },
        navigateTo(index) {
            this.currentSlide = index
            this.$refs.catalogsAbout.goToPage(index)
        },
    },
    computed: {
        ...mapState('localization', [
            'lang',
        ]),
    },
    mounted() {
        this.$nextTick(()=>{
            const prew = this.$refs.catalogsAbout.getPreviousPage()
            const next = this.$refs.catalogsAbout.getNextPage()
            this.pageCount = this.$refs.catalogsAbout.pageCount
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
}
</script>
<style lang="stylus" scoped>
.catalogSliderMb
    &__catalog
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
        font-size 18px
        line-height 150%
        text-align left

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