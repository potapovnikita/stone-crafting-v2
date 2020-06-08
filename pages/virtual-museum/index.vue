<template lang="pug">
    page-container
        Header(placeholder="true")
        VirtualMuseum
        SplitLine
        Footer
</template>

<script>
    import VirtualMuseum from '~/components/pagesComponents/VirtualMuseum.vue'
    import PageContainer from '~/components/PageContainer.vue'
    import Header from '~/components/Header.vue'
    import Footer from '~/components/Footer.vue'
    import SplitLine from '~/components/SplitLine.vue'
    
    export default {
        components: {
            PageContainer,
            VirtualMuseum,
            Header,
            Footer,
            SplitLine,
        },
    }
</script>

<style lang="stylus">

</style>
