<template lang="pug">
    .common-container.contacts-container
        h1(v-html="lang === 'ru' ? 'Контакты' : 'Contacts'")

        a.item(:href="'tel:' + contacts.phoneMain") {{contacts.phoneMain}}
        .item {{contacts.email}}

        .descriptionContact
            .peoples(v-for="(item, index) in contacts.peoples")
                img.photo(v-if="item.img" :src="getImg(item.img)")
                .text
                    .name(v-html="lang === 'ru' ? item.name : item.nameEng")
                    .role(v-html="lang === 'ru' ? item.role : item.roleEng")
                    a.phone(:href="'tel:' + item.phone") {{item.phone}}
                        |
                    .email(v-if="item.email") {{item.email}}

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

    .descriptionContact
        display flex
        flex-direction column
        align-items: center
        margin-bottom 50px


        @media only screen and (max-width 660px)
            flex-direction column-reverse
            align-items: center
            margin-bottom 30px

            .photo
                margin-bottom 20px

        .peoples
            display flex
            flex-direction row
            align-items: flex-start
            width 700px
            .photo
                width 200px
                max-width 200px
                min-height 200px

            .text
                min-width 300px
                text-align left
                padding 0 30px 20px
                font-family $IntroRegular
                font-size $FontSize16


</style>
