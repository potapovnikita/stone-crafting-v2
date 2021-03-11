<template lang="pug">
    page-container
        Header(placeholder="true")
        VirtualMuseum
</template>

<script>
    import VirtualMuseum from '~/components/pagesComponents/VirtualMuseum.vue'
    import PageContainer from '~/components/PageContainer.vue'
    import Header from '~/components/Header.vue'

    export default {
        components: {
            PageContainer,
            VirtualMuseum,
            Header,
        },
    }
</script>

<style lang="stylus">
    body
        background-color blackBackground
</style>
