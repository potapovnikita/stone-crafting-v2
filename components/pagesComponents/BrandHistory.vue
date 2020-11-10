<template lang="pug">
    .brand-history-container
        .brand-history-container__line
        .brand-history-container__bg-pic-bottom
        h2.brand-history-container__title
            | История бренда

        p.brand-history-container__text
            | Бренд создан уральским мастером — камнерезом по художественной обработке камня, членом союза художников России — Алексеем Антоновым.

        .brand-history-container__button
            Button(name='О бренде' :onClick="() => sampleTest('О бренде')")
</template>
<script>
    import Button from "@/components/ui/Button";
    export default {
         components: {
            Button,
        },
    }
</script>

<style lang="stylus">
    .brand-history-container
        position relative
        padding 50px
        background url('~assets/img/brandHistory/bg-main.png') no-repeat
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