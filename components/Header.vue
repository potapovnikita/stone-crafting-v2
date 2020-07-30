<template lang="pug">
    div
        #header(:class="{'menu_container-reverse': reverse, 'menu_container': !reverse}")
            .logo_row(:class="{'reverse': reverse}")
                nuxt-link(to="/" :class="{'reverse': reverse}")
                    .logo(:class="{'reverse': reverse}")
                        MainLogoRed(v-if="reverse")
                        MainLogoWhite(v-else)

                .local
                    span(@click="changeLocal('ru')" :class="{'active': lang === 'ru'}") RU
                    span(@click="changeLocal('eng')" :class="{'active': lang === 'eng'}") ENG

            label
                input(type="checkbox")

                span.hamburger_menu(:class="{'reverse': reverse}")
                    span.hamburger(:class="{'reverse': reverse}")
                .hamburger_menu-items_container
                    nuxt-link.menu_item(v-for="item in menu" :to="item.link" :key="item.link")
                        span(v-html="lang === 'ru' ? item.name : item.nameEng" :class="{'reverse': reverse}")
            .menu#menu(:class="{'reverse': reverse}")
                .menu_row
                    .menu_item(v-for="item in menu")
                        nuxt-link(:to="item.link" v-html="lang === 'ru' ? item.name : item.nameEng" :class="{'reverse': reverse}")

        .header_placeholder(v-if="placeholder")

</template>

<script>
    import { mapMutations, mapState } from 'vuex'
    import Menu from '~/assets/staticData/menu.json'
    import MainLogoRed from '~/assets/img/logo_antonov_red_new.svg'
    import MainLogoWhite from '~/assets/img/logo_antonov_white_new.svg'
    import axios from "axios";
    import { getLang } from "../store/localization";

    export default {
        data() {
            return {
                menu: Menu,
                curScroll: 0,
            }
        },
        props: ['placeholder', 'reverse'],
        computed: {
            ...mapState('localization', [
                'lang',
            ]),
        },
        components: {
            MainLogoWhite,
            MainLogoRed,
        },
        methods: {
            ...mapMutations({
                changeLocal: 'localization/changeLocal'
            }),
            isScrolled(el) {
                return el.scrollTop > 0;
            },
            getScroll(el) {
                return el.scrollTop;
            },
            async getLangSrv() {
                if (getLang()) return getLang()
                const { data } = await axios.get('http://api.ipstack.com/check?access_key=4d12c4ce0a213074e07c1091f228a2e3')
                if (data) {
                    console.log(data)
                    return data.country_code === 'RU' ? 'ru' : 'eng'
                }
                else return 'ru'
            }
        },
        async mounted() {
            const page = document.documentElement
            const pageSafari = document.body
            const header = document.getElementById('header')

            if (!this.lang) {
                const lang = await this.getLangSrv()
                this.changeLocal(lang)
            }

            document.addEventListener('scroll', () => {
                if (this.isScrolled(page) || this.isScrolled(pageSafari)) header.classList.add('header_scrolled')
                else header.classList.remove('header_scrolled')

                const newScroll = page
                    ? this.getScroll(page)
                    : this.getScroll(pageSafari)

                if (newScroll < this.curScroll) {
                    header.classList.contains('header_scrolled') && header.classList.remove('header_scrolled')
                }

                this.curScroll = newScroll
            })
        }
    }

</script>

<style lang="stylus">
    .header_placeholder
        min-height 150px

    .menu_container-reverse
        color blackRed
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
            /*background-image backgroundReverse*/
            background-image linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 243, 237, 0.9) 50%)

        &:after
            opacity 0
            /*background-image backgroundReverse*/
            background-image linear-gradient(to top, rgba(255, 255, 255, 0), backgroundReverse 100%)

        &.header_scrolled
            .menu
                transform translateY(-40px)
                opacity 0
            &:hover
                .menu
                    transform translateY(0px)
                    opacity 1

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
            right 0
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
        font-family $IntroRegularCaps
        font-size $FontSizeMenu
        text-transform uppercase
        color whiteMain
        height 50px
        z-index 3
        transition all .6s

        &.reverse
            color darkRed
        .logo
            svg
                height 60px
                width 200px

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
        margin-top 45px
        padding 0 118px
        font-family $IntroRegularCaps
        font-size $FontSizeMenu
        text-transform uppercase
        color whiteMain
        font-weight bold
        letter-spacing 0.3px
        height 50px
        transition all .6s
        z-index 3
        position relative

        &.reverse
            color darkRed

        &_item
            padding 10px 15px
            white-space nowrap
            position relative
            text-align center
            opacity 0.8
            line-height 1.4

            @media only screen and (max-width 820px)
                padding 10px 8px

            &:hover
                opacity 1
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

    label .hamburger_menu.reverse
        box-shadow 0 0 0 0 darkRed, 0 0 0 0 darkRed

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

    label .hamburger.reverse
        background darkRed

    label .hamburger.reverse:after, label .hamburger.reverse:before
        transition .5s ease-in-out
        content ""
        position absolute
        display block
        width 100%
        height 100%
        background darkRed

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

    label input:checked + .hamburger_menu.reverse
        box-shadow 0 0 0 100vw darkRed, 0 0 0 100vh darkRed
        border-radius 0
        background darkRed

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
        font-family $IntroRegularCaps
        font-size $FontSizeMenuMobile
        color whiteMain
        font-weight bold
        letter-spacing 0.3px
        visibility hidden

        .menu_item
            display flex
            flex-direction column
            text-align center
            color whiteMain !important
            z-index 101
            span
            a
                color whiteMain !important

    @media only screen and (max-width 1200px)
        .menu
            .menu_row
                font-size $FontSizeMenuTablet
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
