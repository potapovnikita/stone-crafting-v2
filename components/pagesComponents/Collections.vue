<template lang="pug">
    .collections-container
        h1 {{ lang === 'ru' ? 'Коллекции' : 'Collections' }}
        .collections-blocks
            .item-column
                <!--.item(v-for="item in filterMuseum(1)" :style="{'background-image': 'url(' + getImg(item.img) + ')'}")-->
                nuxt-link.imgHeight.item.left(v-for="(item, index) in filterMuseum(1)" :key="item.id" :to="{path: `/gallery/${item.id}`}")
                        .image
                            img.imgHeight(:src="getImg(item.img)")
                        .description.right(:value="'data-right-' + index")
                                // todo добавить eng
                                .title {{lang === 'ru' ? item.name : item.name}}
                                .text(v-html="lang === 'ru' ? item.description : item.description")
                                .about(v-html="lang === 'ru' ? item.about : item.about")
            .item-column
                <!--.item(v-for="item in filterMuseum(2)" :style="{'background-image': 'url(' + getImg(item.img) + ')'}")-->
                nuxt-link.imgHeight.item(v-for="(item, index) in filterMuseum(2)" :key="item.id" :to="{path:  `/gallery/${item.id}`}")
                        .image
                            img.imgHeight(:src="getImg(item.img)")
                        .description.left(:value="'data-left-' + index")
                            // todo добавить eng
                            .title {{lang === 'ru' ? item.name : item.nameEng}}
                            .text(v-html="lang === 'ru' ? item.description : item.descriptionEng")
                            .about(v-html="lang === 'ru' ? item.about : item.aboutEng")
</template>

<script>
    import { mapState } from 'vuex'

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
            },
        },
        components: {
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
        padding 30px 60px

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
                    display block
                    cursor pointer
                    overflow hidden
                    max-width 590px
                    margin-bottom 10px
                    margin-right 5px
                    margin-left 5px
                    transition opacity 1s ease-in-out

                    &:hover
                        box-shadow 0 30px 30px -20px #000
                        z-index 10

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
                        position absolute
                        opacity 0
                        transition-property right, left, opacity
                        transition-duration 1s
                        transition-timing-function ease-in-out
                        background darkRed
                        z-index -10
                        padding 20px 10px
                        text-align left

                        &.left
                            right calc(40% - 4px)
                        &.right
                            left calc(40% - 4px)

                    .image
                        position relative

                        img
                            position absolute
                            right  0
                            display inline-flex
                            max-width 590px
                            width 100%
                            height 100%
                            transition all 1s ease-out




</style>
