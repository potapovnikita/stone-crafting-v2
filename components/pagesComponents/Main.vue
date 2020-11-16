<template lang="pug">
    .common-container.main-container
        .header-container
            .header-pic
            .header-container__title-container
                .header-container__circle
                h1.header-container__title
                    | Камнерезный Дом Антонова
                p.header-container__sub-title
                    | Камнерезное и ювелирное искусство
                .header-container__line
                .header-container__year-wrapper
                    .header-container__double-line
                    p.text_sverdlovsk
                        | с 1968 года

        BrandHistory
        LinksPanel
        Tradition

</template>

<script>
    import { mapState } from 'vuex'

    import Company from '~/assets/staticData/company.json'
    import Button from "@/components/ui/Button";
    import BrandHistory from "@/components/pagesComponents/BrandHistory";
    import LinksPanel from "@/components/pagesComponents/LinksPanel";
    import Tradition from "@/components/pagesComponents/Tradition";

    export default {
        data() {
            return {
                company: Company,
            }
        },
        components: {
            Button,
            BrandHistory,
            LinksPanel,
            Tradition,
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
        position relative
        height 982px

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

    .header-pic
        position absolute
        width 100%
        height 100%
        background url('~assets/img/main/header-main.png')
        background-position center
        background-size cover

        @media only screen and (max-width 767px)
            background url('~assets/img/main/header-main-mb.png') no-repeat
            background-position center
            background-size cover

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

</style>
