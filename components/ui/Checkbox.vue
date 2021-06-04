<template lang='pug'>
    label
        input(type="checkbox" id="" @change="$emit('input', $event.target.checked)")
        span
            CheckIcon
        slot

</template>

<script>

import CheckIcon from '~/assets/img/check.svg'

export default {
    name: 'Checkbox',
    components: {
        CheckIcon,
    },
    props: {
        name: String,
        onClick: Function,
    },
    created() {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
label
    position relative

span:first-of-type
    display inline-flex
    justify-content center
    align-items center
    flex-shrink 0
    width 18px
    height 18px
    margin-right 18px
    background #111111
    border 1px solid #505050

    svg
        visibility hidden

input
    &:checked ~ span
        svg
            visibility visible

</style>