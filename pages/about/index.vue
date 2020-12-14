<template lang="pug">
    page-container
        Header(placeholder="true")
        About
        SplitLine
        Footer
</template>

<script>
    import About from '~/components/pagesComponents/About.vue'
    import PageContainer from '~/components/PageContainer.vue'
    import Header from '~/components/HeaderNew.vue'
    import Footer from '~/components/FooterNew.vue'
    import SplitLine from '~/components/SplitLine.vue'


    export default {
        components: {
            PageContainer,
            About,
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
