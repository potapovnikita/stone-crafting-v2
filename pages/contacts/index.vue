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
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
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

</style>
