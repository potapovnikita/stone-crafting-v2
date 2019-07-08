<template lang="pug">
    .news-container Содержимое страницы "Новости/Выставки"

</template>

<script>
    import { mapState } from 'vuex'

    import Company from '~/assets/staticData/company.json'

    export default {
        data() {
            return {
                company: Company,
            }
        },
        components: {
        },
        computed: {
            ...mapState('localization', [
                'lang',
            ]),
        },
    }
</script>

<style lang="stylus">
    .news-container
        color whiteMain
        display flex
        flex-direction column
        justify-content center
        text-align center
        text-align -webkit-center
</style>
