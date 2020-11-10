<template lang="pug">
    .tradition-container
        .tradition-container__pic-top-left
        .tradition-container__wrapper-title
            h2.tradition-container__title
                | Вековые традиции объемной каменной мозаики
            .tradition-container__double-line
        .tradition-container__pic-top-right

</template>
<script>
    export default {
    }
</script>

<style lang="stylus">
    .tradition-container
        position relative
        padding-top 148px
        height 1700px
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