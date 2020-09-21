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
                .item(v-for="item in categoriesArray")
                    .section_name(:class="{active: activeMenu && activeMenu.query === item.query}"
                                    @click="setActive(item)") {{ lang === 'ru' ? item.name : item.nameEng }}
                    //.item_inner(v-if="item.innerSection"
                                v-for="elem in item.innerSection"
                                :class="{active: activeMenu.id === elem.id}"
                                @click="setActive(elem.id, true)") {{ lang === 'ru' ? elem.name : elem.nameEng }}

            .shop_items
                .item(v-for="(good, index) in goodsArrayFiltered" :key="good.id")
                    .image
                        .photo(:style="{backgroundImage: getBgImg(good.photos[good.activeImgId])}"
                                @click="setActiveImg(good, good.activeImgId + 1, index)")
                        .slides
                            .img(v-for="(img, idx) in good.photos")
                                img(:src="img.url" :class="{active: idx === good.activeImgId}" @click="setActiveImg(good, idx, index)")
                        //.button(v-html="lang === 'ru' ? 'Подробнее' : 'More'" @click="$router.push({path:`/goods/${item.id}`})")
                        .button(v-html="lang === 'ru' ? 'Скачать материалы' : 'Download info'" @click="download(good)")
                    .description
                        div
                            h2(v-html="lang === 'ru' ? good.name : good.nameEng")
                            .line-sm
                            .desc(v-if="good.description" v-html="lang === 'ru' ? good.description : good.descriptionEng")
                            .themes
                                span.title(v-html="lang === 'ru' ? 'Темы: ' : 'Themes: '")
                                .theme
                                    span(v-if="good.themes.length" v-for="theme in good.themes" v-html="lang === 'ru' ? theme.name : theme.nameEng")
                                    span(v-if="!good.themes.length" v-html="lang === 'ru' ? + 'Темы не указаны' :  'Themes not set'")

                            .material(v-if="good.material" v-html="lang === 'ru' ? 'Материал: ' + good.material : 'Material: ' + good.materialEng")
                            .size(v-if="good.size" v-html="lang === 'ru' ? 'Размер: ' + good.size + 'мм' : 'Size: ' + good.size + 'mm'")
                            .year(v-if="good.year" v-html="lang === 'ru' ? 'Год: ' + good.year : 'Year: ' + good.yearEng")
                            .price(v-if="good.price" v-html="lang === 'ru' ? 'Цена: ' + good.price + ' ₽' : 'Price: ' + getDollarPrice(good.price) + ' $'")
                            .price(v-else v-html="lang === 'ru' ? 'Цена: по запросу' : 'Price: on request'")
                            .stock(v-if="good.inStock" v-html="lang === 'ru' ? 'Наличие: ' + good.inStock.name : 'Existence: ' + good.inStock.nameEng")
                            .stock(v-else v-html="lang === 'ru' ? 'Наличие: Не указано' : 'Existence: Not set'")
                            .cities
                                span.title(v-html="lang === 'ru' ? 'Города: ' : 'Cities: '")
                                .city
                                    span(v-if="good.cities.length" v-for="city in good.cities" v-html="lang === 'ru' ? city.name : city.nameEng")
                                    span(v-if="!good.cities.length" v-html="lang === 'ru' ? + 'Города не указаны' :  'Cities not set'")

                            // наличие
                            // тема
                        //.button(v-html="lang === 'ru' ? 'Подробнее' : 'More'" @click="$router.push({path:`/goods/${item.id}`})")
                        .button(v-html="lang === 'ru' ? 'Скачать материалы' : 'Download info'" @click="download(good)")

</template>

<script>
    import { mapState } from 'vuex'
    import downloadImagesAsZip from 'files-download-zip'
    import { saveAs } from 'file-saver';

    import Cookies from 'universal-cookie';
    import Shop from '~/assets/staticData/shop.json'
    import zenscroll from "zenscroll";
    import * as fb from "@/plugins/firebase";
    import {arrayBufferToBase64, getFilesFromData, urlToPromise} from "@/plugins/getUrl";
    import axios from "axios";
    import JSZip from "jszip";


    export default {
        data() {
            return {
                shop: Shop,
                activeMenu: null,
                activeIndex: 0,
                activeInnerIndex: 0,
                isAuth: null,
                inputType: 'password',
                password: '',
                curPass: '12345678',
                errorPass: false,

                categoriesArray: [],
                goodsArray: [],
                goodsArrayFiltered: [],
                currency: null,
            }
        },
        methods: {
            getDollarPrice(price) {
                console.log('this.currency', this.currency)
                return this.currency ? (price * this.currency).toFixed(2) : 'Price not specified'
            },
            async download(good) {
                const zip = new JSZip();

                good.photos.forEach((i) => {
                    console.log('i', i);
                    const data = urlToPromise(i.url);
                    zip.file(i.name, data, { binary: true });
                })

                const content = await zip.generateAsync({type:"blob"});
                console.log(content)

                saveAs(content, "stone-crafting.zip");
                // location.href="data:application/zip;base64," + content;

                // imgDataArray.push(...getFilesFromData(good.photos))

                // console.log(imgDataArray)
                // const zipFileName = `${this.lang === 'ru' ? 'stone-crafting images' : 'stone-crafting images'}`;
                // window.alert = () => {} // блокируем алерты - костыль для библиотеки





                // downloadImagesAsZip.execute(imgDataArray, zipFileName, () => { });
            },
            setActive(category) {
                this.activeMenu = this.categoriesArray.find((item) => {
                    return item.query === category.query
                });
                console.log('category', category)
                window.location.hash = category.query;

                console.log('this.goodsArray', this.goodsArray)
                console.log('this.activeMenu', this.activeMenu)

                this.goodsArrayFiltered = this.goodsArray.filter(good => good.category && good.category.id === this.activeMenu.id)
            },
            setActiveImg(item, id, index) {
                if (id >= item.photos.length) id = 0
                if (id < 0) id = item.photos.length - 1
                item.activeImgId = id
            },
            getBgImg(file) {
                return `url(${file.url})`
            },
            // getImg(url) {
            //     return getImgExternal(url)
            // },
            checkPass() {
                this.errorPass = false;
                if (this.curPass === this.password) {
                    new Cookies().set('token', 'auth')
                    this.isAuth = true
                } else {
                    this.isAuth = false
                    this.errorPass = true;
                }
            },
            async initApp() {
                await fb.categoriesCollection.get().then(data => {
                    data.forEach(doc => {
                        let category = doc.data()
                        category.id = doc.id

                        this.categoriesArray.push(category)
                    })

                    console.log('categoriesArray', this.categoriesArray)

                })
                await fb.goodsCollection.get().then(data => {
                    data.forEach(doc => {
                        let good = doc.data()
                        good.id = doc.id
                        good.activeImgId = this.activeIndex

                        this.goodsArray.push(good)
                    })

                    console.log('goodsArray', this.goodsArray)
                })

                await axios.get('https://api.exchangeratesapi.io/latest?base=RUB').then(({ data }) => {
                    if (data.rates.USD) this.currency = data.rates.USD;
                })

                const hashItem = this.categoriesArray.find(item => item.query === window.location.href.split('#')[1])
                this.setActive(hashItem || this.categoriesArray[0])
            }
        },
        computed: {
            ...mapState('localization', [
                'lang',
            ]),
        },
        watch: {
            isAuth(newVal) {
                if (newVal) this.initApp();
            },
        },

        async mounted() {
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
                    .stock
                        margin-bottom 10px
                    .cities,
                    .themes
                        display: inline-flex;
                        margin-bottom 10px
                        .title
                            margin-right 6px
                        .city,
                        .theme
                            display flex
                            flex-direction column

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
