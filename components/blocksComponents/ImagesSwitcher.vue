<template lang="pug">
.imagesSwitcher
    ul.imagesSwitcher__list
        li.imagesSwitcher__listItem(v-for="(item, index) in images" :key="item.id" :class="{'active': index === activeImg}")
            img.imagesSwitcher__photo(:src="getLocal(item.img)" :alt="item.year")
    slot(:activeImg="activeImg" :switchTo="switchTo")

</template>
<script>
import { getImgExternal, getImgLocal } from '~/plugins/getUrl'
export default {
    name: 'ImagesSwitcher',
    props: {
        images: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            activeImg: 0,
        }
    },
    methods: {
        getLocal(url) {
            return getImgLocal(url)
        },

        switchTo(index) {
            this.activeImg = index
        },
    },
}
</script>
<style scoped lang="stylus">
.imagesSwitcher
    position relative
    display block
    height 100%

    &__list
        padding 0
        list-style-type none

    &__listItem
        position absolute
        height 100%
        visibility hidden
        opacity 0
        transition opacity .3s ease-in

        &.active
            opacity 1
            visibility visible

    &__photo
        width 100%

</style>
