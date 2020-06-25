<template lang="pug">
    .common-container
        h1 {{ lang === 'ru' ? 'О компании' : 'About company' }}
        .descriptionAbout
            img.photo(src="~/assets/img/aleksei_antonov.jpg" alt="Antonov")
            .text(v-html="lang === 'ru' ? company.aboutRu : company.aboutEng")

        .caption_section
            h2.ristretto {{ lang === 'ru' ? 'Награды и звания' : 'Awards and titles' }}
            .awards
                .award(v-for="award in awards")
                    .imgAward(:style="{backgroundImage: getBgImg(award.img)}")
                    .textAward {{ lang === 'ru' ? award.name : award.nameEng }}

            h2.ristretto {{ lang === 'ru' ? 'Статьи' : 'Articles' }}
            .articles
                a.article(v-for="article in articles"
                    :href="article.link"
                    target="_blank"
                    :style="{backgroundImage: getBgImg(article.background)}"
                )
                    .mask
                    .text {{ lang === 'ru' ? article.name : article.nameEng }}

            h2.ristretto {{ lang === 'ru' ? 'СМИ о нас' : 'Mass Media about us' }}
            .smi Тут будут видео СМИ
            //.smi
                .videoSmi(v-for="item in smi")
                    .name {{ lang === 'ru' ? item.name : item.nameEng }}
                    .video
                        video(controls="controls" width="100%" height="100%" :poster="getImg(item.poster)")
                            source(:src="getImg(item.src)")
                            | Тег video не поддерживается вашим браузером.




            h2.ristretto {{ lang === 'ru' ? 'Фильмы о Камнерезном Доме Алексея Антонова' : 'Movies about the Stone-crafting House by Alexey Antonov' }}
            .films

                .videoFilm
                    .video
                        iframe(width="100%" height="100%" src="https://www.youtube.com/embed/aynIfVRD85U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen)

                .videoFilm
                    .video
                        iframe(width="100%" height="100%" src="https://www.youtube.com/embed/lmYMq8y7Z5k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen)


            h2.ristretto {{ lang === 'ru' ? 'Каталоги' : 'Catalogs' }}
            .catalogs
                a.catalog(v-for="catalog in catalogs"
                    :href="catalog.link"
                    target="_blank"
                    :style="{backgroundImage: getBgImg(catalog.background)}"
                )
                    .maskCat
                    .text {{ lang === 'ru' ? catalog.name : catalog.nameEng }}



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
    }
</script>

<style lang="stylus">
    .descriptionAbout
        justify-content center
        display flex
        flex-direction row
        align-items: flex-start
        margin-bottom 30px

        @media only screen and (max-width 500px)
            flex-direction column

        .photo
            max-width 300px

        .text
            text-align left
            padding 0 30px 20px
            max-width 700px

    .caption_section
        .awards
            margin-bottom 40px
            display flex
            flex-direction row
            flex-wrap wrap
            justify-content center

            .award
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

        .films
        .smi
            margin-bottom 40px

            .videoFilm
            .videoSmi
                .name
                    font-family $IntroRegularCaps
                    font-size $FontSize3
                    margin-bottom 15px

                .video
                    height 400px
                    max-width 700px
                    margin-bottom 30px

                    video
                    iframe
                        background black

        .articles
        .catalogs
            display flex
            flex-direction row
            justify-content center
            margin-bottom 40px

            @media only screen and (max-width 600px)
                flex-direction column

            .catalog
            .article
                display flex
                align-items center
                justify-content center
                margin 10px 10px
                width 200px
                height 200px
                padding 20px
                background-color darkRed
                cursor pointer
                transition transform .3s linear
                background-position center
                background-repeat no-repeat
                background-size cover
                position relative


                .text
                    height 100%
                    display flex
                    align-items center
                    font-family $IntroRegularCaps
                    font-size $FontSizeMenu
                    text-transform uppercase
                    color whiteMain
                    font-weight bold
                    z-index 1

                .maskCat
                .mask
                    top 0
                    bottom 0
                    left 0
                    right 0
                    position absolute
                    background-color black
                    opacity 0.85

                    &:hover
                        transform scale(1.03)

                .maskCat
                    opacity 0.4


                &:hover
                    transform scale(1.03)


</style>
