<template lang="pug">
    .common-container.main-container
        .video-section
            .video-wrapper
                <!--.image(v-if="!currentProduct.video" :style="{backgroundImage: getBgImg(currentProduct.background)}")-->
                video#video(playsinline autoplay="true" loop="true" muted="muted")
                    source(src="~/assets/video/main.mp4" type="video/mp4")



</template>

<script>
    import { mapState } from 'vuex'

    import Company from '~/assets/staticData/company.json'

    export default {
        data() {
            return {
                company: Company,
            }
        },
        components: {
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
            const vid = document.getElementById('video')
            vid.play();
        },
        destroyed() {
            window.removeEventListener('resize', () => {
                this.computedStyleFooter();
            })
        }
    }
</script>

<style lang="stylus">
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
