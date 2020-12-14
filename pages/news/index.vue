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
    import Header from '~/components/HeaderNew.vue'
    import Footer from '~/components/FooterNew.vue'
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
    body
        background-color blackRed
</style>
