<template lang="pug">
    .line(:class="{reverse: reverse}")
</template>

<script>
    export default {
        props: ['reverse'],
    }
</script>

<style lang="stylus">
    .line
        height 1px
        background silverMain
        left 40%
        right 40%
        position absolute
        &.reverse
            background darkRed
</style>

