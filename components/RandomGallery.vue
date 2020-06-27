<template lang="pug">
    .random_container
        h2.title.title-random {{lang === 'ru' ? 'Возможно, Вам понравится' : 'You might like it'}}
        no-ssr
            .random-items
                .items(v-if="goodsSortSlice.length")
                    .arrow-left(@click="slideLeft()")
                    .items_transform
                        .item(v-for="(good, index) in goodsSortSlice"
                            v-if="index < 3"
                            :style="{backgroundImage: getBgImg(good.imagesPreview[0])}"
                            @click="$nuxt.$router.push({path:`/goods/${good.id}`})"
                            )
                            .mask
                .items
                    .arrow-right(@click="slideRight()")
                    .items_transform
                        .item(v-for="(good, index) in goodsSortSlice"
                            v-if="index >= 3"
                            :style="{backgroundImage: getBgImg(good.imagesPreview[0])}"
                            @click="$nuxt.$router.push({path:`/goods/${good.id}`})"
                            )
                            .mask
            .button(@click="$nuxt.$router.push({path:`/buy`})") {{lang === 'ru' ? 'Смотреть все' : 'See All'}}




</template>

<script>
    import Antonov from '~/assets/staticData/antonov.json'
    import { mapState } from 'vuex'
    import { getImgExternal } from '~/plugins/getUrl'



    export default {
        data() {
            return {
                goodsNotSort: Antonov,
                goodsSortSlice: [],
                transform: 6,
            }
        },
        props: ['type'],
        components: {
        },
        methods: {
            getBgImg(url) {
                return `url(${getImgExternal(url)})`
            },
            slideRight() {
                this.transform = this.transform < this.goodsSort.length
                    ? this.transform + 6
                    : 6

                this.goodsSortSlice = this.goodsSort.slice(this.transform - 6, this.transform)
                if (this.goodsSortSlice.length < 6) {
                    this.goodsSortSlice = this.goodsSort.slice(this.goodsSort.length - 6, this.goodsSort.length)
                }
            },

            slideLeft() {
                if (this.transform <= 6) {
                    this.transform = this.goodsSort.length
                } else this.transform = this.transform - 6

                this.goodsSortSlice = this.goodsSort.slice(this.transform - 6, this.transform)
                if (this.goodsSortSlice.length < 6) {
                    this.goodsSortSlice = this.goodsSort.slice(0, 6)
                }
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

                // let GOODS_RAND = []
                // for (let i = 1; i <= 6; i++) { // берем 6 случайных элементов из массива
                //     let randomItem = null
                //
                //     do {
                //         randomItem = GOODS[Math.floor(Math.random() * GOODS.length)];
                //     } while (GOODS_RAND.find(item => randomItem.id === item.id));
                //
                //     GOODS_RAND.push(randomItem)
                // }
                return GOODS
            }
        },
        async mounted() {
            this.goodsSortSlice = this.goodsSort.slice(0, 6)
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
            position relative
            align-items: center;

            @media only screen and (max-width 1100px)
                flex-direction column

            .arrow-right,
            .arrow-left
                position absolute
                height 100%
                width 20px
                cursor pointer
                &:hover
                    background-color darkRed

            .arrow-left
                left -30px
                background url('~assets/img/left-arrow.png') no-repeat 50%
                background-size 80%
                @media only screen and (max-width 1100px)
                    top 50%

            .arrow-right
                right -30px
                background url('~assets/img/right-arrow.png') no-repeat 50%
                background-size 80%
                @media only screen and (max-width 1100px)
                    bottom 50%


            .items
                position relative
                .items_transform
                    display flex
                    flex-direction row
                    flex-wrap nowrap

                    .item
                        background-size cover
                        background-repeat no-repeat
                        min-width 150px
                        min-height 150px
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
                        @media only screen and (max-width 767px)
                            min-width 100px
                            max-width 100px
                            min-height 100px
                            max-height 100px
                        @media only screen and (max-width 400px)
                            min-width 80px
                            max-width 80px
                            min-height 80px
                            max-height 80px
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

</style>
