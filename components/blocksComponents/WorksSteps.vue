<template lang="pug">
    .worksSteps
        h2.worksSteps__title {{ lang === 'ru' ? orderItem.worksStepsTitle : orderItem.worksStepsTitleEng }}
        .worksSteps__double-line

        .worksSteps__pagination
            ul.worksSteps__sliderPagination(v-if="stages.length > 0")
                li(v-for="(item, index) in stages" :key="`label_${item.id}`")
                    .worksSteps__sliderItem.worksSteps__sliderItem--label
                        p(v-html="item.label")

            .worksSteps__wrapper-bar
                ul.worksSteps__sliderPagination(v-if="stages.length > 0")
                    li(v-for="(item, index) in stages" :key="`dot_${item.id}`")
                        .worksSteps__sliderItem
                            .worksSteps__sliderItem-dot(:class="{'active': index === currentSlide}" @click="() => navigateTo(index)")

        client-only
            carousel(:paginationEnabled="false" :perPage="1" :loop="true" @pageChange="handlePageChange" ref="worksSteps")
                slide(v-for="(stage, index) in stages" :key="`stage_${stage.id}`")
                    .worksSteps__step-container
                        .worksSteps__media
                            img.worksSteps__photo(v-if="stage.img" :src="getImg(lang === 'ru' ? stage.img : stage.imgEng)" :alt="`pic_${stage.id}`")
                            video#video.worksSteps__photo(playsinline autoplay loop="true" muted="muted")
                                source(:src="getImgExternal(stage.video)" type="video/mp4")
                        .worksSteps__content
                            h3.worksSteps__content-title(v-html="lang === 'ru' ? stage.title : stage.titleEng")
                            p.worksSteps__content-text
                              span(v-if="stage.link")
                                a(:href="lang === 'ru' ? getImgExternal(stage.link) : getImgExternal(stage.linkEng)" target="_blank") {{ lang === 'ru' ? stage.text : stage.textEng}}
                              span(v-else) {{ lang === 'ru' ? stage.text : stage.textEng}}

                    .worksSteps__spending(v-if="!orderItem.isHiddenTimeLine")
                        div
                            .worksSteps__spending-content
                                p.worksSteps__spendingTitle(v-html="lang === 'ru' ? 'Время создания' : 'Work creation time'")
                                .worksSteps__spending-progressBar-descktop
                                    .worksSteps__progress(:style="{'left':`${stage.timeLine.start}%`, 'width': `${stage.timeLine.end-stage.timeLine.start}%`}")
                                p.worksSteps__spendingText(v-html="lang === 'ru' ? stage.creationTime : stage.creationTimeEng")
                            .worksSteps__spending-progressBar-mobile
                                .worksSteps__progress(:style="{'left':`${stage.timeLine.start}%`, 'width': `${stage.timeLine.end-stage.timeLine.start}%`}")
                        div
                            .worksSteps__spending-content
                                p.worksSteps__spendingTitle(v-html="lang === 'ru' ? 'Ценовая политика' : 'Price policy'")
                                .worksSteps__spending-progressBar-descktop
                                    .worksSteps__progress(:style="{'left':`${stage.priceLine.start}%`, 'width': `${stage.priceLine.end-stage.priceLine.start}%`}")
                                p.worksSteps__spendingText(v-html="lang === 'ru' ? stage.price : stage.priceEng")
                            .worksSteps__spending-progressBar-mobile
                                .worksSteps__progress(:style="{'left':`${stage.priceLine.start}%`, 'width': `${stage.priceLine.end-stage.priceLine.start}%`}")

</template>
<script>
import { mapState } from 'vuex'
import { getImgLocal } from '~/plugins/getUrl'
import ButtonArrow from "@/components/ui/ButtonArrow"
import {getImgExternal} from "../../plugins/getUrl";
import { urlToPromise } from "@/plugins/getUrl";
import downloadImagesAsZip from "files-download-zip";
import JSZip from "jszip";
export default {
    name: 'WorksSteps',
    components: {
        ButtonArrow,
    },
    props: {
        stages: {
            type: Array,
            required: true,
        },
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
        async download(link) {
            this.load = true;
            const zip = new JSZip();
            const data = urlToPromise(link);
            // const name = link.name.split('____')[0];
            zip.file('name', data, { binary: true });

            const content = await zip.generateAsync({type:"blob"});
            this.load = false;
            saveAs(content, "stone-crafting.zip");
        },
        getImg(url) {
            return getImgLocal(url)
        },
        getImgExternal(url) {
            return getImgExternal(url)
        },
        prewSlide() {
            this.currentSlide = this.$refs.worksSteps.getPreviousPage()
            this.$refs.worksSteps.goToPage(this.$refs.worksSteps.getPreviousPage());
        },
        nextSlide() {
            this.currentSlide = this.$refs.worksSteps.getNextPage()
            this.$refs.worksSteps.goToPage(this.$refs.worksSteps.getNextPage());
        },
        navigateTo(index) {
            this.currentSlide = index
            this.$refs.worksSteps.goToPage(index)
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
.worksSteps
    display block
    max-width 1358px

    &__title
        margin-bottom 18px

    &__double-line
        width 100px
        height 4px
        margin-bottom 46px
        border 1px solid goldNew
        border-left none
        border-right none

    &__pagination
        position relative
        max-width 1358px
        margin-bottom 52px

    &__sliderPagination
        display flex
        justify-content space-around
        padding 0 20px
        list-style-type none

    &__sliderItem
        display flex
        justify-content center
        min-width 30px

        &--label
            margin-bottom 12px

    &__sliderItem-dot
        width 12px
        height 12px
        border 1px solid whiteMain
        border-radius 50%
        cursor pointer
        background-color blackBackground

        &.active
            width 12px
            height 12px
            background-color goldNew

    &__wrapper-bar
        display block
        background url('~assets/img/order/steps-line.png') center no-repeat

    &__step-container
        display flex
        justify-content space-between
        align-items center

    &__media
        flex-basis 593px
        padding 10px
        height 400px
        border 1px solid rgba(150, 120, 95, 0.3)

    &__photo
        width 100%

    &__content
        flex-basis 697px
        flex-shrink 2
        padding-left 20px
        text-align left
        &-text
          a
            border-bottom 1px solid white
            &:hover
              color #fce086
              border-bottom 1px solid #fce086




    &__content-title
        max-width 587px
        margin-bottom 23px
        font-size 26px
        line-height 150%
        text-align left

    &__content-text
        max-width 587px
        text-align left

    &__spending
        display flex
        flex-direction column
        align-items center
        padding 54px 0 14px

    &__spending-content
        display flex
        align-items center
        max-width 905px
        margin-bottom 35px

    &__spendingTitle
        width 230px
        margin-right 38px
        text-align left

    &__spending-progressBar-descktop
        position relative
        width 513px
        height 16px

        &:after
            content ' '
            position absolute
            top 50%
            left 0
            right 0
            height 1px
            background-color #C4C4C4
            opacity 0.2

    &__progress
        position absolute
        top 0
        left 0
        height 16px
        border 2px solid goldNew
        border-top none
        border-bottom none

        &:after
            content ' '
            position absolute
            top 50%
            left 0
            right 0
            height 1px
            background-color goldNew

    &__spending-progressBar-mobile
        display none

    &__spendingText
        width 100px
        margin-left 28px
        text-align left
        color goldNew

    @media only screen and (max-width 1440px)
        padding 0 30px

        &__content
            flex-basis 620px

    @media only screen and (max-width 1280px)
        &__media
            flex-basis 498px
            height 340px
            padding 8px

        &__photo
            max-height 340px

        &__content
            flex-basis 555px

    @media only screen and (max-width 1024px)
        padding 0

        &__title
            padding 0 27px

        &__double-line
            margin-bottom 28px

        &__pagination
            padding 0 27px
            margin-bottom 32px

        &__sliderItem

            &--label
                margin-bottom 24px

        &__content
            flex-basis 434px
            padding 0 27px

        &__content-title
            max-width 414px
            margin-bottom 30px
            font-size 22px

        &__spending
            align-items flex-start
            padding 50px 27px

        &__wrapper-bar
            background url('~assets/img/order/steps-line-ipad.png') center no-repeat

    @media only screen and (max-width 990px)
        padding-top 50px
        max-width unset

        &__step-container
            display block

        &__media
            width 347px
            height 238px
            padding 5px
            margin-bottom 18px

        &__photo
            max-height 226px

        &__content-title
            max-width unset
            margin-bottom 14px
            font-size 22px

        &__content-text
            max-width unset

        &__spending
            display block
            padding 30px 27px

            & > div + div
                margin-top 35px

        &__spending-content
            justify-content space-between
            max-width unset
            margin-bottom 8px

        &__spendingTitle
            width auto
            margin-right 10px
            font-size 18px
            line-height 27px

        &__spending-progressBar-descktop
            display none

        &__spending-progressBar-mobile
            display block
            position relative
            height 16px

            &:after
                content ' '
                position absolute
                top 50%
                left 0
                right 0
                height 1px
                background-color #C4C4C4
                opacity 0.2

        &__spendingText
            width auto
            margin-left 0
            font-size 18px
            line-height 27px

    @media only screen and (max-width 767px)
        padding 0

        &__step-container
            padding 0 12px

        &__title
            padding 0 12px
            margin-bottom 21px

        &__double-line
            width 50px

        &__pagination
            position relative
            max-width unset
            padding 0 12px
            margin-bottom 21px

        &__sliderPagination
            justify-content space-between

        &__sliderItem

            &--label
                margin-bottom 10px

        &__content
            padding 0

        &__spending
            padding 30px 12px

.VueCarousel-slide {
    padding-bottom: 40px;
}
</style>
