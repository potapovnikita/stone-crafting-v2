<template lang="pug">
    page-container
        Header
        Gallery
        SplitLine
        Footer
</template>

<script>
    import Gallery from '~/components/pagesComponents/Gallery.vue'
    import Header from '~/components//Header.vue'
    import PageContainer from '~/components/PageContainer.vue'
    import SplitLine from '~/components/SplitLine.vue'
    import Footer from '~/components/Footer.vue'

    export default {
        components: {
            PageContainer,
            Gallery,
            Header,
            SplitLine,
            Footer,
        },
    }
</script>

<style lang="stylus">
    body
        background-color blackRed
</style>

