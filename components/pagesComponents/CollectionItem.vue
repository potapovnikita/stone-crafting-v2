<template lang="pug">
    div(:class="`${id}-model`")
        div(:class="`${id}-model__bg`")
        div(:class="['model__wrapper-content', `${id}-model__wrapper-content`, {'model__content-reverse': isReverse }]")
            div(:class="`${id}-model__wrapper-media`")
                ImageItem(:classNames="['model__photo']" :source="getImg(imgUrl)")
            .model__content
                h2.model__title(v-html="lang === 'ru' ? title : titleEng")

                .model__double-line
                p.model__text(v-html="lang === 'ru' ? text : textEng")
                p.additional__text(v-if="additionalText" v-html="lang === 'ru' ? additionalText : additionalTextEng")

                ButtonArrow(:onClick="clickHandler" arrowRight)

</template>
<script>
    import { mapState } from 'vuex'
    import ButtonArrow from "@/components/ui/ButtonArrow"
    import { getImgLocal, getBgImgLocal } from '~/plugins/getUrl'
    import ImageItem from '@/components/blocksComponents/ImageItem'
    export default {
        name: 'CollectionItem',
        components: {
            ButtonArrow,
            ImageItem,
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
            additionalText: String,
            additionalTextEng: String,
        },
        methods: {
            getImg(url) {
                return getImgLocal(url)
            },
            getBgImg(url) {
                return getBgImgLocal(url)
            },
            clickHandler() {
                this.$emit("collectionitembtnclick");
                this.$nuxt.$router.push({path:`/gallery/${this.id}`})
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
.model
    &__content-reverse
        flex-direction row-reverse

        .model__text
            max-width 524px

        .additional__text
            color #fce086
            text-align left
            margin-bottom: 52px

    &__photo
        width 100%
        height auto

    &__wrapper-content
        position relative
        display flex
        justify-content space-between
        align-items center

    &__content
        text-align left

        .additional__text
            color #fce086
            text-align left
            margin-bottom: 52px

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
        max-width 395px
        margin-bottom 12px
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
    margin-top 20px
    padding-bottom 10px

    &__bg
        position absolute
        top 65px
        left 0
        right 0
        width 1178px
        height 758px
        margin 0 auto
        background url('~assets/img/collections/torero/1.png')
        background-repeat no-repeat

    &__wrapper-content
        max-width 1094px

    &__wrapper-media
        max-width 513px
        min-height 513px

    @media only screen and (max-width 1280px)
        margin-top 71px
        padding-bottom 53px

        &__bg
            top 49px
            left -10%
            right -10%
            width 971px
            height 654px
            background-position 144px 0
            background-repeat no-repeat
            background-size cover

        &__wrapper-content
            max-width 812px

        &__wrapper-media
            max-width 480px
            min-height 400px

    @media only screen and (max-width 840px)
        margin-top 22px
        padding-bottom 0

        &__bg
            top 109px
            width 468px
            height 315px
            background url('~assets/img/collections/torero/1-mb.png')
            background-repeat no-repeat
            background-position 47px 0

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 271px
            min-height 280px
            margin-bottom 23px

    @media only screen and (max-width 500px)
        &__bg
            top 80px
            left unset
            right unset
            width 100%
            height 390px
            background-position center
            background-size cover

.jokerNew-model
    position relative
    margin-top 62px

    &__bg
        position absolute
        top 13px
        left 0
        right 0
        width 932px
        height 886px
        margin 0 auto
        background url('~assets/img/collections/joker/1.png')
        background-repeat no-repeat
        background-position 147px 0

    &__wrapper-content
        max-width 1064px

    &__wrapper-media
        max-width 426px
        min-height 886px

    @media only screen and (max-width 1280px)
        margin-top 42px

        &__bg
            top -86px
            width 698px
            height 726px
            background url('~assets/img/collections/joker/1-ip.png')
            background-position -100px 0
            background-repeat no-repeat

        &__wrapper-content
            max-width 784px

        &__wrapper-media
            max-width 312px
            min-height 648px

        .model__content
            margin-top -83px

    @media only screen and (max-width 840px)
        margin-top 44px

        &__bg
            top -27px
            width 431px
            height 581px
            background url('~assets/img/collections/joker/1.png')
            background-position -13px 0
            background-repeat no-repeat
            background-size contain

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 204px
            min-height 425px
            margin-bottom 16px

        .model__content
            margin-top 0

    @media only screen and (max-width 500px)
        &__bg
            width 100%
            background-size cover
            background-position center

.makedon-model
    position relative
    margin-top 83px

    &__bg
        position absolute
        top 117px
        left 0
        right 0
        width 1620px
        height 675px
        margin 0 auto
        background url('~assets/img/collections/makedon/3.png') no-repeat
        background-position 357px 0

    &__wrapper-content
        max-width 1078px

    &__wrapper-media
        max-width 553px
        min-height 806px

    @media only screen and (max-width 1619px)
         &__bg
            left -20%
            right -20%

    @media only screen and (max-width 1280px)
        margin-top 75px

        &__bg
            top 30px
            width 1213px
            height 571px
            background-repeat no-repeat
            background-position 181px 0
            background-size contain

        &__wrapper-content
            max-width 784px

        &__wrapper-media
            max-width 439px
            min-height 640px

    @media only screen and (max-width 840px)
        margin-top 16px

        &__bg
            top 47px
            width 643px
            height 349px
            background url('~assets/img/collections/makedon/1-mb.png') no-repeat
            background-repeat no-repeat
            background-position 144px 0

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 302px
            min-height 440px
            margin-bottom 28px

    @media only screen and (max-width 500px)
        &__bg
            left unset
            right unset
            width 100%
            background-position center
            background-size cover

.genghiskhan-model
    position relative
    margin-top 200px

    &__bg
        position absolute
        top 61px
        left 0
        right 0
        width 1280px
        height 720px
        margin 0 auto
        background url('~assets/img/collections/genghiskhan/1.png') no-repeat
        background-position 100px 0

    &__wrapper-content
        max-width 1103px

    &__wrapper-media
        max-width 549px
        min-height 820px

    @media only screen and (max-width 1280px)
        margin-top 107px

        &__bg
            top 39px
            left -15%
            right -15%
            width 1070px
            height 602px
            background url('~assets/img/collections/genghiskhan/1-ip.png') no-repeat
            background-position 56px 0
            background-size contain

        &__wrapper-content
            max-width 842px

        &__wrapper-media
            max-width 433px
            min-height 647px

    @media only screen and (max-width 840px)
        margin-top 13px

        &__bg
            top 53px
            left -70%
            right -70%
            width 760px
            height 428px
            background url('~assets/img/collections/genghiskhan/1-mb.png') no-repeat
            background-position 200px 0

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 301px
            min-height 449px
            margin-bottom 39px

    @media only screen and (max-width 500px)
        &__bg
            width 100%
            background-size cover
            background-position bottom

.tamerlan-model
    position relative
    margin-top 204px
    padding-bottom 18px

    &__bg
        position absolute
        top 193px
        left 0
        right 0
        width 1280px
        height 595px
        margin 0 auto
        background url('~assets/img/collections/tamerlan/1.png') no-repeat
        background-position 161px 0

    &__wrapper-content
        max-width 1070px

    &__wrapper-media
        max-width 546px
        min-height 770px

    @media only screen and (max-width 1280px)
        margin-top 184px
        padding-bottom 71px

        &__bg
            top 107px
            left -10%
            right -10%
            width 944px
            height 506px
            background url('~assets/img/collections/tamerlan/1.png') no-repeat
            background-position 29px 0
            background-size cover

        &__wrapper-content
            max-width 825px

        &__wrapper-media
            max-width 384px
            min-height 542px

    @media only screen and (max-width 840px)
        margin-top 34px
        padding-bottom 0
        z-index 1

        &__bg
            top 46px
            left -70%
            right -70%
            width 732px
            height 393px
            background url('~assets/img/collections/tamerlan/1-mb.png') no-repeat
            background-position 177px 0

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 281px
            min-height 395px
            margin-bottom 44px

    @media only screen and (max-width 500px)
        &__bg
            left unset
            right unset
            width 100%
            background-position center
            background-size cover

.suvorov-model
    position relative
    margin-top 186px

    &__bg
        position absolute
        top 21px
        left 0
        right 0
        width 1000px
        height 664px
        margin 0 auto
        background url('~assets/img/collections/suvorov/1.png') no-repeat
        background-position 224px 0

    &__wrapper-content
        max-width 1036px

    &__wrapper-media
        max-width 401px
        min-height 749px

    @media only screen and (max-width 1280px)
        margin-top 92px
        padding-bottom 14px

        &__bg
            top -66px
            width 713px
            background-position -56px 0

        &__wrapper-content
            max-width 749px

        &__wrapper-media
            max-width 316px
            min-height 578px

    @media only screen and (max-width 840px)
        margin-top 74px
        padding-bottom 0

        &__bg
            position absolute
            top -141px
            left -70%
            right -70%
            width 713px
            background-position 0 0

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 235px
            min-height 438px
            margin-bottom 21px

.peter-model
    position relative
    margin-top 207px

    &__bg
        position absolute
        top 58px
        left 0
        right 0
        width 1230px
        height 606px
        margin 0 auto
        background url('~assets/img/collections/peter/1.png') no-repeat
        background-position 93px 0

    &__wrapper-content
        max-width 1019px

    &__wrapper-media
        max-width 486px
        min-height 734px

    @media only screen and (max-width 1280px)
        margin-top 144px

        &__bg
            top 18px
            left -20%
            right -20%
            width 1061px
            height 538px
            background url('~assets/img/collections/peter/1.png') no-repeat
            background-position 0 0
            background-size cover

        &__wrapper-content
            max-width 845px

        &__wrapper-media
            max-width 380px
            min-height 574px

    @media only screen and (max-width 880px)

        &__wrapper-content
            max-width 825px

    @media only screen and (max-width 840px)
        margin-top 50px
        z-index 2

        &__bg
            top 30px
            left -70%
            right -70%
            width 793px
            height 402px
            background url('~assets/img/collections/peter/1.png') no-repeat
            background-position 44px 0
            background-size cover

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 300px
            min-height 453px
            margin-bottom 19px

.catherine-model
    position relative
    margin-top 212px

    &__bg
        position absolute
        top 36px
        left 0
        right 0
        width 1081px
        height 695px
        margin 0 auto
        background url('~assets/img/collections/catherine/1.png') no-repeat
        background-position 12px 0

    &__wrapper-content
        max-width 1011px

    &__wrapper-media
        max-width 318px
        min-height 731px

    @media only screen and (max-width 1280px)
        margin-top 211px
        padding-bottom 29px

        &__bg
            top -137px
            left -15%
            right -15%
            background-position -100px 0

        &__wrapper-content
            max-width 740px

        &__wrapper-media
            max-width 230px
            min-height 529px

    @media only screen and (max-width 840px)
        margin-top 39px
        margin-bottom 0
        z-index 1

        &__bg
            top -55px
            left -80%
            right -80%
            width 860px
            height 553px
            background-position -80px 0
            background-size cover

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 194px
            min-height 446px
            margin-bottom 35px

.schemamonk-model
    position relative
    margin-top 263px

    &__bg
        position absolute
        top -46px
        left 0
        right 0
        width 1238px
        height 757px
        margin 0 auto
        background url('~assets/img/collections/schemamonk/1.png') no-repeat

    &__wrapper-content
        max-width 990px

    &__wrapper-media
        max-width 395px
        min-height 728px

    @media only screen and (max-width 1280px)
        margin-top 184px
        z-index 1

        &__bg
            top -106px
            left -20%
            right -20%
            width 1212px
            height 645px

        &__wrapper-content
            max-width 807px

        &__wrapper-media
            max-width 295px
            min-height 544px

    @media only screen and (max-width 840px)
        margin-top 10px
        z-index 0

        &__bg
            top -129px
            left -100%
            right -100%
            width 1062px
            height 663px
            background-position -130px 0
            background-size cover

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 249px
            min-height 458px
            margin-bottom 54px

.scarlet-model
    position relative
    margin-top 185px

    &__bg
        position absolute
        top 47px
        left -5%
        right -5%
        width 1400px
        height 724px
        margin 0 auto
        background url('~assets/img/collections/scarlet/1.png') no-repeat
        background-position 390px 0px

    &__wrapper-content
        max-width 1075px

    &__wrapper-media
        max-width 508px
        min-height 818px

    @media only screen and (max-width 1280px)
        margin-top 117px
        padding-bottom 18px

        &__bg
            top -130px
            left -15%
            right -15%
            width 1081px
            background url('~assets/img/collections/scarlet/1.png') no-repeat
            background-position 115px 0px

        &__wrapper-content
            max-width 822px

        &__wrapper-media
            max-width 358px
            min-height 576px

    @media only screen and (max-width 840px)
        margin-top 43px
        padding-bottom 0
        z-index 2

        &__bg
            top -42px
            left -80%
            right -80%
            width 755px
            height 506px
            background url('~assets/img/collections/scarlet/1-mb.png') no-repeat
            background-position 200px 0px

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 259px
            min-height 444px
            margin-bottom 61px

    @media only screen and (max-width 500px)
        &__bg
            left unset
            right unset
            width 100%
            background-size cover
            background-position center

.babayaga-model
    position relative
    margin-top 170px

    &__bg
        position absolute
        top -73px
        left 0
        right 0
        width 750px
        height 819px
        margin 0 auto
        background url('~assets/img/collections/babayaga/1.png') no-repeat

    &__wrapper-content
        max-width 1186px

    &__wrapper-media
        max-width 508px
        min-height 767px

    @media only screen and (max-width 1280px)
        margin-top 211px

        &__bg
            top -124px
            width 645px
            height 707px
            background url('~assets/img/collections/babayaga/1-ip.png') no-repeat
            background-position 20px 0

        &__wrapper-content
            max-width 816px

        &__wrapper-media
            max-width 372px
            min-height 562px

    @media only screen and (max-width 840px)
        margin-top 70px
        z-index 1

        &__bg
            top -108px
            left -70%
            right -70%
            width 470px
            height 513px
            background url('~assets/img/collections/babayaga/1.png') no-repeat
            background-position -20px 0
            background-size cover

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 264px
            min-height 400px
            margin-bottom 30px

    @media only screen and (max-width 500px)
        &__bg
            left unset
            right unset
            width 100%
            background-position center

.groznyy-model
    position relative
    margin-top 138px

    &__bg
        position absolute
        top 180px
        left 0
        right 0
        width 1388px
        height 641px
        margin 0 auto
        background url('~assets/img/collections/groznyy/1.png') no-repeat
        background-position 420px 0

    &__wrapper-content
        max-width 1137px

    &__wrapper-media
        max-width 565px
        min-height 844px

    @media only screen and (max-width 1387px)
        &__bg
            left -5%
            right -5%

    @media only screen and (max-width 1280px)
        margin-top 148px
        padding-bottom 53px

        &__bg
            top -54px
            left 0
            right 0
            width 1024px
            background-position 0 0

        &__wrapper-content
            max-width 825px

        &__wrapper-media
            max-width 357px
            min-height 534px

    @media only screen and (max-width 1023px)
        &__bg
            left -10%
            right -10%

    @media only screen and (max-width 840px)
        margin-top 30px
        padding-bottom 0

        &__bg
            top -80px
            left -60%
            right -60%
            width 716px
            height 449px
            background-size cover
            background-position -20px 0

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 278px
            min-height 415px
            margin-bottom 35px

.watery-model
    position relative
    margin-top 233px

    &__bg
        position absolute
        top -11px
        left 0
        right 0
        width 1430px
        height 748px
        margin 0 auto
        background url('~assets/img/collections/watery/1.png') no-repeat
        background-position 13px 0

    &__wrapper-content
        max-width 1113px

    &__wrapper-media
        max-width 540px
        min-height 785px

    @media only screen and (max-width 1429px)
        &__bg
            left -5%
            right -5%

    @media only screen and (max-width 1280px)
        margin-top 118px

        &__bg
            top -30px
            left -10%
            right -10%
            width 1118px
            height 604px
            background-position -16px 0
            background-size cover

        &__wrapper-content
            max-width 860px

        &__wrapper-media
            max-width 418px
            min-height 608px

    @media only screen and (max-width 870px)
        &__bg
            left -20%
            right -20%

        &__wrapper-content
            max-width 820px

    @media only screen and (max-width 840px)
        margin-top 39px

        &__bg
            top -39
            left -70%
            right -70%
            width 742px
            height 400px
            background-position -70px 0

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 290px
            min-height 422px
            margin-bottom 23px

.dvorovoy-model
    position relative
    margin-top 278px

    &__bg
        position absolute
        top -25px
        left 0
        right 0
        width 1126px
        height 670px
        margin 0 auto
        background url('~assets/img/collections/dvorovoy/1.png') no-repeat
        background-position 260px 0

    &__wrapper-content
        max-width 1091px

    &__wrapper-media
        max-width 528px
        min-height 654px

    @media only screen and (max-width 1280px)
        margin-top 215px
        padding-bottom 73px

        &__bg
            top -127px
            width 896px
            height 670px
            background-position 0 0

        &__wrapper-content
            max-width 813px

        &__wrapper-media
            max-width 380px
            min-height 470px

    @media only screen and (max-width 895px)
         &__bg
            left -10%
            right -10%

    @media only screen and (max-width 840px)
        margin-top 55px
        padding-bottom 0

        &__bg
            top -11px
            left -70%
            right -70%
            width 506px
            height 378px
            background url('~assets/img/collections/dvorovoy/1-mb.png') no-repeat
            background-position 62px 0
            background-size contain

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 316px
            min-height 392px
            margin-bottom 17px

    @media only screen and (max-width 500px)
        &__bg
            left unset
            right:unset
            background-position center
            background-size cover
            width 100%

.goldfish-model
    position relative
    margin-top 241px

    &__bg
        position absolute
        top 75px
        left 0
        right 0
        width 1210px
        height 645px
        margin 0 auto
        background url('~assets/img/collections/goldfish/1.png') no-repeat

    &__wrapper-content
        max-width 1094px

    &__wrapper-media
        max-width 493px
        min-height 792px

    @media only screen and (max-width 1280px)
        margin-top 107px

        &__bg
            top -88px
            width 901px
            height 645px

        &__wrapper-content
            max-width 826px

        &__wrapper-media
            max-width 344px
            min-height 552px

    @media only screen and (max-width 900px)
         &__bg
            left -10%
            right -10%

    @media only screen and (max-width 840px)
        margin-top 36px
        z-index 2

        &__bg
            top -21px
            left -70%
            right -70%
            width 531px
            height 381px
            background-position -13px 0
            background-size cover

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 270px
            min-height 433px
            margin-bottom 80px

.kikimora-model
    position relative
    margin-top 187px

    &__bg
        position absolute
        top 120px
        left 0
        right 0
        width 942px
        height 600px
        margin 0 auto
        background url('~assets/img/collections/kikimora/1.png') no-repeat
        background-position 153px 0

    &__wrapper-content
        max-width 1044px

    &__wrapper-media
        max-width 472px
        min-height 785px

    @media only screen and (max-width 1280px)
        margin-top 143px

        &__bg
            top 0
            width 910px
            background-position 20px 0

        &__wrapper-content
            max-width 810px

        &__wrapper-media
            max-width 337px
            min-height 560px
            margin-top 20px
            margin-bottom 20px

    @media only screen and (max-width 909px)
         &__bg
            left -10%
            right -10%

    @media only screen and (max-width 840px)
        margin-top 0
        z-index 1

        &__bg
            top -67px
            left -70%
            right -70%
            width 534px
            height 476px
            background-position -118px 0
            background-size cover

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 276px
            min-height 459px
            margin-top 56px
            margin-bottom 11px

.koschei-model
    position relative
    margin-top 168px

    &__bg
        position absolute
        top 15px
        left 0
        right 0
        width 1276px
        height 805px
        margin 0 auto
        background url('~assets/img/collections/koschei/1.png') no-repeat
        background-position -75px 0

    &__wrapper-content
        max-width 1098px

    &__wrapper-media
        max-width 660px
        min-height 853px

    @media only screen and (max-width 1280px)
        margin-top 86px

        &__bg
            top 0
            width 910px
            height 617px
            background-position 0 0
            background-size cover

        &__wrapper-content
            max-width 867px

        &__wrapper-media
            max-width 427px
            min-height 552px
            margin-top 43px
            margin-bottom 20px

    @media only screen and (max-width 909px)
        &__bg
            left -10%
            right -10%

        &__wrapper-content
            max-width 825px

    @media only screen and (max-width 840px)
        margin-top 43px

        &__bg
            top -81px
            left -70%
            right -70%
            width 587px
            height 394px
            background-position 0 0
            background-size contain

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 306px
            min-height 394px
            margin-top 0
            margin-bottom 22px

.pussBoots-model
    position relative
    margin-top 118px

    &__bg
        position absolute
        top 139px
        left 0
        right 0
        width 678px
        height 565px
        margin 0 auto
        background url('~assets/img/collections/pussBoots/1.png') no-repeat
        background-position 30px 0

    &__wrapper-content
        max-width 1130px

    &__wrapper-media
        max-width 445px
        min-height 805px

    @media only screen and (max-width 1280px)
        margin-top 80px

        &__bg
            top 11px
            background-position -132px 0

        &__wrapper-content
            max-width 803px

        &__wrapper-media
            max-width 355px
            min-height 641px

    @media only screen and (max-width 840px)
        margin-top 16px

        &__bg
            top 43px
            left -70%
            right -70%
            width 562px
            height 469px
            background-position -54px 0
            background-size contain

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 299px
            min-height 540px
            margin-bottom 6px

    @media only screen and (max-width 500px)
        &__bg
            left unset
            right unset
            width 100%
            background-position 70% center
            background-size cover

.ovinnik-model
    position relative
    margin-top 195px

    &__bg
        position absolute
        top 95px
        left 0
        right 0
        width 1110px
        height 675px
        margin 0 auto
        background url('~assets/img/collections/ovinnik/1.png') no-repeat
        background-position -14px 0

    &__wrapper-content
        max-width 1103px

    &__wrapper-media
        max-width 479px
        min-height 792px

    @media only screen and (max-width 1280px)
        margin-top 82px

        &__bg
            top 0
            width 934px
            height 568px
            background-position 37px 0
            background-size cover

        &__wrapper-content
            max-width 817px

        &__wrapper-media
            max-width 352px
            min-height 581px

    @media only screen and (max-width 933px)
        &__bg
            left -5%
            right -5%

    @media only screen and (max-width 840px)
        margin-top 36px
        z-index 5

        &__bg
            top 69px
            left -70%
            right -70%
            width 670px
            height 407px
            background-position 0px 0
            background-size contain

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 295px
            min-height 488px
            margin-bottom 23px

.bannik-model
    position relative
    margin-top 154px

    &__bg
        position absolute
        top 140px
        left 0
        right 0
        width 1210px
        height 552px
        margin 0 auto
        background url('~assets/img/collections/bannik/1.png') no-repeat
        background-position 390px 0

    &__wrapper-content
        max-width 1054px

    &__wrapper-media
        max-width 523px
        min-height 782px

    @media only screen and (max-width 1280px)
        margin-top 95px

        &__bg
            top 0
            width 828px
            background-position 0 0

        &__wrapper-content
            max-width 792px

        &__wrapper-media
            max-width 386px
            min-height 577px
            margin-top 45px

    @media only screen and (max-width 840px)
        margin-top 44px
        z-index 4

        &__bg
            top -82px
            left -70%
            right -70%
            background-position 0px 0

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 320px
            min-height 478px
            margin-top 0
            margin-bottom 15px

.viking-model
    position relative
    margin-top 235px

    &__bg
        position absolute
        top 23px
        left 0
        right 0
        width 1329px
        height 748px
        margin 0 auto
        background url('~assets/img/collections/viking/1.png') no-repeat
        background-position 18px 0

    &__wrapper-content
        max-width 1158px

    &__wrapper-media
        max-width 540px
        min-height 830px

    @media only screen and (max-width 1328px)
        &__bg
            left -5%
            right -5%

    @media only screen and (max-width 1280px)
        margin-top 73px

        &__bg
            top -21px
            left -15%
            right -15%
            width 1087px
            height 612px
            background-position -40px 0
            background-size cover

        &__wrapper-content
            max-width 870px

        &__wrapper-media
            max-width 409px
            min-height 629px

        .model__content
            margin-top 200px

    @media only screen and (max-width 900px)
        &__wrapper-content
            max-width 825px

        &__bg
            left -30%
            right -30%
            background-position -65px 0

    @media only screen and (max-width 840px)
        margin-top 28px
        z-index 3

        &__bg
            top -59px
            left -120%
            right -120%
            width 1192px
            height 671px
            background-position -42px 0

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 334px
            min-height 513px
            margin-bottom 35px

         .model__content
            margin-top 0

.lesovichek-model
    position relative
    margin-top 195px

    &__bg
        position absolute
        top 34px
        left 0
        right 0
        width 1262px
        height 730px
        margin 0 auto
        background url('~assets/img/collections/lesovichek/1.png') no-repeat
        background-position 315px 0

    &__wrapper-content
        max-width 1083px

    &__wrapper-media
        max-width 514px
        min-height 784px

    @media only screen and (max-width 1280px)
        margin-top 84px

        &__bg
            top 0
            width 960px
            background-position 44px 0

        &__wrapper-content
            max-width 852px

        &__wrapper-media
            max-width 396px
            min-height 605px
            margin-top 43px
            margin-bottom 82px

    @media only screen and (max-width 959px)
        &__bg
            left -5%
            right -5%

    @media only screen and (max-width 840px)
        margin-top 76px
        z-index 2

        &__bg
            top -107px
            left -70%
            right -70%
            width 832px
            height 632px
            background-position 20px 0
            background-size cover

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 307px
            min-height 469px
            margin-top 0
            margin-bottom 16px

.rusalka-model
    position relative
    margin-top 112px

    &__bg
        position absolute
        top 71px
        left 0
        right 0
        width 1608px
        height 758px
        margin 0 auto
        background url('~assets/img/collections/rusalka/1.png') no-repeat
        background-position 222px 0

    &__wrapper-content
        max-width 1138px

    &__wrapper-media
        max-width 556px
        min-height 882px

    @media only screen and (max-width 1607px)
        &__bg
            left -12%
            right -12%

    @media only screen and (max-width 1280px)
        margin-top 51px

        &__bg
            top 0
            width 1144px
            height 643px
            background-position 38px 0
            background-size cover

        &__wrapper-content
            max-width 856px

        &__wrapper-media
            max-width 382px
            min-height 606px
            margin-bottom 37px

    @media only screen and (max-width 920px)
        &__bg
            left -18%
            right -18%

        &__wrapper-content
            max-width 836px


    @media only screen and (max-width 840px)
        margin-top 55px
        z-index 1

        &__bg
            top -70px
            left -80%
            right -80%
            width 879px
            height 494px
            background-position -15px 0

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 308px
            min-height 489px
            margin-bottom 34px

.snowqueen-model
    position relative
    margin-top 115px

    &__bg
        position absolute
        top 68px
        left 0
        right 0
        width 1400px
        height 656px
        margin 0 auto
        background url('~assets/img/collections/snowqueen/1.png') no-repeat
        background-position 490px 0

    &__wrapper-content
        max-width 1171px

    &__wrapper-media
        max-width 530px
        min-height 835px

    @media only screen and (max-width 1399px)
        &__bg
            left -5%
            right -5%

    @media only screen and (max-width 1280px)
        margin-top 157px

        &__bg
            top -79px
            left -5%
            right -5%
            width 920px
            height 656px
            background-position 124px 0

        &__wrapper-content
            max-width 880px

        &__wrapper-media
            max-width 361px
            min-height 568px
            margin-bottom 9px

    @media only screen and (max-width 919px)
        &__bg
            left -10%
            right -10%

        &__wrapper-content
            max-width 830px

    @media only screen and (max-width 840px)
        margin-top 56px

        &__bg
            top -89px
            left -70%
            right -70%
            width 707px
            height 531px
            background-position -80px 0
            background-size cover

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 280px
            min-height 442px
            margin-top 0
            margin-bottom 62px

.lebed-model
    position relative
    margin-top 233px

    &__bg
        position absolute
        top 219px
        left 0
        right 0
        width 638px
        height 478px
        margin 0 auto
        background url('~assets/img/collections/lebed/1.png') no-repeat
        background-position 23px 0

    &__wrapper-content
        max-width 1108px

    &__wrapper-media
        max-width 427px
        min-height 783px

    @media only screen and (max-width 1280px)
        margin-top 188px

        &__bg
            top 0
            width 638px
            height 478px
            background-position 68px 0

        &__wrapper-content
            max-width 798px

        &__wrapper-media
            max-width 300px
            min-height 550px
            margin-top 12px

    @media only screen and (max-width 840px)
        margin-top 9px

        &__bg
            top 0
            left -70%
            right -70%
            width 781px
            height 402px
            background-position 0px 0
            background-size contain

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 226px
            min-height 414px
            margin-top 0
            margin-bottom 51px

    @media only screen and (max-width 500px)
        &__bg
            left unset
            right unset
            width 100%
            background-size cover

.popovich-model
    position relative
    margin-top 381px

    &__bg
        position absolute
        top -51px
        left 0
        right 0
        width 1036px
        height 523px
        margin 0 auto
        background url('~assets/img/collections/popovich/1.png') no-repeat
        background-position 0 0

    &__wrapper-content
        max-width 1300px

    &__wrapper-media
        max-width 765px
        min-height 495px

    .model__content
        max-width 489px
        margin-top 88px

    .model__text
        width 100%
        max-width unset

    @media only screen and (max-width 1280px)
        margin-top 170px

        &__bg
            top 0
            width 896px
            background-position 0 0

        &__wrapper-content
            max-width 901px

        &__wrapper-media
            max-width 420px
            min-height 272px
            margin-top 164px
            margin-bottom 87px

        .model__content
            max-width 436px
            margin-top 87px

    @media only screen and (max-width 840px)
        margin-top 53px

        &__bg
            left -10%
            right -10%
            width 423px
            height 265px
            background-position 0 0
            background-size cover

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 358px
            min-height 231px
            margin-top 26px
            margin-bottom 59px

        .model__content
            max-width unset
            margin-top 0

    @media only screen and (max-width 500px)
        &__bg
            left unset
            right unset
            width 100%

.muromets-model
    position relative
    margin-top 480px

    &__bg
        position absolute
        top -91px
        left 0
        right 0
        width 1472px
        height 704px
        margin 0 auto
        background url('~assets/img/collections/muromets/1.png') no-repeat
        background-position 278px 0

    &__wrapper-content
        max-width 1169px

    &__wrapper-media
        max-width 672px
        min-height 603px

    .model__content
        max-width 479px

    .model__text
        width 100%
        max-width unset

    @media only screen and (max-width 1471px)
        &__bg
            left -10%
            right -10%

    @media only screen and (max-width 1280px)
        margin-top 267px
        padding-bottom 85px

        &__bg
            top -133px
            width 1046px
            height 639px
            background-position -41px 0
            background-size cover

        &__wrapper-content
            max-width 881px

        &__wrapper-media
            max-width 454px
            min-height 407px

        .model__content
            max-width 409px

    @media only screen and (max-width 910px)
        &__bg
            left -15%
            right -15%

        &__wrapper-content
            max-width 825px

    @media only screen and (max-width 840px)
        margin-top 81px
        padding-bottom 0
        z-index 1

        &__bg
            top 0
            left -70%
            right -70%
            width 497px
            height 311px
            background url('~assets/img/collections/muromets/1-mb.png') no-repeat
            background-position 58px 0

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 362px
            min-height 325px
            margin-bottom 52px

        .model__content
            max-width unset

    @media only screen and (max-width 500px)
        &__bg
            left unset
            right unset
            width 100%
            background-size cover
            background-position center

.svyatogor-model
    position relative
    margin-top 269px

    &__bg
        position absolute
        top -50px
        left 0
        right 0
        width 1374px
        height 670px
        margin 0 auto
        background url('~assets/img/collections/svyatogor/1.png') no-repeat
        background-position 190px 0

    &__wrapper-content
        max-width 1247px

    &__wrapper-media
        max-width 698px
        min-height 658px

    .model__content
        max-width 489px
        margin-top 200px

    .model__text
        width 100%
        max-width unset

    @media only screen and (max-width 1373px)
        &__bg
            left -10%
            right -10%

    @media only screen and (max-width 1280px)
        margin-top 337px
        padding-bottom 28px

        &__bg
            top -209px
            width 1104px
            height 621px
            background-size cover
            background-position 0 0

        &__wrapper-content
            max-width 943px

        &__wrapper-media
            max-width 408px
            min-height 384px

        .model__content
            max-width 480px
            margin-top 0

    @media only screen and (max-width 950px)
        &__bg
            left -15%
            right -15%

        &__wrapper-content
            max-width 825px

    @media only screen and (max-width 840px)
        margin-top 107px
        padding-bottom 0

        &__bg
            top -119px
            left -70%
            right -70%
            width 719px
            height 404px
            background-position 0 0

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 348px
            min-height 328px
            margin-bottom 48px

        .model__content
            max-width unset

.dobrynya-model
    position relative
    margin-top 369px
    padding-bottom 81px

    &__bg
        position absolute
        top -81px
        left 0
        right 0
        width 1600px
        height 774px
        margin 0 auto
        background url('~assets/img/collections/dobrynya/1.png') no-repeat
        background-position 30px 0

    &__wrapper-content
        max-width 1069px

    &__wrapper-media
        max-width 541px
        min-height 612px

    .model__content
        max-width 502px
        margin-top 100px

    .model__text
        width 100%
        max-width unset

    @media only screen and (max-width 1600px)
        &__bg
            left -20%
            right -20%

    @media only screen and (max-width 1280px)
        margin-top 242px
        padding-bottom 0

        &__bg
            top -149px
            width 1189px
            height 575px
            background-position -81px 0
            background-size cover

        &__wrapper-content
            max-width 847px

        &__wrapper-media
            max-width 377px
            min-height 426px

        .model__content
            max-width 440px
            margin-top 52px

        .model__title
            max-width 403px

    @media only screen and (max-width 900px)
        &__bg
            left -30%
            right -30%

        &__wrapper-content
            max-width 825px

    @media only screen and (max-width 840px)
        margin-top 13px

        &__bg
            top 45px
            left -70%
            right -70%
            width 630px
            height 304px
            background-position 0 0
            background-size cover

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 325px
            min-height 368px
            margin-bottom 93px

        .model__content
            max-width unset
            margin-top 0

        .model__title
            max-width unset

.tsarevich-model
    position relative
    margin-top 291px
    padding-bottom 226px

    &__bg
        position absolute
        top -48px
        left 0
        right 0
        width 1396px
        height 581px
        margin 0 auto
        background url('~assets/img/collections/tsarevich/1.png') no-repeat
        background-position 414px 0

    &__wrapper-content
        max-width 1320px

    &__wrapper-media
        max-width 738px
        min-height 639px

    .model__content
        max-width 489px
        margin-top 187px

    .model__title
        max-width 324px

    .model__text
        width 100%
        max-width unset
        margin-bottom 16px

    @media only screen and (max-width 1395px)
        &__bg
            left -10%
            right -10%

    @media only screen and (max-width 1280px)
        margin-top 249px
        padding-bottom 180px

        &__bg
            top -103px
            width 1019px
            background-position -81px 0

        &__wrapper-content
            max-width 952px

        &__wrapper-media
            max-width 404px
            min-height 350px
            margin-top 61px

        .model__content
            margin-top 0

        .model__text
            margin-bottom 41px

    @media only screen and (max-width 970px)
        &__bg
            left -20%
            right -20%

        &__wrapper-content
            max-width 825px

    @media only screen and (max-width 840px)
        margin-top 91px

        &__bg
            top -66px
            left -70%
            right -70%
            width 687px
            height 391px
            background-position 0 0
            background-size cover

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 356px
            min-height 308px
            margin-top 0
            margin-bottom 69px

        .model__content
            max-width unset
            margin-top 0

        .model__title
            max-width unset

</style>
