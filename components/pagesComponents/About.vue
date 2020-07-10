<template lang="pug">
    .common-container
        h1 {{ lang === 'ru' ? 'О компании' : 'About company' }}
        .descriptionAbout
            img.photo(src="~/assets/img/aleksei_antonov.png" alt="Antonov")
            .text
                .title(v-html="lang === 'ru' ? company.aboutTitleRu : company.aboutTitleEng")
                .ception(v-html="lang === 'ru' ? company.aboutRu : company.aboutEng")

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
            .smi(v-for="item in smi")
                .videoSmi
                    .video
                        iframe(width="100%" height="100%"
                            :src="item.src"
                            frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            :hl="lang === 'ru' ? 'ru' : 'en'"
                            allowfullscreen
                            )

            h2.ristretto {{ lang === 'ru' ? 'Фильмы о Камнерезном Доме Алексея Антонова' : 'Movies about the Stone-crafting House by Alexey Antonov' }}
            .hint(v-if="lang === 'eng'") Turn on the subtitles on the video to see the English version
            .films(v-for="film in films")
                .videoFilm
                    .video
                        iframe(width="100%"
                            height="100%"
                            :src="film.src"
                            frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            :hl="lang === 'ru' ? 'ru' : 'en'"
                            allowfullscreen
                            )

            h2.ristretto {{ lang === 'ru' ? 'Каталоги' : 'Catalogs' }}
            .catalogs
                a.catalog(v-for="catalog in catalogs" :href="catalog.link" target="_blank")
                    .item(:style="{backgroundImage: getBgImg(catalog.background)}")
                    .text.textCat {{ lang === 'ru' ? catalog.name : catalog.nameEng }}



</template>

<script>
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
            }
        },
        components: {
        },
        methods: {
            getBgImg(url) {
                const imageUrl = require('~/assets/' + `${url}`)
                return url ? `url(${imageUrl})` : ''
            },
            getImg(url) {
                const imageUrl = require('~/assets/' + `${url}`)
                return url ? `${imageUrl}` : ''
            }
        },
        computed: {
            ...mapState('localization', [
                'lang',
            ]),
        },
        mounted() {
            const descriptionAbout = document.querySelector('.descriptionAbout');
            const awards = document.querySelectorAll('.award');
            const articles = document.querySelectorAll('.article');
            const catalogs = document.querySelectorAll('.catalog');

            // для текста описания
            const showDesc = new IntersectionObserver((entries) => {
                if (entries[0].intersectionRatio > 0) {
                    entries[0].target && entries[0].target.childNodes.forEach(node => {
                        node.style.transform = 'translateY(0)';
                        node.style.opacity = 1;
                        showDesc.unobserve(entries[0].target);
                    })
                }
            });

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


            showDesc.observe(descriptionAbout);
            awards.forEach(award => {
                showAward.observe(award);
            })
            articles.forEach(article => {
                showArticle.observe(article);
            })
            catalogs.forEach(catalog => {
                showCatalog.observe(catalog);
            })

        }
    }
</script>

<style lang="stylus">
    .descriptionAbout
        justify-content center
        display flex
        flex-direction row
        align-items: flex-start
        margin-bottom 30px

        @media only screen and (max-width 660px)
            flex-direction column
            align-items: center

            .photo
                margin-bottom 20px
            .text
                .title
                    text-align center

        .photo
        .text
            transition all 0.5s ease-in
            opacity 0
            transform translateY(300px)
        .photo
            width 300px
            max-width 300px
            background-color: hsl(0,0%,10%);

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

            .videoFilm
            .videoSmi
                .name
                    font-family $IntroRegular
                    font-size $FontSize3
                    margin-bottom 15px

                .video
                    height 400px
                    max-width 700px
                    margin-bottom 30px

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
            margin-bottom 40px
            flex-basis 100px
            max-width 900px

            @media only screen and (max-width 600px)
                flex-direction column

            .catalog
            .article
                transition all 0.5s ease-in
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
