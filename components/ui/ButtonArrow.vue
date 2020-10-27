<template lang='pug'>
    .btn__arrow__wrapper
        Button(
            :classNames="['btn__arrow', {'btn__arrow--right': arrowRight}]"
            :type ="'button'"
            :disabled="disabled"
            :onClick="test"
        )
            Arrow
</template>

<script>

import Button from "@/components/ui/Button";
import Arrow from '~/assets/img/arrow.svg'

export default {
    name: 'ButtonArrow',
    components: {
        Button,
        Arrow,
    },
    props: {
        onClick: Function,
        disabled: Boolean,
        arrowRight: Boolean,
    },
    methods: {
        test() {
            console.log('Ololo!!!');
            onClick && onClick()
        },
    },
    created() {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.btn__arrow__wrapper
    display flex
    flex-shrink 0
    justify-content center
    align-items center
    width 60px
    height 60px
    border 1px solid #2F2920
    border-radius 100%

.btn__arrow
    width 42px
    height 42px
    padding 0
    font-size 0
    line-height 0
    min-width unset
    transform rotate(-45deg)

    svg
        transform rotate(45deg)

    &:hover,
    &:active
        svg
            fill #222222

    &--right
        svg
            transform rotate(-135deg)

</style>