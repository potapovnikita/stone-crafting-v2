<template lang="pug">
    .collections-container
        h1 {{ lang === 'ru' ? 'Коллекции' : 'Collections' }}
        .collections-blocks.desktop
            .item-column
                nuxt-link.imgHeight.item.left(v-for="(item, index) in filterMuseum(1)" :key="item.id" :to="{path: `/gallery/${item.id}`}")
                        .image
                            img.imgHeight(:src="getImg(item.img)")
                        .description.right(:value="'data-right-' + index")
                                .title {{lang === 'ru' ? item.name : item.nameEng}}
                                .text(v-html="lang === 'ru' ? item.description : item.descriptionEng")
                                .about(v-html="lang === 'ru' ? item.about : item.aboutEng")
            .item-column
                nuxt-link.imgHeight.item(v-for="(item, index) in filterMuseum(2)" :key="item.id" :to="{path:  `/gallery/${item.id}`}")
                        .image
                            img.imgHeight(:src="getImg(item.img)")
                        .description.left(:value="'data-left-' + index")
                            .title {{lang === 'ru' ? item.name : item.nameEng}}
                            .text(v-html="lang === 'ru' ? item.description : item.descriptionEng")
                            .about(v-html="lang === 'ru' ? item.about : item.aboutEng")

        // for mobile version
        .collections-blocks.mobile
            .item-column
                nuxt-link.item(v-for="(item, index) in filterMuseum(1)"
                        v-touch:swipe.left="swipe"
                        :key="item.id"
                        :to="{path: `/gallery/${item.id}`}")
                    .points
                        .point.active
                        .point
                    .image
                        img(:src="getImg(item.img)")
                    .description(v-touch:swipe.right="swipe")
                        .blur
                        .title {{lang === 'ru' ? item.name : item.nameEng}}
                        .text(v-html="lang === 'ru' ? item.description : item.descriptionEng")

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
            swipe(direction, event) {
                const descBlock = event.target.parentElement.parentElement.lastChild.classList.contains('description')
                    ? event.target.parentElement.parentElement.lastChild
                    : event.target.parentElement.parentElement

                const point = descBlock.parentElement.firstChild
                console.log('point', point)

                if (direction === 'left') {
                    descBlock.style.transform = 'translateX(0%)'
                    point.lastChild.classList.add('active')
                    point.firstChild.classList.remove('active')
                } else if (direction === 'right' && descBlock.style.transform === 'translateX(0%)') {
                    descBlock.style.transform = 'translateX(200%)'
                    point.firstChild.classList.add('active')
                    point.lastChild.classList.remove('active')
                }
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

                item.addEventListener('touchstart', (event) => {
                    event.stopPropagation();
                    const descBlock = event.target.parentElement.parentElement.lastChild.classList.contains('description')
                        ? event.target.parentElement.parentElement
                        : event.target.parentElement
                    descBlock.classList.toggle('hover');
                });
                item.addEventListener('touchend', (event) => {
                    event.stopPropagation();
                    const descBlock = event.target.parentElement.parentElement.lastChild.classList.contains('description')
                        ? event.target.parentElement.parentElement
                        : event.target.parentElement
                    descBlock.classList.toggle('hover');
                });

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

        .collections-blocks.mobile
            display none

        .collections-blocks.desktop
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

                    &.hover
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
                        overflow hidden

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

    @media only screen and (max-width 767px)
        .collections-container
            padding 20px 20px

            .collections-blocks.desktop
                display none
            .collections-blocks.mobile
                display flex
                flex-direction column
                .item-column
                    .item
                        position relative
                        display flex
                        flex-wrap nowrap
                        flex-direction row
                        margin-bottom 25px
                        .points
                            position: absolute;
                            left: 0;
                            right: 0;
                            bottom: -15px;
                            height: 10px;
                            display: flex;
                            flex-direction: row;
                            justify-content: center;

                            .point
                                margin 0 5px
                                border-radius 20px
                                background-color silverMain
                                width 10px
                                height 10px
                                &.active
                                    background-color #3897f0


                        .image
                            position relative
                            min-width 100%
                            min-height 100%
                            height 100%
                            width 100%
                            img
                                width 100%
                                height 100%

                        .description
                            padding 15px
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            position absolute
                            top: 0;
                            bottom: 0;
                            right: 0;
                            left: 0;
                            transform: translateX(200%);
                            transition transform .3s ease-in-out
                            overflow hidden
                            .blur
                                position absolute
                                top 0
                                bottom 0
                                left 0
                                right 0
                                background-color: rgba(139, 0, 0, 0.5);
                            .text
                                position relative
                            .title
                                position relative
                                margin-bottom: 40px

</style>
