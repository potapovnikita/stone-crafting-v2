<template lang="pug">
    page-container
        Header(placeholder="true")
        Buy
        SplitLine
        Footer
</template>

<script>
    import Buy from '~/components/pagesComponents/Buy.vue'
    import PageContainer from '~/components/PageContainer.vue'
    import Header from '~/components/Header.vue'
    import Footer from '~/components/Footer.vue'
    import SplitLine from '~/components/SplitLine.vue'


    export default {
        components: {
            PageContainer,
            Buy,
            Header,
            Footer,
            SplitLine,
        },
    }
</script>

<style lang="stylus">

</style>
