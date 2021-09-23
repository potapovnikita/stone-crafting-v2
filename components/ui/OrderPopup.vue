<template lang="pug">
    .popup-wrapper
        .popup_overlay(:class="{'popup-close': !isOpened}")
            .close_btn(@click="onClose")
                    CloseLogo
            .popup_container(:class="{'popup-close': !isOpened}" v-click-outside="onClickOutside")
                .popup_inner-container
                    Feedback(v-if="isOpened")

</template>

<script>
    import { mapMutations, mapState } from 'vuex'
    import vClickOutside from 'v-click-outside'

    import CloseLogo from '~/assets/img/close.svg'
    import Feedback from '@/components/Feedback'

    export default {
        name: 'Popup',
        data() {
            return {

            }
        },
        directives: {
            clickOutside: vClickOutside.directive
        },
        components: {
            CloseLogo,
            Feedback,
        },

        methods: {
            ...mapMutations({
                onClose: 'orderPopup/onClose'
            }),
            onClickOutside (event) {
                // if(this.isOpenPopup) this.$emit('close')
            }
        },
        computed: {
            ...mapState('localization', [
                'lang',
            ]),
            ...mapState('orderPopup', [
                'isOpened',
            ]),
        },
        watch: {
            isOpened(val) {
                console.log('val', val)
            }
        }
    }

</script>

<style lang="stylus">
    .popup-wrapper
        .popup-close
            visibility hidden

            .popup_overlay
                opacity 0

    .popup_overlay
        z-index 1001
        position fixed
        top 0
        bottom 0
        left 0
        right 0
        background-color blackBackground
        opacity 1
        transition opacity .3s linear
        overflow-y scroll
        height 100%

        .close_btn
            svg
                position absolute
                right 35px
                top 33px
                cursor pointer
                fill whiteMain
                opacity 0.7

                &:hover
                    opacity 1

        .popup_container
            margin 130px auto
            text-align center
            width 806px
            opacity 1
            //transition all .5s ease-in-out
            border 1px solid rgba(255, 255, 255, 0.31)
            box-sizing border-box

            &.popup-close
                opacity 0
                //transform translateY(55%) scale(.9)
                visibility hidden
            .popup_inner-container
                position relative
                background blackBackground
                padding 60px 30px 50px

            h2.title-popup
                color whiteMain

        @media only screen and (max-width 1280px)
            .popup_container
                margin 55px auto
                width 688px

                .popup_inner-container
                    padding 34px 30px 47px

        @media only screen and (max-width 850px)
            .popup_container
                margin 150px auto
                width 354px

                .popup_inner-container
                    padding 40px 15px 37px

        @media only screen and (max-width 850px) and (max-height 760px)
            .popup_container
                overflow scroll

        @media only screen and (max-width 850px) and (max-height 450px)
            .popup_container
                margin 30px auto

        @media only screen and (max-width 420px)
            .popup_overlay
                .close_btn
                    svg
                        right 15px
                        top 28px

</style>
