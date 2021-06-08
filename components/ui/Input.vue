<template lang='pug'>
  div
    input(
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      v-on:input="$emit('input', $event.target.value)"
      :class="{'error': error}"
      :style="{'width': width || '100%'}"
    )
    .errorText(v-if="error") {{error}}

</template>

<script>
  const Input = {
    name: 'Input',
    components: { },
    props: {
      name: String,
      type: String,
      placeholder: String,
      value: String,
      error: String,
      width: String,
    },
    methods: {

    },
    created() {
    }
  }

  export default Input
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  input
    padding 25px 0px
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

    &:hover,
    &:active,
    &:focus
        opacity 1

    &.error
      border 1px solid red
  .errorText
    color red
    font-size 14px

</style>