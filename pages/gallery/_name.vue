<template lang="pug">
    page-container
        Header
        Gallery
</template>

<script>
    import Gallery from '~/components/pagesComponents/Gallery.vue'
    import Header from '~/components//Header.vue'
    import PageContainer from '~/components/PageContainer.vue'

    export default {
        components: {
            PageContainer,
            Gallery,
            Header,
        },
    }
</script>

<style lang="stylus">
    body
        background-color blackBackground
</style>

