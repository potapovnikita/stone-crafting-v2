<template lang="pug">
    .tradition-container
        .tradition-container__wrapper-title
            h2.tradition-container__title {{lang === 'ru' ? 'Вековые традиции объемной каменной мозаики' : 'Tile on eng' }}
            .tradition-container__double-line
        .tradition-container__slides-panel(v-if="slides")
            client-only
                .slider
                    .buttons-desktop.btn-left
                        ButtonArrow(:onClick="prewSlide")
                    .buttons-desktop.btn-right
                            ButtonArrow(:onClick="nextSlide" arrowRight)
                    .mobile-century-panel
                        .slide-item__century-panel(v-if="centuryList")
                            .slide-item__centry-item(v-for="century in centuryList")
                                span(:class="{'active': century.name === slides[currentSlide].century}") {{century.name}}
                                .slide-item__centry-circle(:class="{'active': century.name === slides[currentSlide].century}")

                            .slide-item__line-panel
                                .slide-item__line-start
                                .slide-item__line-middle
                                .slide-item__line-end

                    carousel(:paginationEnabled="false" :loop="true" :perPage="1" @pageChange="handlePageChange" ref="traditionCarousel")
                        slide(v-for="item in slides" :key="item.id")
                            .slide-item
                                .slide-item__container-img
                                    div(v-if="item.imgBlock" :class="`${item.imgBlock.className}-${item.id}`")
                                        img.slide-item__photo(:src="getImgLocal(item.imgBlock.img)" alt="img")
                                    img.slide-item__photo(v-if="item.img" :src="getImgLocal(item.img)" alt="img")

                                .slide-item__container-text(:class="item.textBlockClass ? `${item.textBlockClass}-${item.id}` : ''")
                                    .slide-item__descktop-century-panel
                                        .slide-item__century-panel(v-if="centuryList")
                                            .slide-item__centry-item(v-for="century in centuryList")
                                                span(:class="{'active': century.name === item.century}") {{century.name}}
                                                .slide-item__centry-circle(:class="{'active': century.name === item.century}")

                                            .slide-item__line-panel
                                                .slide-item__line-start
                                                .slide-item__line-middle
                                                .slide-item__line-end

                                    p.slide-item__text(v-if="item.text && item.textEng" v-html="lang === 'ru' ? item.text : item.textEng")

                                    nuxt-link.slide-item__link(v-if="item.link" :to="item.link.href" v-html="lang === 'ru' ? item.link.name : item.link.nameEng")

                .slider-pagination(v-if="pageCount > 0")
                    .box(v-for="(item, index) in slides" :key="`point_${item.id}`")
                        .circle(:class="{'active': index === currentSlide}" @click="() => navigateTo(index)")

        .tradition-container__buttons-panel(v-if="buttons")
            Button(
                v-if="buttons.length && buttons[0]"
                :classNames="['tradition-container__btn']"
                :onClick="() => $nuxt.$router.push({path: `${buttons[0].link}`})"
                disabledPadding
                large
                )
                .tradition-container__btn-container
                    IndividIcon.icon
                    MbIndividIcon.icon.mb
                    span.text(v-html="lang === 'ru' ? buttons[0].name : buttons[0].nameEng")

            Button(
                v-if="buttons.length && buttons[1]"
                :classNames="['tradition-container__btn']"
                :onClick="() => $nuxt.$router.push({path:`${buttons[1].link}`})"
                disabledPadding
                large
                )
                .tradition-container__btn-container
                    BoutiqueIcon.icon
                    MbBoutiqueIcon.icon.mb
                    span.text {{lang === 'ru' ? buttons[1].name : buttons[1].nameEng }}

</template>
<script>
    import { mapState } from 'vuex'
    import { getImgLocal } from '~/plugins/getUrl'
    import Tradition from '~/assets/staticData/tradition.json'
    import Button from '@/components/ui/Button'
    import IndividIcon from '~/assets/img/tradition/individ.svg'
    import BoutiqueIcon from '~/assets/img/tradition/boutique.svg'
    import MbIndividIcon from '~/assets/img/tradition/individ-mb.svg'
    import MbBoutiqueIcon from '~/assets/img/tradition/boutique-mb.svg'
    import ButtonArrow from "@/components/ui/ButtonArrow"

    export default {
        name: "Tradition",
        components: {
            Button,
            IndividIcon,
            BoutiqueIcon,
            MbIndividIcon,
            MbBoutiqueIcon,
            ButtonArrow,
        },
        data() {
            return {
                centuryList: Tradition.centuryList,
                slides: Tradition.slides,
                buttons: Tradition.buttons,
                currentSlide: 0,
                pageCount: 0,
            }
        },
        methods: {
            getImgLocal(url) {
                return getImgLocal(url)
            },
            prewSlide() {
                this.currentSlide = this.$refs.traditionCarousel.getPreviousPage()
                this.$refs.traditionCarousel.goToPage(this.$refs.traditionCarousel.getPreviousPage())
            },
            nextSlide() {
                this.currentSlide = this.$refs.traditionCarousel.getNextPage()
                this.$refs.traditionCarousel.goToPage(this.$refs.traditionCarousel.getNextPage())
            },
            navigateTo(index) {
                this.currentSlide = index
                this.$refs.traditionCarousel.goToPage(index)
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
        mounted() {
            this.$nextTick(() => {
                const prew = this.$refs.traditionCarousel.getPreviousPage()
                const next = this.$refs.traditionCarousel.getNextPage()
                this.pageCount = this.$refs.traditionCarousel.pageCount
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

<style lang="stylus">
    .tradition-container
        position relative
        padding-top 148px

        &__wrapper-title
            position relative
            padding-bottom 40px
        
        &__title
            max-width 770px
        
        &__double-line
            position absolute
            left 0
            right 0
            bottom 0
            width 163px
            height 4px
            margin 0 auto
            border 1px solid goldNew
            border-left none
            border-right none

        &__slides-panel
            margin 80px 40px 177px
            font-family $TenorSans-Regular
            font-weight normal
            font-size 18px
            line-height 150%
            letter-spacing 0.03em

            .slider
                position relative
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

            .mobile-century-panel
                display none

            .slide-item
                display flex
                justify-content space-between
                max-width 1220px

                &__container-img
                    flex-basis 572px

                &__container-text
                    flex-shrink 2
                    max-width 545px
                    text-align left
                    margin-left 30px

                &__century-panel
                    display flex
                    justify-content space-between
                    position relative
                    width 295px
                    margin-bottom 46px

                &__centry-item
                    display flex
                    flex-direction column
                    align-items center

                    span
                        margin-bottom 12px
                        font-size 30px
                        color rgba(255, 255, 255, 0.36)

                        &.active
                            color goldNew

                &__centry-circle
                    width 12px
                    height 12px
                    border 1px solid #616D76
                    border-radius 50%

                    &.active
                        background goldNew

                &__line-panel
                    display flex
                    position absolute
                    bottom 5px

                &__line-start
                    width 16px
                    height 1px 
                    margin-right 28px 
                    background url('~assets/img/tradition/slides/lineStart.png') no-repeat

                &__line-middle
                    width 89px
                    height 1px 
                    margin-right 28px 
                    background url('~assets/img/tradition/slides/lineMiddle.png') no-repeat
 
                &__line-end
                    width 89px
                    height 1px
                    background url('~assets/img/tradition/slides/lineEnd.png') no-repeat 

                &__photo
                    width 100%

                &__text
                    padding-bottom 21px
                    text-align left

                &__link
                    color goldNew

            .slide-item__container-img
                .wrapper-img-fist
                    width 100%
                    background url('~assets/img/tradition/slides/1/bg.png') top center no-repeat #111

                    img
                        max-width 398px

            .slide-item__container-text.wrapper-text-fist
                min-height 392px
                background url('~assets/img/tradition/slides/1/bg-text.png') 30px 20px no-repeat

            .slider-pagination
                display flex
                justify-content center
                margin-top 122px

                .box
                    display flex
                    align-items center
                    justify-content center
                    flex-shrink 0
                    width 16px
                    height 16px

                    .circle
                        width 8px
                        height 8px
                        border 1px solid rgba(143, 143, 143, 0.3)
                        border-radius 50%
                        cursor pointer

                        &.active
                            width 12px
                            height 12px
                            border 1px solid #96785F

        &__buttons-panel
            display flex
            justify-content space-around
            margin-bottom 93px 

        &__btn-container
            display flex
            justify-content center
            align-items center
            min-width 637px
            padding 50px 45px 64px

            .icon
                margin-right 60px

                &.mb
                    display none

            .text
                font-size 30px
                line-height 130%
                letter-spacing 0.03em
                text-align left
                white-space pre-line

        &__btn
            &:hover
                .icon
                    stroke #222

        @media only screen and (max-width 1280px)
            padding-top 72px

            &__wrapper-title
                padding-bottom 25px

            &__title
                max-width 510px

            &__slides-panel
                margin 100px 30px 120px
                font-size 16px

                .slide-item
                    align-items center
                    max-width 790px

                    &__container-img
                        flex-basis 375px

                    &__container-text
                        max-width 390px
                        margin-left 20px

                    &__century-panel
                        width 295px
                        margin-bottom 63px

                    &__centry-item                
                        span
                            margin-bottom 8px
                            font-size 22px

                    &__photo
                        width 100%

                    &__text
                        padding-bottom 21px

                .slide-item__container-img
                    .wrapper-img-fist
                        img
                            max-width 261px

                .slide-item__container-text.wrapper-text-fist
                    min-height unset
                    background-position center 40px

                .slider-pagination
                    margin-top 20px

            &__buttons-panel
                margin-bottom 29px

            &__btn-container
                min-width 466px
                padding 38px 25px 40px

                .icon
                    margin-right 35px

                .text
                    font-size 22px

        @media only screen and (max-width 1024px)
            &__pic-bottom
                background-position 100px

        @media only screen and (max-width 767px)
            padding-top 42px

            &__title
                max-width 252px

            &__slides-panel
                margin 38px 0

                .slider
                    padding 0

                .buttons-desktop
                    display none

                .mobile-century-panel
                    display block
                    position absolute
                    top 243px
                    left 0
                    right 0

                .slide-item
                    display block
                    max-width unset
                    width 100%

                    &__container-img
                        flex-basis unset
                        max-width 351px 
                        margin-bottom 19px 

                    &__container-text
                        max-width 349px
                        margin 0

                    &__text
                        font-size 16px
                        line-height 24px

                    &__descktop-century-panel
                        visibility hidden

                    &__century-panel
                        width 295px
                        margin 0 auto 42px

                    &__centry-item                
                        span
                            margin-bottom 8px
                            font-size 20px

                .slide-item__container-img
                    .wrapper-img-fist
                        img
                            max-width 244px

                .slide-item__container-text.wrapper-text-fist
                    background-position center 50px
                    background-size 87%

            &__buttons-panel
                display block
                margin-bottom 50px 

                button
                    margin-bottom 20px

                    &:last-child
                        margin-bottom 0

            &__btn-container
                width 100%
                max-width 350px
                min-width unset
                padding 22px 31px 29px

                .icon
                    display none

                    &.mb
                        display block
                        flex-shrink 0
                        width 35px
                        height 43px
                        margin-right 25px 

                .text
                    font-size 16px
                    white-space normal

</style>