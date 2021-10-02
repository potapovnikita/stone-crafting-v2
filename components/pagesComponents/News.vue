<template lang="pug">
    .common-container.contacts-container
        .news-container__bg-top
        .news-container__bg-bottom
        .news-container__wrapper
            h1.title(v-html="lang === 'ru' ? 'Новости' : 'News'")

        Footer

</template>

<script>
import { mapState } from 'vuex'
import Footer from '~/components/Footer.vue'

export default {
    data() {
        return {

        }
    },
    components: {
        Footer,
    },
    computed: {
        ...mapState('localization', [
            'lang',
        ]),
    },
    methods: {
        getImg(url) {
            const imageUrl = require('~/assets/' + `${url}`)
            return url ? `${imageUrl}` : ''
        },
    },
    mounted() {
    }
}
</script>

<style lang="stylus">

.news-container
    position relative
    padding-top 117px
    background linear-gradient(180deg, #111111 0%, rgba(17, 17, 17, 0) 100%)

    &__bg-top
        position absolute
        top 0
        left 0
        right 0
        width 100%
        height 100%
        background linear-gradient(180deg, #111111 0%, rgba(17, 17, 17, 0) 111.47%), url('~assets/img/contacts/bg-top.png') no-repeat top center
        background-size cover

    &__bg-bottom
        position absolute
        left 0
        right 0
        bottom 0
        width 100%
        height 953px
        background url('~assets/img/contacts/bg-bottom.png') no-repeat bottom center
        background-size cover

    &__wrapper
        position relative

    .title
        margin-bottom 26px

    .wrapper-bg
        position relative

    .bg-bottom
        position absolute
        left 0
        right 0
        bottom 0
        width 100%
        height 953px
        background url('~assets/img/contacts/bg-bottom.png'), linear-gradient(180deg, #111111 0%, rgba(17, 17, 17, 0) 100%)
        background-repeat no-repeat


    @media only screen and (max-width 767px)
        padding-top 76px
        background url('~assets/img/contacts/bg-mb.png')
        background-size contain

        &__bg-top
            display none

        &__bg-bottom
            display none

        &__wrapper
            padding 0 12px

        .title
            margin-bottom 40px
            font-size 28px

</style>
