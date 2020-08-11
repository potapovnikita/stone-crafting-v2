<template lang="pug">
    .common-container.reverse
        .shop_wrapper(v-if="!isAuth")
            .auth-container
                h2.reverse {{ lang === 'ru' ? 'Введите пароль для доступа к предложениям' : 'Enter password for show offers' }}
                input.password(:type="inputType"
                        v-model="password"
                        :placeholder="lang === 'ru' ? 'Пароль' : 'Password'"
                        autocomplete="off"
                        )
                button(@click="checkPass()") Войти
                .error(v-if="errorPass") {{ lang === 'ru' ? 'Пароль не верный' : 'Password is wrong' }}

        .shop_wrapper(v-if="isAuth")
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
                        //.button(v-html="lang === 'ru' ? 'Подробнее' : 'More'" @click="$router.push({path:`/goods/${item.id}`})")
                        .button(v-html="lang === 'ru' ? 'Скачать материалы' : 'Download info'" @click="download(item)")
                    .description
                        div
                            h2(v-html="lang === 'ru' ? item.name : item.nameEng")
                            .line-sm
                            .desc(v-if="item.desc" v-html="lang === 'ru' ? item.desc : item.descEng")
                            .material(v-if="item.material" v-html="lang === 'ru' ? 'Материал: ' + item.material : 'Material: ' + item.materialEng")
                            .size(v-if="item.size" v-html="lang === 'ru' ? 'Размер: ' + item.size : 'Size: ' + item.sizeEng")
                            .year(v-if="item.year" v-html="lang === 'ru' ? 'Год: ' + item.year : 'Year: ' + item.yearEng")
                            .price(v-if="item.price" v-html="lang === 'ru' ? 'Цена: ' + item.price + ' ₽' : 'Price: ' + item.price + ' ₽'")
                            .price(v-else v-html="lang === 'ru' ? 'Цена: по запросу' : 'Price: on request'")
                        //.button(v-html="lang === 'ru' ? 'Подробнее' : 'More'" @click="$router.push({path:`/goods/${item.id}`})")
                        .button(v-html="lang === 'ru' ? 'Скачать материалы' : 'Download info'" @click="download(item)")

</template>

<script>
    import { mapState } from 'vuex'
    import downloadImagesAsZip from 'files-download-zip'
    import Cookies from 'universal-cookie';
    import Shop from '~/assets/staticData/shop.json'
    import { getImgExternal } from '~/plugins/getUrl'
    import zenscroll from "zenscroll";

    export default {
        data() {
            return {
                shop: Shop,
                activeMenu: [],
                activeIndex: 0,
                activeInnerIndex: 0,
                isAuth: null,
                inputType: 'password',
                password: '',
                curPass: '12345678',
                errorPass: false,
            }
        },
        methods: {
            download(item) {
                const imgDataArray = [];
                item.imagesFull.forEach(i => {
                    imgDataArray.push(this.getImg(i))
                })
                const zipFileName = `${this.lang === 'ru' ? 'stone-crafting images' : 'stone-crafting images'}`;
                window.alert = () => {} // блокируем алерты - костыль для библиотеки
                downloadImagesAsZip.execute(imgDataArray, zipFileName, () => { });
            },
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
                    });
                }
                window.location.hash = id
            },
            setActiveImg(item, id, index) {
                if (id >= item.imagesFull.length) id = 0
                if (id < 0) id = item.imagesFull.length - 1
                item.activeImgId = id
                this.$set(this.activeMenu.items, index, item)
            },
            getBgImg(url) {
                return `url(${getImgExternal(url)})`
            },
            getImg(url) {
                return getImgExternal(url)
            },
            checkPass() {
                this.errorPass = false;
                if (this.curPass === this.password) {
                    new Cookies().set('token', 'auth')
                    this.isAuth = true
                } else {
                    this.isAuth = false
                    this.errorPass = true;
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

            if (window.location.hash) {
                const hashItem = this.shop.find(item => item.id === window.location.href.split('#')[1])
                let hashItemInner = {}
                this.shop.forEach((category) => {
                    if (category.innerSection) {
                        hashItemInner =  category.innerSection.find(item => item.id === window.location.href.split('#')[1])
                    }
                })
                if (hashItem) this.setActive(hashItem.id)
                else if (hashItemInner) this.setActive(hashItemInner.id, true)
                else {
                    this.setActive(this.shop[0].id)
                }
            }
            else {
                this.setActive(this.shop[0].id)
            }

            this.isAuth = new Cookies().get('token')
            document.getElementsByTagName('body')[0].style.backgroundColor = '#faf3ed'
            window.scrollTo(0, 0);
            const header = document.getElementById('container')
            zenscroll.to(header)
        },
        destroyed() {
            document.getElementsByTagName('body')[0].style.backgroundColor = '#120000'
        }
    }
</script>

<style lang="stylus">
    $sizeMin = 80px

    .shop_wrapper
        display flex
        flex-direction row
        width 100%

        .auth-container
            display flex
            flex-direction column
            align-items center
            justify-content center
            margin 0 auto

            .password
                max-width 280px
                width 280px
                padding 10px 20px 11px
                cursor pointer
                outline none
                border 1px solid darkRed
                color darkRed
                margin-bottom 20px
                font-size 16px

                &::placeholder
                    color darkRed

            button
                width 280px
                max-width 280px
                padding 10px 20px 11px
                cursor pointer
                outline none
                border 1px solid darkRed
                background-color darkRed
                color white
                transition background-color .3s ease, color .3s ease

                &:hover
                    background white
                    color darkRed
            .error
                font-size 15px
                color red
            h2
                margin-bottom 20px

                &.reverse
                    color darkRed


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
                        background-size contain
                        background-position center
                        background-repeat no-repeat
                        margin-bottom 10px
                        cursor pointer

                    .slides
                        width 100%
                        display flex
                        flex-direction row
                        flex-wrap wrap
                        justify-content: center;

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
                align-items: center;

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
