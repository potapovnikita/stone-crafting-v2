<template lang="pug">
    .common-container.history-container
        h1(v-html="lang === 'ru' ? 'История бренда' : 'Brand history'")
        .tabs
            .tab(v-for="(item, index) in history" :class="{'active': activeTab === index}" @click="activeTab = index") {{item.year}}

        .descriptionHistory(v-for="(item, index) in history")
            img.photo(v-if="item.img && !item.video" :src="getImg(item.img)" :class="{left: index%2 === 0}")
            video.video(v-if="item.video && !item.img" preload="auto" controls autoplay muted playsinline :class="{left: index%2 === 0}")
                source(:src="getImg(item.video)" type="video/mp4" style="zIndex: '-1'")

            .photo(v-if="item.img && item.video" :class="{left: index%2 === 0}")
                client-only
                    carousel(:navigationEnabled="true" :perPage="1" paginationActiveColor="#b0a74a" :autoplay="true" :autoplayHoverPause="true" :loop="true")
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



</template>

<script>
import { mapState } from 'vuex'

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
    }
}
</script>

<style lang="stylus">
.VueCarousel-navigation-button
    color white !important
    z-index 1

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

            .ception
                line-height 1.2




    .tabs
        display inline-flex
        justify-content center
        margin-bottom 40px
        flex-direction row
        flex-wrap wrap

        .tab
            cursor pointer
            padding 5px 8px
            font-size $FontSize3
            opacity 0.8
            transition all .3s ease
            border 1px solid #120000
            border-left none
            border-right none

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
