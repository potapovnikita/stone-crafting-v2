<template lang="pug">
    .orderGallary
        .orderGallary__line
        h1.orderGallary__title {{ lang === 'ru' ? 'Салон ANTONOV ONLINE' : 'Place ANTONOV ONLINE' }}
        h2.orderGallary__title-second {{ lang === 'ru' ? 'Посмотреть в наличии' : 'Show' }}
        .orderGallary__container
            .orderGallary__buttons-desktop.btn-left
                ButtonArrow(:onClick="prewSlide")
            .orderGallary__buttons-desktop.btn-right
                ButtonArrow(:onClick="nextSlide" arrowRight)
            client-only
                carousel(:paginationEnabled="false" :perPage="1" :loop="true" ref="orderGallaryCarousel")
                    slide(v-for="item in gallaryItems" :key="item.id")
                        .orderGallary__item
                            .orderGallary__wrapper-media
                                img.orderGallary__photo(:src="getImg(item.img)" alt="pic")
                            p.orderGallary__photo-title(v-html="lang === 'ru' ? item.title : item.titleEng")
    
</template>
<script>
import { mapState } from 'vuex'
import { getImgLocal } from '~/plugins/getUrl'
import ButtonArrow from "@/components/ui/ButtonArrow"
export default {
    name: 'OrderGallary',
    components: {
        ButtonArrow,
    },
    props: {
        gallaryItems: Array,
    },
    data() {
        return {
            currentSlide: 0,
        }
    },
     methods: {
        getImg(url) {
            return getImgLocal(url)
        },
        prewSlide() {
                this.currentSlide = this.$refs.orderGallaryCarousel.getPreviousPage()
                this.$refs.orderGallaryCarousel.goToPage(this.$refs.orderGallaryCarousel.getPreviousPage());
            },
        nextSlide() {
            this.currentSlide = this.$refs.orderGallaryCarousel.getNextPage()
            this.$refs.orderGallaryCarousel.goToPage(this.$refs.orderGallaryCarousel.getNextPage());
        },
    },
    computed: {
        ...mapState('localization', [
            'lang',
        ]),
    },
    mounted() {
        this.$nextTick(() => {
            // чтобы можно было видеть слайды соседние
            const wrapper = this.$refs.orderGallaryCarousel.$refs['VueCarousel-wrapper']
            wrapper.style.overflow = 'visible'
        })
    }    
}
</script>
<style lang="stylus" scoped>
.orderGallary
    display block
    position relative
    padding 90px 40px 109px

    &__line
        position absolute
        top 0
        left 50px
        right 50px
        border 1px solid rgba(255, 254, 254, 0.15)
        border-left none
        border-right none
        border-bottom none

    &__title
        font-size 40px
        line-height 150%
        margin-bottom 17px

    &__title-second
        font-size 30px
        line-height 45px
        margin-bottom 66px

    &__container
        position relative
        max-width 1596px
        padding 0 60px

    &__buttons-desktop
        display block
        position absolute
        top 35px
        z-index 1

        &.btn-left
            left 0

        &.btn-right
            right 0

    &__item
        display block
        width 242px

    &__wrapper-media
        width 242px
        height 154px
        margin-bottom 10px

    &__photo
        width 100%
        height auto
        max-height 154px

    @media only screen and (max-width 1024px)
        padding 40px 25px 45px

        &__line
            left 25px
            right 25px

        &__title
            font-size 32px
            margin-bottom 4px

        &__title-second
            font-size 22px
            line-height 33px
            margin-bottom 30px

        &__item
            width 194px

        &__wrapper-media
            width 194px
            height 136px
            margin-bottom 10px

        &__photo
            width 100%
            height auto
            max-height 136px

        &__photo-title
            font-size 16px


    @media only screen and (max-width 768px)
        &__buttons-desktop
            display none

    @media only screen and (max-width 767px)
        padding 35px 0 28px 0

        &__line
            left 12px
            right 12px

        &__title
            font-size 22px
            margin-bottom 17px

        &__title-second
            margin-bottom 50px

        &__container
            max-width 282px
            padding 0

        &__item
            width 242px

        &__wrapper-media
            width 242px
            height 154px
            margin-bottom 10px

        &__photo
            width 100%
            height auto
            max-height 154px

        &__photo-title
            font-size 18px

</style>