<template lang="pug">
    .container#container(:class="{reverse: reverse}")
        slot

</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props: ['reverse'],
        methods: {},
        components: {},
        mounted() {},
    }
</script>

<style lang="stylus">
    .container
        background-color blackBackground
        margin 0 auto
        position relative
        min-height 100vh
        overflow hidden
        &.reverse
            background-color backgroundReverse
</style>
