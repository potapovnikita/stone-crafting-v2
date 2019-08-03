<template lang="pug">
    page-container
        Header(placeholder="true")
        Services
        SplitLine
        Footer
</template>

<script>
    import Services from '~/components/pagesComponents/Services.vue'
    import PageContainer from '~/components/PageContainer.vue'
    import Header from '~/components/Header.vue'
    import Footer from '~/components/Footer.vue'
    import SplitLine from '~/components/SplitLine.vue'


    export default {
        components: {
            PageContainer,
            Services,
            Header,
            Footer,
            SplitLine,
        },
    }
</script>

<style lang="stylus">

</style>
