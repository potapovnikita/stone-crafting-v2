<template lang='pug'>
    button(:type ="type || 'button'" @click="onClick && onClick()" :disabled="disabled") {{name}}
        span.loader(v-if="disabled")
            LoaderIcon

</template>

<script>
import { LoaderIcon } from 'vue-feather-icons'

export default {
    name: 'Button',
    components: {
        LoaderIcon,
    },
    props: {
        name: String,
        onClick: Function,
        type: String,
        disabled: Boolean,
    },
    created() {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
button
    position relative
    background darkRed
    padding 11px 26px 10px
    color whiteMain
    outline none
    cursor pointer
    border 1px solid darkRed
    &:hover
        background darken(darkRed, 20%)
    &:active
        background darken(darkRed, 25%)
    &:disabled
        background-color light_grey
        cursor default
        pointer-events none
        border 1px solid light_grey
.loader
    animation: spin 4s linear infinite;
    position absolute
    right 2px
    top 8px
    svg
        width 20px
        height 20px
        stroke darkRed

@keyframes spin
    100% { transform:rotate(360deg); }


</style>
