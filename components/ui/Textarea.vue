<template lang='pug'>
  textarea(
    :name="name"
    :placeholder="placeholder"
    :class="{'error': error}"
    :style="{'width': width || '100%'}"
    v-on:input="$emit('input', $event.target.value)"
    maxlength="255"
    rows="3"
  )
</template>
<script>
export default {
  name: 'Textarea',
  props: {
    name: String,
    placeholder: String,
    value: String,
    error: String,
    width: String,
  },
}
</script>
<style lang="stylus" scoped>
  textarea
    padding 25px 0
    font-family $IntroRegular
    font-size 20px
    line-height 26px
    letter-spacing 0.03em
    outline none
    border 1px solid #FFFFFF
    border-top none
    border-right none
    border-left none

    background transparent 
    color #fff
    opacity 0.4
    cursor pointer
    resize none

    &:hover,
    &:active,
    &:focus
        opacity 1

    &.error
      border 1px solid red

</style>
