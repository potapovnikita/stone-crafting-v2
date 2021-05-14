<template lang="pug">
    .common-container.contacts-container
        h1(v-html="lang === 'ru' ? 'Контакты' : 'Contacts'")

        .contact
            .caption {{lang === 'ru' ? 'Телефоны' : 'Phone numbers'}}:
            .item
                a(:href="'tel:' + contacts.phoneMain") {{contacts.phoneMain}}
                a(:href="'tel:' + contacts.phoneMain2") {{contacts.phoneMain2}}

        .contact
            .caption
                nobr {{ lang === 'ru' ? 'E-mail ' : 'E-mail' }}:
            a.item(v-if="contacts.email" :href="'mailto:' + contacts.email") {{contacts.email}}

        .descriptionContact
            .people(v-for="(item, index) in contacts.peoples")
                img.photo(v-if="item.img" :src="getImg(item.img)")
                .text
                    .name(v-html="lang === 'ru' ? item.name : item.nameEng")
                    .role(v-html="lang === 'ru' ? item.role : item.roleEng")
                    a.phone(v-if="item.phone" :href="'https://api.whatsapp.com/send?phone=' + item.phone + '&text=%20' + ' '" target="_blank")
                        .icon
                            Whatsapp
                    a.email(v-if="item.email" :href="'mailto:' + item.email") {{item.email}}

            .people
                img.icon(:src="getImg('img/chamovskih.png')")
                .text
                    .name(v-if="lang === 'ru'") Ювелирный дом CHAMOVSKIKH
                    .name(v-else) CHAMOVSKIKH Jewelry House
                    .role(v-if="lang === 'ru'") Партнер и эксклюзивный дистрибьютор Камнерезного Дома "ANTONOV" на федеральном уровне. Чтобы оформить заказ в Екатеринбурге, обратитесь к специалистам Дома Антонова. Оформить заказ из другого региона помогут представители CHAMOVSKIKH.
                    .role(v-else) The partner and exclusive distributor of the Stone-crafting House by "ANTONOV" at the federal level.
                    a.phone(href="tel:88002349922") 8 (800) 234-99-22
                    a.email(href="https://chamovskikh.com/" target="_blank") www.chamovskikh.com


        .addresses
            h3(v-html="lang === 'ru' ? contacts.adresses[0].addressNameRu : contacts.adresses[0].addressNameEng")
            .itemAdd(v-html="lang === 'ru' ? contacts.adresses[0].addressRu : contacts.adresses[0].addressEng")

        .videoVirtual
            iframe(
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/kKuR4VxWJ44?rel=0&showinfo=0"
                frameborder="0"
                allow="accelerometer;autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                :hl="lang === 'ru' ? 'ru' : 'en'"
            )

        .addresses
            h3(v-html="lang === 'ru' ? contacts.adresses[1].addressNameRu : contacts.adresses[1].addressNameEng")
            .itemAdd(v-html="lang === 'ru' ? contacts.adresses[1].addressRu : contacts.adresses[1].addressEng")

        .museumButton
            .button(@click="$nuxt.$router.push({path:`/virtual-museum`})") {{lang === 'ru' ? 'Посетить виртуальный музей' : 'Visit virtual museum'}}


</template>

<script>
import { mapState } from 'vuex'
import Contacts from '~/assets/staticData/contacts.json'
import Whatsapp from '~/assets/img/contacts/whatsapp.svg'


export default {
    data() {
        return {
            contacts: Contacts,

        }
    },
    components: {
        Whatsapp,
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
        justify-content center
        flex-wrap wrap
        margin 0 auto
        margin-bottom 30px
        width 800px
        font-size $FontSize2

        h3
            text-align center
            margin-bottom 15px

        @media only screen and (max-width 1024px)
            width 100%
            justify-content center

        @media only screen and (max-width 400px)
            flex-direction column
            align-items center

        .caption
            display inline-flex
            margin-right 15px
            margin-bottom 10px

        .item
            display flex
            flex-direction column
            align-items flex-start

            a
                margin-bottom 10px

    .addresses
        flex-direction column
        .itemAdd
            margin-bottom 20px
            display flex
            justify-content center
            text-align center


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
            justify-content center
            align-items center
            width 800px
            margin 0 auto
            margin-bottom 40px
            padding 0 15px

            @media only screen and (max-width 1024px)
                width 500px
                justify-content center

            @media only screen and (max-width 600px)
                width 100%
                justify-content center
            .icon
                width 200px

                @media only screen and (max-width 600px)
                    width 100px

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
                min-width 700px
                max-width 700px
                text-align left
                padding 0 30px 20px
                font-family $IntroRegular
                font-size $FontSize16

                @media only screen and (max-width 1024px)
                    min-width 500px
                    max-width 500px
                    justify-content center

                @media only screen and (max-width 700px)
                    max-width 250px
                    min-width 240px
                    padding 0 15px 20px
                    font-size $FontSizeMenu

                @media only screen and (max-width 400px)
                    min-width 200px
                    max-width 200px

                @media only screen and (max-width 350px)
                    font-size 14px


                .name
                    font-size $FontSize2
                    margin-bottom 15px

                .role,
                .phone,
                .email
                    display block
                    margin-bottom 10px
                .phone
                    display inline-flex
                    align-items center
                    .icon
                        svg
                            width 25px
                            height 25px

    .museumButton
        .button
            margin-bottom 60px
            font-size $FontSize3
            width 260px
            text-align center
            cursor pointer
            border 1px solid white
            padding 20px 30px
            color white
            background-color inherit
            transition background-color .3s ease, color .3s ease

            &:hover
                color black
                background-color white

    .videoVirtual
        margin-bottom 30px

        video
        iframe
            background black
            height 400px
            max-width 700px
            @media only screen and (max-width 500px)
                height 250px

            @media only screen and (max-width 400px)
                height 210px

</style>
