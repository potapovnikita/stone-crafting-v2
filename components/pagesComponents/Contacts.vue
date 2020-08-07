<template lang="pug">
    .common-container.contacts-container
        h1(v-html="lang === 'ru' ? 'Контакты' : 'Contacts'")

        .contact
            .caption {{lang === 'ru' ? 'Телефон' : 'Phone number'}}:
            a.item(:href="'tel:' + contacts.phoneMain") {{contacts.phoneMain}}

        .contact
            .caption {{ lang === 'ru' ? 'E-mail ' : 'E-mail' }}:
            a.item(v-if="contacts.email" :href="'mailto:' + contacts.email") {{contacts.email}}

        .descriptionContact
            .people(v-for="(item, index) in contacts.peoples")
                img.photo(v-if="item.img" :src="getImg(item.img)")
                .text
                    .name(v-html="lang === 'ru' ? item.name : item.nameEng")
                    .role(v-html="lang === 'ru' ? item.role : item.roleEng")
                    a.phone(:href="'tel:' + item.phone") {{item.phone}}
                        |
                    a.email(v-if="item.email" :href="'mailto:' + item.email") {{item.email}}

        .addresses
            .item(v-for="address in contacts.adresses" v-html="lang === 'ru' ? address.addressRu : address.addressEng")



</template>

<script>
import { mapState } from 'vuex'
import Contacts from '~/assets/staticData/contacts.json'

export default {
    data() {
        return {
            contacts: Contacts,
        }
    },
    components: {
    },
    computed: {
        ...mapState('localization', [
            'lang',
        ]),
    },
    methods: {
        getImg(url) {
            const imageUrl = require('~/assets/' + `${url}`)
            return url ? `${imageUrl}` : ''
        },
    },
    mounted() {
    }
}
</script>

<style lang="stylus">

.contacts-container
    h1
        padding-bottom 36px

    .contact,
    .addresses
        display flex
        margin 0 auto
        margin-bottom 30px
        width 800px
        font-size $FontSize2

        @media only screen and (max-width 1024px)
            width 100%
            justify-content center

        .caption
            display inline-flex
            margin-right 15px

    .addresses
        flex-direction column
        text-align  left
        .item
            margin-bottom 20px


    .descriptionContact
        display flex
        flex-direction column
        align-items: center
        margin-top 40px
        margin-bottom 50px

        @media only screen and (max-width 660px)
            margin-bottom 30px

            .photo
                margin-bottom 20px

        .people
            display flex
            flex-direction row
            align-items center
            width 800px
            margin-bottom 40px

            @media only screen and (max-width 1024px)
                width 500px
                justify-content center

            .photo
                width 200px
                max-width 200px
                min-height 200px

                @media only screen and (max-width 600px)
                    width 100px
                    height 100px
                    max-width 100px
                    min-height 100px

            .text
                min-width 300px
                text-align left
                padding 0 30px 20px
                font-family $IntroRegular
                font-size $FontSize16

                @media only screen and (max-width 600px)
                    width 300px


                .name
                    font-size $FontSize2
                    margin-bottom 15px

                .role,
                .phone,
                .email
                    display block
                    margin-bottom 10px


</style>
