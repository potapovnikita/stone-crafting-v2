<template lang="pug">
    page-container
        Header(placeholder="true")
        collections
        SplitLine
        Footer
</template>

<script>
    import Collections from '~/components/pagesComponents/Collections.vue'
    import PageContainer from '~/components/PageContainer.vue'
    import Header from '~/components/Header.vue'
    import Footer from '~/components/Footer.vue'
    import SplitLine from '~/components/SplitLine.vue'


    export default {
        components: {
            PageContainer,
            Collections,
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
