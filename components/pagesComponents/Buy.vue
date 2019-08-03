<template lang="pug">
    .common-container
        .shop_wrapper
            .shop_filter
                .item(v-for="item in shop"
                    :class="{active: activeMenu.id === item.id}"
                    @click="setActive(item.id)")  {{ lang === 'ru' ? item.name : item.nameEng }}
            .shop_items
                .item(v-for="item in activeMenu.items")
                    .image
                        .photo(:style="{backgroundImage: getBgImg(item.imagesFull[item.activeImgId])}" @click="setActiveImg(item, activeIndex + 1)")
                        .slides
                            <!--.img(v-for="img in item.imagesFull")-->
                    .description
                        .name(v-html="lang === 'ru' ? item.name : item.nameEng")
                        .desc(v-html="lang === 'ru' ? item.desc : item.descEng")
                        .material(v-html="lang === 'ru' ? item.material : item.materialEng")
                        .year(v-html="lang === 'ru' ? item.year : item.yearEng")
                        .price(v-html="lang === 'ru' ? item.price : item.price")


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
        components: {
        },
        methods: {
            setActive(id) {
                this.activeMenu = this.shop.find((item) => {
                    return item.id === id
                })
            },
            setActiveImg(item, id) {
                item.activeImgId = id
            },
            getBgImg(url) {
                const imageUrl = require('~/assets/' + `${url}`)
                return url ? `url(${imageUrl})` : ''
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
                console.log(item)
                item.items.forEach((photos) => {
                    console.log('photos', photos)
                    photos.activeImgId = this.activeIndex
                })
            })
            this.activeMenu = this.shop[0]
            console.log(this.activeMenu.items)
            this.statusSuccess = false;
        },
        destroyed() {
            this.statusSuccess = false
        }
    }
</script>

<style lang="stylus">
    .buy-container
        background-color #f7f8fb
    .shop_wrapper
        display flex
        flex-direction row
        width 100%
        .shop_filter
            width 30%
            .item
                text-align center
                display flex
                justify-content center
                flex-direction column
                cursor pointer
                padding 5px
                &.active
                    text-decoration underline
                &:hover
                    text-decoration underline
        .shop_items
            width 70%
            .item
                width 100%
                display flex
                flex-direction row
                .image
                    width 50%
                .description
                    width 50%

</style>
