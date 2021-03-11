<template lang="pug">
    page-container
        Header(placeholder="true")
        Contacts
</template>

<script>
import Contacts from '~/components/pagesComponents/Contacts.vue'
import PageContainer from '~/components/PageContainer.vue'
import Header from '~/components/Header.vue'


export default {
    components: {
        PageContainer,
        Contacts,
        Header,
    },
}
</script>

<style lang="stylus">
    body
        background-color blackBackground
</style>
