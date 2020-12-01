<template lang='pug'>
    button(
        :class="['btn',  classNames? classNames : '', { 'btn--large': large }]"
        :type ="type || 'button'" 
        @click="onClick && onClick()" 
        :disabled="disabled"
        )
            slot
</template>

<script>

export default {
    name: 'Button',
    props: {
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
    font-family $TenorSans-Regular
    font-size 20px
    line-height 26px
    background-color transparent
    color whiteMain
    outline none
    cursor pointer
    border 1px solid goldNew
    &:hover,
    &:active
        background goldNew
        color #222222
    &:disabled
        background-color light_grey
        cursor default
        pointer-events none
        border 1px solid light_grey

    &--large
        min-width 494px
        padding 29px 20px 36px

    @media only screen and (max-width 767px)
        min-width 206px
        padding 17px 20px 22px
        font-size 16px
        line-height 21px

</style>