<template lang="pug">
    .common-container.virtual-museum_container
        h1(v-html="lang === 'ru' ? 'Виртуальный музей' : 'Virtual museum'")

        div(v-for="virtual in virtuals")
            h2(v-html="lang === 'ru' ? virtual.name : virtual.nameEng")
            iframe.virtualFrame(
                :src="virtual.src + '&callback=getHeight(0)'"
                width="100%"
                :height="getHeight(0)"
                frameborder="0"
                style="border:0;"
                allowfullscreen=""
                aria-hidden="false"
                tabindex="0"
            )


        a.link_others(href="https://www.google.ru/maps/place/%D0%9A%D0%B0%D0%BC%D0%BD%D0%B5%D1%80%D0%B5%D0%B7%D0%BD%D1%8B%D0%B9+%D0%94%D0%BE%D0%BC+%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B5%D1%8F+%D0%90%D0%BD%D1%82%D0%BE%D0%BD%D0%BE%D0%B2%D0%B0/@56.836048,60.586338,3a,75y,111.67h,82.87t/data=!3m7!1e1!3m5!1sAF1QipN9M31bSM121U6LS6fHOV5OGARHqF2582EbZQNs!2e10!3e12!7i10000!8i5000!4m5!3m4!1s0x43c16f71af1aa795:0xada16b7f8054d7a9!8m2!3d56.836228!4d60.58609?hl=ru"
                    target="_blank"
                    v-html="lang === 'ru' ? 'Смотреть больше виртуальных туров' : 'See more virtual tours'"
        )

        .hint(v-if="lang === 'eng'") Turn on the subtitles on the video to see the English version
        .videoVirtual
            iframe(
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/f7Wr6vCnxbg"
                frameborder="0"
                allow="accelerometer;autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                :hl="lang === 'ru' ? 'ru' : 'en'"
                )



</template>

<script>
    import { mapState } from 'vuex'
    import Virtual from '~/assets/staticData/virtual.json'

    export default {
        data() {
            return {
                height: '500px',
                virtuals: Virtual,
            }
        },
        components: {
        },
        methods: {
            getHeight(i) {
                if (process.browser) {
                    const virtual = document.querySelectorAll('.virtualFrame')
                    const width = Array.from(virtual)[i] && Array.from(virtual)[i].clientWidth
                    if (width) {
                        return (width * 9) / 16 + 'px';
                    }
                    return'600px';
                }
                return'600px';
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
    .virtual-museum_container
        display flex
        justify-content center
        flex-direction column

        h2
            margin-bottom 15px
        .virtualFrame
            margin-bottom 40px
        .link_others
            cursor pointer
            text-decoration underline
            margin-bottom 40px
            &:hover
                text-decoration none

        .hint
            margin-bottom 20px

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
</style>
