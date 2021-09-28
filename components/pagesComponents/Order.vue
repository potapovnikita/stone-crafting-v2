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
                            .order_container__option-dot.mobile-hide
                            .order_container__wrapper-mobile-option-title
                                .order_container__option-dot.descktop-hide
                                p.order_container__option-title-mb(v-html="lang === 'ru' ? option.name : option.nameEng")
                                .order_container__mobile-option-line(:class="`order_container__mobile-option-line--line-${index}`")

                            ul.order_container__items(v-if="option.links")
                                li(v-for="(item, index) in option.links" :key="`item_${index}`" @click="() => activeOrderId=item.id")
                                    p.order_container__item-name(:class="{active: activeOrderId===item.id}" v-html="lang === 'ru' ? item.name : item.nameEng")

        div(v-for="(orderItem, index) in orderItems" v-if="orderItem.id === activeOrderId" :key="activeOrderId")
            OrderModel(:orderItem="orderItem")
            WorksSteps(v-if="!orderItem.isHiddenWorkSteps" :stages="orderItem.steps" :orderItem="orderItem")

        .order_container__buttons
            Button(
                :classNames="['order_container__btn']"
                :onClick="onOpen"
                disabledPadding
                large
                )
                .order_container__btn-container
                    IndividIcon.icon
                    MbIndividIcon.icon.mb
                    span.text(v-html="lang === 'ru' ? orderButton.name : orderButton.nameEng")
        OrderGallary(:gallaryItems="gallary.items")
        Footer
</template>
<script>
import {mapMutations, mapState} from 'vuex'
import Order from '~/assets/staticData/order.json'
import LargeForms from '~/assets/staticData/orders/items/largeForms.json'
import SmallForms from '~/assets/staticData/orders/items/smallForms.json'
import Sculpture from '~/assets/staticData/orders/items/sculpture.json'
import StoneMosaic from '~/assets/staticData/orders/items/stoneMosaic.json'
import FlorentineMosaic from '~/assets/staticData/orders/items/florentineMosaic.json'
import ArtObjects from '~/assets/staticData/orders/items/artObjects.json'
import Piece from '~/assets/staticData/orders/items/piece.json'
import OrderModel from '@/components/blocksComponents/OrderModel'
import OrderWork from '@/components/blocksComponents/OrderWork'
import WorksSteps from '@/components/blocksComponents/WorksSteps'
import OrderGallary from '@/components/blocksComponents/OrderGallary'
import Gallary from '~/assets/staticData/orders/gallary.json'
import Button from "@/components/ui/Button";
import IndividIcon from '~/assets/img/tradition/individ.svg'
import MbIndividIcon from '~/assets/img/tradition/individ-mb.svg'
import Footer from '~/components/Footer.vue'

export default {
    name: 'Order',
    components: {
        OrderModel,
        OrderWork,
        OrderGallary,
        WorksSteps,
        Button,
        IndividIcon,
        MbIndividIcon,
        Footer,
    },
    data() {
        return {
            orderOptions: Order.options,
            orderButton: Order.button,
            gallary: Gallary,
            activeOrderId: 'stoneMosaic',
            orderItems: [
                LargeForms,
                SmallForms,
                Sculpture,
                StoneMosaic,
                FlorentineMosaic,
                ArtObjects,
                Piece,
            ],
        }
    },
    methods: {
        ...mapMutations({
            onOpen: 'orderPopup/onOpen'
        }),
    },
    computed: {
        ...mapState('localization', [
            'lang',
        ]),
    },
    watch: {
        activeOrderId(newVal) {
            window.location.hash = newVal;
        }
    },
    mounted() {
        if(window.location.hash) this.activeOrderId = window.location.hash.replace('#', '');
        if(this.activeOrderId) window.location.hash = this.activeOrderId;
        console.log('window.location.hash', window.location.hash)
        console.log('this.activeOrderId', this.activeOrderId)
    },
}
</script>
<style lang="stylus">
    .order_container
        position relative
        padding-top 117px
        background url('~assets/img/order/bg-top.png') no-repeat top center, url('~assets/img/order/bg-bottom.png') no-repeat bottom center
        background-size contain

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

        &__wrapper-mobile-option-title
            display none

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

            &.active
                color goldNew

        &__buttons
            display flex
            justify-content center
            margin-top 18px
            margin-bottom 85px

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

            &__buttons
                margin-top 0
                margin-bottom 50px

            &__btn-container
                min-width 466px
                padding 38px 25px 40px

                .icon
                    margin-right 35px

                .text
                    font-size 22px

        @media only screen and (max-width 1024px)

            &__options-line
                top 96px
                background url('~assets/img/order/steps-line-ipad.png') no-repeat

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
                @media only screen and (max-width 340px)
                    font-size 14px

        @media only screen and (max-width 767px)
            padding-top 76px
            background-image url('~assets/img/order/bg-mb.png')
            background-repeat: no-repeat
            background-repeat-y repeat
            background-size contain

            &__title
                line-height 110%

            &__wrapper-options
                padding-top 62px
                padding-left 36px
                padding-right 10px

            &__options-line
                display none

            &__options
                display block
                max-width unset

                & > li + li
                    margin-top 36px

            &__option-title
                display none

            &__option-dot
                &.mobile-hide
                    display none

                flex-shrink 0
                margin-right 15px
                margin-bottom 0
                margin-top 10px

            &__wrapper-mobile-option-title
                display flex
                align-items flex-start
                position relative

            &__option-title-mb
                font-size 22px
                line-height 150%
                text-align left

            &__mobile-option-line
                position absolute
                top 30px
                left 5px
                width 2px

                &--line-0
                    height 122px
                    background url('~assets/img/order/optionsLinesMb/0.png') no-repeat

                &--line-1
                    height 208px
                    background url('~assets/img/order/optionsLinesMb/1.png') no-repeat

                &--line-2
                    height 121px
                    background url('~assets/img/order/optionsLinesMb/2.png') no-repeat


            &__items
                padding-top 13px
                padding-left 28px

            &__item-name
                text-align left
                line-height 40px

            &__buttons
                margin-bottom 58px

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
