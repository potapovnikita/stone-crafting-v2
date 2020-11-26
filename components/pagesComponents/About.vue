<template lang="pug">
    .common-container.about-container
        .about-container__bg-top
        h1.about-container__title {{ lang === 'ru' ? 'О Камнерезном Доме' : 'About company' }}
        .about-container__description
            .about-container__description-pic
                img.about-container__description-img(src="~/assets/img/about/aleksei.png" alt="Antonov")
            .about-container__description-content
                h2.about-container__description-title(v-html="lang === 'ru' ? company.aboutTitleRu : company.aboutTitleEng")
                .about-container__description-double-line
                p.about-container__description-text(v-html="lang === 'ru' ? company.aboutRu : company.aboutEng")

        Awards
        .about-container__bg-before-history
            .about-container__bg-top-history

        HistoryNew

        Mission

        .descriptionAbout.reverse
            .text.left
                h3.descriptionAbout__title(v-html="lang === 'ru' ? company.aboutTitleRu2 : company.aboutTitleEng2")
                p.descriptionAbout__text(v-html="lang === 'ru' ? company.aboutRu2 : company.aboutEng2")
            img.photo(src="~/assets/img/about/road.png" alt="Antonov")

        .descriptionAbout
            img.photo(src="~/assets/img/about/joker.png" alt="joker")
            .text
                h3.descriptionAbout__title(v-html="lang === 'ru' ? company.aboutTitleRu3 : company.aboutTitleEng3")
                p.descriptionAbout__text(v-html="lang === 'ru' ? company.aboutRu3 : company.aboutEng3")
        
        .descriptionAbout.reverse
            .text.left
                h3.descriptionAbout__title(v-html="lang === 'ru' ? company.aboutTitleRu4 : company.aboutTitleEng4")
                p.descriptionAbout__text(v-html="lang === 'ru' ? company.aboutRu4 : company.aboutEng4")
            img.photo(src="~/assets/img/about/show.png" alt="Exhibition")

        .about-us
            h2.about-us__title(v-html="lang === 'ru' ? 'О нас' : 'About us'")
            .about-us__double-line

        client-only
            Tabs
                Tab(:name="lang === 'ru' ? 'Фильмы' : 'Movies'" :classNames="['about-us__tab']")
                    .caption_section
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
                    
                Tab(:name="lang === 'ru' ? 'Статьи' : 'Articles'" :selected="true" :classNames="['about-us__tab']")
                    .caption_section
                        .articles
                            a.article(v-for="article in articles" :href="article.link" target="_blank")
                                .item(:style="{backgroundImage: getBgImg(article.background)}")
                                    .mask
                                p.text
                                    | {{ lang === 'ru' ? article.name : article.nameEng }}
                                
                                .line

                                a(:href="article.link" target="_blank") {{ lang === 'ru' ? 'Подробнее' : 'More' }}
                Tab(:name="lang === 'ru' ? 'Каталоги' : 'Catalogs'" :classNames="['about-us__tab']")
                    .caption_section
                        .catalogs
                            a.catalog(v-for="catalog in catalogs" :href="catalog.link" target="_blank")
                                .item(:style="{backgroundImage: getBgImg(catalog.background)}")
                                .text.textCat {{ lang === 'ru' ? catalog.name : catalog.nameEng }}
            
        .expertsAbout
            .wrapper
                .circle
                    .wrapper__btn
                        ButtonArrow(:onClick="() => sampleTest('ArrowLeft')")
                        button(@click.prevent="prewExpert") Prev
                    .wrapper__btn
                        ButtonArrow(arrowRight :onClick="() => sampleTest('ArrowRight')")
                        button(@click.prevent="nextExpert") Next

                h2.title {{ lang === 'ru' ? 'Эксперты о нас' : 'Experts about us' }}
                client-only
                    carousel(:paginationEnabled="false" :perPage="1" ref="expertsCarousel")
                        slide
                            img.photo(src="~/assets/img/about/experts/skurlov.png" alt="Antonov")
                            h3.name(v-html="lang === 'ru' ? company.aboutTitleRu5 : company.aboutTitleEng5")
                            p.text(v-html="lang === 'ru' ? company.aboutRu5 : company.aboutEng5")

                        slide
                            img.photo(src="~/assets/img/about/experts/skurlov.png" alt="Antonov")
                            h3.name(v-html="lang === 'ru' ? company.aboutTitleRu6 : company.aboutTitleEng6")
                            p.text(v-html="lang === 'ru' ? company.aboutRu6 : company.aboutEng6")

                        slide
                            img.photo(src="~/assets/img/about/experts/skurlov.png" alt="Antonov")
                            h3.name(v-html="lang === 'ru' ? company.aboutTitleRu7 : company.aboutTitleEng7")
                            p.text(v-html="lang === 'ru' ? company.aboutRu7 : company.aboutEng7")

        .projectsAbout(v-if="projects.length")
            h2.projectsAbout__title {{ lang === 'ru' ? 'Проекты совместного участия' : 'Projects' }}
            .projectsAbout__double-line
            ul.projectsAbout__projects-list
                li(
                    v-for="(project, index) in projects"
                    :key="`project_${index}`"
                )
                    .projectsAbout__project
                        p.projectsAbout__project-title {{ lang === 'ru' ? project.name : project.nameEng }}
                        ul.projectsAbout__project-items(v-if="project.items")
                            li(
                                v-for="(item, index) in project.items"
                                :key="`item_${index}`"
                            ) {{ lang === 'ru' ? item.text : item.textEng }}

                        ButtonArrow(arrowRight :onClick="() => sampleTest('ArrowRight')")
        
        .historyButton
            .button(@click="$nuxt.$router.push({path:`/history`})") {{lang === 'ru' ? 'История бренда' : 'Brand history'}}

        .demo
            Button(name='О бренде' :onClick="() => sampleTest('О бренде')")

            Button(name='Сбросить фильтр' :onClick="() => resetFilter()" large)

            ButtonArrow(:onClick="() => sampleTest('ArrowLeft')")
            ButtonArrow(arrowRight :onClick="() => sampleTest('ArrowRight')")
            Checkbox(v-model="checkboxValue")
            p(v-if="checkboxValue") true
            Input(type="text" name="testInput" placeholder="Имя" v-model="testInputValue")
            p(v-if="testInputValue") {{testInputValue}}
            Input(type="text" name="testInputPhone" placeholder="+7(999)-999-9999" v-model="testInputPhone" mask="+7(###)-###-####")
            p(v-if="testInputPhone") {{testInputPhone}}
        
        .caption_section

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

</template>

<script>
    import { ChevronRightIcon, ChevronLeftIcon  } from 'vue-feather-icons'
    import { mapState } from 'vuex'

    import Company from '~/assets/staticData/company.json'
    import Button from "@/components/ui/Button"
    import ButtonArrow from "@/components/ui/ButtonArrow"
    import Checkbox from "@/components/ui/Checkbox"
    import Input from "@/components/ui/Input"
    import HistoryNew from "@/components/pagesComponents/HistoryNew"
    import Awards from "@/components/pagesComponents/Awards"
    import Mission from "@/components/pagesComponents/Mission"
    import Tabs from "@/components/pagesComponents/Tabs"
    import Tab from "@/components/pagesComponents/Tab"

    export default {
        data() {
            return {
                company: Company.company,
                articles: Company.company.articles,
                awards: Company.company.awards,
                catalogs: Company.company.catalogs,
                smi: Company.company.smi.videos,
                films: Company.company.films,
                projects: Company.company.projects,
                activeSmi: 0,
                activeFilm: 0,
                checkboxValue: false,
                testInputValue: '',
                testInputPhone: '',
            }
        },
        components: {
            ChevronRightIcon,
            ChevronLeftIcon,
            Button,
            ButtonArrow,
            Checkbox,
            Input,
            HistoryNew,
            Awards,
            Mission,
            Tabs,
            Tab,
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
            sampleTest(message) {
                console.log(message)
            },
            prewExpert() {
                this.$refs.expertsCarousel.goToPage(this.$refs.expertsCarousel.getPreviousPage());
            },
            nextExpert() {
                this.$refs.expertsCarousel.goToPage(this.$refs.expertsCarousel.getNextPage());
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
        position relative
        background url('~assets/img/about/bg.png')
        background-size contain

        &__bg-top
            position absolute
            top 0
            right 0
            width 470px
            height 262px
            background url('~assets/img/about/bg-top.png')

        &__title
            line-height 73px
            margin-bottom 66px

        &__description
            display flex
            justify-content space-around
            margin-bottom 50px

        &__description-pic
            position relative
            width 608px
            height 429px
            background url('~assets/img/about/bg-aleksei.png') no-repeat
            background-size cover

        &__description-img
            position absolute
            bottom 0
            left 0
            right 0
            margin 0 auto
            width 262px

        &__description-content
            flex-shrink 2
            max-width 652px
            padding-left 60px
            text-align left

        &__description-title
            margin-bottom 40px
            line-height 52px
            text-align left

        &__description-double-line
            width 100px
            height 4px
            margin-bottom 52px
            border 1px solid goldNew
            border-left none
            border-right none

        &__description-text
            text-align left

        &__bg-before-history
            position relative

        &__bg-top-history
            position absolute
            top 0
            right 0
            width 223px
            height 406px
            background url('~assets/img/about/bg-before-history.png') no-repeat
            background-size cover


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
        justify-content space-around
        display flex
        flex-direction row
        align-items center
        max-width 1600px
        padding 64px 0

        &__title
            max-width 544px
            margin-bottom 30px
            color goldNew

        &__text
            max-width 559px
            font-size 16px
            line-height 24px
            text-align left

        .carouselPhoto
        .video
        .photo
            width 594px
            height 406px
            padding 10px
            border 1px solid rgba(150, 120, 95, 0.3)

        &.reverse
            @media only screen and (max-width 767px)
                flex-direction column-reverse

        @media only screen and (max-width 767px)
            flex-direction column
            align-items: center
            margin-bottom 40px
            padding 0

            .photo
            .video
                margin-bottom 27px

            &__title
                margin-bottom 23px
                font-size 22px
                line-height 29px
                text-align left

            &__text
                font-size 14px
                line-height 21px

            .carouselPhoto
            .video
            .photo
                width 352px
                height 242px
                padding 5px 6px

            .text
                text-align left
                max-width 700px

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

    .about-us
        &__title
            margin-bottom 18px

        &__double-line
            width 100px
            height 4px
            margin-bottom 42px
            border 1px solid goldNew
            border-left none
            border-right none

        &__tabs
            display flex
            justify-content center
            padding 0
            margin-bottom 64px
            list-style-type none

            & > li + li
                margin-left 124px

        &__label
            font-size 30px
            line-height 45px
            color #9F9F9F
            cursor pointer

            &:hover
                color goldNew

            &.is-active
                color goldNew

    .expertsAbout
        .wrapper
            position relative
            padding-top 90px
            padding-bottom 84px

        .circle
            display flex
            justify-content space-between
            align-items center
            position absolute
            top 0
            left 0
            right 0
            margin 0 auto
            width 820px
            height 820px
            border 1px solid rgba(255, 255, 255, 0.07)
            border-radius 50%

        .wrapper__btn
            position relative
            z-index 1

        .title
            margin-bottom 43px

        .photo
            width 344px
            height 344px
            padding 22px
            margin-bottom 36px
            border 1px solid rgba(255, 255, 255, 0.08)
            border-radius 50%

        .name
            margin-bottom 27px
            font-size 26px
            line-height 39px

        .text
            max-width 1130px
            font-size 16px
            line-height 24px

    .projectsAbout
        display block

        &__title
            margin-bottom 18px

        &__double-line
            width 100px
            height 4px
            margin-bottom 86px
            border 1px solid goldNew
            border-left none
            border-right none

        &__projects-list
            display flex
            flex-wrap wrap
            justify-content space-between
            max-width 1406px
            padding 0
            list-style-type none

        &__project
            display block
            margin-bottom 80px
            text-align left

        &__project-title
            margin-bottom 16px
            text-align left
            color goldNew

        &__project-items
            margin-bottom 35px
            padding 0
            list-style-type none

            & > li:before
                content "\2022"
                padding 0 9px 0 0
                display table-cell
                width .5rem

            & > li
                display table
                max-width 607px
                min-width 498px
                margin-bottom 24px
                font-family $TenorSans-Regular
                font-size 26px
                font-weight 400
                line-height 36px
                letter-spacing 0.03em
                color whiteMain

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
    .demo
        margin 20px

    @media only screen and (max-width 767px)
        .about-container

            &__bg-top
                width 126px
                height 133px
                background url('~assets/img/about/bg-top-mb.png')

            &__title
                margin-bottom 60px
                font-size 28px
                line-height 39px

            &__description
                display block

            &__description-pic
                width 100%
                max-width 375px
                height 254px

            &__description-img
                width 151px

            &__description-content
                flex-shrink 1
                max-width unset
                padding 0

            &__description-title
                margin-bottom 23px
                font-size 22px
                line-height 29px
                text-align left

            &__description-double-line
                width 50px
                margin-bottom 31px

            &__description-text
                font-size 14px
                line-height 21px
                text-align left

        .projectsAbout
            display block

            &__title
                font-size 22px
                line-height 29px

            &__double-line
                width 50px
                margin-bottom 34px

            &__projects-list
                display block
                max-width unset

                &> li + li
                    margin-top 40px

            &__project
                margin 0

            &__project-title
                font-size 18px
                line-height 27px

            &__project-items
                margin-bottom 20px

                & > li
                    max-width unset
                    min-width 280px
                    font-size 14px
                    line-height 21px

</style>
