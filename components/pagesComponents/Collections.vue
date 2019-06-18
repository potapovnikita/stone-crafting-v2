<template lang="pug">
    div
        Header
        .collections-container
            h1 {{ lang === 'ru' ? 'Коллекции' : 'Collections' }}
            .collections-blocks
                .item-column
                    <!--.item(v-for="item in filterMuseum(1)" :style="{'background-image': 'url(' + getImg(item.img) + ')'}")-->
                    .imgHeight.item.left.nothov(v-for="(item, index) in filterMuseum(1)")
                        .image
                            img.imgHeight(:src="getImg(item.img)")
                        .description.right(:value="'data-right-' + index")
                                // todo добавить eng
                                .title {{lang === 'ru' ? item.name : item.name}}
                                .text(v-html="lang === 'ru' ? item.description : item.description")
                                .about(v-html="lang === 'ru' ? item.about : item.about")
                .item-column
                    <!--.item(v-for="item in filterMuseum(2)" :style="{'background-image': 'url(' + getImg(item.img) + ')'}")-->
                    .imgHeight.item(v-for="(item, index) in filterMuseum(2)")
                        .image
                            img.imgHeight(:src="getImg(item.img)")
                        .description.left(:value="'data-left-' + index")
                            // todo добавить eng
                            .title {{lang === 'ru' ? item.name : item.name}}
                            .text(v-html="lang === 'ru' ? item.description : item.description")
                            .about(v-html="lang === 'ru' ? item.about : item.about")
        SplitLine
        Footer
</template>

<script>
    import { mapState } from 'vuex'

    import Header from '~/components/Header.vue'
    import Footer from '~/components/Footer.vue'
    import SplitLine from '~/components/SplitLine.vue'

    import Museum from '~/assets/staticData/museum.json'

    export default {
        data() {
            return {
                museum: Museum,
            }
        },
        methods: {
            getImg(url) {
                const imageUrl = require('~/assets/' + `${url}`)
                return url ? `${imageUrl}` : ''
            },
            filterMuseum(int) {
                return this.museum.filter((item, index) => {
                    if (int === 1) return index % 2 === 0
                    else return index % 2 !== 0
                })
            }
        },
        components: {
            Header,
            Footer,
            SplitLine,
        },
        computed: {
            ...mapState('localization', [
                'lang',
            ]),
        },
        mounted() {
            const elemImg = Array.from(document.getElementsByClassName('imgHeight'))
            const elemDesc = Array.from(document.querySelectorAll('.imgHeight .description'))

            elemImg.forEach((item) => {
                item.style.height = item.offsetWidth + 2 + 'px'
                elemDesc.forEach((elem) => {
                    elem.style.height = item.offsetWidth + 2 + 'px'
                    elem.style.width = (item.offsetWidth + 2) * 0.6 + 'px'
                })
            })

            window.addEventListener('resize', () => {
                elemImg.forEach((item) => {
                    item.style.height = item.offsetWidth + 2 + 'px'
                    elemDesc.forEach((elem) => {
                        elem.style.height = item.offsetWidth + 2 + 'px'
                        elem.style.width = (item.offsetWidth + 2) * 0.6 + 'px'
                    })
                })

            })
        },
    }
</script>

<style lang="stylus">
    .collections-container
        display flex
        flex-direction column
        justify-content center
        text-align center
        text-align -webkit-center

        h1
            text-transform uppercase
            text-align center
            font-size 36px
            padding 0.9em 1.2em 2.6em 1.2em
            color whiteMain

        .collections-blocks
            display flex
            flex-direction row
            flex-flow wrap
            justify-content center
            max-width 1200px

            &:hover
                .item-column
                    .item:not(:hover)
                        opacity 0.6

            .item-column
                flex 50%
                position relative


                .item
                    cursor pointer
                    overflow hidden
                    max-width 590px
                    margin-bottom 10px
                    margin-right 5px
                    margin-left 5px

                    &:hover
                        box-shadow 0 30px 30px -20px #000
                        z-index 1



                        .image

                            img
                                transform scale(1.1)

                            ~.description
                                opacity 1
                                z-index 10

                                &.left
                                    right calc(100% - 5px)
                                &.right
                                    left calc(100% - 5px)

                    .description
                        background whiteMain
                        position absolute
                        opacity 0
                        transition-property right, left, opacity
                        transition-duration 1s
                        transition-timing-function ease-in-out
                        background silver
                        z-index -10
                        padding 20px 10px

                        &.left
                            right calc(50% - 4px)
                        &.right
                            left calc(50% - 4px)

                    .image
                        position relative

                        img
                            position absolute
                            right  0
                            display inline-flex
                            max-width 600px
                            width 100%
                            height 100%
                            transition all 1s ease-out




</style>
