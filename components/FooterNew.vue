<template lang="pug">
    .footer_container        
        .footer_block
            .column
                a.item.contacts(:href="'tel:' + contacts.phoneMain" :class="{reverse: reverse}") {{contacts.phoneMain}}
                .item.contacts {{contacts.email}}

            .column(v-for="address in contacts.footerAdresses")
                .item.contacts.title {{ lang === 'ru' ? address.addressNameRu : address.addressNameEng }}
                .item.street(v-html="lang === 'ru' ? address.addressRu : address.addressEng")

        .footer_line
        .footer_block
            .column
                .item.copyright © Stone-crafting House by Alexey Antonov

            .column
                .item.policy
                    nuxt-link(to="/privacy" v-html="lang === 'ru' ? 'Правовая политика' : 'Legal policy'")

            .column
                .item.links
                    a.link(:href="contacts.youtube" target="_blank")
                        | Youtube
                    a.link(:href="contacts.inst" target="_blank")
                        | Instagram
                    nuxt-link.link(to="/news" v-html="lang === 'ru' ? 'Новости' : 'News'")

</template>

<script>
    import { mapState } from 'vuex'
    import Contacts from '~/assets/staticData/contacts.json'
    import Menu from '~/assets/staticData/menu.json'


    export default {
        data() {
            return {
                contacts: Contacts,
                menu: Menu,
            }
        },
        props: ['reverse'],
        computed: {
            ...mapState('localization', [
                'lang',
            ]),
        },
        components: {

        },
        mounted() {

        }
    }
</script>

<style lang="stylus">
    .footer_container
        color whiteMain
        display flex
        flex-direction column
        padding 0 40px
        align-items center
        background rgba(0, 0, 0, 0.64)

        .footer_line
            height 1px
            width 100%
            background-color silverMain

        .footer_block
            width 100%
            display flex
            justify-content space-between
            padding 25px 0
            font-family $TenorSans-Regular
            letter-spacing 0.03em

            .column
                width 320px

                &:last-child
                    text-align right

                .item
                    font-size 14px
                    line-height 21px

                    &.contacts
                        font-size 20px
                        line-height 30px

                        &.title
                            margin-bottom 7px

                    &.street
                        font-size 16px
                        line-height 21px
                        color #8F8F8F

                    &.copyright
                        color #8F8F8F

                    &.policy
                        &:hover
                            text-decoration underline

                    &.links
                        & a + a
                            margin-left 18px

                        .link
                            color goldNew

    @media only screen and (max-width 767px)
        .footer_container
            padding 30px 10px

            .footer_block
                flex-direction column-reverse
                align-items center

                .column
                    text-align center
                    margin-bottom 26px

                    &:last-child
                        text-align center

                    .item
                        &.contacts
                            font-size 16px
                            line-height 24px

                            &.title
                                margin-bottom 14px

</style>
