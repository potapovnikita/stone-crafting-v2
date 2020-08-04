<template lang="pug">
    .common-container.about-container
        h1 {{ lang === 'ru' ? 'О компании' : 'About company' }}
        .descriptionAbout
            img.photo.left(src="~/assets/img/about/aleksei_antonov.png" alt="Antonov")
            .text
                .title(v-html="lang === 'ru' ? company.aboutTitleRu : company.aboutTitleEng")
                .ception(v-html="lang === 'ru' ? company.aboutRu : company.aboutEng")

        .historyButton
            .button(@click="$nuxt.$router.push({path:`/history`})") {{lang === 'ru' ? 'История бренда' : 'Brand history'}}

        .descriptionAbout.reverse
            .text.left
                .title(v-html="lang === 'ru' ? company.aboutTitleRu2 : company.aboutTitleEng2")
                .ception(v-html="lang === 'ru' ? company.aboutRu2 : company.aboutEng2")
            img.photo(src="~/assets/img/about/road.png" alt="Antonov")


        .descriptionAbout
            video.video.left(preload="auto" controls autoplay muted playsinline)
                source(src="~/assets/img/about/toreodor.mp4" type="video/mp4" style="zIndex: '-1'")
            .text
                .title(v-html="lang === 'ru' ? company.aboutTitleRu3 : company.aboutTitleEng3")
                .ception(v-html="lang === 'ru' ? company.aboutRu3 : company.aboutEng3")

        .descriptionAbout.reverse
            .text.left
                .title(v-html="lang === 'ru' ? company.aboutTitleRu4 : company.aboutTitleEng4")
                .ception(v-html="lang === 'ru' ? company.aboutRu4 : company.aboutEng4")
            .photo
                client-only
                    carousel(:navigationEnabled="true" :perPage="1" paginationActiveColor="#b0a74a" :autoplay="true" :autoplayHoverPause="true" :loop="true")
                        slide
                            img.carouselPhoto(src="~/assets/img/about/carousel/1.jpg" alt="Antonov")
                        slide
                            img.carouselPhoto(src="~/assets/img/about/carousel/2.jpg" alt="Antonov")
                        slide
                            img.carouselPhoto(src="~/assets/img/about/carousel/3.jpg" alt="Antonov")
                        slide
                            img.carouselPhoto(src="~/assets/img/about/carousel/4.jpg" alt="Antonov")
                        slide
                            img.carouselPhoto(src="~/assets/img/about/carousel/5.jpg" alt="Antonov")
                        slide
                            img.carouselPhoto(src="~/assets/img/about/carousel/6.jpg" alt="Antonov")
                        slide
                            img.carouselPhoto(src="~/assets/img/about/carousel/7.jpg" alt="Antonov")
                        slide
                            video.carouselPhoto(preload="auto" controls autoplay muted playsinline)
                                source(src="~/assets/img/about/carousel/8.mp4" type="video/mp4" style="zIndex: '-1'")
                        slide
                            img.carouselPhoto(src="~/assets/img/about/carousel/9.jpg" alt="Antonov")

        h2 {{ lang === 'ru' ? 'Эксперты о нас' : 'Experts about us' }}
        .descriptionAbout
            img.photo.left(src="~/assets/img/about/skurlov.png" alt="Antonov")
            .text
                .title(v-html="lang === 'ru' ? company.aboutTitleRu5 : company.aboutTitleEng5")
                .ception(v-html="lang === 'ru' ? company.aboutRu5 : company.aboutEng5")

        .descriptionAbout.reverse
            .text.left
                .title(v-html="lang === 'ru' ? company.aboutTitleRu6 : company.aboutTitleEng6")
                .ception(v-html="lang === 'ru' ? company.aboutRu6 : company.aboutEng6")
            img.photo(src="~/assets/img/about/faberge.png" alt="Antonov")

        .descriptionAbout
            img.photo.left(src="~/assets/img/about/eltsina.png" alt="Antonov")
            .text
                .title(v-html="lang === 'ru' ? company.aboutTitleRu7 : company.aboutTitleEng7")
                .ception(v-html="lang === 'ru' ? company.aboutRu7 : company.aboutEng7")


        .caption_section
            h2.ristretto {{ lang === 'ru' ? 'Награды и звания' : 'Awards and titles' }}
            .awards
                .award(v-for="award in awards")
                    .imgAward(:style="{backgroundImage: getBgImg(award.img)}")
                    .textAward {{ lang === 'ru' ? award.name : award.nameEng }}

            div(v-show="lang === 'ru'")
                h2.ristretto {{ lang === 'ru' ? 'Статьи' : 'Articles' }}
                .articles
                    a.article(v-for="article in articles" :href="article.link" target="_blank")
                        .item(:style="{backgroundImage: getBgImg(article.background)}")
                            .mask
                        .text
                            | {{ lang === 'ru' ? article.name : article.nameEng }}
                            br
                            a(:href="article.link" target="_blank") {{ lang === 'ru' ? 'Подробнее' : 'More' }}


            h2.ristretto {{ lang === 'ru' ? 'СМИ о нас' : 'Mass Media about us' }}
            .hint(v-if="lang === 'eng'") Turn on the subtitles on the video to see the English version
            .smi(v-for="(item, index) in smi" v-show="index === activeSmi")
                .videoName {{ lang === 'ru' ? item.name : item.nameEng }}
                .videoSmi
                    .iconArrow(@click="onPreviousSmi()")
                        ChevronLeftIcon(size="3x")
                    .video
                        iframe(width="100%" height="100%"
                            :src="item.src"
                            frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            :hl="lang === 'ru' ? 'ru' : 'en'"
                            allowfullscreen
                            )
                    .iconArrow(@click="onNextSmi()")
                        ChevronRightIcon(size="3x")

            h2.ristretto {{ lang === 'ru' ? 'Фильмы о Камнерезном Доме Алексея Антонова' : 'Movies about the Stone-crafting House by Alexey Antonov' }}
            .hint(v-if="lang === 'eng'") Turn on the subtitles on the video to see the English version
            .films(v-for="(film, index) in films" v-show="index === activeFilm")
                .videoName {{ lang === 'ru' ? film.name : film.nameEng }}
                .videoFilm
                    .iconArrow(@click="onPreviousFilm()")
                        ChevronLeftIcon(size="3x")
                    .video
                        iframe(width="100%"
                            height="100%"
                            :src="film.src"
                            frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            :hl="lang === 'ru' ? 'ru' : 'en'"
                            allowfullscreen
                            )
                    .iconArrow(@click="onNextFilm()")
                        ChevronRightIcon(size="3x")

            h2.ristretto {{ lang === 'ru' ? 'Каталоги' : 'Catalogs' }}
            .catalogs
                a.catalog(v-for="catalog in catalogs" :href="catalog.link" target="_blank")
                    .item(:style="{backgroundImage: getBgImg(catalog.background)}")
                    .text.textCat {{ lang === 'ru' ? catalog.name : catalog.nameEng }}



</template>

<script>
    import { ChevronRightIcon, ChevronLeftIcon  } from 'vue-feather-icons'
    import { mapState } from 'vuex'

    import Company from '~/assets/staticData/company.json'

    export default {
        data() {
            return {
                company: Company.company,
                articles: Company.company.articles,
                awards: Company.company.awards,
                catalogs: Company.company.catalogs,
                smi: Company.company.smi.videos,
                films: Company.company.films,
                activeSmi: 0,
                activeFilm: 0,
            }
        },
        components: {
            ChevronRightIcon,
            ChevronLeftIcon,
        },
        methods: {
            getBgImg(url) {
                const imageUrl = require('~/assets/' + `${url}`)
                return url ? `url(${imageUrl})` : ''
            },
            getImg(url) {
                const imageUrl = require('~/assets/' + `${url}`)
                return url ? `${imageUrl}` : ''
            },
            onNextSmi() {
                if (this.activeSmi >= this.smi.length - 1) this.activeSmi = 0
                else this.activeSmi = this.activeSmi + 1
            },
            onPreviousSmi() {
                if (this.activeSmi === 0) this.activeSmi = this.smi.length - 1
                else this.activeSmi = this.activeSmi - 1
            },
            onNextFilm() {
                if (this.activeFilm >= this.films.length - 1) this.activeFilm = 0
                else this.activeFilm = this.activeFilm + 1
            },
            onPreviousFilm() {
                if (this.activeFilm === 0) this.activeFilm = this.films.length - 1
                else this.activeFilm = this.activeFilm - 1
            },

        },
        computed: {
            ...mapState('localization', [
                'lang',
            ]),
        },
        mounted() {
            const descriptionsAbout = document.querySelectorAll('.descriptionAbout');
            const awards = document.querySelectorAll('.award');
            const articles = document.querySelectorAll('.article');
            const catalogs = document.querySelectorAll('.catalog');

            // для текста описания
            const showDesc = new IntersectionObserver((entries) => {
                entries.forEach(e => {
                    if (e.intersectionRatio > 0) {
                        e.target && e.target.childNodes.forEach(node => {
                            node.style.transform = 'translateX(0)';
                            node.style.opacity = 1;
                            showDesc.unobserve(e.target);
                        })
                    }
                })
            }, { threshold: [0.5, 1] });

            // для наград
            const showAward = new IntersectionObserver((entries) => {
                if (entries[0].intersectionRatio > 0) {
                    entries.forEach(i => {
                        i.target.style.transform = 'translateY(0)';
                        i.target.style.opacity = 1;
                        showAward.unobserve(i.target);
                    })
                }
            });

            // для статей
            const showArticle = new IntersectionObserver((entries) => {
                if (entries[0].intersectionRatio > 0) {
                    entries.forEach(i => {
                        i.target.style.transform = 'translateY(0)';
                        i.target.style.opacity = 1;
                        showArticle.unobserve(i.target);
                    })
                }
            });

            // для каталогов
            const showCatalog = new IntersectionObserver((entries) => {
                if (entries[0].intersectionRatio > 0) {
                    entries.forEach(i => {
                        i.target.style.transform = 'translateY(0)';
                        i.target.style.opacity = 1;
                        showCatalog.unobserve(i.target);
                    })
                }
            });


            descriptionsAbout.forEach(desc => {
                showDesc.observe(desc);
            })
            awards.forEach(award => {
                showAward.observe(award);
            })
            articles.forEach(article => {
                showArticle.observe(article);
            })
            catalogs.forEach(catalog => {
                showCatalog.observe(catalog);
            })

            let left = document.getElementsByClassName('VueCarousel-navigation-button VueCarousel-navigation-prev')
            let right = document.getElementsByClassName('VueCarousel-navigation-button VueCarousel-navigation-next')
            var leftInt = setInterval(() => {
                if (left[0] && right[0]) {
                    clearInterval(leftInt);
                    left[0].innerHTML = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAA8CAYAAAAHbrgUAAAAAXNSR0IArs4c6QAAAMNJREFUWAntlcERgzAMBO1UQAkpgRLSKaVAB0kJKQEqMCfG9+Vn5ZHVjOYYeJxZTqKU5GqtTepVPSdbl9LN39Kob+oBZBhvbvNd13kEMBeBKLDnhF6oSTuBY8ONHzdGLeZMxW4fH7ZwEGp2O4Fjt48ft/8dtb5otpizXnmB84eV8ayOH0vU4vupKmMOcRGHhIMHCUiYgJVMQMIErGQCEiZgJROQMAErmYCECVjJxB2Jhx9maK31I5+X+lBX9W9KmXja+QTqI6yJ9reXAwAAAABJRU5ErkJggg=="/>`;
                    right[0].innerHTML = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAA8CAYAAAAHbrgUAAAAAXNSR0IArs4c6QAAALRJREFUWAntlMENhDAMBFMCJVACJdEZpUAH0Akl5NaIlVD+MUg3liyTDxsmE0qtdVKv6qG8UQre1FG7On8TEao+1FFsAhJFHuDE9TeAhH+KkICECXjiBCRMwBMnIGECnjgBCRPwxIkvkjh1LFG7N5c2FbpE8l1zWnAEKXRxsibhOfTBfkuHcAjXlwBXjavW17Dm7QiHcI0SfZcIh3B9DWve/r/CBQh9/fyKcM9T0AbG5zrz+QcZsbUbjCobhwAAAABJRU5ErkJggg=="/>`;
                }
            }, 1000)
        }
    }
</script>

<style lang="stylus">
    .VueCarousel-navigation-button
        color white !important
    .VueCarousel-navigation-button.VueCarousel-navigation-prev,
    .VueCarousel-navigation-button.VueCarousel-navigation-next
        img
            width 15px

    .about-container
        h2
            padding 10px
            border 1px solid silverMain
            border-left none
            border-right none
            margin-bottom 25px
            line-height 1


    .historyButton
        .button
            margin-bottom 60px
            font-size $FontSize3
            width 260px
            text-align center
            cursor pointer
            border 1px solid white
            padding 20px 30px
            color white
            background-color inherit
            transition background-color .3s ease, color .3s ease

            &:hover
                color black
                background-color white

    .descriptionAbout
        justify-content center
        display flex
        flex-direction row
        align-items: flex-start
        margin-bottom 50px

        &.reverse
            @media only screen and (max-width 660px)
                flex-direction column-reverse

        @media only screen and (max-width 660px)
            flex-direction column
            align-items: center
            margin-bottom 30px

            .photo
            .video
                margin-bottom 20px
            .text
                .title
                    text-align center

        .video
        .photo
        .text
            transition all 0.5s ease-in
            opacity 0
            transform translateX(200px)

            &.left
                transform translateX(-200px)

        .video
            background-color: hsl(0,0%,10%);

        .carouselPhoto
        .video
        .photo
            width 300px
            max-width 300px
            min-height 200px

        .text
            text-align left
            padding 0 30px 20px
            max-width 700px
            font-family $IntroRegular
            font-size $FontSize16
            .title
                margin-bottom 15px
                font-family $IntroRegularCaps
                font-size $FontSize3


    .caption_section
        .awards
            margin-bottom 40px
            display flex
            flex-direction row
            flex-wrap wrap
            justify-content center

            .award
                transition all 0.5s ease-in
                opacity 0
                transform translateY(200px)
                background-color white
                display flex
                padding 20px 10px
                border 3px solid gold
                margin 0 10px 20px
                max-width 420px
                justify-content center
                align-items center

                @media only screen and (max-width 500px)
                    flex-direction column
                    padding 10px

                .textAward
                    display flex
                    align-items center
                    text-align left
                    color black
                    font-family $IntroRegularCaps
                    font-size 13px
                    padding 0 20px
                    line-height 1.5
                    @media only screen and (max-width 500px)
                        text-align center

                .imgAward
                    background-repeat no-repeat
                    background-position center
                    background-size contain
                    min-width 150px
                    height 150px

                    @media only screen and (max-width 500px)
                        margin-bottom 10px
        .hint
            margin-bottom 20px
        .films
        .smi
            margin-bottom 40px

            .videoName
                margin-bottom 20px
                font-family $IntroRegular
                font-size $FontSize3

            .iconArrow
                cursor pointer
                display flex
                align-items center
                justify-content center

                &:hover
                    svg
                        stroke #7f828b

            .videoFilm
            .videoSmi
                display inline-flex
                flex-direction row
                justify-content center
                flex-wrap nowrap
                width 100%
                margin 0 auto

                .name
                    font-family $IntroRegular
                    font-size $FontSize3
                    margin-bottom 15px

                .video
                    height 400px
                    max-width 700px
                    margin-bottom 30px
                    width: 100%;

                    @media only screen and (max-width 500px)
                        height 250px

                    @media only screen and (max-width 400px)
                        height 210px

                    video
                    iframe
                        background black

        .articles
        .catalogs
            display flex
            flex-direction row
            flex-wrap wrap
            justify-content center
            margin 0 auto
            margin-bottom 40px
            flex-basis 100px
            max-width 1000px

            @media only screen and (max-width 600px)
                flex-direction column

            .catalog
            .article
                transition transform 0.5s, opacity 0.5s ease-in
                opacity 0
                transform translateY(150px)
                display flex
                flex-direction column
                width 200px
                margin 10px 10px

                .item
                    display flex
                    align-items center
                    justify-content center
                    width 200px
                    height 200px
                    background-color darkRed
                    transition transform .3s linear
                    background-position center
                    background-repeat no-repeat
                    background-size cover
                    position relative
                    margin-bottom 15px


                .text
                    display flex
                    width 100%
                    align-items flex-start
                    text-align left
                    flex-direction column
                    bottom -60px
                    font-family $IntroRegular
                    font-size $FontSizeMenu
                    color whiteMain
                    font-weight bold
                    z-index 1

                    a
                        margin-top 10px
                        text-decoration underline
                        &:hover
                            text-decoration none
                .textCat
                    display: flex;
                    justify-content: center;
                    align-items: center;

                .maskCat
                .mask
                    top 0
                    bottom 0
                    left 0
                    right 0
                    position absolute
                    background-color black
                    opacity 0.2

                .maskCat
                    opacity 0.4

            .article
                background-color rgba(102, 15, 40, 0.4)
                width 300px
                @media only screen and (max-width 350px)
                    width 250px

                &:hover
                    box-shadow: 0 5px 6px 0 rgba(102, 15, 40, .3);

                .item
                    width 300px
                    height 150px
                    background-position top
                    @media only screen and (max-width 350px)
                        width 250px

                .text
                    padding 0 10px 5px
                    height 80px

        .catalogs
            .catalog
                width 220px
                height 180px
                .item
                    width 220px
                    height 180px

            @media only screen and (max-width 850px)
                .catalog
                    width 180px
                    height 140px
                    .item
                        width 180px
                        height 140px
            @media only screen and (max-width 650px)
                flex-direction column


</style>
