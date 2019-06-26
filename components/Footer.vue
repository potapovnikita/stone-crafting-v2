<template lang="pug">
    .footer_container
        .footer_menu
            .item(v-for="item in menu")
                nuxt-link(:to="item.link" v-html="lang === 'ru' ? item.name : item.nameEng")
        .footer_line
        .footer_block
            .column
                .item {{contacts.phoneMain}}
                .item {{contacts.email}}
                .item.icons
                    a.icon.youtube(:href="contacts.inst")
                    a.icon.instagram(:href="contacts.inst")
                    a.icon.facebook(:href="contacts.inst")


            .column.address_column
                .title {{lang === 'ru' ? 'Адреса салонов' : 'Addresses of salons' }}:
                .addresses
                    .item {{lang === 'ru' ? contacts.addressRu : contacts.addressEng}}
                    .item {{lang === 'ru' ? contacts.addressRu : contacts.addressEng}}
                    .item {{lang === 'ru' ? contacts.addressRu : contacts.addressEng}}

        .copyright © Stone-crafting House by Alexey Antonov


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
        padding 30px 60px
        align-items center

        .footer_menu
            display flex
            flex-direction row
            align-items center
            justify-content center
            padding 10px 20px
            margin-bottom 30px
            .item
                text-align center
                cursor pointer
                padding 10px 15px

                &:hover
                    text-decoration underline

        .footer_line
            height 1px
            width 20%
            background-color silverMain
            margin-bottom 20px

        .footer_block
            width 100%
            display flex
            justify-content space-around
            padding 10px 20px

            .column
                display flex
                flex-direction column
                .item
                    margin-bottom 5px
                    &.icons
                        margin-top 10px
                        display flex
                        align-items center
                    .icon
                        opacity 0.5
                        display block
                        margin-right 10px

                        &:hover
                            cursor pointer
                            opacity 1

                        &.youtube
                            width 21px
                            height 15px
                            background url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 31 22' fill='%23fff'%3E%3Cpath class='st0' d='M30.69 4.8s-.3-2.14-1.23-3.08C28.28.49 26.96.48 26.35.41 22.01.1 15.51.1 15.51.1h-.01S8.99.1 4.65.41c-.61.07-1.93.08-3.11 1.31C.61 2.67.31 4.8.31 4.8S0 7.31 0 9.82v2.35c0 2.51.31 5.02.31 5.02s.3 2.14 1.23 3.08c1.18 1.23 2.73 1.2 3.42 1.33 2.48.23 10.54.3 10.54.3s6.51-.01 10.85-.32c.61-.07 1.93-.08 3.11-1.31.93-.94 1.23-3.08 1.23-3.08s.31-2.51.31-5.02V9.82c0-2.51-.31-5.02-.31-5.02zM11.94 15.08V6.23l8.71 4.44-8.71 4.41z'/%3E%3C/svg%3E") no-repeat
                        &.instagram
                            width 22px
                            height 22px
                            background url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 22 22' fill='%23fff'%3E%3Cpath d='M11 1.982c2.937 0 3.285.011 4.445.064 1.072.049 1.655.228 2.043.379.513.2.88.438 1.265.823.385.385.623.751.823 1.265.151.388.33.97.379 2.043.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445c-.049 1.072-.228 1.655-.379 2.043-.2.513-.438.88-.823 1.265a3.41 3.41 0 0 1-1.265.823c-.388.151-.97.33-2.043.379-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064c-1.072-.049-1.655-.228-2.043-.379-.513-.2-.88-.438-1.265-.823a3.41 3.41 0 0 1-.823-1.265c-.151-.388-.33-.97-.379-2.043-.052-1.161-.063-1.509-.063-4.446s.011-3.285.064-4.445c.049-1.072.228-1.655.379-2.042.2-.513.438-.88.823-1.265a3.41 3.41 0 0 1 1.265-.823c.388-.151.97-.33 2.043-.379 1.159-.053 1.507-.064 4.444-.064M11 0C8.013 0 7.638.013 6.465.066c-1.171.053-1.97.239-2.67.511a5.412 5.412 0 0 0-1.949 1.269A5.412 5.412 0 0 0 .577 3.795c-.272.7-.458 1.499-.511 2.67C.013 7.638 0 8.013 0 11s.013 3.362.066 4.535c.053 1.171.239 1.97.511 2.67a5.382 5.382 0 0 0 1.269 1.948 5.39 5.39 0 0 0 1.948 1.269c.7.272 1.499.458 2.67.511C7.638 21.987 8.013 22 11 22s3.362-.013 4.535-.066c1.171-.053 1.97-.239 2.67-.511a5.382 5.382 0 0 0 1.948-1.269 5.39 5.39 0 0 0 1.269-1.948c.272-.7.458-1.499.511-2.67.054-1.174.067-1.549.067-4.536s-.013-3.362-.066-4.535c-.053-1.171-.239-1.97-.511-2.67a5.382 5.382 0 0 0-1.269-1.948A5.39 5.39 0 0 0 18.206.578c-.7-.272-1.499-.458-2.67-.511C14.362.013 13.987 0 11 0z'/%3E%3Cpath d='M11 5.351a5.649 5.649 0 1 0 0 11.298A5.649 5.649 0 0 0 11 5.35zm0 9.316a3.667 3.667 0 1 1 0-7.335 3.667 3.667 0 0 1 0 7.335z'/%3E%3Ccircle cx='16.872' cy='5.128' r='1.32'/%3E%3C/svg%3E") no-repeat
                        &.facebook
                            width 12px
                            height 23px
                            background url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 13 23' fill='%23fff'%3E%3Cpath class='st1' d='M11.925 3.906H9.887c-1.596 0-1.895.766-1.895 1.869v2.252h4.003l-.806 3.942H7.993v9.95H4.021v-9.95H.312V8.027h3.709V5.298c0-3.283 2.012-5.074 4.945-5.074 1.401 0 2.609.104 2.959.156v3.526z'/%3E%3C/svg%3E") no-repeat

            .address_column
                flex-direction row

                .title
                    padding-right 10px

        .copyright
            margin-top 20px
            text-align center




    /*@media only screen and (max-width 1200px)*/


    /*@media only screen and (max-width 767px)*/



</style>
