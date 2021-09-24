<template lang="pug">
    .common-container.contacts-container
        .contacts-container__bg-top
        .contacts-container__bg-bottom
        .contacts-container__wrapper
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
                    a.link(:href="item.href.link" target="_blank") {{item.href.name}}
                    p.about(v-html="lang === 'ru' ? item.text : item.textEng")

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
            .videoVirtual
                iframe(
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/BtApR4FS66o?rel=0"
                    frameborder="0"
                    allow="accelerometer;autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    :hl="lang === 'ru' ? 'ru' : 'en'"
                )
            .buttons-panel
                Button(
                    :classNames="['buttons-panel__btn']"
                    :onClick="() => $nuxt.$router.push({path:'/virtual-museum'})"
                    disabledPadding
                    large)
                    .buttons-panel__btn-container
                        MuseumIcon.icon.desktop
                        MuseumMbIcon.icon.mobile
                        MuseumMbSmallIcon.icon.mobile-small
                        span.text {{lang === 'ru' ? 'Посетить\n виртуальный музей' : 'Visit\n virtual museum'}}

        Footer

</template>

<script>
import { mapState } from 'vuex'
import Contacts from '~/assets/staticData/contacts.json'
import Whatsapp from '~/assets/img/contacts/whatsapp.svg'
import Button from "@/components/ui/Button"
import MuseumIcon from '~/assets/img/contacts/museum.svg'
import MuseumMbIcon from '~/assets/img/contacts/museumMb.svg'
import MuseumMbSmallIcon from '~/assets/img/contacts/museumMb-small.svg'
import Footer from '~/components/Footer.vue'

export default {
    data() {
        return {
            contacts: Contacts,

        }
    },
    components: {
        Whatsapp,
        Button,
        MuseumIcon,
        MuseumMbIcon,
        MuseumMbSmallIcon,
        Footer,
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
    position relative
    padding-top 117px
    background linear-gradient(180deg, #111111 0%, rgba(17, 17, 17, 0) 100%)

    &__bg-top
        position absolute
        top 0
        left 0
        right 0
        width 100%
        height 1168px
        background linear-gradient(180deg, #111111 0%, rgba(17, 17, 17, 0) 111.47%), url('~assets/img/contacts/bg-top.png') no-repeat top center
        background-size cover

    &__bg-bottom
        position absolute
        left 0
        right 0
        bottom 0
        width 100%
        height 953px
        background url('~assets/img/contacts/bg-bottom.png') no-repeat bottom center
        background-size cover

    &__wrapper
        position relative

    .title
        margin-bottom 26px

    .contact-info
        margin-bottom 35px

        .label
            margin-bottom 9px
            font-size 24px
            line-height 140%
            letter-spacing unset
            color #414141

    .info
        font-family $TenorSans-Regular
        font-weight normal
        font-size 30px
        line-height 140%

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
                    line-height 150%

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
                //height 205px
                padding 8px
                margin-bottom 10px
                //border 1px solid rgba(255, 255, 255, 0.07)
                //border-radius 50%

            .text
                margin-bottom 2px

            .about
                font-size 15px
                max-width: 900px

            .link
                font-family $TenorSans-Regular
                font-weight normal
                font-size 18px
                line-height 27px
                text-align center
                letter-spacing 0.03em
                color #fce086

    .addr-name
        margin-top 15px
        margin-bottom 36px
        font-size 26px
        line-height 39px

    .buttons-panel
        margin-bottom 28px

        &__btn-container
            display flex
            justify-content center
            align-items center
            min-width 637px
            padding 50px 45px 64px

            .icon
                margin-right 60px

                &.mobile
                    display none

                &.mobile-small
                    display none

            .text
                font-size 30px
                line-height 130%
                letter-spacing 0.03em
                text-align left
                white-space pre-line
        &__btn
            &:hover
                .icon
                    stroke #222

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

    .wrapper-bg
        position relative

    .bg-bottom
        position absolute
        left 0
        right 0
        bottom 0
        width 100%
        height 953px
        background url('~assets/img/contacts/bg-bottom.png'), linear-gradient(180deg, #111111 0%, rgba(17, 17, 17, 0) 100%)
        background-repeat no-repeat

    @media only screen and (max-width 1440px)

        .double-line
            margin-bottom 52px

        .people-list
            justify-content space-around
            max-width unset
            margin-bottom 50px

            .people
                justify-content space-around
                max-width 485px
                min-width 420px
                width 100%
                margin-bottom 30px

                .photo
                    width 120px
                    height 120px
                    padding 12px

                .text
                    max-width 336px
                    padding 0

                    .name
                        margin-bottom 6px
                        font-size 22px

                    .role
                        margin-bottom 10px
                        font-size 14px
                        line-height 21px

    @media only screen and (max-width 1280px)
        padding-top 96px

        &__bg-top
            height 793px

        &__bg-bottom
            height 580px

        .title
            margin-bottom 11px

        .info
            font-size 26px

        .sub-title
            margin-bottom 36px

        .addr-name
            margin-top 6px
            margin-bottom 30px
            font-size 18px
            line-height 27px

        .buttons-panel
            margin-bottom 91px

            &__btn-container
                min-width 466px
                padding 39px 22px 47px

                .icon
                    width 57px
                    height 57px
                    margin-right 30px

                    &.desktop
                        display none

                    &.mobile
                        display block

                .text
                    font-size 22px

    @media only screen and (max-width 767px)
        padding-top 76px
        background url('~assets/img/contacts/bg-mb.png')
        background-size contain

        &__bg-top
            display none

        &__bg-bottom
            display none

        &__wrapper
            padding 0 12px

        .title
            margin-bottom 40px
            font-size 28px

        .contact-info
            .label
                font-size 22px

        .info
            font-size 20px

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
                max-width unset
                min-width unset
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
                    width auto
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

        .wrapper-bg
            display none

        .buttons-panel
            margin-bottom 68px

            &__btn-container
                min-width unset
                padding 24px 26px 30px

                .icon
                    width 37px
                    height 34px
                    margin-right 35px

                    &.mobile
                        display none

                    &.mobile-small
                        display block

                .text
                    font-size 16px
                    white-space normal

</style>
