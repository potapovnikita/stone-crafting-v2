<template lang="pug">
    .common-container.about-container
        .about-container__page-bg
        .about-container__page-bg.top1859
        .about-container__page-bg.top3718
        .about-container__page-bg.bottom
        .about-container__bg-top
        .about-container__bg-bottom-right
        h1.about-container__title {{ lang === 'ru' ? 'О Камнерезном Доме' : 'About company' }}
        .about-container__wrapper-description
            .about-container__bg-top-history
            .about-container__description
                .about-container__wrapper-man
                    .about-container__description-pic
                        img.about-container__description-img(src="~/assets/img/about/aleksei2.png" alt="Antonov")
                    .about-container__awards-desktop
                        Awards

                .about-container__description-content
                    about-container__description-title(v-html="lang === 'ru' ? company.aboutTitleRu : company.aboutTitleEng")
                    .about-container__description-double-line
                    p.about-container__description-text(v-html="lang === 'ru' ? company.aboutRu : company.aboutEng")

        .about-container__awards-mobile
            Awards

        HistoryNew

        Mission

        .descriptionAbout.reverse
            .text.left
                h3.descriptionAbout__title(v-html="lang === 'ru' ? company.aboutTitleRu2 : company.aboutTitleEng2")
                p.descriptionAbout__text(v-html="lang === 'ru' ? company.aboutRu2 : company.aboutEng2")
            //img.photo(src="~/assets/img/about/road.png" alt="Antonov")
            .descriptionAbout__images(v-if="company.aboutSlides2")
                ImagesSwitcher(:images="company.aboutSlides2")
                    template(v-slot:default="slotProps")
                        .descriptionAbout__images-controls
                            .descriptionAbout__images-dot(
                                v-for="(item, index) in company.aboutSlides2"
                                :key="`imgDot_${index}`"
                                :class="{'active': index === slotProps.activeImg}"
                                @click="(event) => slotProps.switchTo(index, event)")

        .descriptionAbout
            img.photo(src="~/assets/img/about/joker.png" alt="joker")
            .text
                h3.descriptionAbout__title(v-html="lang === 'ru' ? company.aboutTitleRu3 : company.aboutTitleEng3")
                p.descriptionAbout__text(v-html="lang === 'ru' ? company.aboutRu3 : company.aboutEng3")
                .descriptionAbout__btn-desktop(v-if="company.link3")
                    a(:href="company.link3") {{lang === 'ru' ? 'Подробнее' : 'More'}}
                .descriptionAbout__btn-mobile(v-if="company.link3")
                    .descriptionAbout__line
                    a.descriptionAbout__link(:href="company.link3" v-html="lang === 'ru' ? 'Подробнее' : 'More'")

        .descriptionAbout.reverse
            .text.left
                h3.descriptionAbout__title(v-html="lang === 'ru' ? company.aboutTitleRu4 : company.aboutTitleEng4")
                p.descriptionAbout__text(v-html="lang === 'ru' ? company.aboutRu4 : company.aboutEng4")
                .descriptionAbout__btn-desktop(v-if="lang === 'ru' && company.link4 || lang === 'eng' && company.linkEng4")
                    a(:href="lang === 'ru' ? getImgExternal(company.link4) : getImgExternal(company.linkEng4)" target="_blank") {{lang === 'ru' ? 'Карта выставок. Коллекции известных персон.' : 'Collections of famous people'}}
                .descriptionAbout__btn-mobile(v-if="lang === 'ru' && company.link4 || lang === 'eng' && company.linkEng4")
                    .descriptionAbout__line
                    a.descriptionAbout__link(:href="lang === 'ru' ? getImgExternal(company.link4) : getImgExternal(company.linkEng4)" target="_blank" v-html="lang === 'ru' ? 'Карта выставок. Коллекции известных персон.' : 'Collections of famous people'")
            .descriptionAbout__images(v-if="company.aboutSlides4")
                ImagesSwitcher(:images="company.aboutSlides4")
                    template(v-slot:default="slotProps")
                        .descriptionAbout__images-controls
                            .descriptionAbout__images-dot(
                                v-for="(item, index) in company.aboutSlides4"
                                :key="`imgDot_${index}`"
                                :class="{'active': index === slotProps.activeImg}"
                                @click="(event) => slotProps.switchTo(index, event)")

        ExpertsAbout

        .about-us
            h2.about-us__title(v-html="lang === 'ru' ? 'О нас' : 'About us'")
            .about-us__double-line

        TabsAbout

        .projectsAbout(v-if="projects.length")
            h2.projectsAbout__title {{ lang === 'ru' ? 'Проекты совместного участия' : 'Projects' }}
            .projectsAbout__double-line
            ul.projectsAbout__projects-list
                li(
                    v-for="(project, index) in projects"
                    :key="`project_${index}`"
                )
                    .projectsAbout__project
                        p.projectsAbout__project-title {{ lang === 'ru' ? project.name : project.nameEng }}
                        ul.projectsAbout__project-items(v-if="project.items")
                            li(
                                v-for="(item, index) in project.items"
                                :key="`item_${index}`"
                            ) {{ lang === 'ru' ? item.text : item.textEng }}

                        ButtonArrow(arrowRight :onClick="() => {lang === 'ru' ? window.open(getImgExternal(project.link), '_blank').focus() : window.open(getImgExternal(project.link), '_blank').focus()}" target="_blank")

        Footer

</template>

<script>
    import { ChevronRightIcon, ChevronLeftIcon  } from 'vue-feather-icons'
    import { mapState } from 'vuex'

    import Company from '~/assets/staticData/company.json'
    import Button from "@/components/ui/Button"
    import ButtonArrow from "@/components/ui/ButtonArrow"
    import Checkbox from "@/components/ui/Checkbox"
    import Input from "@/components/ui/Input"
    import HistoryNew from "@/components/blocksComponents/HistoryNew"
    import Awards from "@/components/blocksComponents/Awards"
    import ExpertsAbout from '@/components/blocksComponents/ExpertsAbout'
    import Mission from "@/components/blocksComponents/Mission"
    import TabsAbout from '@/components/blocksComponents/TabsAbout'
    import Footer from '~/components/Footer.vue'
    import {getImgExternal} from "@/plugins/getUrl"
    import ImagesSwitcher from '@/components/blocksComponents/ImagesSwitcher'

    export default {
        data() {
            return {
                company: Company.company,
                projects: Company.company.projects,
                checkboxValue: false,
                testInputValue: '',
                testInputPhone: '',
            }
        },
        components: {
            ChevronRightIcon,
            ChevronLeftIcon,
            Button,
            ButtonArrow,
            Checkbox,
            Input,
            HistoryNew,
            Awards,
            ExpertsAbout,
            Mission,
            TabsAbout,
            Footer,
            ImagesSwitcher,
        },
        methods: {
            getBgImg(url) {
                const imageUrl = require('~/assets/' + `${url}`)
                return url ? `url(${imageUrl})` : ''
            },
            getImg(url) {
                const imageUrl = require('~/assets/' + `${url}`)
                return url ? `${imageUrl}` : ''
            },
            getImgExternal(url) {
                return getImgExternal(url)
            },
        },
        computed: {
            ...mapState('localization', [
                'lang',
            ]),
        },
    }
</script>

<style lang="stylus">
    .about-container
        position relative
        padding 0
        padding-top 120px

        &__page-bg
            position absolute
            top 0
            left 0
            right 0
            width 100%
            height 1859px
            background url('~assets/img/about/bg.png') no-repeat
            background-size cover

            &.top1859
                top 1859px

            &.top3718
                top 3718px
                background linear-gradient(180deg, rgba(17, 17, 17, 0) 27.27%, #111111 92.04%), url('~assets/img/about/bg.png') no-repeat
                background-size cover

            &.bottom
                top unset
                bottom 0
                background url('~assets/img/about/bg-bottom.png') no-repeat
                background-size cover

        &__bg-top
            position absolute
            top 0
            right 0
            width 470px
            height 262px
            background url('~assets/img/about/bg-top.png')

        &__bg-bottom-right
            position absolute
            right 0
            bottom 0
            width 682px
            height 676px
            background url('~assets/img/about/bg-bottom-right.png')

        &__title
            position relative
            line-height 73px
            margin-bottom 66px

        &__wrapper-description
            position relative
            padding 0 20px

        &__bg-top-history
            position absolute
            bottom -60px
            right -20px
            width 223px
            height 406px
            background url('~assets/img/about/bg-before-history.png') no-repeat
            background-size cover

        &__description
            display flex
            justify-content space-between
            max-width 1400px
            padding-left 70px
            margin-bottom 50px

        &__description-pic
            position relative
            width 526px
            height 371px
            margin-bottom 39px
            background url('~assets/img/about/bg-aleksei.png') no-repeat
            background-size cover

        &__description-img
            position absolute
            bottom 0
            left 0
            right 0
            margin 0 auto
            width 262px

        &__description-content
            flex-shrink 2
            max-width 652px
            padding-left 60px
            text-align left
            font-family: TenorSans-Regular, Arial, Helvetica, sans-serif;
            color: #fce086
            font-weight: 400
            letter-spacing: 0.03em
            font-size 21px

        &__description-title
            max-width 705px
            margin-bottom 40px
            line-height 52px
            text-align left

        &__description-double-line
            width 100px
            height 4px
            margin-bottom 52px
            border 1px solid goldNew
            border-left none
            border-right none
            margin-top 30px

        &__description-text
            text-align left

        &__awards-mobile
            display none

    .descriptionAbout
        justify-content space-around
        display flex
        flex-direction row
        align-items center
        width 1600px
        margin 0 auto
        padding 64px 0

        &__title
            max-width 544px
            margin-bottom 30px
            text-align left
            color goldNew

        &__text
            max-width 559px
            font-size 16px
            line-height 24px
            text-align left

        &__btn-desktop
            margin-top 51px
            text-align left

            a
                position relative
                min-width 280px
                padding 20px 20px 24px
                font-family $TenorSans-Regular
                font-size 20px
                line-height 26px
                background-color transparent
                color whiteMain
                outline none
                cursor pointer
                overflow hidden
                border 1px solid goldNew
                &:hover,
                &:active
                    background goldNew
                    color #222222
                &:disabled
                    cursor default
                    pointer-events none
                    opacity .3

                &--large
                    min-width 494px
                    padding 29px 20px 36px

                @media only screen and (max-width 1280px)
                    &--large
                        min-width 400px

                @media only screen and (max-width 767px)
                    min-width 206px
                    padding 17px 20px 22px
                    font-size 16px
                    line-height 21px

                &--noPadding
                    padding 0

        &__btn-mobile
            display none

        .carouselPhoto
        .video
        .photo
            max-width 594px
            padding 10px
            border 1px solid rgba(150, 120, 95, 0.3)

        &__images
            width 594px
            height 407px
            padding 10px
            border 1px solid rgba(150, 120, 95, 0.3)

        &__images-controls
            position absolute
            width 100%
            bottom 6px
            display flex
            justify-content center

            & > div + div
                margin-left 12px

        &__images-dot
            width 12px
            height 12px
            border 1px solid rgba(143, 143, 143, 0.3)
            border-radius 50%
            cursor pointer
            background rgb(5 17 25)

            &.active
                border 1px solid #96785F
                background #96785F

        &.reverse
            @media only screen and (max-width 1000px)
                flex-direction column-reverse

        @media only screen and (max-width 1600px)
            width 100%

        @media only screen and (max-width 1280px)
            padding 64px 0

            &__title
                max-width 457px
                margin-bottom 33px
                font-size 22px
                line-height 33px

            &__text
                max-width 457px
                font-size 16px

            &__btn-desktop
                display none

            &__btn-mobile
                display block
                margin-top 42px
                text-align left

            &__line
                width 20px
                height 1px
                margin-bottom 15px
                border 1px solid goldNew

            &__link
                font-family $TenorSans-Regular
                font-weight normal
                font-size 16px
                line-height 150%
                letter-spacing 0.03em
                color goldNew !important

            .carouselPhoto
            .video
            .photo
                max-width 482px
                padding 8px

            &__images
                width 482px
                height 330px

        @media only screen and (max-width 1000px)
            flex-direction column
            align-items center
            margin-bottom 40px
            padding 0 20px

            .photo
            .video
            &__images
                margin-bottom 27px

            &__title
                margin-bottom 23px
                font-size 22px
                line-height 29px
                text-align left

            &__text
                font-size 14px
                line-height 21px

            &__link
                font-size 14px

            .carouselPhoto
            .video
            .photo
                width 100%
                padding 5px 6px

            .text
                text-align left
                max-width 700px

        @media only screen and (max-width 520px)
            &__images
                width 100%
                height 276px

        @media only screen and (max-width 414px)
            &__images
                height 257px

        @media only screen and (max-width 375px)
            &__images
                height 231px

        @media only screen and (max-width 320px)
            &__images
                height 196px

            &__images-controls
                & > div + div
                    margin-left 8px

        .video
        .photo
        .text
            transition all 0.5s ease-in
            opacity 0
            transform translateX(200px)

            &.left
                transform translateX(-200px)

        .video
            background-color: hsl(0,0%,10%);

    .about-us
        position relative

        &__title
            margin-bottom 18px

        &__double-line
            width 100px
            height 4px
            margin-bottom 42px
            border 1px solid goldNew
            border-left none
            border-right none

        &__tabs
            display flex
            justify-content center
            padding 0
            margin-bottom 64px
            list-style-type none

            & > li + li
                margin-left 124px

        &__label
            font-size 30px
            line-height 45px
            color #9F9F9F
            cursor pointer

            &:hover
                color goldNew

            &.is-active
                color goldNew

    .projectsAbout
        position relative
        margin 0 40px

        &__title
            margin-bottom 18px

        &__double-line
            width 100px
            height 4px
            margin-bottom 86px
            border 1px solid goldNew
            border-left none
            border-right none

        &__projects-list
            display flex
            flex-wrap wrap
            justify-content space-between
            max-width 1406px
            padding 0
            margin-bottom 66px
            list-style-type none

        &__project
            display block
            margin-bottom 80px
            text-align left

        &__project-title
            margin-bottom 16px
            text-align left
            color goldNew

        &__project-items
            margin-bottom 35px
            padding 0
            list-style-type none

            & > li:before
                content "\2022"
                padding 0 9px 0 0
                display table-cell
                width .5rem

            & > li
                display table
                max-width 607px
                min-width 498px
                margin-bottom 24px
                font-family $TenorSans-Regular
                font-size 26px
                font-weight 400
                line-height 36px
                letter-spacing 0.03em
                color whiteMain

    @media only screen and (max-width 1280px)
        .about-container
            padding-top 96px

            &__bg-top
                width 346px
                height 201px
                background-size contain
                background-repeat no-repeat

            &__bg-bottom-right
                width 682px
                height 676px
                background-repeat no-repeat
                background-position 100px 270px

            &__title
                line-height 67px
                margin-bottom 93px

            &__bg-top-history
                background-size 60%
                background-position center right

            &__description
                justify-content space-evenly
                padding 0
                margin 0
                margin-bottom 40px

            &__description-pic
                max-width 489px
                max-height 344px
                margin-bottom 45px

            &__description-img
                max-width 250px

            &__description-content
                max-width 474px
                padding-left 25px

            &__description-title
                margin-bottom 36px
                line-height 42px

            &__description-double-line
                margin-bottom 43px

            &__description-text
                font-size 16px
                line-height 24px

        .projectsAbout
            margin 0 20px

            &__title
                margin-bottom 30px
                line-height 48px

            &__double-line
                margin-bottom 38px

            &__projects-list
                max-width unset
                margin-bottom 80px

            &__project
                margin-bottom 48px

            &__project-items
                margin-bottom 25px

                & > li:before
                    content "\2022"
                    padding 0 9px 0 0
                    display table-cell
                    width .5rem

                & > li
                    max-width 400px
                    min-width 300px
                    font-size 20px
                    line-height 28px

    @media only screen and (max-width 900px)
        .about-container
            padding-top 76px

            &__bg-top
                width 126px
                height 133px
                background url('~assets/img/about/bg-top-mb.png')

            &__title
                margin-bottom 60px
                font-size 28px
                line-height 39px

            &__bg-top-history
                right -35px
                background-size 35%
                background-position bottom right

            &__description
                display block
                margin-bottom 70px

            &__description-pic
                width 100%
                max-width 375px
                height 254px
                margin-bottom 27px

            &__description-img
                width 181px

            &__description-content
                flex-shrink 1
                max-width unset
                padding 0

            &__description-title
                margin-bottom 23px
                font-size 22px
                line-height 29px
                text-align left

            &__description-double-line
                width 50px
                margin-bottom 31px

            &__description-text
                font-size 14px
                line-height 21px
                text-align left

            &__awards-desktop
                display none

            &__awards-mobile
                display block
                position relative
                margin 0 20px

    @media only screen and (max-width 767px)
        .about-container
            &__page-bg
                width 100%
                height 100%
                background url('~assets/img/about/bg.png')
                background-size contain

                &.top1859
                    display none

                &.top3718
                   display none

                &.bottom
                    display none

            &__bg-bottom-right
                width 100%
                height 572px
                background url('~assets/img/about/bg-bottom-mb.png') no-repeat
                background-size cover

        .projectsAbout
            display block

            &__title
                font-size 22px
                line-height 29px

            &__double-line
                width 50px
                margin-bottom 34px

            &__projects-list
                display block
                max-width unset

                &> li + li
                    margin-top 40px

            &__project
                margin 0

            &__project-title
                font-size 18px
                line-height 27px

            &__project-items
                margin-bottom 20px

                & > li
                    max-width unset
                    min-width 280px
                    font-size 14px
                    line-height 21px

</style>
