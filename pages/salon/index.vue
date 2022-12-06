<template lang="pug">
    page-container(reverse="true")
        HeaderOffer(placeholder="true", reverse="true")
        Buy(:isSalon="true")
        SplitLine(reverse="true")
        Footer(reverse="true")
</template>

<script>
import Buy from '~/components/pagesComponents/Buy.vue'
import PageContainer from '~/components/PageContainer.vue'
import HeaderOffer from '~/components/HeaderOffer.vue'
import Footer from '~/components/Footer.vue'
import SplitLine from '~/components/SplitLine.vue'

export default {
    components: {
        PageContainer,
        Buy,
        HeaderOffer,
        Footer,
        SplitLine,
    },
}
</script>

<style lang="stylus">
</style>
