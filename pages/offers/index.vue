<template lang="pug">
    page-container(reverse="true")
        HeaderOffer(placeholder="true", reverse="true")
        //Buy_old
        Buy
        SplitLine(reverse="true")
        FooterOffer(reverse="true")
</template>

<script>
    import Buy_old from '~/components/pagesComponents/Buy_old.vue'
    import Buy from '~/components/pagesComponents/Buy.vue'
    import PageContainer from '~/components/PageContainer.vue'
    import HeaderOffer from '~/components/HeaderOffer.vue'
    import FooterOffer from '~/components/FooterOffer.vue'
    import SplitLine from '~/components/SplitLine.vue'


    export default {
        components: {
            PageContainer,
            Buy_old,
            Buy,
            HeaderOffer,
            FooterOffer,
            SplitLine,
        },
    }
</script>

<style lang="stylus">
</style>
