<template lang="pug">
    page-container
        Header
        Goods
        SplitLine
        Footer
</template>

<script>
    import Goods from '~/components/pagesComponents/Goods.vue'
    import Header from '~/components//Header.vue'
    import PageContainer from '~/components/PageContainer.vue'
    import SplitLine from '~/components/SplitLine.vue'
    import Footer from '~/components/Footer.vue'

    export default {
        components: {
            PageContainer,
            Goods,
            Header,
            SplitLine,
            Footer,
        },
    }
</script>

<style lang="stylus">

</style>

