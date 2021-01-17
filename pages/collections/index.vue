<template lang="pug">
    page-container
        Header(placeholder="true")
        collections
</template>

<script>
    import Collections from '~/components/pagesComponents/Collections.vue'
    import PageContainer from '~/components/PageContainer.vue'
    import Header from '~/components/HeaderNew.vue'


    export default {
        components: {
            PageContainer,
            Collections,
            Header,
        },
    }
</script>

<style lang="stylus">
    body
        background-color blackBackground
</style>
