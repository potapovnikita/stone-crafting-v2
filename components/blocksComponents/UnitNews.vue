<template lang="pug">
    .unitNews
        client-only
            carousel(:paginationEnabled="false" :perPage="1" :loop="true" @pageChange="handlePageChange" ref="unitNewsCarousel")
                slide(v-for="(item, index) in mediaList" :key="`unit_${index}`")
                    UnitNewsItem(
                        :img="item.img"
                        :video="item.video"
                        :videoLink="item.videoLink"
                        :title="item.title"
                        :titleEng="item.titleEng"
                        :text="item.text"
                        :textEng="item.textEng"
                        :more="item.more !== undefined"
                        :fullText="item.more !== undefined ? item.more.text : ''"
                        :fullTextEng="item.more !== undefined ? item.more.textEng : ''"
                        :wideBlock="item.wideBlock"
                    )
        .unitNews__controls
            ButtonArrow.desktop-hide(:onClick="prewSlide")
            ul.slider-pagination(v-if="pageCount > 0")
                li(v-for="(item, index) in pageCount" :key="`dot_${index}`")
                    .box
                        .dot(:class="{'active': index === currentSlide}" @click="() => navigateTo(index)")
            ButtonArrow.desktop-hide(:onClick="nextSlide" arrowRight)
    
</template>
<script>
import UnitNewsItem from '@/components/blocksComponents/UnitNewsItem'
import ButtonArrow from '@/components/ui/ButtonArrow'

export default {
    name: 'UnitNews',
    props: {
        mediaList: Array,
    },
    components: {
        UnitNewsItem,
        ButtonArrow,
    },
    data() {
        return {
            pageCount: 0,
            currentSlide: 0,
        }
    },
    methods: {
        handlePageChange(num) {
            this.currentSlide = num
        },
        navigateTo(index) {
            this.currentSlide = index
            this.$refs.unitNewsCarousel.goToPage(index)
        },
        prewSlide() {
            this.currentSlide = this.$refs.unitNewsCarousel.getPreviousPage()
            this.$refs.unitNewsCarousel.goToPage(this.$refs.unitNewsCarousel.getPreviousPage());
        },
        nextSlide() {
            this.currentSlide = this.$refs.unitNewsCarousel.getNextPage()
            this.$refs.unitNewsCarousel.goToPage(this.$refs.unitNewsCarousel.getNextPage());
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.pageCount = this.$refs.unitNewsCarousel.pageCount
        })
    }    
}
</script>
<style lang="stylus" scoped>
.unitNews
    display block
    padding-top 79px

    &__controls
        .desktop-hide
            display none

    .slider-pagination
        display flex
        justify-content center
        padding 50px 20px 0
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

    @media only screen and (max-width 1280px)
        padding-top 60px

    @media only screen and (max-width 1000px)
        padding-top 33px

    @media only screen and (max-width 767px)
        &__controls
            display flex
            align-items center
            justify-content space-around
            padding-top 30px

            .desktop-hide
                display flex

        .slider-pagination
            padding 0          

</style>