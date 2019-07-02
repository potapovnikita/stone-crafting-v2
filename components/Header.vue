<template lang="pug">
    div
        #header.menu_container
            .logo_row
                nuxt-link(to="/") Тут будет логотип
                .local
                    span(@click="changeLocal('ru')" :class="{'active': lang === 'ru'}") RU
                    span(@click="changeLocal('eng')" :class="{'active': lang === 'eng'}") ENG

            label
                input(type="checkbox")

                span.hamburger_menu
                    span.hamburger
                .hamburger_menu-items_container
                    .menu_item(v-for="item in menu")
                        nuxt-link(:to="item.link" v-html="lang === 'ru' ? item.name : item.nameEng")
            .menu#menu
                .menu_row
                    .menu_item(v-for="item in menu")
                        nuxt-link(:to="item.link" v-html="lang === 'ru' ? item.name : item.nameEng")

        .header_placeholder(v-if="placeholder")

</template>

<script>
    import { mapMutations, mapState } from 'vuex'
    import Menu from '~/assets/staticData/menu.json'

    import zenscroll from 'zenscroll'

    export default {
        data() {
            return {
                menu: Menu
            }
        },
        props: ['placeholder'],
        computed: {
            ...mapState('localization', [
                'lang',
            ]),
        },
        components: {

        },
        methods: {
            ...mapMutations({
                changeLocal: 'localization/changeLocal'
            }),
            isScrolled(el) {
                return el.scrollTop > 0;
            }
        },
        mounted() {
            const page = document.documentElement
            const pageSafari = document.body
            const header = document.getElementById('header')
            const menu = document.getElementById('menu')

            document.addEventListener('scroll', () => {
                if (this.isScrolled(page) || this.isScrolled(pageSafari)) header.classList.add('header_scrolled')
                else header.classList.remove('header_scrolled')
            })
            // // for parallax effect
            // window.addEventListener('scroll', () => {
            //     const scrollPosition = window.pageYOffset
            //     let bgParallax = document.getElementsByClassName('header_container')[0]
            //     const limit = bgParallax.offsetTop + bgParallax.offsetHeight
            //
            //     if (scrollPosition > bgParallax.offsetTop && scrollPosition <= limit){
            //         bgParallax.style.backgroundPositionY = (50 - 100 * scrollPosition/limit) + '%'
            //     } else {
            //         bgParallax.style.backgroundPositionY = '50%'
            //     }
            // });
        }
    }

</script>

<style lang="stylus">
    .header_placeholder
        min-height 150px

    .menu_container
        color whiteMain
        position fixed
        top 0
        left 0
        right 0
        z-index 1000

        &:before
        &:after
            position absolute
            top 0
            bottom -15px
            right: 0
            left 0
            z-index 2
            content ''

        &:before
            background-image linear-gradient(to top, rgba(18, 0, 0, 0), rgba(18, 0, 0, 0.9) 50%)

        &:after
            opacity 0
            background-image linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.01) 1%, rgba(255, 255, 255, 0.9) 80%)

        &.header_scrolled
            .menu
                transform translateY(-40px)
                opacity 0
            &:hover
                .menu
                    transform translateY(0px)
                    opacity 1

    .logo_row
        position relative
        display flex
        justify-content center
        padding-top 20px
        font-family $FuturaFont
        font-size $FontSizeMenu
        color whiteMain
        height 50px
        z-index 3

        .local
            right 30px
            position absolute
            cursor pointer
            text-transform uppercase

            span
                opacity 0.6

                &:first-child
                    margin-right 5px

                &:hover
                    opacity 1

            .active
                opacity 1
    .menu
        display flex
        width 100%
        justify-content center
        margin-top 20px
        padding 0 118px
        font-family $FuturaFont
        font-size $FontSizeMenu
        color whiteMain
        font-weight bold
        letter-spacing 0.3px
        height 50px
        transition all .6s
        z-index 3
        position relative

        &_item
            padding 10px 15px
            white-space nowrap
            position relative
            text-align center

            &:hover
                text-decoration underline
                cursor pointer

        .menu_row
            width 40%
            display flex
            align-items center
            justify-content center


    // hamburger menu
    label
        display none

    label .hamburger_menu
        position absolute
        left -100px
        top -100px
        z-index 100
        width 200px
        height 200px
        border-radius 50% 50% 50% 50%
        transition .5s ease-in-out
        box-shadow 0 0 0 0 #000, 0 0 0 0 #000
        cursor pointer

    label .hamburger
        position absolute
        top 135px
        right 50px
        width 35px
        height 2px
        background whiteMain
        display block
        transform-origin center
        transition .5s ease-in-out

    label .hamburger:after, label .hamburger:before
        transition .5s ease-in-out
        content ""
        position absolute
        display block
        width 100%
        height 100%
        background whiteMain

    label .hamburger:before
        top -10px

    label .hamburger:after
        bottom -10px

    label input
        display none

    label input:checked + .hamburger_menu
        box-shadow 0 0 0 100vw #000, 0 0 0 100vh #000
        border-radius 0
        background #000

    label input:checked + .hamburger_menu .hamburger
        transform rotate(45deg)
        background whiteMain

    label input:checked + .hamburger_menu .hamburger:after
        transform rotate(90deg)
        bottom: 0
        background whiteMain

    label input:checked + .hamburger_menu .hamburger:before
        transform rotate(90deg)
        top: 0
        background whiteMain


    label input:checked + .hamburger_menu + .hamburger_menu-items_container
        opacity 1
        visibility visible
        transition visibility .1s ease-in, opacity .2s
        transition-delay .2s

    .hamburger_menu-items_container
        position absolute
        opacity 0
        width 100%
        top 200px
        font-family $FuturaFont
        font-size $FontSizeMenuMobile
        color whiteMain
        font-weight bold
        letter-spacing 0.3px
        visibility hidden

        .menu_item
            text-align center
            color whiteMain
            z-index 101

    @media only screen and (max-width 1200px)
        .menu
            .menu_row
                justify-content center

    @media only screen and (max-width 767px)
        label
            display block

        .menu
            display none
            justify-content space-around

        .header_placeholder
            display none

</style>
