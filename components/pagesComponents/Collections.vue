<template lang="pug">
    .collections-container
        h1 {{ lang === 'ru' ? 'Коллекции' : 'Collections' }}
        .collections-blocks.desktop
            .item.itemBlock(v-for="(item, index) in museum" :key="item.id")
                nuxt-link.image(:to="{path: `/gallery/${item.id}`}")
                    .media
                        .preview
                            img.imgHeight(:src="getImg(item.img)")

                    .spec
                        .description
                            .content
                                .title {{lang === 'ru' ? item.name : item.nameEng}}
                                .text(v-html="lang === 'ru' ? item.shortDesc : item.shortDescEng")
                            nuxt-link.button(:to="{path: `/gallery/${item.id}`}") Подробнее

        // for mobile version
        .collections-blocks.mobile
            .item-column
                nuxt-link.item(v-for="(item, index) in museum"
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
                        .text(v-html="lang === 'ru' ? item.shortDesc : item.shortDescEng")

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
            swipe(direction, event) {
                const descBlock = event.target.parentElement.parentElement.lastChild.classList.contains('description')
                    ? event.target.parentElement.parentElement.lastChild
                    : event.target.parentElement.parentElement

                const point = descBlock.parentElement.firstChild

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
            visible: (el) => {
                const targetPosition = {
                    top: window.pageYOffset + el.getBoundingClientRect().top,
                    left: window.pageXOffset + el.getBoundingClientRect().left,
                    right: window.pageXOffset + el.getBoundingClientRect().right,
                    bottom: window.pageYOffset + el.getBoundingClientRect().bottom,
                }

                const windowPosition = {
                    top: window.pageYOffset,
                    left: window.pageXOffset,
                    right: window.pageXOffset + document.documentElement.clientWidth,
                    bottom: window.pageYOffset + document.documentElement.clientHeight,
                };

                if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
                    targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
                    targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
                    targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
                }
            },
            hideAll() {
                const container = document.querySelector('.collections-blocks.desktop')

                const descriptionList = Array.from(container.querySelectorAll('.description'));
                descriptionList.forEach((elem) => {
                    elem.classList.remove('hovered')
                })

                const itemList = Array.from(container.querySelectorAll('.item'));
                itemList.forEach((elem) => {
                    elem.classList.remove('hovered')
                    elem.parentNode.classList.remove('hovered')
                })
            },

            showAll() {
                const container = document.querySelector('.collections-blocks.desktop')

                const descriptionList = Array.from(container.querySelectorAll('.description'));
                descriptionList.forEach((elem) => {
                    elem.classList.add('hovered')
                })

                const itemList = Array.from(container.querySelectorAll('.item'));
                itemList.forEach((elem) => {
                    elem.classList.add('hovered')
                    elem.parentNode.classList.add('hovered')
                })
            },
            initContentTablet() {
                const container = document.querySelector('.collections-blocks.desktop')
                const block = Array.from(document.querySelectorAll('.itemBlock'))
                const top = block[0].clientWidth;

                container.style.height = block.length * block[0].clientWidth + 'px'

                let width

                block.forEach((item, index) => {
                    const description = item.querySelectorAll('.description')[0];
                    const spec = item.querySelectorAll('.spec')[0];
                    const image = item.querySelectorAll('.image')[0];

                    if (width) {
                        image.style.height = width + 'px'
                    } else {
                        image.style.height = Math.ceil(item.clientWidth) + 'px'
                        width = Math.ceil(item.clientWidth)
                    }

                    description.style.width = item.clientWidth + 'px'
                    spec.style.width = item.clientWidth * 2

                    item.style.position = 'absolute'

                    item.style.left = '0'
                    description.classList.add('left')
                    spec.style.right = 'auto'

                    this.showAll()
                    spec.style.top = '5px'
                    spec.style.bottom = '5px'
                    spec.style.left = '5px'
                    spec.style.right = '5px'

                    item.style.top = top * index + 'px'
                })
            },

            initContent() {
                const tabletWidth = 1025
                const container = document.querySelector('.collections-blocks.desktop')
                const block = Array.from(document.querySelectorAll('.itemBlock'))
                const top = block[0].clientWidth;

                container.style.height = block.length/2 * block[0].clientWidth + 'px'

                let width

                block.forEach((item, index) => {
                    const description = item.querySelectorAll('.description')[0];
                    const spec = item.querySelectorAll('.spec')[0];
                    const image = item.querySelectorAll('.image')[0];

                    if (width) {
                        image.style.height = width + 'px'
                    } else {
                        image.style.height = Math.ceil(item.clientWidth) + 'px'
                        width = Math.ceil(item.clientWidth)
                    }

                    description.style.width = document.body.offsetWidth > tabletWidth ? item.clientWidth/2 + 'px' : item.clientWidth + 'px'
                    spec.style.width =  document.body.offsetWidth > tabletWidth ? item.clientWidth/2 * 3 + 'px' : item.clientWidth * 2
                    item.style.float = 'left'

                    if (index % 2 === 0) {
                        item.style.left = '0'
                        description.classList.add('left')
                        spec.style.right = 'auto'
                    } else {
                        item.style.left = '50%'
                        description.classList.add('right')
                        spec.style.left = 'auto'
                    }

                    // дабавляем и удаляем наведение на блок картинки
                    item.addEventListener('mouseenter', (e) => {
                        description.classList.add('hovered')
                        item.classList.add('hovered')
                        item.parentNode.classList.add('hovered')
                        spec.style.width = document.body.offsetWidth > tabletWidth ? item.clientWidth/2 * 3 + 'px' : item.clientWidth * 2
                    }, false)

                    item.addEventListener('touchstart', (e) => {
                        this.hideAll()
                        description.classList.add('hovered')
                        item.classList.add('hovered')
                        item.parentNode.classList.add('hovered')
                        spec.style.width = document.body.offsetWidth > tabletWidth ? item.clientWidth/2 * 3 + 'px' : item.clientWidth * 2
                    }, false)

                    item.addEventListener('mouseleave', (e) => {
                        description.classList.remove('hovered')
                        item.classList.remove('hovered')
                        item.parentNode.classList.remove('hovered')
                        spec.style.width = document.body.offsetWidth > tabletWidth ? item.clientWidth/2 * 3 + 'px' : item.clientWidth * 2
                    }, false)

                    switch (index+1) {
                        case 1:
                        case 2:
                            item.style.top = top * 0 + 'px'
                            break;
                        case 3:
                        case 4:
                            item.style.top = top * 1 + 'px'
                            break;
                        case 5:
                        case 6:
                            item.style.top = top * 2 + 'px'
                            break;
                        case 7:
                        case 8:
                            item.style.top = top * 3 + 'px'
                            break;
                        case 9:
                        case 10:
                            item.style.top = top * 4 + 'px'
                            break;
                        case 11:
                        case 12:
                            item.style.top = top * 5 + 'px'
                            break;
                        case 13:
                        case 14:
                            item.style.top = top * 6 + 'px'
                            break;
                        default: item.style.display = 'none'
                    }
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
            // проверяем, есть и возможность тача на устройстве
            if ("ontouchstart" in document.documentElement) {
                this.initContentTablet()
                window.addEventListener('resize', () => {
                    this.initContentTablet()
                }, false)

            } else {
                this.initContent()
                window.addEventListener('resize', () => {
                    this.initContent()
                }, false)
            }
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

        .collections-blocks.desktop
            position relative
            max-width 1200px
            &.hovered
                .item:not(.hovered)
                    opacity 0.5
            .item
                display block
                max-width 600px
                width 50%
                overflow hidden

                &.hovered
                    z-index 10
                    overflow visible

                .image
                    max-height 100%
                    position relative
                    text-align center
                    padding 5px
                    display block
                    &:hover
                        img
                            transform scale(1.03)
                    .media
                        width 100%
                        height 100%

                        .preview
                            position relative
                            text-align center
                            height 100%
                            width 100%
                            display flex
                            align-items center
                            justify-content center
                            z-index 10

                            img
                                max-height: 100%;
                                max-width 100%;
                                min-width 100%;
                                min-height 100%;
                                display block
                                position relative
                                transition all .5s ease-in
                                z-index 4
                    .spec
                        text-align left
                        transition width 0.5s
                        position absolute
                        top 0
                        bottom 0
                        right 0
                        left 0
                        width 100%
                        z-index 3

                        .description
                            background darkRed
                            height 100%
                            position absolute
                            top 0
                            opacity 0
                            transform translate3d(0, 0, 0)
                            transition transform .6s ease-in
                            padding 20px
                            z-index 10
                            .content
                                transition opacity .8s ease-in
                                opacity 0
                                .title
                                    margin-bottom 15px
                            .button
                                border 1px solid silverMain
                                padding 5px 10px
                                position absolute
                                bottom 15px
                                right 15px
                                cursor pointer

                                &:hover
                                    background-color silverMain
                                    color darkRed

                            &.right
                                right 0
                                transform translate3d(-100%, 0, 0)
                                &.hovered
                                    z-index 10
                                    opacity 1
                                    transform translate3d(-200%, 0, 0)

                                    .content
                                        opacity 1

                            &.left
                                left 0
                                transform translate3d(100%, 0, 0)
                                &.hovered
                                    z-index 10
                                    opacity 1
                                    transform translate3d(200%, 0, 0)

                                    .content
                                        opacity 1


        .collections-blocks.mobile
            display none


    @media only screen and (max-width 1025px)
        .collections-container
            .collections-blocks.desktop
                .item
                    .image
                        .spec
                            .description
                                font-size 13px

                                &.right
                                    transform translate3d(0, 0, 0)
                                    &.hovered
                                        transform translate3d(-100%, 0, 0)

                                &.left
                                    transform translate3d(0, 0, 0)
                                    &.hovered
                                        transform translate3d(100%, 0, 0)


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
                                    background-color darkRed


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
                            transform: translate3d(200%, 0, 0);
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
