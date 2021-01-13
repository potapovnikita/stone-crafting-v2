<template lang="pug">
    div(:class="`${id}-model`")
        div(:class="`${id}-model__bg`")
        div(:class="[`${id}-model__wrapper-content`, {'model__content-reverse': isReverse }]")
            div(:class="`${id}-model__wrapper-media`")
                img.model__photo(:src="getImg(imgUrl)")
            .model__content
                h2.model__title(v-html="lang === 'ru' ? title : titleEng")

                .model__double-line
                p.model__text(v-html="lang === 'ru' ? text : textEng")

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
.model
    &__content-reverse
        flex-direction row-reverse

        .model__text
            max-width 524px

    &__photo
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
        &__content-reverse
            .model__text
                max-width 436px

        &__title
            margin-bottom 32px

        &__double-line
            margin-bottom 38px

    @media only screen and (max-width 840px)
        &__content-reverse
            .model__text
                max-width unset

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

    &__wrapper-media
        max-width 513px
        max-height 813px

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

        &__wrapper-media
            max-width 410px
            max-height 650px

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

        &__wrapper-media
            max-width 271px
            max-height 432px

.jokerNew-model
    position relative

    &__bg
        position absolute
        top 0
        left 0
        right 0
        width 1064px
        height 886px
        margin 0 auto
        background url('~assets/img/collections/joker/1.png')
        background-repeat no-repeat
        background-position 210px 15px

    &__wrapper-content
        position relative
        display flex
        justify-content space-between
        align-items center
        max-width 1064px

    &__wrapper-media
        max-width 426px
        max-height 886px

    @media only screen and (max-width 1280px)

        &__bg
            width 784px
            height 648px
            background url('~assets/img/collections/joker/1-ip.png')
            background-position -50px -80px
            background-repeat no-repeat

        &__wrapper-content
            max-width 784px

        &__wrapper-media
            max-width 312px
            max-height 648px

    @media only screen and (max-width 840px)

        &__bg
            top -20px
            width 431px
            height 581px
            background url('~assets/img/collections/joker/1.png')
            background-repeat no-repeat
            background-size contain

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 204px
            max-height 425px

    @media only screen and (max-width 431px)
        &__bg
            left -20%
            right -20%

.makedon-model
    position relative

    &__bg
        position absolute
        top 0
        left 0
        right 0
        width 1247px
        height 675px
        margin 0 auto
        background url('~assets/img/collections/makedon/3.png') no-repeat

    &__wrapper-content
        position relative
        display flex
        justify-content space-between
        align-items center
        max-width 1078px

    &__wrapper-media
        max-width 553px
        max-height 806px

    @media only screen and (max-width 1280px)

        &__bg
            top 0
            left 0
            right 0
            width 1056px
            height 571px
            background-repeat no-repeat
            background-size contain

        &__wrapper-content
            max-width 784px

        &__wrapper-media
            max-width 312px
            max-height 648px

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
            height 349px
            background url('~assets/img/collections/makedon/1-mb.png') no-repeat
            background-repeat no-repeat
            background-position center

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 204px
            max-height 425px

.genghiskhan-model
    position relative

    &__bg
        position absolute
        top 0
        left 0
        right 0
        width 1280px
        height 720px
        margin 0 auto
        background url('~assets/img/collections/genghiskhan/1.png') no-repeat

    &__wrapper-content
        position relative
        display flex
        justify-content space-between
        align-items center
        max-width 1103px

    &__wrapper-media
        max-width 549px
        max-height 820px

    @media only screen and (max-width 1280px)

        &__bg
            top 0
            left 0
            right 0
            width 1024px
            height 602px
            background url('~assets/img/collections/genghiskhan/1-ip.png') no-repeat
            background-size contain

        &__wrapper-content
            max-width 842px

        &__wrapper-media
            max-width 433px
            max-height 647px

    @media only screen and (max-width 1024px)
        &__bg
            top 0
            left 0
            width 100%

    @media only screen and (max-width 840px)

        &__bg
            position absolute
            top 0
            left 0
            right 0
            height 428px
            background url('~assets/img/collections/genghiskhan/1-mb.png') no-repeat

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 301px
            max-height 449px

.tamerlan-model
    position relative

    &__bg
        position absolute
        top 0
        left 0
        right 0
        width 1110px
        height 595px
        margin 0 auto
        background url('~assets/img/collections/tamerlan/1.png') no-repeat

    &__wrapper-content
        position relative
        display flex
        justify-content space-between
        align-items center
        max-width 1070px

    &__wrapper-media
        max-width 546px
        max-height 770px

    @media only screen and (max-width 1280px)

        &__bg
            top 0
            left 0
            right 0
            width 944px
            height 506px
            background url('~assets/img/collections/tamerlan/1.png') no-repeat
            background-size contain

        &__wrapper-content
            max-width 825px

        &__wrapper-media
            max-width 384px
            max-height 542px

    @media only screen and (max-width 1024px)
        &__bg
            top 0
            left 0
            width 100%

    @media only screen and (max-width 840px)

        &__bg
            position absolute
            top 0
            left 0
            right 0
            height 393px
            background url('~assets/img/collections/tamerlan/1-mb.png') no-repeat

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 281px
            max-height 395px

.suvorov-model
    position relative

    &__bg
        position absolute
        top 0
        left 0
        right 0
        width 713px
        height 664px
        margin 0 auto
        background url('~assets/img/collections/suvorov/1.png') no-repeat

    &__wrapper-content
        position relative
        display flex
        justify-content space-between
        align-items center
        max-width 1036px

    &__wrapper-media
        max-width 401px
        max-height 749px

    @media only screen and (max-width 1280px)

        &__bg
            top 0
            left 0
            right 0

        &__wrapper-content
            max-width 755px

        &__wrapper-media
            max-width 310px
            max-height 578px

    @media only screen and (max-width 1024px)
        &__bg
            top 0
            left 0
            width 100%

    @media only screen and (max-width 840px)

        &__bg
            position absolute
            top 0
            left 0
            right 0

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 235px
            max-height 438px

.peter-model
    position relative

    &__bg
        position absolute
        top 0
        left 0
        right 0
        width 1195px
        height 606px
        margin 0 auto
        background url('~assets/img/collections/peter/1.png') no-repeat
        background-position 75px 43px

    &__wrapper-content
        position relative
        display flex
        justify-content space-between
        align-items center
        max-width 1019px

    &__wrapper-media
        max-width 486px
        max-height 734px

    @media only screen and (max-width 1280px)

        &__bg
            width 1061px
            height 538px
            background url('~assets/img/collections/peter/1.png') no-repeat
            background-size contain

        &__wrapper-content
            max-width 845px

        &__wrapper-media
            max-width 380px
            max-height 574px

    @media only screen and (max-width 1023px)
        &__bg
           left -10%
           right -10%

        &__wrapper-content
            max-width 810px

    @media only screen and (max-width 840px)

        &__bg
            left 0
            right 0
            width 793px
            height 402px
            background url('~assets/img/collections/peter/1.png') no-repeat
            background-size contain

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 300px
            max-height 453px

    @media only screen and (max-width 793px)
        &__bg
            top 30px
            left -45%
            right -55%

    @media only screen and (max-width 370px)
        &__bg
            left -50%
            right -50%

    @media only screen and (max-width 350px)
        &__bg
            left -58%
            right -42%

.catherine-model
    position relative
    margin-top 137px
    margin-bottom 30px

    &__bg
        position absolute
        top 0
        left 0
        right 0
        width 1081px
        height 695px
        margin 0 auto
        background url('~assets/img/collections/catherine/1.png') no-repeat

    &__wrapper-content
        position relative
        display flex
        justify-content space-between
        align-items center
        max-width 1011px

    &__wrapper-media
        max-width 318px
        max-height 731px

    @media only screen and (max-width 1280px)

        &__bg
            top -137px
            left -195px

        &__wrapper-content
            max-width 740px

        &__wrapper-media
            max-width 230px
            max-height 529px

    @media only screen and (max-width 840px)
        margin-top 0
        margin-bottom 0

        &__bg
            top 0
            left -62%
            right -38%
            width 860px
            height 553px
            background-size contain

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 194px
            max-height 446px

    @media only screen and (max-width 500px)
        &__bg
            left -80%
            right -20%

    @media only screen and (max-width 410px)
        &__bg
            left -90%
            right -10%

    @media only screen and (max-width 340px)
        &__bg
            left -100%
            right 0

</style>