<template lang="pug">
    page-container(reverse="true")
        Header(placeholder="true", reverse="true")
        //Buy_old
        Buy
        SplitLine(reverse="true")
        Footer(reverse="true")
</template>

<script>
    import Buy_old from '~/components/pagesComponents/Buy_old.vue'
    import Buy from '~/components/pagesComponents/Buy.vue'
    import PageContainer from '~/components/PageContainer.vue'
    import Header from '~/components/Header.vue'
    import Footer from '~/components/Footer.vue'
    import SplitLine from '~/components/SplitLine.vue'


    export default {
        components: {
            PageContainer,
            Buy_old,
            Buy,
            Header,
            Footer,
            SplitLine,
        },
    }
</script>

<style lang="stylus">
</style>
