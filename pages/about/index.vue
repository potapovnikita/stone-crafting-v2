<template lang="pug">
    page-container
        Header(placeholder="true")
        About
</template>

<script>
    import About from '~/components/pagesComponents/About.vue'
    import PageContainer from '~/components/PageContainer.vue'
    import Header from '~/components/Header.vue'

    export default {
        components: {
            PageContainer,
            About,
            Header,
        },
    }
</script>

<style lang="stylus">
    body
        background-color blackBackground
</style>
