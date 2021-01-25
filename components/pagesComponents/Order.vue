<template lang="pug">
    .common-container.order_container
        h1.order_container__title(v-html="lang === 'ru' ? 'Индивидуальный заказ' : 'Individual order'")

        .order_container__wrapper-options(v-if="orderOptions")
            .order_container__options-line
            ul.order_container__options
                li(v-for="(option, index) in orderOptions" :key="`opt_${index}`")
                    .order_container__option
                        .order_container__option-wrapper-title
                            p.order_container__option-title(v-html="lang === 'ru' ? option.name : option.nameEng")
                            .order_container__option-dot
                            ul.order_container__items(v-if="option.links")
                                li(v-for="(item, index) in option.links" :key="`item_${index}`")
                                    p.order_container__item-name(v-html="lang === 'ru' ? item.name : item.nameEng")
    
</template>
<script>
import { mapState } from 'vuex'
import Order from '~/assets/staticData/order.json'
export default {
    name: 'Order',
    data() {
        return {
            orderOptions: Order.options,
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
    .order_container
        padding-top 117px

        &__title
            line-height 140%

        &__wrapper-options
            position relative
            padding-top 96px

        &__options-line
            position absolute
            top 152px
            left 0
            right 0
            width 1370px
            height 2px
            margin 0 auto
            background url('~assets/img/order/option-line.png') no-repeat

        &__options,
        &__items
            padding 0
            list-style-type none

        &__options
            display flex
            justify-content space-between
            position relative
            max-width 1212px

        &__items
            padding-top 33px

        &__option
            display block

        &__option-title
            font-size 26px
            line-height 150%
            white-space nowrap

        &__option-dot
            width 12px
            height 12px
            margin-top 12px
            margin-bottom 12px
            border 1px solid whiteMain
            border-radius 50%
            background blackBackground


        &__item-name
            font-size 26px
            line-height 150%
            white-space nowrap

            &:hover
                cursor pointer
                color goldNew

        @media only screen and (max-width 1439px)

            &__wrapper-options
                padding-top 40px

            &__options-line
                top 96px
                width 971px

            &__options
                max-width 976px

            &__option-title
                font-size 22px

            &__option-dot
                margin-top 18px

            &__item-name
                font-size 20px
                line-height 160%

        @media only screen and (max-width 1280px)
            padding-top 96px

        @media only screen and (max-width 1000px)

            &__options-line
                top 93px
                width 700px

            &__options
                max-width 747px

            &__option-title
                font-size 20px

            &__item-name
                font-size 18px

</style>
