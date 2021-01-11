<template lang="pug">
    div(:class="`${id}-model`")
        div(:class="`${id}-model__bg`")
        div(:class="[`${id}-model__wrapper-content`, {'reverse': isReverse }]")
            div(:class="`${id}-model__wrapper-media`")
                img.photo(:src="getImg(imgUrl)")
            div(:class="`${id}-model__content`")
                h2(:class="`${id}-model__title`" v-html="lang === 'ru' ? title : titleEng")

                div(:class="`${id}-model__double-line`")
                p(:class="`${id}-model__text`" v-html="lang === 'ru' ? text : textEng")

                ButtonArrow(:onClick="() => $nuxt.$router.push({path:`/gallery/${id}`})" arrowRight)

</template>
<script>
    import { mapState } from 'vuex'
    import ButtonArrow from "@/components/ui/ButtonArrow"
    import { getImgLocal, getBgImgLocal } from '~/plugins/getUrl'
    export default {
        name: 'CollectionItem',
        components: {
            ButtonArrow,
        },
        props: {
            id: String,
            title: String,
            titleEng: String,
            text: String,
            textEng: String,
            imgUrl: String,
            imgBgUrl: String,
            isReverse: Boolean,
        },
        methods: {
            getImg(url) {
                return getImgLocal(url)
            },
            getBgImg(url) {
                return getBgImgLocal(url)
            }
        },
        computed: {
            ...mapState('localization', [
                'lang',
            ]),
        },
    }
</script>

<style lang="stylus">
.torero-model
    position relative

    &__bg
        position absolute
        top 80px
        left -107px
        right 0
        width 1125px
        height 758px
        margin 0 auto
        background url('~assets/img/collections/torero/1.png')
        background-repeat no-repeat

    &__wrapper-content
        position relative
        display flex
        justify-content space-between
        align-items center
        max-width 1094px

        &.reverse
            flex-direction row-reverse

            .torero-model__text
                max-width 524px

    &__wrapper-media
        max-width 513px
        max-height 813px

        .photo
            width 100%
            height auto

    &__content
        text-align left

    &__title
        margin-bottom 52px
        text-align left
        line-height 130%

    &__double-line
        width 100px
        height 4px
        margin-bottom 52px
        border 1px solid goldNew
        border-left none
        border-right none

    &__text
        max-width 382px
        margin-bottom 52px
        line-height 150%
        text-align left

    @media only screen and (max-width 1280px)

        &__bg
            top 30px
            left 0
            right 0
            width 971px
            height 654px
            background-repeat no-repeat
            background-size contain

        &__wrapper-content
            max-width 812px

            &.reverse
                .torero-model__text
                    max-width 436px

        &__wrapper-media
            max-width 410px
            max-height 650px

        &__title
            margin-bottom 32px

        &__double-line
            margin-bottom 38px

    @media only screen and (max-width 1024px)
        &__bg
            top 40px
            left 15%
            width 100%

    @media only screen and (max-width 840px)

        &__bg
            position absolute
            top 0
            left 0
            right 0
            height 425px
            background url('~assets/img/collections/torero/1-mb.png')
            background-repeat no-repeat
            background-position center bottom

        &__wrapper-content
            flex-direction column !important
            max-width unset

            &.reverse
                .torero-model__text
                    max-width unset

        &__wrapper-media
            max-width 271px
            max-height 432px

        &__content
            padding 0 12px

        &__text
            max-width unset

    @media only screen and (max-width 767px)
        &__title
            margin-bottom 24px
            font-size 22px

        &__double-line
            width 50px
            margin-bottom 22px

        &__text
            margin-bottom 16px
            font-size 14px

.jokerNew-model
    position relative

    &__bg
        position absolute
        top 0
        left 0
        right 0
        width 803px
        height 1080px
        margin 0 auto
        background url('~assets/img/collections/joker/1.png')
        background-repeat no-repeat

    &__wrapper-content
        position relative
        display flex
        justify-content space-between
        align-items center
        max-width 1064px

        &.reverse
            flex-direction row-reverse

            .joker-model__text
                max-width 524px

    &__wrapper-media
        max-width 426px
        max-height 886px

        .photo
            width 100%
            height auto

    &__content
        text-align left

    &__title
        margin-bottom 52px
        text-align left
        line-height 130%

    &__double-line
        width 100px
        height 4px
        margin-bottom 52px
        border 1px solid goldNew
        border-left none
        border-right none

    &__text
        max-width 382px
        margin-bottom 52px
        line-height 150%
        text-align left

    @media only screen and (max-width 1280px)

        &__bg
            top 0
            left 0
            right 0
            width 698px
            height 939px
            background-repeat no-repeat
            background-size contain

        &__wrapper-content
            max-width 784px

            &.reverse
                .joker-model__text
                    max-width 436px

        &__wrapper-media
            max-width 312px
            max-height 648px

        &__title
            margin-bottom 32px

        &__double-line
            margin-bottom 38px

    @media only screen and (max-width 1024px)
        &__bg
            top 40px
            left 15%
            width 100%

    @media only screen and (max-width 840px)

        &__bg
            position absolute
            top 0
            left 0
            right 0
            height 425px
            background url('~assets/img/collections/joker/1-mb.png')
            background-repeat no-repeat
            background-position center

        &__wrapper-content
            flex-direction column !important
            max-width unset

            &.reverse
                .joker-model__text
                    max-width unset

        &__wrapper-media
            max-width 204px
            max-height 425px

        &__content
            padding 0 12px

        &__text
            max-width unset

    @media only screen and (max-width 767px)
        &__title
            margin-bottom 24px
            font-size 22px

        &__double-line
            width 50px
            margin-bottom 22px

        &__text
            margin-bottom 16px
            font-size 14px

</style>