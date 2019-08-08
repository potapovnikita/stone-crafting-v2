<template lang="pug">
    .common-container.news-container
        h1(v-html="lang === 'ru' ? 'Новости' : 'News'")
        .lds-dual-ring(v-if="!news.length")
        .news-list(v-if="news.length")
            .news-item(v-for="post in news" :key="post.id")
                .description
                    .line_top
                    .line_bottom
                    .text(v-if="post.caption && post.caption.text") {{getDescription(post.caption.text, lang)}}
                .photo
                    .inner(v-if="post.type === 'image'")
                        .lines
                        .over
                            img.img(:src="post.images.standard_resolution.url", :alt="post.user.full_name")
                    .inner(v-if="post.type === 'video'")
                        .lines
                        .over
                            video.video(preload="auto" controls :poster="post.images.standard_resolution.url" autoplay muted)
                                source(:src="post.videos.low_resolution.url" type="video/mp4" :poster="post.images.standard_resolution.url" style="zIndex: '-1'")

                    .inner(v-if="post.type === 'carousel'")
                        .lines
                        .over
                            img.carousel.img(:src="post.images.standard_resolution.url", :alt="post.user.full_name")

</template>

<script>
    import { mapState } from 'vuex'
    import jsonp from 'jsonp'

    import Company from '~/assets/staticData/company.json'

    export default {
        data() {
            return {
                company: Company,
                news: [],
            }
        },
        components: {
        },
        methods: {
            visible: (el) => {
                const targetPosition = {
                    top: window.pageYOffset + el.getBoundingClientRect().top,
                    left: window.pageXOffset + el.getBoundingClientRect().left,
                    right: window.pageXOffset + el.getBoundingClientRect().right,
                    bottom: window.pageYOffset + el.getBoundingClientRect().bottom,
                }

                const windowPosition = {
                    top: window.pageYOffset,
                    left: window.pageXOffset,
                    right: window.pageXOffset + document.documentElement.clientWidth,
                    bottom: window.pageYOffset + document.documentElement.clientHeight,
                };

                if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
                    targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
                    targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
                    targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
                    el.style.top = '0'
                    el.style.opacity = '1'
                }
            },
            getDescription(text, lang) {
                if (lang === 'ru') {
                    return text
                } else {
                    return text
                }
            }
        },
        computed: {
            ...mapState('localization', [
                'lang',
            ]),
        },
        async created() {
            //https://www.instagram.com/oauth/authorize/?client_id=3a74836a83d8482f864d327f82079cb8&redirect_uri=https://stone-crafting.com/&response_type=token
            const TOKEN = '198320409.bdaacdc.ad9cc9aa8fc84ea2bd9a51a134b35394' // токен для доступа к api
            const USER_ID = 'self' // id пользователя

            jsonp(`https://api.instagram.com/v1/users/${USER_ID}/media/recent/?access_token=${TOKEN}`, null, (err, res) => {
                if (err) {
                    console.error("Возникла ощибка", err.message);
                } else {
                    // оставляем только последние 6 фотографий профиля
                    this.news = res.data
                    console.log(this.news)
                    console.log(res.data)
                }
            });
        },
        watch: {},
        updated() {
            if (this.news.length > 0) {
                console.log(121212, document.querySelectorAll('.description'))

                const elems = [...document.querySelectorAll('.description')]
                elems.forEach((item) => {
                    // Запускаем функцию при прокрутке страницы
                    window && window.addEventListener('scroll', () => {
                        this.visible(item);
                    });
                })
            }
        },
        mounted() {
        }
    }
</script>

<style lang="stylus">
    .news-container
        .news-list
            display flex
            flex-direction column
            .news-item
                display flex
                flex-direction row
                justify-content space-between
                margin-bottom 30px
                &:nth-child(odd)
                    flex-direction row-reverse
                    .photo
                        .inner
                            .lines
                                right  -20%
                                left  initial
                .photo
                    width 40%
                    .inner
                        position relative

                        .over
                            overflow hidden

                            .video, .img, .carousel
                                width 100%
                                transition transform 0.5s ease-in
                                &:hover
                                    transform scale(1.1)

                        .lines
                            position absolute
                            height 1.5px
                            width 40%
                            background #faf3ed
                            left -20%
                            right initial
                            bottom 50%
                            z-index 1

                .description
                    overflow hidden
                    width 50%
                    position relative
                    top 100px
                    opacity 0
                    transition all 0.5s ease-in
                    .line_top,
                    .line_bottom
                        position absolute
                        width 30%
                        height 1.5px
                        background #faf3ed
                        z-index 1
                    .line_top
                        top 0
                        left 0
                    .line_bottom
                        bottom 0
                        right 0
                    .text
                        display flex
                        justify-content center
                        align-items center
                        padding 10px 30px
                        background darkRed
                        width 100%
                        height 100%
                        transition transform 0.5s ease-in
                        &:hover
                            transform scale(1.1)

        @media only screen and (max-width 767px)
            .news-list
                .news-item
                    flex-direction column-reverse
                    &:nth-child(odd)
                        flex-direction column-reverse
                    .photo, .description
                        width 100%
</style>
