<template lang="pug">
    page-container
        Header(placeholder="true")
        News
        SplitLine
        Footer
</template>

<script>
    import News from '~/components/pagesComponents/News.vue'
    import PageContainer from '~/components/PageContainer.vue'
    import Header from '~/components/Header.vue'
    import Footer from '~/components/Footer.vue'
    import SplitLine from '~/components/SplitLine.vue'


    export default {
        components: {
            PageContainer,
            News,
            Header,
            Footer,
            SplitLine,
        },
    }
</script>

<style lang="stylus">

</style>
