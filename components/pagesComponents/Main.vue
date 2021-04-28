<template lang="pug">
    .common-container.main-container
        .header-container(v-if="showPhoto")
            .header-container__title-container
                HeaderMain

        .header__video-section(v-if="showVideo")
            .header-container__title-container.header-container__title-container--position-absolute
                HeaderMain
            video#video(playsinline autoplay loop="true" muted="muted")
                source(:src="getImg('video/main-new.mp4')" type="video/mp4")

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

    import Button from "@/components/ui/Button";
    import BrandHistory from "@/components/blocksComponents/BrandHistory";
    import LinksPanel from "@/components/blocksComponents/LinksPanel";
    import Tradition from "@/components/blocksComponents/Tradition";
    import Footer from '~/components/Footer.vue'
    import HeaderMain from "@/components/blocksComponents/HeaderMain";
    import { getImgExternal } from '~/plugins/getUrl'

    export default {
        data() {
            return {
                showPhoto: true,
                showVideo: false,
            }
        },
        components: {
            Button,
            BrandHistory,
            LinksPanel,
            Tradition,
            Footer,
            HeaderMain,
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
            getImg(url) {
                return getImgExternal(url)
            },
          computedStyleFooter() {
              if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
                  this.showPhoto = true
                  this.showVideo = false
                  return
              }
              this.showPhoto = false
              this.showVideo = true
              var count = 0;
              var int = setInterval(() => {
                  if (!this.load) {
                      var videoHeight = document.getElementsByTagName('video')[0].clientHeight;
                      var section = document.getElementsByClassName('header__video-section')[0];
                      if (videoHeight && section) {
                          section.style.height = videoHeight + 'px';
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

        &__title-container
            margin-top 148px

            &--position-absolute
                position absolute
                left 0
                right 0
                margin-top 65px

        @media only screen and (max-width 1280px)

            &__title-container
                margin-top 110px

                &--position-absolute
                    margin-top 30px

        @media only screen and (max-width 1024px)
            height 703px
            background url('~assets/img/main/header-main-ip.png') top center no-repeat

        @media only screen and (max-width 900px) and (max-height 500px)
            height 100vh
            background-size cover

            &__title-container
                margin-top 80px

        @media only screen and (max-width 767px)
            height 100vh

            &__title-container
                margin-top 109px

                &--position-absolute
                    margin-top 10px

            background url('~assets/img/main/header-main-mb.png') no-repeat
            background-position center
            background-size cover

        @media only screen and (max-width 767px) and (max-height 500px)
            background url('~assets/img/main/header-main-ip.png') top center no-repeat
            background-size cover

            &__title-container
                margin-top 80px

        @media only screen and (max-width 767px) and (max-height 350px)
            &__title-container
                margin-top 60px

    .header__video-section
        display block
        position relative

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
