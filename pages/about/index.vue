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
    import Header from '~/components/Header.vue'
    import Footer from '~/components/Footer.vue'
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

</style>
