<template lang="pug">
    .tradition-container
        .tradition-container__pic-top-left
        .tradition-container__wrapper-title
            h2.tradition-container__title {{lang === 'ru' ? 'Вековые традиции объемной каменной мозаики' : 'Tile on eng' }}
            .tradition-container__double-line
        .tradition-container__pic-top-right
        .tradition-container__buttons-panel(v-if="data.buttons")
            Button(
                v-if="data.buttons.length && data.buttons[0]"
                :classNames="['tradition-container__btn']"
                :onClick="() => $nuxt.$router.push({path: `${data.buttons[0].link}`})"
                disabledPadding
                large
                )
                .tradition-container__btn-container
                    IndividIcon.icon
                    span.text(v-html="lang === 'ru' ? data.buttons[0].name : data.buttons[0].nameEng")

            Button(
                v-if="data.buttons.length && data.buttons[1]"
                :classNames="['tradition-container__btn']"
                :onClick="() => $nuxt.$router.push({path:`${data.buttons[1].link}`})"
                disabledPadding
                large
                )
                .tradition-container__btn-container
                    BoutiqueIcon.icon
                    span.text {{lang === 'ru' ? data.buttons[1].name : data.buttons[1].nameEng }}

</template>
<script>
    import { mapState } from 'vuex'
    import Tradition from '~/assets/staticData/tradition.json'
    import Button from '@/components/ui/Button'
    import IndividIcon from '~/assets/img/main/individ.svg'
    import BoutiqueIcon from '~/assets/img/main/boutique.svg'

    export default {
        name: "Tradition",
        components: {
            Button,
            IndividIcon,
            BoutiqueIcon,
        },
        data() {
            return {
                data: Tradition,
            }
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
        background url('~assets/img/tradition/bg-main.png') no-repeat
        background-size cover

        &__pic-top-left
            position absolute
            top 0
            left 0
            width 663px
            height 415px
            background url('~assets/img/tradition/bg-top-left.png') no-repeat

        &__pic-top-right
            position absolute
            top 0
            right 0
            width 181px
            height 345px
            background url('~assets/img/tradition/bg-top-right.png') no-repeat
        
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

            &__wrapper-title
                padding-bottom 25px

            &__title
                max-width 510px

            &__btn-container
                min-width 468px
                padding 38px 45px 40px

                .icon
                    margin-right 35px

                .text
                    font-size 22px

        @media only screen and (max-width 767px)
            padding-top 42px

            &__pic-top-left
                background-position-x -14%
                background-size 30%

            &__pic-top-right
                top unset
                background-position top right
                background-size 50%

            &__title
                max-width 252px

</style>