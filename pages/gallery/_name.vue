<template lang="pug">
    page-container
        Header
        Gallery
</template>

<script>
    import Gallery from '~/components/pagesComponents/GalleryNew.vue'
    import Header from '~/components//HeaderNew.vue'
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

