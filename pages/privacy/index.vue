<template lang="pug">
    page-container
        Header(placeholder="true")
        Privacy
        SplitLine
        Footer
</template>

<script>
import Privacy from '~/components/pagesComponents/Privacy.vue'
import PageContainer from '~/components/PageContainer.vue'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import SplitLine from '~/components/SplitLine.vue'


export default {
    components: {
        PageContainer,
        Privacy,
        Header,
        Footer,
        SplitLine,
    },
}
</script>

<style lang="stylus">

</style>
