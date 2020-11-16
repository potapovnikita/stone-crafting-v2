<template lang="pug">
    .collection-item
        .collection-item__bg(:style="{backgroundImage: getBgImg(imgBgUrl)}")   
        .collection-item__wrapper-content(:class="{ 'collection-item__wrapper-content--reverse': isReverse }")
            img(:src="getImg(imgUrl)")
            .collection-item__content
                h2.collection-item__title {{title}}

                .collection-item__double-line
                p.collection-item__text {{text}}

                ButtonArrow()

</template>
<script>
    import ButtonArrow from "@/components/ui/ButtonArrow"
    import { getImgLocal, getBgImgLocal } from '~/plugins/getUrl'
    export default {
        name: 'CollectionItem',
        components: {
            ButtonArrow,
        },
        props: {
            title: String,
            text: String,
            imgUrl: String,
            imgBgUrl: String,
            isReverse: Boolean,
        },
        methods: {
            getImg(url) {
                return getImgLocal(url)
            },
            getBgImg(url) {
                return getBgImgLocal(url)
            }
        },
    }
</script>

<style lang="stylus">
.collection-item
    position relative
    display flex

    &__bg
        position absolute
        width 100%
        height 100%
        background-repeat no-repeat
        background-position center

    &__wrapper-content
        position relative
        display flex
        align-items center
        margin 0 auto

        &--reverse
            flex-direction row-reverse

            .collection-item__text
                max-width 524px

    &__content
        text-align left

    &__title
        margin-bottom 52px
        text-align left
        line-height 52px
        letter-spacing 0.03em

    &__double-line
        width 100px
        height 4px
        margin-bottom 52px
        border 1px solid goldNew
        border-left none
        border-right none

    &__text
        max-width 382px
        margin-bottom 52px
        text-align left 

</style>