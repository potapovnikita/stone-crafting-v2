<template lang="pug">
    page-container
        Header(placeholder="true")
        History
        SplitLine
        Footer
</template>

<script>
import History from '~/components/pagesComponents/History.vue'
import PageContainer from '~/components/PageContainer.vue'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import SplitLine from '~/components/SplitLine.vue'


export default {
    components: {
        PageContainer,
        History,
        Header,
        Footer,
        SplitLine,
    },
}
</script>

<style lang="stylus">

</style>
