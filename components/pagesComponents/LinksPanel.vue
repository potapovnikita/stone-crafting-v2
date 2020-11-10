<template lang="pug">
    .links-panel-container
        .links-panel-container__item.links-panel-container__item--man
            .links-panel-container__wrapper-content
                .links-panel-container__circle
                .links-panel-container__wrapper-icon
                    StoneIcon
                .links-panel-container__wrapper-link
                    a.links-panel-container__link(href="/" target="_blank")
                        | Сокровища Музеев Коллекция Дома

        .links-panel-container__item.links-panel-container__item--museum
            .links-panel-container__wrapper-content
                .links-panel-container__circle
                .links-panel-container__wrapper-icon
                    MuseumIcon
                .links-panel-container__wrapper-link
                    a.links-panel-container__link(href="/" target="_blank")
                        | Виртуальный музей Камнерезного Дома

</template>
<script>
    import StoneIcon from '~/assets/img/linksPanel/stone.svg';
    import MuseumIcon from '~/assets/img/linksPanel/museum.svg';
    export default {
        components: {
            StoneIcon,
            MuseumIcon,
        },
    }
</script>

<style lang="stylus">
.links-panel-container
    display flex
    flex-direction row

    &__item
        display flex
        flex-grow 1
        justify-content center
        align-items center
        position relative
        min-width 470px
        min-height 470px

        &--man
            background url('~assets/img/linksPanel/bg-man.png') no-repeat
            background-size cover
            background-position center

        &--museum
            background url('~assets/img/linksPanel/bg-museum.png') no-repeat
            background-size cover
            background-position center
    
    &__wrapper-content
        position relative
        padding-top 42px
    
    &__circle
        position absolute
        top 0
        left 0
        right 0
        margin 0 auto
        width 276px
        height 276px
        border 1px solid rgba(255, 255, 255, 0.07)
        border-radius 50%
        z-index 1

    &__wrapper-icon
        height 64px
        margin-bottom 25px
    
    &__wrapper-link
        position relative
        max-width 408px
        z-index 2

    &__link
        font-family $TenorSans-Regular
        font-size 30px
        color whiteMain
        text-align center
        font-weight 400
        line-height 42px
        text-align center
        letter-spacing 0.03em

    @media only screen and (max-width 767px)
        display block

        &__item
            width 375px
            height 315px
            min-width unset
            min-height unset

            &--man
                background url('~assets/img/linksPanel/bg-man-mb.png') no-repeat

            &--museum
                background url('~assets/img/linksPanel/bg-museum-mb.png') no-repeat

        &__wrapper-content
            padding-top 27px

        &__circle
            width 186px
            height 186px

        &__wrapper-icon
            height 48px
            margin-bottom 19px

        &__wrapper-link
            max-width 273px

        &__link
            font-size 22px
            line-height 31px

</style>