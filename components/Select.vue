<template lang='pug'>
  div
    .select-container
      .select(@click="isOpen= !isOpen" :class="{'opened': isOpen}")
        .values(v-if="isMulti && value && value.length")
          .select_item(v-for="option in value")
            | {{option.name}}
            .icon.delete(@click="(e) => removeOption(option)")
              XIcon
        .value(v-else-if="!isMulti && value") {{value.name}}
        .placeholder(v-else) {{placeholder}}

        .arrow
          ChevronDownIcon(v-if="!isOpen")
          ChevronUpIcon(v-else)
      .options(v-if="isOpen" v-click-outside="open")
        .option(v-for="option in optionsFilter" @click="selectOption(option)" :class="{'selected': isSelected(option)}")
          .name {{option.name}}
    .errorText(v-if="error") {{error}}

</template>

<script>
import { ChevronDownIcon, ChevronUpIcon, XIcon } from 'vue-feather-icons'
import ClickOutside from 'vue-click-outside'

export default {
  name: 'Select',
  components: {
    ChevronDownIcon,
    ChevronUpIcon,
    XIcon,
  },
  data() {
    return {
      isOpen: false,
    }
  },
  props: {
    isMulti: Boolean,
    placeholder: String,
    value: Object | Array,
    error: String,
    width: String,
    options: Array,
  },
  methods: {
    removeOption(option) {
      const newVal = this.value.filter(i => i.id !== option.id)
      this.$emit('update:value', newVal)
    },
    isSelected(option) {
      if (this.value) {
        if (this.isMulti) return this.value.find((item) => item.id === option.id)
        return this.value.id === option.id
      }
      return false;

    },
    open() {
      if (this.isOpen) this.isOpen= !this.isOpen
    },
    selectOption(option) {
      if (this.isMulti) {
        this.$emit('update:value', [...this.value, option])
      } else {
        this.$emit('update:value', option)
        this.isOpen = false;
      }


    }
  },
  computed: {
    optionsFilter() {
      return this.options
    }
  },
  mounted() {
    this.popupItem = this.$el
  },
  created() {
  },
  directives: {
    ClickOutside
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.select-container
  position relative
  .select
    padding 10px 23px 9px
    color darkRed
    outline none
    cursor pointer
    border 1px solid darkRed
    position relative
    z-index 1
    background-color white

    .placeholder
      color rgb(117, 117, 117);
    .values
      display flex
      flex-wrap wrap
      padding-right 10px
      .select_item
        display inline-flex
        align-items center
        margin 0 3px
        font-size 14px
        .delete.icon
          cursor pointer
          display flex
          svg
            width 18px !important
            height 18px !important


    .arrow
      position absolute
      right 15px
      top 6px


  .options
    position absolute
    width 100%
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
    border 1px solid darkRed
    z-index 2


    .option
      padding 10px 23px 9px
      color darkRed
      outline none
      cursor pointer
      background-color white
      &.selected
        pointer-events none
        .name
          opacity 0.5
      &:nth-child(odd)
        background-color grayBackground

      &:hover
        background-color silverMain


    &.error
      border 1px solid red
  .errorText
    color $light_red
    font-size 14px




</style>
