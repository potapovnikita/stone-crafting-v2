<template lang="pug">
    .common-container.reverse
        .shop_wrapper
            .shop_filter
                .item(v-for="item in shop")
                    .section_name(:class="{active: activeMenu.id === item.id}"
                                    @click="setActive(item.id)") {{ lang === 'ru' ? item.name : item.nameEng }}
                    .item_inner(v-if="item.innerSection"
                                v-for="elem in item.innerSection"
                                :class="{active: activeMenu.id === elem.id}"
                                @click="setActive(elem.id, true)") {{ lang === 'ru' ? elem.name : elem.nameEng }}

            .shop_items
                .item(v-for="(item, index) in activeMenu.items" :key="item.id")
                    .image
                        .photo(:style="{backgroundImage: getBgImg(item.imagesFull[item.activeImgId])}"
                                @click="setActiveImg(item, item.activeImgId + 1, index)")
                        .slides
                            .img(v-for="(img, idx) in item.imagesPreview")
                                img(:src="getImg(img)" :class="{active: idx === item.activeImgId}" @click="setActiveImg(item, idx, index)")
                        .button(v-html="lang === 'ru' ? 'Подробнее' : 'More'" @click="$router.push({path:`/goods/${item.id}`})")
                    .description
                        div
                            h2(v-html="lang === 'ru' ? item.name : item.nameEng")
                            .line-sm
                            .desc(v-if="item.desc" v-html="lang === 'ru' ? item.desc : item.descEng")
                            .material(v-if="item.material" v-html="lang === 'ru' ? 'Материал: ' + item.material : 'Material: ' + item.materialEng")
                            .size(v-if="item.size" v-html="lang === 'ru' ? 'Размер: ' + item.size : 'Size: ' + item.sizeEng")
                            .year(v-if="item.year" v-html="lang === 'ru' ? item.year : item.yearEng")
                            .price(v-if="item.price" v-html="lang === 'ru' ? 'Цена: ' + item.price + ' ₽' : 'Price: ' + item.price + ' ₽'")
                            .price(v-else v-html="lang === 'ru' ? 'Цена: по запросу' : 'Price: on request'")
                        .button(v-html="lang === 'ru' ? 'Подробнее' : 'More'" @click="$router.push({path:`/goods/${item.id}`})")

</template>

<script>
    import * as emailjs from 'emailjs-com/dist/email'
    import { mapState } from 'vuex'

    import Shop from '~/assets/staticData/antonov.json'

    export default {
        data() {
            return {
                shop: Shop,
                activeMenu: [],
                activeIndex: 0,
                activeInnerIndex: 0,
                name: '',
                phone: '',
                errorName: false,
                errorPhone: false,
                emailStatus: '',
                emailStatusErr: '',
                // phoneNumber: Contacts.Contacts.Phone,
                preload: false,
                statusSuccess: false,
            }
        },
        watch: {

        },
        components: {
        },
        methods: {
            setActive(id, inner) {
                if (inner) {
                    this.shop.forEach((item) => {
                       if (item.innerSection) {
                           this.activeMenu = item.innerSection.find((item) => {
                               return item.id === id
                           })
                       }
                    })

                } else {
                    this.activeMenu = this.shop.find((item) => {
                        return item.id === id
                    })
                }
            },
            setActiveImg(item, id, index) {
                if (id >= item.imagesFull.length) id = 0
                if (id < 0) id = item.imagesFull.length - 1
                item.activeImgId = id
                this.$set(this.activeMenu.items, index, item)
            },
            getBgImg(url) {
                const imageUrl = require('~/assets/' + `${url}`)
                return url ? `url(${imageUrl})` : ''
            },
            getImg(url) {
                const imageUrl = require('~/assets/' + `${url}`)
                return url ? `${imageUrl}` : ''
            },

            submitForm() {
                this.emailStatus = ''
                this.emailStatusErr = ''

                const data = {
                    service_id: 'forsage_service',
                    template_id: 'template_5dGSiEff',
                    user_id: 'user_JaUNu8x9vuWUpoOfjGNgp',
                    template_params: {
                        'name': this.name,
                        'phone': this.phone
                    }
                };

                if (!this.name) {
                    this.errorName = true
                }

                if (!this.phone) {
                    this.errorPhone = true
                }

                if (this.phone && this.name) {
                    this.errorName = false
                    this.errorPhone = false

                    this.preload = true
                    emailjs.send(data.service_id, data.template_id, data.template_params, data.user_id)
                        .then((res) => {
                            this.emailStatus = 'Заявка отправлена, мы скоро с Вами свяжемся'
                            this.name = ''
                            this.phone = ''
                            this.preload = false
                            this.statusSuccess = true
                        }, (error) => {
                            this.emailStatusErr = `Что-то пошло не так, попробуйте позже или свяжитесь с нами по телефону ${phoneNumber}`
                            this.preload = false
                            this.statusSuccess = false
                        });
                }
            }
        },
        computed: {
            ...mapState('localization', [
                'lang',
            ]),
        },
        mounted() {
            this.shop.forEach((item) => {
                item.items.forEach((photos) => {
                    photos.activeImgId = this.activeIndex
                })
                if (item.innerSection) {
                    item.innerSection.forEach((innerPhotos) => {
                        innerPhotos.items.forEach((photos) => {
                            photos.activeImgId = this.activeInnerIndex
                        })
                    })
                }
            })
            this.activeMenu = this.shop[0]

            this.statusSuccess = false;
        },
        destroyed() {
            this.statusSuccess = false
        }
    }
</script>

<style lang="stylus">
    $sizeMin = 80px

    .shop_wrapper
        display flex
        flex-direction row
        width 100%
        .shop_filter
            width 30%
            padding 5px
            .item
                max-width 230px

                .item_inner,
                .section_name
                    text-align center
                    display flex
                    justify-content center
                    flex-direction column
                    cursor pointer
                    padding 5px
                    color darkRed
                    margin-bottom 3px
                    background-color backgroundReverse
                    &.active
                        border 1px solid
                        background-color darkRed
                        color backgroundReverse
                    &:hover
                        border 1px solid
                        background-color darkRed
                        color backgroundReverse
        .shop_items
            width 70%
            .item
                width 100%
                display flex
                flex-direction row
                border 1px solid darkRed
                padding 10px
                margin-bottom 10px
                .image
                    width 50%
                    padding 10px
                    .button
                        display none
                    .photo
                        height 300px
                        max-height 225px
                        background-size contain
                        background-position center
                        background-repeat no-repeat
                        margin-bottom 10px
                        background-color darkRed
                        cursor pointer

                    .slides
                        width 100%
                        display flex
                        flex-direction row
                        flex-wrap wrap
                        .img
                            cursor pointer
                            padding 0 2px 2px 2px

                            img
                                min-width $sizeMin
                                max-width $sizeMin
                                min-height $sizeMin
                                max-height $sizeMin

                                &:hover
                                    border 1px solid darkRed
                                &.active
                                    border 1px solid darkRed
                .description
                    width 50%
                    text-align left
                    padding 10px
                    color darkRed
                    display flex
                    flex-direction column
                    justify-content space-between

                    h2
                        color darkRed

                    .line-sm
                        width 100px
                        height 1px
                        margin 8px auto 15px
                        background darkRed

                    .desc
                        margin-bottom 10px
                    .material
                        margin-bottom 10px
                    .year
                        margin-bottom 10px
                    .price
                        margin-bottom 10px
                .button
                    text-align center
                    cursor pointer
                    border 1px solid
                    padding 5px 10px
                    color darkRed
                    background-color backgroundReverse
                    &:hover
                        color backgroundReverse
                        background-color darkRed

    @media only screen and (max-width 767px)
        .shop_wrapper
            margin-top 40px
            flex-direction column
            .shop_filter
                width 100%
                display flex
                flex-direction column
                justify-content center
                margin-bottom 10px
            .shop_items
                width 100%

    @media only screen and (max-width 550px)
        .shop_wrapper
            .shop_filter
                flex-wrap nowrap
            .shop_items
                .item
                    width 100%
                    padding 0
                    flex-direction column-reverse
                    .image, .description
                        width 100%
                    .image
                        .slides
                            justify-content center
                        .button
                            display block
                    .description
                        .button
                            display none
</style>
