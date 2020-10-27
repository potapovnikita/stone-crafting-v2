<template lang='pug'>
    button(
        :class="['btn',  classNames? classNames : '', { 'btn--large': large }]"
        :type ="type || 'button'" 
        @click="onClick && onClick()" 
        :disabled="disabled"
        )
            slot
                span {{name}}
</template>

<script>

export default {
    name: 'Button',
    props: {
        name: String,
        onClick: Function,
        type: String,
        disabled: Boolean,
        large: Boolean,
        classNames: Array,
    },
    created() {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.btn
    position relative
    min-width 280px
    padding 20px 20px 24px
    font-size 20px
    line-height 26px
    background-color #111111
    color whiteMain
    outline none
    cursor pointer
    border 1px solid #FCE086
    &:hover,
     &:active
        background #FCE086
        color #222222
    &:disabled
        background-color light_grey
        cursor default
        pointer-events none
        border 1px solid light_grey

    &--large
        min-width  494px
        padding 29px 20px 36px 

</style>