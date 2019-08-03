<template lang="pug">
    .about-container Содержимое страницы "Услуги"

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
    .about-container
        color whiteMain
        display flex
        flex-direction column
        justify-content center
        text-align center
        text-align -webkit-center
</style>
