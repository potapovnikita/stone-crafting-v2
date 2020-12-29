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

        ul.slider-pagination(v-if="pageCount > 0")
            li(v-for="(item, index) in pageCount" :key="`dot_${index}`")
                .box
                    .dot(:class="{'active': index === currentSlide}" @click="() => navigateTo(index)")
    
</template>
<script>
import UnitNewsItem from '@/components/blocksComponents/UnitNewsItem'

export default {
    name: 'UnitNews',
    props: {
        mediaList: Array,
    },
    components: {
        UnitNewsItem,
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

</style>