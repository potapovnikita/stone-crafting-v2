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
                h3.reverse Категории

                .item(v-if="!categoriesArray.length" v-html="lang === 'ru' ? 'Категорий нет' : 'Categories is not set'")
                .item
                    .section_name(:class="{active: !activeMenu}"
                        @click="setActive('All')") {{ lang === 'ru' ? 'Все категории' : 'All categories' }}
                .item(v-for="item in categoriesArray")
                    .section_name(:class="{active: activeMenu && activeMenu.query === item.query}"
                                    @click="setActive(item)") {{ lang === 'ru' ? item.name : item.nameEng }}

            .shop_items
                .item(v-if="!goodsArrayFiltered.length" v-html="lang === 'ru' ? 'Товаров нет' : 'Goods is not set'")

                h3.reverse {{lang === 'ru' ? 'Фильтр' : 'Filter'}}
                .filters(v-if="goodsArrayFiltered.length")
                    .form_item__container
                        Input(name="material" v-model.trim="filterState.search" :placeholder="lang === 'ru' ? 'Поиск по тексту' : 'Search by text'" width="100%")
                    //.form_item__container
                        Select(:options="categoriesArray" :value.sync="filterState.category" placeholder="Категории" isMulti)
                    .form_item__container
                        Select(:options="themes" :value.sync="filterState.themes" :placeholder="lang === 'ru' ? 'Темы' : 'Themes'" isMulti)
                    .form_item__container
                        Select(:options="cities" :value.sync="filterState.cities" :placeholder="lang === 'ru' ? 'Города' : 'Cities'" isMulti)
                    .form_item__container
                        Select(:options="stockStatuses" :value.sync="filterState.inStock" :placeholder="lang === 'ru' ? 'Наличие' : 'Availability'" isMulti)
                    .form_item__container
                        .sort
                            .type(:class="{'active': filterState.price === 'bottomToTop'}" @click="setSortPrice('bottomToTop')") {{lang === 'ru' ? 'Цена' : 'Price'}}
                                ChevronsUpIcon
                            .type(:class="{'active': filterState.price === 'topToBottom'}" @click="setSortPrice('topToBottom')") {{lang === 'ru' ? 'Цена' : 'Price'}}
                                ChevronsDownIcon
                    .form_item__container
                        Button(:name="lang === 'ru' ? 'Сбросить фильтр' : 'Reset filter'" :onClick="() => resetFilter()")

                h4(v-if="filteredGoods.length === 0")
                    | {{lang === 'ru' ? 'Товаров по фильтру не найдено, задайте другие параметры поиска или сбросьте фильтр' : 'No goods found by filter, please set other search parameters or reset the filter'}}
                .item(v-for="(good, index) in filteredGoods" v-if="index < visibleGoods" :key="good.id")
                    .image
                        .photo(v-show="good.files[good.activeImgId].type === 'photo'"
                            :style="{backgroundImage: getBgImg(good.files[good.activeImgId])}"
                            @click="setActiveImg(good, good.activeImgId + 1, index)")
                        .photo(v-show="good.files[good.activeImgId].type === 'video'"
                                @click="setActiveImg(good, good.activeImgId + 1, index)")
                            video(:src="good.files[good.activeImgId].url"
                                controls
                                )

                        .slides
                            .img(v-for="(img, idx) in good.files")
                                img(v-show="img.type === 'photo'" :src="img.url" :class="{active: idx === good.activeImgId}" @click="setActiveImg(good, idx, index)")
                                video(v-show="img.type === 'video'" :src="img.url" :class="{active: idx === good.activeImgId}" @click="setActiveImg(good, idx, index)")
                        .button(v-html="lang === 'ru' ? 'Скачать материалы' : 'Download info'" @click="download(good)")
                    .description
                        div
                            h2(v-html="lang === 'ru' ? good.name : good.nameEng")
                            .line-sm
                            .material(v-if="good.number" v-html="lang === 'ru' ? 'Уникальный номер: ' + good.number : 'Unique number: ' + good.number")
                            .desc(v-if="good.description" v-html="lang === 'ru' ? '<b>Описание: </b>' + good.description : '<b>Description: </b>' + good.descriptionEng")
                            .material(v-if="good.material" v-html="lang === 'ru' ? '<b>Материал: </b>' + good.material : '<b>Material: </b>' + good.materialEng")
                            .size(v-if="good.size" v-html="lang === 'ru' ? '<b>Размер: </b>' + good.size : '<b>Size: </b>' + good.sizeEng")
                            .year(v-if="good.year" v-html="lang === 'ru' ? '<b>Год: </b>' + good.year : '<b>Year: </b>' + good.year")
                            .price(
                                v-if="good.pricetoView && good.pricetoView.from"
                                v-html="lang === 'ru' ? '<b>Цена: </b>' + good.pricetoView.string + ' ₽' : '<b>Price: </b>' + parsePrice(good.pricetoView.string, currency).string + ' $'"
                            )
                            .price(v-else v-html="lang === 'ru' ? '<b>Цена:</b> по запросу' : '<b>Price:</b> on request'")
                            .stock(v-if="good.inStock" v-html="lang === 'ru' ? '<b>Наличие: </b>' + good.inStock.name : '<b>Existence: </b>' + good.inStock.nameEng")
                            .cities(v-if="good.cities.length")
                                b
                                    span.title(v-html="lang === 'ru' ? 'Город: ' : 'City: '")
                                .city
                                    span(v-for="city in good.cities" v-html="lang === 'ru' ? city.name : city.nameEng")
                            .documents(v-if="good.documents.length")
                                b.name {{lang === 'ru' ? 'Документы:' :  'Documents:'}}
                                a.doc(v-for="doc in good.documents" :href="doc.url" target="_blank") {{doc.name}}

                        //.button(v-html="lang === 'ru' ? 'Подробнее' : 'More'" @click="$router.push({path:`/goods/${item.id}`})")
                        .button(
                            v-html="lang === 'ru' ? load ? 'Идет скачивание...' : 'Скачать материалы' : load ? 'Downloading...' : 'Download info'"
                            @click="download(good)"
                            :class="{'disabled': load}"
                            )

</template>

<script>
    import { mapState } from 'vuex'
    import { saveAs } from 'file-saver';

    import Cookies from 'universal-cookie';
    import zenscroll from "zenscroll";
    import * as fb from "@/plugins/firebase";
    import { urlToPromise } from "@/plugins/getUrl";
    import axios from "axios";
    import JSZip from "jszip";
    import { ChevronsDownIcon, ChevronsUpIcon } from 'vue-feather-icons'

    import Input from "@/components/Input";
    import Select from "@/components/Select";
    import Button from "@/components/Button";

    import { themes, cities, stockStatuses } from "@/plugins/constants"

    export default {
        components: {
            Input,
            Select,
            Button,
            ChevronsDownIcon,
            ChevronsUpIcon,
        },
        data() {
            return {
                visibleGoods: 5,
                queryParams: null,
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
                load: false,
                themes,
                cities,
                stockStatuses,
                filterState: {
                    themes: [],
                    cities: [],
                    inStock: [],
                    category: [],
                    price: null,
                    search: '',
                },
            }
        },
        methods: {
            resetFilter() {
                this.$set(this.filterState, 'themes', []);
                this.$set(this.filterState, 'cities', []);
                this.$set(this.filterState, 'inStock', []);
                this.$set(this.filterState, 'category', []);
                this.$set(this.filterState, 'price', null);
                this.$set(this.filterState, 'search', '');
            },
            searchByAll(arr, search) {
                const searched = [];
                const searchProp = ['name', 'description', 'nameEng', 'descriptionEng', 'material', 'materialEng', 'year', 'yearEng', 'price', 'size', 'number'];

                for(let i = 0; i < arr.length; i++) {
                    const good = arr[i];
                    for(let j = 0; j < Object.keys(good).length; j++) {
                        const key = Object.keys(good)[j];
                        if (searchProp.includes(key) && good[key].toLowerCase().includes(search.toLowerCase())) {
                            searched.push(good);
                            break;
                        }
                    }
                }
                return searched;
            },
            setSortPrice(type) {
                const filter = this.filterState.price === type ? null : type
                this.$set(this.filterState, 'price', filter)
            },
            parsePrice(val, cur) {
                if (!val) return null;
                const currency = cur || 1;
                const separatedPrice = val.split('-')
                const price = {
                    from: Number(separatedPrice[0].replace(/[^+\d.]/g, '') * currency).toFixed(),
                    to: separatedPrice[1] ? Number(separatedPrice[1].replace(/[^+\d.]/g, '') * currency).toFixed() : null,
                }

                return {
                    ...price,
                    string: `${price.from}${price.to ? ' - ' + price.to : ''}`
                }
            },
            async download(good) {
                this.load = true;
                const zip = new JSZip();

                good.files.forEach((i) => {
                    console.log('i', i);
                    const data = urlToPromise(i.url);
                    zip.file(i.name, data, { binary: true });
                })

                const content = await zip.generateAsync({type:"blob"});
                this.load = false;
                saveAs(content, "stone-crafting.zip");
            },
            setActive(category) {
                this.filterState.search = '';

                if (category !== 'All') {
                    this.activeMenu = this.categoriesArray.find((item) => {
                        return item.query === category.query
                    });
                    window.location.hash = category.query;
                    this.goodsArrayFiltered = this.goodsArray.filter((good) => {
                        return good.category && good.category.length && good.category.some(i => i.id === this.activeMenu.id)
                    })
                } else {
                    this.activeMenu = null;
                    window.location.hash = 'all';
                    this.goodsArrayFiltered = this.goodsArray;
                }
            },
            setActiveImg(item, id) {
                if (id >= item.files.length) id = 0
                if (id < 0) id = item.files.length - 1
                item.activeImgId = id
            },
            getBgImg(file) {
                return `url('${file.url}')`
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
            },
            async initApp() {
                await fb.categoriesCollection.get().then(data => {
                    data.forEach(doc => {
                        let category = doc.data()
                        category.id = doc.id

                        this.categoriesArray.push(category)
                    })
                })
                await fb.goodsCollection.get().then(data => {
                    data.forEach(doc => {
                        let good = doc.data()
                        if (good.visibility && good.visibility.find(v => v.code === 'partners')) {
                            good.id = doc.id
                            good.activeImgId = this.activeIndex
                            good.files = [
                                ...good.photos.map(photo => ({
                                    ...photo,
                                    type: 'photo',
                                })),
                                ...good.videos.map(video => ({
                                    ...video,
                                    type: 'video',
                                })),
                            ]
                            good.pricetoView = this.parsePrice(good.price);

                            this.goodsArray.push(good)
                        }

                    })
                })

                await axios.get('https://api.exchangeratesapi.io/latest?base=RUB').then(({ data }) => {
                    if (data.rates.USD) this.currency = data.rates.USD;
                })

                const hashItem = this.categoriesArray.find(item => item.query === window.location.href.split('#')[1])
                this.setActive(hashItem || 'All')

                if (this.queryParams.get('id')) this.filterState.search = this.queryParams.get('id');
            }
        },
        computed: {
            ...mapState('localization', [
                'lang',
            ]),
            filterStateIsEmpty() {
                const { themes, cities, inStock, category, price, search } = this.filterState;
                return !themes.length && !cities.length && !inStock.length && !category.length && !price && !search;
            },
            filteredGoods() {
                this.visibleGoods = 5;

                const { themes, cities, inStock, category, price, search } = this.filterState;

                const goods = [...this.goodsArrayFiltered];
                const filtered = []

                goods.forEach(i => i.activeImgId = 0);
                if (this.filterStateIsEmpty) return goods

                goods.forEach((good) => {
                    const isHave = [];
                    if (themes.length) {
                        isHave.push(good.themes
                            .some(({ id }) => themes
                                .map(i => i.id)
                                .includes(id)
                            )
                        )
                    }

                    if (cities.length) {
                        isHave.push(good.cities
                            .some(({ id }) => cities
                                .map(i => i.id)
                                .includes(id)
                            )
                        )
                    }

                    if (inStock.length) {
                        isHave.push(inStock
                            .some(i => i.id === good.inStock && good.inStock.id)
                        )
                    }

                    if (category.length) {
                        isHave.push(good.category && good.category
                            .some(({ id }) => category
                                .map(i => i.id)
                                .includes(id)
                            )
                        )
                    }

                    if (!isHave.includes(false)) filtered.push(good)

                })

                if (price === 'bottomToTop') filtered.sort((a, b) =>
                    Number(a.pricetoView && a.pricetoView.from || 100000000) - Number(b.pricetoView && b.pricetoView.from || 100000000)
                )
                if (price === 'topToBottom') filtered.sort((a, b) =>
                    Number(b.pricetoView && b.pricetoView.from  || 0) - Number(a.pricetoView && a.pricetoView.from || 0)
                )
                if (search.length > 2) return this.searchByAll(filtered, search)

                return filtered
            }
        },
        watch: {
            isAuth(newVal) {
                if (newVal) this.initApp();
            },
        },

        async mounted() {
            this.queryParams = (new URL(window.document.location)).searchParams;
            this.isAuth = new Cookies().get('token') || this.curPass === this.queryParams.get('p');
            document.getElementsByTagName('body')[0].style.backgroundColor = '#faf3ed'
            window.scrollTo(0, 0);
            const header = document.getElementById('container')
            zenscroll.to(header)

            window.addEventListener('scroll', () => {
                if ((document.documentElement.scrollTop + window.innerHeight + 500) > document.documentElement.offsetHeight) {
                    this.visibleGoods += 5;
                }
            });
        },
        destroyed() {
            window.removeEventListener('scroll', () => {})
            document.getElementsByTagName('body')[0].style.backgroundColor = '#120000'
        }
    }
</script>

<style lang="stylus">
    $sizeMin = 80px

    h4
     color darkRed

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

            h3
                margin-bottom 15px

            .item
                color darkRed
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
            padding 5px

            h3
                margin-bottom 15px
            .filters
                display inline-flex
                flex-wrap wrap
                justify-content: center;


                .form_item__container
                    margin-right 10px

                    .sort
                        display flex
                        flex-direction row
                        flex-wrap nowrap
                        justify-content center

                        .type
                            display flex
                            align-items center
                            justify-content center
                            width 140px
                            font-size 15px
                            background-color light_grey
                            padding 5px
                            border 1px solid light_grey
                            color white
                            cursor pointer
                            margin-right 1px
                            border-radius 5px
                            &.active
                                background-color darkRed
                                border 1px solid darkRed
            .item
                width 100%
                display flex
                flex-direction row
                border 1px solid darkRed
                padding 10px
                margin-bottom 10px
                color darkRed
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

                        video
                            height 100%
                            width 100%
                            background-color: black

                    .slides
                        width 100%
                        display flex
                        flex-direction row
                        flex-wrap wrap
                        justify-content: center;

                        .img
                            cursor pointer
                            padding 0 2px 2px 2px

                            img,
                            video
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

                    .desc,
                    .material,
                    .year,
                    .size,
                    .price,
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
                    .documents
                        display flex
                        flex-direction column
                        .name
                            margin-bottom 5px
                        a.doc
                            margin-left 5px
                            color darkRed
                            cursor pointer
                            text-decoration underline
                            &:hover
                                text-decoration none

                    .desc
                        display block
                        margin-bottom 25px


                .button
                    text-align center
                    cursor pointer
                    border 1px solid
                    padding 5px 10px
                    color darkRed
                    background-color backgroundReverse
                    &.disabled
                        opacity 0.7
                        pointer-events none
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
