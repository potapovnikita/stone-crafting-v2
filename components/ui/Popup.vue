<template lang="pug">
    .popup-wrapper
        .popup_overlay(:class="{'popup-close': !isOpenPopup}")
            .close_btn(@click="$emit('close')")
                    CloseLogo
        .popup_container(:class="{'popup-close': !isOpenPopup}" v-click-outside="onClickOutside")
            .popup_inner-container
                FeedbackNew

</template>

<script>
    import { mapState } from 'vuex'
    import vClickOutside from 'v-click-outside'

    import CloseLogo from '~/assets/img/close.svg'
    import FeedbackNew from '@/components/FeedbackNew'

    export default {
        name: 'Popup',
        data() {
            return {

            }
        },
        props: {
            isOpenPopup: {
                type: Boolean,
                required: true,
            },
        },
        directives: {
            clickOutside: vClickOutside.directive
        },
        components: {
            CloseLogo,
            FeedbackNew,
        },
        methods: {
            onClickOutside (event) {
                console.log('WTF!!!!')
                console.log('isOpenPopup', this.isOpenPopup)
                // if(this.isOpenPopup) this.$emit('close')
            }
        },
        computed: {
            ...mapState('localization', [
                'lang',
            ]),
        },
        async created() {

        },
        mounted() {
        },
    }

</script>

<style lang="stylus">
    .popup-wrapper
        .popup-close
            visibility hidden

            .popup_overlay
                opacity 0

    .popup_overlay
        z-index 1000
        position fixed
        top 0
        bottom 0
        left 0
        right 0
        background-color blackBackground
        opacity 1
        transition opacity .3s linear

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
        text-align center
        z-index 1000
        position fixed
        top 136px
        left calc(50% - 403px)
        width 806px
        opacity 1
        transition all .5s ease-in-out
        border 1px solid rgba(255, 255, 255, 0.31)
        box-sizing border-box

        &.popup-close
            opacity 0
            transform translateY(55%) scale(.9)
            visibility hidden
        .popup_inner-container
            position relative
            background rgba(0, 0, 0, 0.6)
            height 100%
            padding 60px 30px 50px
        
        h2.title-popup
            color whiteMain

    @media only screen and (max-width 767px)
        .popup_container
            top 0
            left 0
            width 100%
            height 100%
            overflow scroll

            .close_btn svg
                transform scale(0.9)

    @media only screen and (max-width 400px)
        .popup_container
            .popup_inner-container
                padding 20px 10px

    @media only screen and (max-height 500px)
        .popup_container
            .popup_inner-container
                height 500px
</style>
