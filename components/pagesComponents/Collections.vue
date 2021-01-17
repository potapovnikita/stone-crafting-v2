<template lang="pug">
    .common-container.collections-container
        .collections-container__bg-bottom
        h1 {{ lang === 'ru' ? 'Сокровища музеев' : 'Collections' }}
        CollectionItem(v-for="(item, index) in museumNew"
            :key="item.id"
            :id="item.id"
            :title="item.title"
            :titleEng="item.titleEng"
            :text="item.text"
            :textEng="item.textEng"
            :imgUrl="item.img"
            :imgBgUrl="item.background"
            :isReverse="index % 2 == 0"
        )
        Footer

</template>

<script>
    import { mapState } from 'vuex'
    import { getImgExternal, getImgLocal } from '~/plugins/getUrl'
    import Museum from '~/assets/staticData/museum.json'
    import Cookies from 'universal-cookie';
    import CollectionItem from "@/components/pagesComponents/CollectionItem";
    import MuseumNew from '~/assets/staticData/museumNew.json';
    import Footer from '~/components/FooterNew.vue'

    export default {
        data() {
            return {
                museum: Museum,
                isInit: false,
                museumNew: MuseumNew,
            }
        },
        methods: {
            setCurrentScroll() {
                new Cookies().set('scroll', window.pageYOffset)
            },
            getImg(url) {
                return getImgExternal(url)
            },
        },
        components: {
            CollectionItem,
            Footer,
        },
        computed: {
            ...mapState('localization', [
                'lang',
            ]),
        },
        mounted() {
            this.isInit = true;
            const scroll = new Cookies().get('scroll')
            if (scroll)  {
                window.scrollTo(0, scroll);
            }
        },
    }
</script>


<style lang="stylus">
    .collections-container
        position relative
        padding-top 117px

        &__bg-bottom
            position absolute
            left 0
            right 0
            bottom 0
            width 100%
            height 512px
            background linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%), url('~assets/img/collections/bg.png') bottom right no-repeat

        @media only screen and (max-width 1280px)
            &__bg-bottom
                height 466px
                background linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%), url('~assets/img/collections/bg-ip.png') bottom right no-repeat

        @media only screen and (max-width 767px)
            &__bg-bottom
                height 563px
                background url('~assets/img/collections/bg-m.png') no-repeat
                background-size cover

</style>
