<template lang="pug">
    .header_wrapper
        OrderPopup
        #header.menu_container
            .logo_row
                nuxt-link(to="/")
                    img.logo(src="~/assets/img/logo_antonov_white.png" alt="Logo")

                .local
                    span(@click="changeLocal('ru')" :class="{'active': lang === 'ru'}") RU
                    span(@click="changeLocal('eng')" :class="{'active': lang === 'eng'}") EN

            label
                input#inputMenu(type="checkbox")

                span.hamburger_menu
                    span.hamburger_menu__label {{ lang === 'ru' ? 'меню' : 'menu' }}
                    span.hamburger
                .hamburger_menu-items_container()
                    .wrapper_items
                        nuxt-link.menu_item(v-for="item in menu" :to="item.link" :key="item.link")
                            div(v-html="lang === 'ru' ? item.name : item.nameEng" @click="clickMenu(item.link)")
                            div.second-name(v-if="item.secondName" v-html="lang === 'ru' ? item.secondName : item.secondNameEng" @click="clickMenu(item.link)")

</template>

<script>
    import { mapMutations, mapState } from 'vuex'
    import Menu from '~/assets/staticData/menu.json'
    import axios from "axios";
    import { getLang } from "../store/localization";
    import OrderPopup from '@/components/ui/OrderPopup'

    export default {
        data() {
            return {
                menu: Menu,
            }
        },
        components: {
            OrderPopup,
        },
        props: ['placeholder'],
        computed: {
            ...mapState('localization', [
                'lang',
            ]),
        },
        methods: {
            ...mapMutations({
                changeLocal: 'localization/changeLocal'
            }),
            clickMenu(url) {
                if (url === window.location.pathname) {
                    document.getElementById('inputMenu').click()
                }
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
                if(getLang()) this.changeLocal(getLang())
                else {
                    const navigator = window.navigator
                    let lang= '';
                    if (navigator && navigator.language) {
                        console.log('navigator.language', navigator.language)
                        if (navigator.language.slice(0, 2) === 'ru') lang = 'ru'
                        else lang = 'eng'
                    } else lang = await this.getLangSrv()

                    this.changeLocal(lang)
                }

            }

        }
    }

</script>

<style lang="stylus" scoped>
    .header_wrapper
        position relative

    .menu_container
        color whiteMain
        position fixed
        top 0
        left 0
        right 0
        z-index 1000

    .logo_row
        position relative
        display flex
        justify-content center
        padding-top 30px
        font-family $TenorSans-Regular
        font-size $FontSizeMenu
        line-height 140%
        text-transform uppercase
        color whiteMain
        height 50px
        z-index 3
        transition all .6s

        .logo
            font-size 0

        .local
            top 40px
            left 40px
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

    // hamburger menu

    label .hamburger_menu__label
        position absolute
        top 143px
        left -30px
        font-family $TenorSans-Regular
        font-size $FontSizeMenu
        line-height 140%
        text-transform uppercase
        transition .5s ease-in-out

    label .hamburger_menu
        position absolute
        top -100px
        right -100px
        z-index 100
        width 200px
        height 200px
        border-radius 50% 50% 50% 50%
        transition .5s ease-in-out
        box-shadow 0 0 0 0 #000
        cursor pointer

    label .hamburger
        position absolute
        top 145px
        right 140px
        width 26px
        height 2px
        background whiteMain
        display block
        transform-origin center
        transition .5s ease-in-out

    label .hamburger:after
        transition .5s ease-in-out
        content ""
        position absolute
        display block
        width 100%
        height 100%
        background whiteMain

    label .hamburger:after
        bottom -10px

    label input
        display none

    label input:checked + .hamburger_menu
        box-shadow 0 0 0 100vw rgba(0, 0, 0, 0.86)
        border-radius 0
        background rgba(0, 0, 0, 0.86)

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

    label input:checked + .hamburger_menu .hamburger_menu__label
        opacity 0

    label input:checked + .hamburger_menu + .hamburger_menu-items_container
        opacity 1
        visibility visible
        transition visibility .1s ease-in, opacity .2s
        transition-delay .2s
        z-index 101

    .hamburger_menu-items_container
        display flex
        justify-content center
        align-items center
        position absolute
        top 0
        opacity 0
        width 100%
        height 100vh
        font-family $TenorSans-Regular
        font-size 30px
        line-height 42px
        color whiteMain
        visibility hidden

        .wrapper_items
            & > a + a
                margin-top 30px

        .menu_item
            display flex
            flex-direction column
            text-align center
            z-index 101
            span
            a
                color whiteMain

                &:hover
                    color goldNew
            .second-name
                font-size 21px

    @media only screen and (max-width 1200px)
        .menu
            .menu_row
                font-size $FontSizeMenuTablet
                justify-content center

    @media only screen and (max-width 900px) and (max-height 500px)
        .logo_row
            padding-top 10px

            .logo
                height 40px

            .local
                top 17px
                left 11px

        .hamburger_menu__label
            display none

        label .hamburger_menu
            top -80px
            right -80px
            width 160px
            height 160px

        label .hamburger
            top 101px
            right 91px

        .hamburger_menu-items_container
            font-size 16px
            line-height 35px

            .wrapper_items
                & > a + a
                    margin-top 5px

    @media only screen and (max-width 768px)
        .logo_row
            padding-top 10px

            .logo
                height 40px

            .local
                top 17px
                left 11px

        .hamburger_menu__label
            display none

        label .hamburger_menu
            top -80px
            right -80px
            width 160px
            height 160px

        label .hamburger
            top 101px
            right 91px

        label input:checked + .hamburger_menu
            box-shadow 0 0 0 100vh rgba(0, 0, 0, 0.86)

        .hamburger_menu-items_container
            font-size 16px

            .wrapper_items
                & > a + a
                    margin-top 10px

    @media only screen and (max-width 767px) and (max-height 500px)
        label input:checked + .hamburger_menu
            box-shadow 0 0 0 100vw rgba(0, 0, 0, 0.86)

    @media only screen and (max-width 767px) and (max-height 350px)

        .hamburger_menu-items_container
            font-size 16px

            .wrapper_items
                & > a + a
                    margin-top 3px

</style>
