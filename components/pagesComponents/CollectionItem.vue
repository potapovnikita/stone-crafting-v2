<template lang="pug">
    div(:class="`${id}-model`")
        div(:class="`${id}-model__bg`")
        div(:class="['model__wrapper-content', `${id}-model__wrapper-content`, {'model__content-reverse': isReverse }]")
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

    &__wrapper-content
        position relative
        display flex
        justify-content space-between
        align-items center
    
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

.schemamonk-model
    position relative
    margin-top 217px

    &__bg
        position absolute
        top -37px
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
        max-height 728px

    @media only screen and (max-width 1280px)
        margin-top 80px

        &__bg
            top -110px
            width 1212px

        &__wrapper-content
            max-width 807px

        &__wrapper-media
            max-width 295px
            max-height 544px

    @media only screen and (max-width 1212px)
        &__bg
            left -10%
            right -23%
            

    @media only screen and (max-width 840px)
        margin-top 0
        margin-bottom 0

        &__bg
            top 0
            left -50%
            right -10%
            width 1062px
            height 663px
            background-size cover

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            margin-top 128px
            max-width 249px
            max-height 458px

    @media only screen and (max-width 650px)
        &__bg
            left -80%
            right -20%

    @media only screen and (max-width 510px)
        &__bg
            left -95%
            right -25%

    @media only screen and (max-width 470px)
        &__bg
            left -110%
            right -30%

    @media only screen and (max-width 410px)
        &__bg
            left -130%
            right -35%
    
    @media only screen and (max-width 370px)
        &__bg
            left -140%
            right -40%

     @media only screen and (max-width 350px)

        &__bg
            left -155%
            right -50%

.scarlet-model
    position relative
    margin-top 185px

    &__bg
        position absolute
        top 30px
        left 0
        right 0
        width 1400px
        height 724px
        margin 0 auto
        background url('~assets/img/collections/scarlet/1.png') no-repeat
        background-position 390px 0px

    &__wrapper-content
        max-width 1075px

    &__wrapper-media
        max-width 508px
        max-height 818px

    @media only screen and (max-width 1280px)
        margin-top 130px

        &__bg
            top -130px
            width 1081px
            background url('~assets/img/collections/scarlet/1.png') no-repeat
            background-position 100px 0px

        &__wrapper-content
            max-width 822px

        &__wrapper-media
            max-width 358px
            max-height 576px

    @media only screen and (max-width 840px)
        margin-top 0

        &__bg
            top -70px
            left 0
            right 0
            width 755px
            height 506px
            background url('~assets/img/collections/scarlet/1-mb.png') no-repeat
            background-position 200px 0px

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 259px
            max-height 444px

    @media only screen and (max-width 767px)
        margin-top 70px

    @media only screen and (max-width 755px)
         &__bg
            left -80%
            right -80%
            background-position 190px 0px

.babayaga-model
    position relative
    margin-top 160px
    z-index 1

    &__bg
        position absolute
        top -80px
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
        max-height 767px

    @media only screen and (max-width 1280px)
        margin-top 235px

        &__bg
            top -130px
            width 645px
            height 707px
            background url('~assets/img/collections/babayaga/1-ip.png') no-repeat
            background-position 20px 0

        &__wrapper-content
            max-width 816px

        &__wrapper-media
            max-width 372px
            max-height 562px

    @media only screen and (max-width 840px)
        margin-top 0

        &__bg
            top 0
            width 470px
            height 513px
            background url('~assets/img/collections/babayaga/1.png') no-repeat
            background-position -20px 0
            background-size cover

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            margin-top 100px
            max-width 264px
            max-height 400px

    @media only screen and (max-width 470px)
        &__bg
            left -60px
            right -60px

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
        max-height 844px

    @media only screen and (max-width 1387px)
        &__bg
            left -5%
            right -5%

    @media only screen and (max-width 1280px)

        &__bg
            top -50px
            left 0
            right 0
            width 1024px
            background-position 0 0

        &__wrapper-content
            max-width 825px

        &__wrapper-media
            max-width 357px
            max-height 534px

    @media only screen and (max-width 1023px)
        &__bg
            left -10%
            right -10%

    @media only screen and (max-width 840px)
        margin-top 30px

        &__bg
            top -80px
            width 716px
            height 449px
            background-size cover
            background-position -20px 0

        &__wrapper-content
            flex-direction column !important
            max-width unset

        &__wrapper-media
            max-width 278px
            max-height 415px

     @media only screen and (max-width 715px)
        &__bg
            left -60%
            right -60%

.watery-model
    position relative
    margin-top 222px

    &__bg
        position absolute
        top 0
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
        max-height 785px

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
            max-height 608px

    @media only screen and (max-width 870px)
         &__bg
            left -20%
            right -20%

        &__wrapper-content
            max-width 820px

    @media only screen and (max-width 840px)
        margin-top 0

        &__bg
            top 0
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
            max-height 422px
            margin-top 40px

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
        max-height 654px

    @media only screen and (max-width 1280px)
        margin-top 215px

        &__bg
            top -127px
            width 896px
            height 670px
            background-position 0 0

        &__wrapper-content
            max-width 813px

        &__wrapper-media
            max-width 380px
            max-height 470px

    @media only screen and (max-width 895px)
         &__bg
            left -10%
            right -10%

    @media only screen and (max-width 840px)
        margin-top 0

        &__bg
            top 45px
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
            max-height 392px
            margin-top 55px

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
        max-height 792px

    @media only screen and (max-width 1280px)
        margin-top 76px

        &__bg
            top 0
            width 901px
            height 645px

        &__wrapper-content
            max-width 826px

        &__wrapper-media
            max-width 344px
            max-height 552px
            margin-top 88px

    @media only screen and (max-width 900px)
         &__bg
            left -10%
            right -10%

    @media only screen and (max-width 840px)
        margin-top 15px
        z-index 2

        &__bg
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
            max-height 433px
            margin-top 21px
            margin-bottom 70px

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
        max-height 785px

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
            max-height 560px
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
            max-height 459px
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
        max-height 853px

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
            max-height 552px
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
            max-height 394px
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
        max-height 805px

    @media only screen and (max-width 1280px)
        margin-top 80px

        &__bg
            top 11px
            background-position -132px 0

        &__wrapper-content
            max-width 803px

        &__wrapper-media
            max-width 355px
            max-height 641px

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
            max-height 540px
            margin-bottom 6px


</style>