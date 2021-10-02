<template lang="pug">
    .common-container.news-container
        .news-container__bg-top
        .news-container__bg-bottom
        .news-container__wrapper
            h1.title(v-html="lang === 'ru' ? 'Новости' : 'News'")

            .lds-dual-ring(v-if="!news.length")
            .news-list(v-if="news.length")
                .news-item(v-for="post in news" :key="post.id")
                    .description
                        .line_top
                        .line_bottom
                        .text(v-if="post.caption") {{getDescription(post.caption, lang)}}
                    .photo
                        .inner(v-if="post.media_type === 'IMAGE'")
                            .lines
                            .over
                                img.img(:src="post.media_url", :alt="post.caption")
                        .inner(v-if="post.media_type === 'VIDEO'")
                            .lines
                            .over(v-if="post.media_url")
                                video.video(preload="auto" controls :poster="post.media_url" autoplay muted playsinline)
                                    source(:src="post.media_url" type="video/mp4" :poster="post.media_url" style="zIndex: '-1'")

                        .inner(v-if="post.media_type === 'CAROUSEL_ALBUM'")
                            .lines
                            .over
                                img.carousel.img(:src="post.media_url", :alt="post.media_type")
        Footer

</template>

<script>
import { mapState } from 'vuex'
import Footer from '~/components/Footer.vue'
import jsonp from 'jsonp'

export default {
    data() {
        return {
            news: [],
        }
    },
    components: {
        Footer,
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
        },
        async getNews(USER_ID, TOKEN, req) {

            const request = req || `https://graph.instagram.com/${USER_ID}/media?access_token=${TOKEN}&fields=caption,media_type,permalink,media_url`
            await jsonp(request, null, (err, res) => {
                if (err) {
                    console.error("Возникла ошибка", err.message);
                } else {
                    // оставляем только посты с тэгом "stonecraftinghousebyantonov"
                    res.data && res.data.forEach(item => {
                        if (item.caption && item.caption.toLowerCase().match(/#stonecraftinghousebyantonov/gi)) this.news.push(item)
                    })
                    if (res.paging && res.paging.next) this.getNews(USER_ID, TOKEN, res.paging.next)
                }
            });
        }
    },
    computed: {
        ...mapState('localization', [
            'lang',
        ]),
    },
    async mounted() {
        //https://www.instagram.com/oauth/authorize/?client_id=3a74836a83d8482f864d327f82079cb8&redirect_uri=https://stone-crafting.com/&response_type=token
        // токен для доступа к api, при смене пароля менять токен тут https://www.instagram.com/developer/clients/manage/

        //IGQVJVOFF2b3pvWmt0cHl2S0tCWEV1d25HY0J6UnNaakJib0V5Yk1qeFVraWVoRXJJdlpPZAFBIQXFfb3ZAfMlUwS0V0WlRoVUFkbDdFeVBPTEtwTnFTdkNLb25hYm5Bc050TjA5Y1FhSjMxZADB1LXZAPUgZDZD
        // такой ответ после редиректа, нужно взять код и применить его в следующем запросе
        // https://stone-crafting.com/?code=AQCWh9xV4gp8AdizxM7Pn7179sQdSZoPhYbwut2_D4cs15RKpg-vdjiX0XZ_tHtLfNBAReaSSdbc02Ji3R-jKMUbQkbRSG1nnL5pqJLDhnQ2eU6a1TpRHDBcfwz1eMnOqnGfQFKCU0g9La1dby9ubRZ7ACEJ_0DKETB-HnubJWrrZCwjiGtlqW4QIxeiKyyXHx8jKZ_fkZ9A-0xUmANuA1ZlMFR1hWHmnyF5LdJcLwjzWA#_

        // запрос для краткосрочноко маркера
        /*
        * curl -X POST https://api.instagram.com/oauth/access_token -F client_id=983242938773357 -F client_secret=ac3d40b0da4fc62cd5244ed75e068166 -F grant_type=authorization_code -F redirect_uri=https://stone-crafting.com/ -F code=AQAaEY4alHLHzLCJbjl7reE-PXJa5a-gnSaQCb1movTaG6E_IEOUOWq3LohF1xtdqIeqRv-8fUgAtRWTSQH92UK6wF1Q1_btFXxMlGavHZj_ZlcXjuk_ZL6n-B4aQcfkxkAiiZSaKwevuQkE4GWDkuou7dYR1h04mxU0Osd6EzfhJuWGvqUCLL4xeeLXqlafAMUfU7nEaTs2usYuKBJjfg2U62WKWd1RW4aRAURELW6W5w
        * */
        // code AQAaEY4alHLHzLCJbjl7reE-PXJa5a-gnSaQCb1movTaG6E_IEOUOWq3LohF1xtdqIeqRv-8fUgAtRWTSQH92UK6wF1Q1_btFXxMlGavHZj_ZlcXjuk_ZL6n-B4aQcfkxkAiiZSaKwevuQkE4GWDkuou7dYR1h04mxU0Osd6EzfhJuWGvqUCLL4xeeLXqlafAMUfU7nEaTs2usYuKBJjfg2U62WKWd1RW4aRAURELW6W5w
        // {"access_token": "IGQVJYNWxrbkpMbm9XcDBYdnNJNURoZAThWWXRvT0huakNpbVg0Yl85dHlDNkw5V1V3MG4yQ1A3NE1fcjNkbWJhY1JCTUg4ak9YakhWd0lKN050VGJZAakZAIby1SODRUOUNrWDdTRzM3S1VoSEhUZA0J0bzViVzUzNXhoWGdz", "user_id": 17841401452273098}%
        // {"id":"17841401452273098","username":"stone.crafting.house"}%

        /*
        далее нужно получить токен с большим временем действия (2 мес)
        запрос для получения длинного аксесс токена (2 мес):
        curl -X GET 'https://graph.instagram.com/access_token?grant_type=ig_exchange_token&&client_secret=ac3d40b0da4fc62cd5244ed75e068166&access_token=IGQVJYNWxrbkpMbm9XcDBYdnNJNURoZAThWWXRvT0huakNpbVg0Yl85dHlDNkw5V1V3MG4yQ1A3NE1fcjNkbWJhY1JCTUg4ak9YakhWd0lKN050VGJZAakZAIby1SODRUOUNrWDdTRzM3S1VoSEhUZA0J0bzViVzUzNXhoWGdz'
        ответ:
        копируем токен в токен
        {"access_token":"IGQVJWRzNrZAEJKT2hZAeExkUDRkRnVwUUhjV2FOR0FaUU9Od3ZAhV2w0YUI5NmtDLWtsWGVfZA2U5UFZAuZAEtCNHVtTXhiREszeFRXamwyX2FUSkJPRUVQRnZAnOXZAFSHlmcmdPdmdmd1p3","token_type":"bearer","expires_in":5184000}%
        */
        const TOKEN = 'IGQVJVOFF2b3pvWmt0cHl2S0tCWEV1d25HY0J6UnNaakJib0V5Yk1qeFVraWVoRXJJdlpPZAFBIQXFfb3ZAfMlUwS0V0WlRoVUFkbDdFeVBPTEtwTnFTdkNLb25hYm5Bc050TjA5Y1FhSjMxZADB1LXZAPUgZDZD'
        const USER_ID = '17841401452273098' // id пользователя

        // new https://graph.instagram.com/${USER_ID}/media?access_token=${TOKEN}
        // old https://api.instagram.com/v1/users/${USER_ID}/media/recent/?access_token=${TOKEN}

        this.getNews(USER_ID, TOKEN);
    },
    watch: {},
    updated() {
        if (this.news.length > 0 && window.document) {
            const elems = [...document.querySelectorAll('.description')]
            elems.forEach((item) => {
                this.visible(item);

                // Запускаем функцию при прокрутке страницы
                window && window.addEventListener('scroll', () => {
                    this.visible(item);
                });
            })
        }
    },
}
</script>

<style lang="stylus">
.common-container
    padding 0
.news-container
    position relative
    background linear-gradient(180deg, #111111 0%, rgba(17, 17, 17, 0) 100%)
    min-height 100vh
    padding-top 117px

    @media only screen and (max-width 767px)
        padding-top 80px

    &__bg-top
        position absolute
        top 0
        left 0
        right 0
        width 100%
        height 100%
        background linear-gradient(180deg, #111111 0%, rgba(17, 17, 17, 0) 111.47%), url('~assets/img/contacts/bg-top.png') no-repeat top center
        background-size cover

    &__bg-bottom
        position absolute
        left 0
        right 0
        bottom 0
        width 100%
        height 953px
        background url('~assets/img/contacts/bg-bottom.png') no-repeat bottom center
        background-size cover

    &__wrapper
        position relative

    .title
        margin-bottom 26px

    .wrapper-bg
        position relative

    .bg-bottom
        position absolute
        left 0
        right 0
        bottom 0
        width 100%
        height 953px
        background url('~assets/img/contacts/bg-bottom.png'), linear-gradient(180deg, #111111 0%, rgba(17, 17, 17, 0) 100%)
        background-repeat no-repeat

    .lds-dual-ring
        margin 220px auto
        position relative
        &:after
            border: 5px solid;
            border-color: white transparent white transparent;

    .news-list
        display flex
        flex-direction column
        padding 30px 60px
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
                    width 100%
                    height 100%
                    transition transform 0.5s ease-in
                    &:hover
                        transform scale(1.015)

    @media only screen and (max-width 768px)
        .news-list
            align-items center
            .news-item
                flex-direction column-reverse
                max-width 450px
                &:nth-child(odd)
                    flex-direction column-reverse
                .photo, .description
                    width 100%

    @media only screen and (max-width 767px)
        padding-top 76px
        background url('~assets/img/contacts/bg-mb.png')
        background-size contain

        &__bg-top
            display none

        &__bg-bottom
            display none

        &__wrapper
            padding 0 12px

        .title
            margin-bottom 40px
            font-size 28px

</style>
