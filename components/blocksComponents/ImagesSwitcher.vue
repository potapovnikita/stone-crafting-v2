<template lang="pug">
.imagesSwitcher(@click="next")
    ul.imagesSwitcher__list
        li.imagesSwitcher__listItem(v-for="(imagePath, index) in images" :key="`img_${index}`" :class="{'active': index === activeImg}")
            img.imagesSwitcher__photo(:src="getLocal(imagePath)" :alt="`pic_${index}`")
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
            interval: null,
        }
    },
    methods: {
        getLocal(url) {
            return getImgLocal(url)
        },

        startInterval() {
            if (this.interval) clearInterval(this.interval)
            this.interval = setInterval(this.next, 5000)
        },

        switchTo(index, event) {
            if (event) event.stopPropagation()
            if (this.interval) this.startInterval()
            this.activeImg = index
        },
        next() {
            const hasNext = this.activeImg < this.images.length - 1
            this.activeImg = hasNext ? this.activeImg += 1: 0;
        }
    },
    mounted() {
        this.startInterval()
    },
    destroyed() {
        clearInterval(this.interval)
    }
}
</script>
<style scoped lang="stylus">
.imagesSwitcher
    position relative
    display block
    height 100%
    cursor pointer

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
        min-height 286px

</style>
