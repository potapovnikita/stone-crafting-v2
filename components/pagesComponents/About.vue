<template lang="pug">
    .common-container Содержимое страницы "О компании"

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

</style>
