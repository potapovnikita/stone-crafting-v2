<template lang="pug">
    .common-container.contacts-container
        h1.title(v-html="lang === 'ru' ? 'Контакты' : 'Contacts'")

        .contact-info
            p.label
                | email

            .wrapper-link
                a.info(v-if="contacts.email" :href="'mailto:' + contacts.email") {{contacts.email}}
                .underline

        .contact-info
            p.label {{lang === 'ru' ? 'телефон' : 'phone numbers'}}

            .phones
                a.info(:href="'tel:' + contacts.phoneMain") {{contacts.phoneMain}}
                a.info(:href="'tel:' + contacts.phoneMain2") {{contacts.phoneMain2}}

        h2.sub-title {{lang === 'ru' ? 'Официальные представители:' : 'Official representatives'}}

        .double-line
        div
            .people-list
                .people(v-for="(item, index) in contacts.peoples")
                    img.photo(v-if="item.img" :src="getImg(item.img)")
                    .text
                        h3.name(v-html="lang === 'ru' ? item.name : item.nameEng")
                        p.role(v-html="lang === 'ru' ? item.role : item.roleEng")

                        .wrapper-people-contact
                            .wrapper-link
                                a.email(v-if="item.email" :href="'mailto:' + item.email") {{item.email}}
                                .underline

                            a.phone(v-if="item.phone" :href="'https://api.whatsapp.com/send?phone=' + item.phone + '&text=%20' + ' '" target="_blank")
                                Whatsapp
        
        .info {{ lang === 'ru' ? 'Партнеры' : 'Partners' }}

        .partner-list(v-if="contacts.partners")
            .partner(v-for="(item, index) in contacts.partners")
                img.photo(:src="getImg(item.img)" alt="partner")
                p.text(v-html="lang === 'ru' ? item.name : item.nameEng")
                a.link(:href="item.href" target="_blank") {{item.href}}
        
        h2(v-html="lang === 'ru' ? contacts.adresses[0].addressNameRu : contacts.adresses[0].addressNameEng")
        h3.addr-name(v-html="lang === 'ru' ? contacts.adresses[0].addressRu : contacts.adresses[0].addressEng")
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

        h2(v-html="lang === 'ru' ? contacts.adresses[1].addressNameRu : contacts.adresses[1].addressNameEng")
        h3.addr-name(v-html="lang === 'ru' ? contacts.adresses[1].addressRu : contacts.adresses[1].addressEng")

        Button(@click="$nuxt.$router.push({path:`/virtual-museum`})" large) {{lang === 'ru' ? 'Посетить виртуальный музей' : 'Visit virtual museum'}}

        .museumButton
            .button(@click="$nuxt.$router.push({path:`/virtual-museum`})") {{lang === 'ru' ? 'Посетить виртуальный музей' : 'Visit virtual museum'}}


</template>

<script>
import { mapState } from 'vuex'
import Contacts from '~/assets/staticData/contacts.json'
import Whatsapp from '~/assets/img/contacts/whatsapp.svg'
import Button from "@/components/ui/Button"


export default {
    data() {
        return {
            contacts: Contacts,

        }
    },
    components: {
        Whatsapp,
        Button
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
    background url('~assets/img/contacts/bg-top.png') no-repeat
    background-size contain

    .title
        line-height 73px
        margin-bottom 26px

    .contact-info
        margin-bottom 35px

        .label
            margin-bottom 9px
            font-size 24px
            line-height 34px
            letter-spacing unset
            color #414141

    .info
        font-family $TenorSans-Regular
        font-weight normal
        font-size 30px
        line-height 42px

    .wrapper-link
        display inline-block

        .underline
            width 100%
            height 1px
            background goldNew
    
    .phones
        margin-bottom 12px
        a + a
            margin-left 30px

    .sub-title
        margin-bottom 18px

    .double-line
        width 100px
        height 4px
        margin 0 auto
        margin-bottom 21px
        border 1px solid goldNew
        border-left none
        border-right none

    .people-list
        display flex
        align-items center
        justify-content space-between
        flex-wrap wrap
        max-width 1430px
        margin-bottom 60px

        .people
            display flex
            flex-direction row
            justify-content space-between
            align-items flex-start
            width 670px
            margin-bottom 30px

            .photo
                width 235px
                height 235px
                padding 24px
                border 1px solid rgba(255, 255, 255, 0.07)
                border-radius 50%

            .text
                width 396px
                padding-top 30px
                text-align left

                .name
                    margin-bottom 18px
                    font-size 26px
                    line-height 39px

                .role
                    margin-bottom 22px
                    text-align left

                .wrapper-people-contact
                    display flex
                    align-items center

                    .email
                        font-family $TenorSans-Regular
                        font-weight normal
                        font-size 16px
                        line-height 24px
                        letter-spacing 0.03em
                        color whiteMain

                    .phone
                        font-size 0
                        margin-left 30px

    .partner-list
        margin-bottom 76px

        .partner
            display block
            margin 25px 0

            .photo
                width 205px
                height 205px
                padding 8px
                margin-bottom 10px
                border 1px solid rgba(255, 255, 255, 0.07)
                border-radius 50%

            .text
                margin-bottom 2px

            .link
                font-family $TenorSans-Regular
                font-weight normal
                font-size 18px
                line-height 27px
                text-align center
                letter-spacing 0.03em
                color whiteMain

    .addr-name
        margin-top 15px
        margin-bottom 36px
        font-size 26px
        line-height 39px

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

    @media only screen and (max-width 767px)
        background url('~assets/img/contacts/bg-mb.png')

        .title
            margin-bottom 40px
            font-size 28px
            line-height 39px

        .label
            font-size 22px
            line-height 31px

        .info
            font-size 20px
            line-height 28px

        .phones
            display flex
            flex-direction column
            margin 0

            a + a
                margin-left 0

        .sub-title
            margin-bottom 24px

        .double-line
            width 50px
            margin-bottom 43px

        .people-list
            display block
            max-width unset
            margin 0 auto
            margin-bottom 60px

            .people
                display block
                width 100%
                margin-bottom 30px

                .photo
                    width 193px
                    height 193px
                    padding 20px

                .text
                    width 100%
                    padding 0
                    text-align center

                    .name
                        margin-bottom 12px
                        font-size 22px
                        line-height 33px

                    .role
                        margin-bottom 18px
                        font-size 18px
                        line-height 27px
                        text-align center

                    .wrapper-people-contact
                        justify-content center

        .partner-list
            margin-bottom 50px

            .partner
                .photo
                    width 193px
                    height 193px
                    margin-bottom 10px

                .text
                    font-size 18px
                    line-height 27px

        .addr-name
            margin-top 8px
            margin-bottom 34px
            font-size 16px
            line-height 24px

</style>
