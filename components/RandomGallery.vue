<template lang="pug">
    .random_container
        h2.title.title-random {{lang === 'ru' ? 'Возможно, Вам понравится' : 'You might like it'}}
        no-ssr
            .random-items
                .items
                    .item(v-for="(good, index) in goodsSort"
                        v-if="index < 3"
                        :style="{backgroundImage: getBgImg(good.background)}"
                        @click="$nuxt.$router.push({path:`/goods/${good.id}`})"
                        )
                        .mask
                .items
                    .item(v-for="(good, index) in goodsSort"
                        v-if="index >= 3"
                        :style="{backgroundImage: getBgImg(good.background)}"
                        @click="$nuxt.$router.push({path:`/goods/${good.id}`})"
                        )
                        .mask
            .button(@click="$nuxt.$router.push({path:`/buy`})") {{lang === 'ru' ? 'Смотреть все' : 'See All'}}




</template>

<script>
    import Antonov from '~/assets/staticData/antonov.json'
    import { mapState } from 'vuex'



    export default {
        data() {
            return {
                goodsNotSort: Antonov
            }
        },
        props: ['type'],
        components: {
        },
        methods: {
            getBgImg(url) {
                const imageUrl = require('~/assets/' + `${url}`)
                return url ? `url(${imageUrl})` : ''
            },

        },
        computed: {
            ...mapState('localization', [
                'lang',
            ]),
            goodsSort() {
                let GOODS = []
                this.goodsNotSort.forEach((cat) => {
                    cat.items.forEach((item) => {
                        GOODS.push(item);
                        if (item.innerCategory) {
                            item.innerCategory.forEach((innerItem) => {
                                GOODS.push(innerItem);
                            })
                        }
                    })
                })

                let GOODS_RAND = []
                for (let i = 1; i <= 6; i++) { // берем 6 случайных элементов из массива
                    GOODS_RAND.push( GOODS[Math.floor(Math.random() * GOODS.length)])
                }

                return GOODS_RAND
            }
        },
        async created() {

        },
    }

</script>

<style lang="stylus">
    .random_container
        margin-bottom 30px
        .title-random
            margin-top 15px
            margin-bottom 15px
        .random-items
            display flex
            flex-direction row
            flex-wrap wrap
            justify-content center
            margin-bottom 15px
            .items
                display flex
                flex-direction row
                flex-wrap nowrap
                .item
                    background-size cover
                    background-repeat no-repeat
                    width 150px
                    height 150px
                    margin 8px
                    display flex
                    position relative
                    cursor pointer
                    &:hover
                        box-shadow 0 0 10px rgba(255, 255, 255, 0.5)
                    .mask
                        position absolute
                        top 0
                        bottom 0
                        left 0
                        right 0
        .button
            margin-top 40px
            width 200px
            text-align center
            cursor pointer
            border 1px solid
            padding 5px 10px
            color darkRed
            background-color backgroundReverse
            &:hover
                color backgroundReverse
                background-color darkRed



        h2.title-feedback
            color white
            margin-bottom 20px


    @media only screen and (max-width 767px)
        .random_container
            .random-items
                .items
                    .item
                        width 100px
                        height 100px
</style>
