<template lang="pug">
    page-container
        Header(placeholder="true")
        Contacts
        SplitLine
        Footer
</template>

<script>
import Contacts from '~/components/pagesComponents/Contacts.vue'
import PageContainer from '~/components/PageContainer.vue'
import Header from '~/components/HeaderNew.vue'
import Footer from '~/components/FooterNew.vue'
import SplitLine from '~/components/SplitLine.vue'


export default {
    components: {
        PageContainer,
        Contacts,
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
