<template lang="pug">
    .common-container.main-container
        .header-container(v-if="showPhoto")
            .header-container__title-container
                .header-container__circle
                h1.header-container__title {{ lang === 'ru' ? 'Камнерезный Дом Антонова' : 'Stone-crafting House by Alexey Antonov' }}
                p.header-container__sub-title {{ lang === 'ru' ? 'Камнерезное и ювелирное искусство' : 'Title on eng' }}
                .header-container__line
                .header-container__year-wrapper
                    .header-container__double-line
                    p.text_sverdlovsk {{ lang === 'ru' ? 'с 1968 года' : 'since 1968' }}

        .header__video-section(v-if="showVideo")
            video#video(playsinline autoplay="true" loop="true" muted="muted")
                source(src="~/assets/video/main-new.mp4" type="video/mp4")

        BrandHistory
        LinksPanel
        .wrapper-page
            .pic-top-left
            .pic-top-right
            .pic-bottom
            Tradition
            Footer

</template>

<script>
    import { mapState } from 'vuex'

    import Company from '~/assets/staticData/company.json'
    import Button from "@/components/ui/Button";
    import BrandHistory from "@/components/blocksComponents/BrandHistory";
    import LinksPanel from "@/components/blocksComponents/LinksPanel";
    import Tradition from "@/components/blocksComponents/Tradition";
    import Footer from '~/components/FooterNew.vue'

    export default {
        data() {
            return {
                company: Company,
                showPhoto: false,
                showVideo: true,
            }
        },
        components: {
            Button,
            BrandHistory,
            LinksPanel,
            Tradition,
            Footer,
        },
        computed: {
            ...mapState('localization', [
                'lang',
            ]),
            ...mapState('pagePreload', [
                'load',
            ]),
        },
        methods: {
          computedStyleFooter() {
              var count = 0;
              var int = setInterval(() => {
                  if (!this.load) {
                      var videoHeight = document.getElementsByTagName('video')[0].clientHeight;
                      var wrapper = document.getElementsByClassName('video-wrapper')[0];
                      var section = document.getElementsByClassName('video-section')[0];
                      var footer = document.getElementsByClassName('footer_container')[0];
                      if (videoHeight && footer && section && wrapper) {
                          wrapper.style.height = videoHeight + 'px';
                          section.style.height = videoHeight + 'px';
                          footer.classList.add('footer-add');
                          count++;
                          if (count > 5) clearInterval(int);
                      }
                  }
              }, 1000)
          },
        },
        mounted() {
            window.addEventListener('resize', () => {
                this.computedStyleFooter();
            })
            this.computedStyleFooter();
            // const vid = document.getElementById('video')
            // vid.play();
        },
        destroyed() {
            window.removeEventListener('resize', () => {
                this.computedStyleFooter();
            })
        }
    }
</script>

<style lang="stylus">
    .header-container
        height 982px
        background url('~assets/img/main/header-main.png') top center no-repeat
        background-size cover

        &__circle
            position absolute
            top 0
            left 0
            right 0
            margin 0 auto
            width 722px
            height 100%
            border 1px solid rgba(255, 255, 255, 0.07)
            border-radius 50%

        &__title-container
            position relative
            height 722px
            margin-top 148px
            padding-top 195px

        &__title
            font-size 68px
            margin-bottom 14px

        &__sub-title
            margin-bottom 35px
            font-size 19px
            line-height 140%
            letter-spacing 0.3em
            text-transform uppercase
            color goldNew

        &__line
            position absolute
            left 0
            right 0
            width 53px
            height 1px
            margin 0 auto
            background goldNew

        &__year-wrapper
            position relative
            padding-top 30px
            margin-top 102px

        &__double-line
            position absolute
            top 0
            left 0
            right 0
            width 163px
            height 4px
            margin 0 auto
            border 1px solid #6A6A6A
            border-left none
            border-right none

        @media only screen and (max-width 1280px)

            &__title-container
                position relative
                height 580px
                margin-top 110px
                padding-top 180px

            &__title
                font-size 52px

            &__circle
                width 580px

            &__year-wrapper
                padding-top 25px
                margin-top 83px

        @media only screen and (max-width 1024px)
            height 703px
            background url('~assets/img/main/header-main-ip.png') top center no-repeat

        @media only screen and (max-width 767px)
            height 100vh

            &__circle
                width 409px
                height 409px
                margin 0

            &__title-container
                height 409px
                margin-top 109px
                padding-top 108px

            &__title
                font-size 32px
                line-height 34px
                margin-bottom 33px

            &__sub-title
                margin-bottom 52px
                font-size 13px
                line-height 19px
                letter-spacing 0.3em
                text-transform uppercase
                color goldNew

            &__line
                width 39px

            &__year-wrapper
                padding-top 33px
                margin 0

            &__double-line
                display none

        @media only screen and (max-width 767px)
            background url('~assets/img/main/header-main-mb.png') no-repeat
            background-position center
            background-size cover

    .header__video-section
        display block

        video
            display block
            width 100%

    .wrapper-page
        position relative
        min-height 1550px
        background url('~assets/img/tradition/bg-main.png') no-repeat
        background-size cover

        .pic-top-left
            position absolute
            top 0
            left 0
            width 663px
            height 415px
            background url('~assets/img/tradition/bg-top-left.png') no-repeat
            background-position 0 -42px

        .pic-top-right
            position absolute
            top 0
            right 0
            width 181px
            height 345px
            background url('~assets/img/tradition/bg-top-right.png') no-repeat

        .pic-bottom
            position absolute
            bottom 0
            width 100%
            height 897px
            background linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%), url('~assets/img/tradition/bg-bottom.png') bottom right no-repeat

    .footer-add
        margin-top: -150px !important

        @media only screen and (max-width 767px)
            margin-top: 70px !important

    .main-container
        zoom 1
        &.main-container
            padding 0
            .video-section
                position relative
                height 100vh
                .video-wrapper
                    position absolute
                    overflow hidden
                    height 100vh
                    top -150px
                    left 0
                    width 100vw
                    @media only screen and (max-width 767px)
                        top 70px

                    .image
                        width: 100%;
                        height: 100%;
                        background-position: center;
                        background-size: cover;
                        background-repeat: no-repeat;

                    video
                        display block
                        position absolute
                        width 100%
                        z-index 1

    @media only screen and (max-width 1280px)
        .wrapper-page
            min-height 1210px

            .pic-top-left
                background-size 80%
                background-position -100px -50px

            .pic-top-right
                background-size 80%
                background-position 40px 50px

    @media only screen and (max-width 1024px)
        .wrapper-page
            .pic-bottom
                bottom -275px
                background-position 100px

    @media only screen and (max-width 767px)
        .wrapper-page
            min-height 1650px

            .pic-top-left
                background-position -68px 0
                background-size 30%

            .pic-top-right
                top unset
                background-position right 162px
                background-size 50%

            .pic-bottom
                height 563px
                bottom 0
                background-size cover
                background-position bottom right

</style>
