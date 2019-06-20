<template lang="pug">
    .container#container
        slot

</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {},
        components: {},
        mounted() {},
    }
</script>

<style lang="stylus">
    .container
        background-color #120000
        margin 0 auto
        position relative
        min-height 100vh
        overflow hidden
</style>
