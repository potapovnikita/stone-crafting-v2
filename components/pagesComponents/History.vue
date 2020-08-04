<template lang="pug">
    .common-container.history-container
        h1(v-html="lang === 'ru' ? 'История бренда' : 'Brand history'")
        .tabs
            .tab(v-for="(item, index) in history" :class="{'active': activeTab === index}" @click="historyClick(index)") {{item.year}}

        .descriptionHistory(v-for="(item, index) in history")
            img.photo(v-if="item.img && !item.video" :src="getImg(item.img)" :class="{left: index%2 === 0}")
            video.video(v-if="item.video && !item.img" preload="auto" controls autoplay muted playsinline :class="{left: index%2 === 0}")
                source(:src="getImg(item.video)" type="video/mp4" style="zIndex: '-1'")

            .photo(v-if="item.img && item.video" :class="{left: index%2 === 0}")
                client-only
                    carousel(:navigationEnabled="false" :perPage="1" paginationActiveColor="#b0a74a" :autoplay="true" :autoplayHoverPause="true" :loop="true")
                        slide
                            img.carouselPhoto(:src="getImg(item.img)")
                        slide
                            video.carouselPhoto(preload="auto" controls autoplay muted playsinline)
                                source(:src="getImg(item.video)" type="video/mp4" style="zIndex: '-1'")

            .text(:class="{left: index%2 !== 0}")
                .linetop
                .title(v-if="item.name" v-html="lang === 'ru' ? item.name : item.nameEng")
                .year {{item.year}}
                .ception(v-html="lang === 'ru' ? item.text : item.textEng")
                .addText(v-if="item.afterText" v-html="lang === 'ru' ? item.afterText : item.afterTextEng")



</template>

<script>
import { mapState } from 'vuex'
import zenscroll from 'zenscroll'

import History from '~/assets/staticData/history.json'

export default {
    data() {
        return {
            history: History,
            activeTab: 0,
        }
    },
    components: {
    },
    computed: {
        ...mapState('localization', [
            'lang',
        ]),
    },
    methods: {
        historyClick(index) {
            this.activeTab = index
            const descriptionsHistory = document.querySelectorAll('.descriptionHistory');

            zenscroll.center(descriptionsHistory[index])
        },
        getImg(url) {
            const imageUrl = require('~/assets/' + `${url}`)
            return url ? `${imageUrl}` : ''
        },
    },
    mounted() {
        const descriptionsHistory = document.querySelectorAll('.descriptionHistory');

        // для текста истории
        const showDesc = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.intersectionRatio > 0) {
                    e.target && e.target.childNodes.forEach(node => {
                        if (node.style) {
                            node.style.transform = 'translateX(0)';
                            node.style.opacity = 1;
                        }
                        showDesc.unobserve(e.target);
                    })
                }
            })
        }, { threshold: [0.5, 1] });

        descriptionsHistory.forEach(desc => {
            showDesc.observe(desc);
        })

        // let left = document.getElementsByClassName('VueCarousel-navigation-button VueCarousel-navigation-prev')
        // let right = document.getElementsByClassName('VueCarousel-navigation-button VueCarousel-navigation-next')
        // var leftInt = setInterval(() => {
        //     if (left[0] && right[0]) {
        //         clearInterval(leftInt);
        //         left[0].innerHTML = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAA8CAYAAAAHbrgUAAAAAXNSR0IArs4c6QAAAMNJREFUWAntlcERgzAMBO1UQAkpgRLSKaVAB0kJKQEqMCfG9+Vn5ZHVjOYYeJxZTqKU5GqtTepVPSdbl9LN39Kob+oBZBhvbvNd13kEMBeBKLDnhF6oSTuBY8ONHzdGLeZMxW4fH7ZwEGp2O4Fjt48ft/8dtb5otpizXnmB84eV8ayOH0vU4vupKmMOcRGHhIMHCUiYgJVMQMIErGQCEiZgJROQMAErmYCECVjJxB2Jhx9maK31I5+X+lBX9W9KmXja+QTqI6yJ9reXAwAAAABJRU5ErkJggg=="/>`;
        //         right[0].innerHTML = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAA8CAYAAAAHbrgUAAAAAXNSR0IArs4c6QAAALRJREFUWAntlMENhDAMBFMCJVACJdEZpUAH0Akl5NaIlVD+MUg3liyTDxsmE0qtdVKv6qG8UQre1FG7On8TEao+1FFsAhJFHuDE9TeAhH+KkICECXjiBCRMwBMnIGECnjgBCRPwxIkvkjh1LFG7N5c2FbpE8l1zWnAEKXRxsibhOfTBfkuHcAjXlwBXjavW17Dm7QiHcI0SfZcIh3B9DWve/r/CBQh9/fyKcM9T0AbG5zrz+QcZsbUbjCobhwAAAABJRU5ErkJggg=="/>`;
        //     }
        // }, 1000)
    }
}
</script>

<style lang="stylus">
//.VueCarousel-navigation-button.VueCarousel-navigation-prev,
//.VueCarousel-navigation-button.VueCarousel-navigation-next
//    img
//        width 15px
//    @media only screen and (max-width 660px)
//        display none

.history-container
    h1
        padding-bottom 36px

    .descriptionHistory
        justify-content center
        display flex
        flex-direction row
        align-items: flex-start
        margin-bottom 50px

        &:nth-child(even)
            flex-direction row-reverse

            @media only screen and (max-width 660px)
                flex-direction column-reverse

        @media only screen and (max-width 660px)
            flex-direction column-reverse
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

            .title,
            .year
                margin-bottom 15px
                font-family $IntroRegularCaps
                font-size $FontSize3
                text-align center

            .year
                border 1px solid silverMain
                border-left none
                border-right none
                border-top none
                padding-bottom 8px

            .linetop
                margin-bottom 10px
                width 100%
                border 1px solid silverMain
                border-left none
                border-right none
                border-bottom none

            .ception,
            .addText
                line-height 1.2
                margin-bottom 20px

    .tabs
        display: inline-flex;
        justify-content: center;
        flex-direction: column;
        position: fixed;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 10;
        margin: auto 0;

        .tab
            cursor pointer
            padding 5px 8px
            font-size $FontSize3
            opacity 0.8
            transition all .3s ease
            border 1px solid rgba(255, 255, 255, .0);
            border-left none
            border-right none
            margin-bottom 5px

            &:hover
                border 1px solid white
                border-left none
                border-right none
                opacity 0.9

            &.active
                border 1px solid white
                border-left none
                border-right none
                opacity 1




</style>
