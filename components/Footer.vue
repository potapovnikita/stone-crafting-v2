<template lang="pug">
    .footer_container
        .footer_block
            .column
                .item {{contacts.phoneMain}}
                .item {{contacts.email}}
                .item ссылки на соцсети

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


    export default {
        data() {
            return {
                contacts: Contacts
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
        border-top 1px solid grey
        padding 30px 60px

        .footer_block
            display flex
            justify-content space-around
            padding 10px 20px

            .column
                display flex
                flex-direction column

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
