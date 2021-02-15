<template lang="pug">
    .orderModel
        .orderModel__container(v-if="orderModels")
            .orderModel__block-text.orderModel__block-text--left.mobile-hide
                h3.orderModel__title {{ lang === 'ru' ? 'Особенности' : 'Title on eng' }}
                p.orderModel__text(v-html="lang === 'ru' ? orderModels[currentSlide].features.text : orderModels[currentSlide].features.textEng")
            .orderModel__block-media
                .orderModel__wrapper-circle
                    .orderModel__slider-buttons-desktop.btn-left
                        ButtonArrow(:onClick="prewSlide")
                    .orderModel__slider-buttons-desktop.btn-right
                        ButtonArrow(:onClick="nextSlide" arrowRight)
                    
                    client-only
                        carousel(:paginationEnabled="false" :perPage="1" :loop="true" ref="orderModelCarousel")
                            slide(v-for="model in orderModels" :key="model.id")
                                .orderModel__media-container
                                    img(:src="getImg(model.img)" alt="modelImg")

                    .orderModel__circle
            .orderModel__block-text.orderModel__block-text--right.mobile-hide
                h3.orderModel__title {{ lang === 'ru' ? 'История' : 'History' }}
                p.orderModel__text(v-html="lang === 'ru' ? orderModels[currentSlide].history.text : orderModels[currentSlide].history.textEng")

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
        orderModels: Array,
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
        max-width 1600px
        padding-top 122px
        padding-bottom 103px

    &__block-text
        display block
        min-width 280px
        margin-top 209px

        &--left
            max-width 339px

        &--right
            max-width 346px

    &__block-media
        display block
        max-width 664px

    &__media-container
        display block
        margin-top -46px

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
        width 664px
        height 664px

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
        top 0
        width 100%
        height 100%
        border 1px solid rgba(255, 255, 255, 0.8)
        border-radius 50%
        z-index 0

</style>