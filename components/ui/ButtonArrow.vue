<template lang='pug'>
    .btn__arrow__wrapper
        button(
            v-if="onClick"
            :class="['btn__arrow', {'btn__arrow--right': arrowRight}]"
            @click="onClick && onClick()"
            )
                div
                    .desktop-hide
                        Arrow

                    .mobile-hide
                        ArrowMb
        a(
            v-if="href"
            :class="['btn__arrow', {'btn__arrow--right': arrowRight}]"
            :href="href"
            target="_blank"
            )
                div
                    .desktop-hide
                        Arrow

                    .mobile-hide
                        ArrowMb

</template>
<script>
import Arrow from '~/assets/img/arrow.svg'
import ArrowMb from '~/assets/img/arrowMb.svg'

export default {
    name: "ButtonArrow",
    components: {
        Arrow,
        ArrowMb,
    },
    props: {
        onClick: Function,
        arrowRight: Boolean,
        href: String,
    },
}
</script>
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

    a
        display flex
        align-items center
        justify-content center


.btn__arrow
    width 42px
    height 42px
    padding 0
    font-size 0
    line-height 0
    transform rotate(-45deg)
    outline none
    cursor pointer
    background-color transparent
    border 1px solid goldNew

    .mobile-hide
        display none

    svg
        transform rotate(45deg)

    &:hover,
    &:active
        background goldNew
        svg
            fill #222222

    &--right
        svg
            transform rotate(-135deg)

@media only screen and (max-width 767px)
    .btn__arrow__wrapper
        width 40px
        height 40px

    .btn__arrow
        width 28px
        height 28px

        .desktop-hide
            display none

        .mobile-hide
            display block

</style>
