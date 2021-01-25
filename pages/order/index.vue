<template lang="pug">
    page-container
        Header(placeholder="true")
        Order
</template>

<script>
    import Order from '~/components/pagesComponents/Order.vue'
    import PageContainer from '~/components/PageContainer.vue'
    import Header from '~/components/HeaderNew.vue'

    export default {
        components: {
            PageContainer,
            Order,
            Header,
        },
    }
</script>

<style lang="stylus">
    body
        background-color blackBackground
</style>