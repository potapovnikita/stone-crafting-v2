<template lang="pug">
    .brand-history-container
        .brand-history-container__line
        .brand-history-container__bg-pic-bottom
        h2.brand-history-container__title {{lang === 'ru' ? data.title : data.titleEng}}

        p.brand-history-container__text {{lang === 'ru' ? data.text : data.textEng}}

        .brand-history-container__button
            Button(:onClick="() => $nuxt.$router.push({path:`${data.href}`})") {{lang === 'ru' ? data.btnName : data.btnNameEng}}
</template>
<script>
    import { mapState } from 'vuex'
    import BrandHistory from '~/assets/staticData/brandHistory.json'
    import Button from "@/components/ui/Button";
    export default {
        name: "BrandHistory",
        components: {
            Button,
        },
        data() {
            return {
                data: BrandHistory,
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
    .brand-history-container
        position relative
        min-height 335px
        padding 50px
        background url('~assets/img/brandHistory/bg-main.png') top center no-repeat
        background-size cover

        &__line
            position absolute
            top -50px
            left 0
            right 0
            width 1px
            height 80px
            margin 0 auto
            background goldNew

        &__bg-pic-bottom
            position absolute
            left 0
            bottom 0
            width 458px
            height 256px
            background url('~assets/img/brandHistory/bg-bottom.png') no-repeat
        
        &__title
            margin-bottom 14px

        &__text
            max-width 832px

        &__button
            margin-top 35px

        @media only screen and (max-width 767px)
            padding 98px 10px 108px
            background url('~assets/img/brandHistory/bg-main-mb.png') no-repeat

            &__title
                margin-bottom 20px

            &__bg-pic-bottom
                background-size 40%
                background-position -17% bottom


</style>