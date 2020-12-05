<template lang="pug">
    .tradition-container
        .tradition-container__pic-top-left
        .tradition-container__wrapper-title
            h2.tradition-container__title {{lang === 'ru' ? 'Вековые традиции объемной каменной мозаики' : 'Tile on eng' }}
            .tradition-container__double-line
        .tradition-container__pic-top-right
        .tradition-container__pic-bottom
        .tradition-container__slides-panel(v-if="slides")
            client-only
                carousel(:perPage="1" paginationActiveColor="#fce086")
                    slide(v-for="item in slides" :key="item.id")
                        .slide-item
                            .slide-item__container-img
                                div(v-if="item.imgBlock" :class="`${item.imgBlock.className}-${item.id}`")
                                    img.slide-item__photo(:src="getImgLocal(item.imgBlock.img)" alt="img")
                                img.slide-item__photo(v-if="item.img" :src="getImgLocal(item.img)" alt="img")

                            .slide-item__container-text(:class="item.textBlockClass ? `${item.textBlockClass}-${item.id}` : ''")
                                .slide-item__century-panel
                                    .slide-item__centry-item
                                        span
                                            | XIX
                                        .slide-item__centry-circle.active

                                    .slide-item__centry-item
                                        span
                                            | XX
                                        .slide-item__centry-circle

                                    .slide-item__centry-item
                                        span
                                            | XXI
                                        .slide-item__centry-circle

                                    .slide-item__line-panel
                                        .slide-item__line-start
                                        .slide-item__line-middle
                                        .slide-item__line-end

                                p.slide-item__text(v-if="item.text && item.textEng" v-html="lang === 'ru' ? item.text : item.textEng")

                                nuxt-link.slide-item__link(v-if="item.link" :to="item.link.href" v-html="lang === 'ru' ? item.link.name : item.link.nameEng")

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

    export default {
        name: "Tradition",
        components: {
            Button,
            IndividIcon,
            BoutiqueIcon,
            MbIndividIcon,
            MbBoutiqueIcon,
        },
        data() {
            return {
                slides: Tradition.slides,
                buttons: Tradition.buttons,
            }
        },
        methods: {
            getImgLocal(url) {
                return getImgLocal(url)
            },
        },
        computed: {
            ...mapState('localization', [
                'lang',
            ]),
        },
    }
</script>

<style lang="stylus">
    .tradition-container
        position relative
        padding-top 148px
        min-height 1600px
        background url('~assets/img/tradition/bg-main.png') no-repeat

        &__pic-top-left
            position absolute
            top 0
            left 0
            width 663px
            height 415px
            background url('~assets/img/tradition/bg-top-left.png') no-repeat
            background-position 0 -42px

        &__pic-top-right
            position absolute
            top 0
            right 0
            width 181px
            height 345px
            background url('~assets/img/tradition/bg-top-right.png') no-repeat

        &__pic-bottom
            position absolute
            bottom 0
            width 100%
            height 897px
            background linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%), url('~assets/img/tradition/bg-bottom.png') bottom right no-repeat

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
            position relative
            margin 85px 0 167px
            font-family $TenorSans-Regular
            font-weight normal
            font-size 18px
            line-height 150%
            letter-spacing 0.03em

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
                background url('~assets/img/tradition/slides/1/bg-text.png') no-repeat
                background-size: contain

        .VueCarousel-pagination
            margin-top 74px


        &__buttons-panel
            display flex
            justify-content space-around

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
            padding-bottom 29px

            &__pic-top-left
                background-size 80%
                background-position -100px -50px

            &__pic-top-right
                background-size 80%
                background-position 40px 50px

            &__pic-bottom
                background-position 100px

            &__wrapper-title
                padding-bottom 25px

            &__title
                max-width 510px

            &__slides-panel
                margin-bottom 120px 
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

            .VueCarousel-pagination
                margin-top 0

            &__btn-container
                min-width 466px
                padding 38px 25px 40px

                .icon
                    margin-right 35px

                .text
                    font-size 22px

        @media only screen and (max-width 767px)
            padding-top 42px
            min-height 1650px

            &__pic-top-left
                background-position -68px 0
                background-size 30%

            &__pic-top-right
                top unset
                background-position top right
                background-size 50%

            &__pic-bottom
                height 563px
                background-size cover
            
            &__title
                max-width 252px

            &__slides-panel
                margin 38px 0

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
                    background-position top center

            &__buttons-panel
                display block

                button
                    margin-bottom 20px

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