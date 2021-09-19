<template lang="pug">
.headerMain
    .headerMain__circle
    h1.headerMain__title {{ lang === 'ru' ? 'Камнерезный Дом Антонова' : 'Stone-crafting House by Alexey Antonov' }}
    p.headerMain__sub-title {{ lang === 'ru' ? 'Камнерезное и ювелирное искусство' : 'Stone-crafting and jewelry art' }}
    .headerMain__line
    .headerMain__year-wrapper
        .headerMain__double-line
        p.text_sverdlovsk {{ lang === 'ru' ? 'с 1968 года' : 'since 1968' }}

</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'HeaderMain',
    computed: {
        ...mapState('localization', [
            'lang',
        ]),
    },
}
</script>
<style lang="stylus" scoped>
.headerMain
    position relative
    height 722px
    padding-top 195px

    &__circle
        position absolute
        top 0
        left 0
        right 0
        margin 0 auto
        width 722px
        height 100%
        border 1px solid rgba(255, 255, 255, 0.07)
        border-radius 50%

    &__title
        font-size 68px
        margin-bottom 14px

    &__sub-title
        margin-bottom 35px
        font-size 19px
        line-height 140%
        letter-spacing 0.3em
        text-transform uppercase
        color goldNew

    &__line
        position absolute
        left 0
        right 0
        width 53px
        height 1px
        margin 0 auto
        background goldNew

    &__year-wrapper
        position relative
        padding-top 30px
        margin-top 102px

    &__double-line
        position absolute
        top 0
        left 0
        right 0
        width 163px
        height 4px
        margin 0 auto
        border 1px solid #6A6A6A
        border-left none
        border-right none

    @media only screen and (max-width 1280px)
        height 580px
        padding-top 180px

        &__title
            font-size 52px

        &__circle
            width 580px

        &__year-wrapper
            padding-top 25px
            margin-top 83px

    @media only screen and (max-width 900px) and (max-height 500px)
        padding-top 40px
        height 100vh

        &__circle
            width 280px
            height 280px

        &__title
            font-size 32px
            line-height 34px
            margin-bottom 15px

        &__sub-title
            margin-bottom 30px
            font-size 13px
            line-height 19px
            letter-spacing 0.3em
            text-transform uppercase
            color goldNew

        &__line
            width 39px

        &__year-wrapper
            padding-top 15px
            margin 0

        &__double-line
            display none

    @media only screen and (max-width 767px)
        height 100vh
        padding-top 108px

        &__circle
            left -15%
            right -15%
            width 409px
            height 409px

        &__title
            font-size 32px
            line-height 34px
            margin-bottom 33px

        &__sub-title
            margin-bottom 52px
            font-size 13px
            line-height 19px
            letter-spacing 0.3em
            text-transform uppercase
            color goldNew

        &__line
            width 39px

        &__year-wrapper
            padding-top 33px
            margin 0

        &__double-line
            display none

    @media only screen and (max-width 767px) and (max-height 500px)
        padding-top 30px

        &__circle
            width 300px
            height 300px

        &__title
            margin-bottom 15px

        &__sub-title
            margin-bottom 35px

        &__year-wrapper
            padding-top 25px
            margin 0

    @media only screen and (max-width 767px) and (max-height 380px)
        padding-top 25px

        &__circle
            width 250px
            height 250px

        &__title
            margin-bottom 15px

        &__sub-title
            margin-bottom 35px

        &__year-wrapper
            padding-top 25px

    @media only screen and (max-width 767px) and (max-height 350px)
        padding-top 20px

        &__circle
            width 230px
            height 230px

        &__title
            margin-bottom 10px

        &__sub-title
            margin-bottom 30px

        &__year-wrapper
            padding-top 20px

</style>
