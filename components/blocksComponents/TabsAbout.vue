<template lang="pug">
    client-only
        Tabs
            Tab(tabName="movies" :name="lang === 'ru' ? 'Фильмы' : 'Movies'" :classNames="['about-us__tab']")
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

            Tab(tabName="articles" :name="lang === 'ru' ? 'Статьи' : 'Articles'" :selected="true" :classNames="['about-us__tab']")
                .caption_section
                    .articles.mobile-hide
                        a.article(v-for="article in currentArticles" :href="getImgExternal(article.link)" target="_blank")
                            .item(:style="{backgroundImage: getBgImg(article.background)}")
                            p.text
                                | {{article.name}}

                            .article-line

                            a(:href="getImgExternal(article.link)" target="_blank") {{ lang === 'ru' ? 'Подробнее' : 'More' }}

                    .articles.desktop-hide
                        MobileArticleSlider

            Tab(tabName="catalogs" :name="lang === 'ru' ? 'Каталоги' : 'Catalogs'" :classNames="['about-us__tab']")
                template(v-slot:default="slotProps")
                    .caption_section
                        .catalogs.mobile-hide
                            a.catalog(v-for="catalog in catalogs" :href="lang === 'ru' ? getImgExternal(catalog.link) : getImgExternal(catalog.linkEng)" target="_blank")
                                .item(:style="{backgroundImage: getBgImg(lang === 'ru' ? catalog.background : catalog.backgroundEng)}")
                                .text {{ lang === 'ru' ? catalog.name : catalog.nameEng }}

                        .catalogs.desktop-hide
                            MobileCatalogSlider(v-if="slotProps.activated")

</template>
<script>
import { ChevronRightIcon, ChevronLeftIcon  } from 'vue-feather-icons'
import { mapState } from 'vuex'

import Company from '~/assets/staticData/company.json'
import Tabs from '@/components/pagesComponents/Tabs'
import Tab from '@/components/pagesComponents/Tab'
import ButtonArrow from '@/components/ui/ButtonArrow'
import MobileArticleSlider from '@/components/blocksComponents/MobileArticleSlider'
import MobileCatalogSlider from '@/components/blocksComponents/MobileCatalogSlider'
import {getImgExternal} from "@/plugins/getUrl";

export default {
    name: 'TabsAbout',
    data() {
        return {
            articles: Company.company.articles,
            articlesEng: Company.company.articlesEng,
            currentArticles: [],
            catalogs: Company.company.catalogs,
            films: Company.company.films,
            activeFilm: 0,
        }
    },
    components: {
        ChevronRightIcon,
        ChevronLeftIcon,
        ButtonArrow,
        Tabs,
        Tab,
        MobileArticleSlider,
        MobileCatalogSlider,
    },
    methods: {
        getBgImg(url) {
            const imageUrl = require('~/assets/' + `${url}`)
            return url ? `url(${imageUrl})` : ''
        },
        onNextFilm() {
            if (this.activeFilm >= this.films.length - 1) this.activeFilm = 0
            else this.activeFilm = this.activeFilm + 1
        },
        onPreviousFilm() {
            if (this.activeFilm === 0) this.activeFilm = this.films.length - 1
            else this.activeFilm = this.activeFilm - 1
        },
        getImgExternal(url) {
            return getImgExternal(url)
        },
    },
    computed: {
        ...mapState('localization', [
            'lang',
        ]),
    },
    watch: {
        lang(newVal) {
            // обзервер для смены языка (потому что разное кол-во статей)
            this.currentArticles = newVal === 'ru' ? this.articles : this.articlesEng;
            this.$nextTick(()=>{
                const articles = document.querySelectorAll('.article');
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
                articles.forEach(article => {
                    showArticle.observe(article);
                })
            });

        },
    },
    mounted() {
        this.allArticles = this.lang === 'ru' ? this.articles : this.articlesEng;

        this.$nextTick(()=>{
            const descriptionsAbout = document.querySelectorAll('.descriptionAbout');
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
        })
    },
}
</script>
<style lang="stylus" scoped>
.caption_section
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
        &.desktop-hide
            display none

        display flex
        flex-direction row
        flex-wrap wrap
        justify-content center
        margin-bottom 40px
        flex-basis 100px
        max-width 1650px
        margin-left -128px

        .catalog
        .article
            transition transform 0.5s, opacity 0.5s ease-in
            opacity 0
            transform translateY(150px)
            display flex
            flex-direction column
            max-width 422px
            margin-bottom 85px
            margin-left 128px

            .item
                width 422px
                height 326px
                padding 4px
                background-position center
                background-repeat no-repeat
                background-size cover
                position relative
                margin-bottom 33px
                border 1px solid rgba(150, 120, 95, 0.3)

            .text
                display flex
                width 100%
                align-items flex-start
                text-align left
                flex-direction column
                margin-bottom 28px
                font-size 26px
                line-height 150%
                color whiteMain

            .article-line
                width 38px
                height 1px
                margin-bottom 23px
                background-color goldNew

            a
                font-family $TenorSans-Regular
                font-weight normal
                line-height 150%
                letter-spacing 0.03em
                font-size 18px
                text-align left
                color goldNew

        @media only screen and (max-width 1280px)
            margin 0
            margin-left -85px
            max-width unset

            .catalog
            .article
                max-width 266px
                margin-bottom 47px
                margin-left 85px

                .item
                    width 266px
                    height 206px
                    padding 2px
                    margin-bottom 24px

                .text
                    margin-bottom 28px
                    font-size 18px

                .article-line
                    width 20px
                    margin-bottom 14px

                a
                    font-size 16px

        @media only screen and (max-width 767px)
            &.mobile-hide
                display none

            &.desktop-hide
                display block
                padding 0 12px

            margin 0
            max-width unset

</style>
