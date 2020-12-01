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
import Header from '~/components/HeaderNew.vue'
import Footer from '~/components/FooterNew.vue'
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
    body
        background-color blackRed
</style>
