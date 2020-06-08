<template lang="pug">
    .common-container.virtual-museum_container
        h1(v-html="lang === 'ru' ? 'Виртуальный музей' : 'Virtual museum'")

        //1
        h2(v-html="lang === 'ru' ? 'Центральный вход' : 'Reception'")
        iframe.virtualFrame(
            src="https://www.google.com/maps/embed?pb=!4v1591618963609!6m8!1m7!1sCAoSLEFGMVFpcFBERUlhcUFyYTZHTENRaGVUbW41TTdoc0lLdkFLVU9OVDhYaExj!2m2!1d56.8363512!2d60.5865783!3f160!4f0!5f0.7820865974627469&callback=getHeight(0)"
            width="100%"
            :height="getHeight(0)"
            frameborder="0"
            style="border:0;"
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
            )
        //2
        h2(v-html="lang === 'ru' ? 'Зал #1' : 'Hall #1'")
        iframe.virtualFrame(
            src="https://www.google.com/maps/embed?pb=!4v1591619000043!6m8!1m7!1sCAoSLEFGMVFpcE9VMzUwRC0xOUhSUEFTSnY4SzZuZWdwMGNVZnA1QkNjSzdiRzJp!2m2!1d56.8362148!2d60.5867361!3f240!4f0!5f0.7820865974627469"
            width="100%"
            :height="getHeight(0)"
            frameborder="0"
            style="border:0;"
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
        )


        //6
        h2(v-html="lang === 'ru' ? 'Музей камня' : 'Museum of stones'")
        iframe.virtualFrame(
            src="https://www.google.com/maps/embed?pb=!4v1591619018979!6m8!1m7!1sCAoSLEFGMVFpcE5rTld3RTQxZUw0MW0wc0R5ZDdDUW9KOXloRDZua0NVZ0dtWkY4!2m2!1d56.836192!2d60.5863481!3f100!4f0!5f0.7820865974627469"
            width="100%"
            :height="getHeight(0)"
            frameborder="0"
            style="border:0;"
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
        )

        //8
        h2(v-html="lang === 'ru' ? 'Музей камня' : 'Museum of stones'")
        iframe.virtualFrame(
            src="https://www.google.com/maps/embed?pb=!4v1591619040850!6m8!1m7!1sCAoSLEFGMVFpcE9XRXI5aXMxX3kxdUYyUjZKUUpQYU9xVkZBRTVMRVNPNUhPQTN2!2m2!1d56.8361106!2d60.5863706!3f0!4f0!5f0.7820865974627469"
            width="100%"
            :height="getHeight(0)"
            frameborder="0"
            style="border:0;"
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
        )

        //23
        h2(v-html="lang === 'ru' ? 'Салон Antonov' : 'Salon Antonov'")
        iframe.virtualFrame(
            src="https://www.google.com/maps/embed?pb=!4v1591619072289!6m8!1m7!1sCAoSLEFGMVFpcFBIZ2JQN0ZRWWp5X09LZl9lY0F0c0JMV0s5T2F0MFFWbTBLMGJ1!2m2!1d56.8362098!2d60.58651150000001!3f180!4f10!5f0.7820865974627469"
            width="100%"
            :height="getHeight(0)"
            frameborder="0"
            style="border:0;"
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
        )

        //40
        h2(v-html="lang === 'ru' ? 'Зал #2' : 'Hall #2'")
        iframe.virtualFrame(
            src="https://www.google.com/maps/embed?pb=!4v1591619132865!6m8!1m7!1sCAoSLEFGMVFpcFA1SXozTW9ERDRGTVZqT2w0VkhNWktmU2JZY2RRbnplaVhvWElH!2m2!1d56.8360175!2d60.5863852!3f100!4f0!5f0.7820865974627469"
            width="100%"
            :height="getHeight(0)"
            frameborder="0"
            style="border:0;"
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
        )

        //36
        h2(v-html="lang === 'ru' ? 'Зал Коррида' : 'Hall Corrida'")
        iframe.virtualFrame(
            src="https://www.google.com/maps/embed?pb=!4v1591619106913!6m8!1m7!1sCAoSLEFGMVFpcFB1WjEybEM1T1l5SFRxRFpGYWhjcDhGbHpUd05Hdjh0LWl0TlVJ!2m2!1d56.8361092!2d60.58628849999999!3f320!4f0!5f0.7820865974627469"
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


</template>

<script>
    import { mapState } from 'vuex'

    export default {
        data() {
            return {
                height: '500px',
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
        h2
            margin-bottom 15px
        .virtualFrame
            margin-bottom 40px
        .link_others
            cursor pointer
            text-decoration underline
            &:hover
                text-decoration none
</style>
