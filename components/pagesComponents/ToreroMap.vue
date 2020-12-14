<template lang="pug">
    .torero-container
        .torero-container__bg-pic
        ul.torero-container__stones(v-if="toreroMap")
            li(v-for="stone in toreroMap.left")
                .torero-container__wrapper-stone
                    .torero-container__stone-slot
                        .torero-container__stone-pic(:style="{backgroundImage: getBgImg(stone.background)}")
                    p.torero-container__stone-title {{getStoneTitle(stone)}}

        .torero-container__pic
            .torero-container__point.torero-container__point--digit-1
                | 1
            .torero-container__point.torero-container__point--digit-3
                | 3
            .torero-container__point.torero-container__point--digit-4
                | 4
            .torero-container__point.torero-container__point--digit-5
                | 5
            .torero-container__point.torero-container__point--digit-6
                | 6
            .torero-container__point.torero-container__point--digit-7
                | 7
            .torero-container__point.torero-container__point--digit-8
                | 8
            .torero-container__point.torero-container__point--digit-9
                | 9

        ul.torero-container__stones(v-if="toreroMap")
            li(v-for="stone in toreroMap.right")
                .torero-container__wrapper-stone
                    .torero-container__stone-slot
                        .torero-container__stone-pic(:style="{backgroundImage: getBgImg(stone.background)}")
                    p.torero-container__stone-title {{getStoneTitle(stone)}}
    
</template>
<script>
import { mapState } from 'vuex'
import { getBgImgLocal } from '~/plugins/getUrl'
import ToreroMap from '~/assets/staticData/toreroMap.json'
export default {
    name: 'ToreroMap',
    data() {
        return {
            toreroMap: ToreroMap,
        }
    },
    methods: {
        getBgImg(url) {
            return getBgImgLocal(url)
        },
        getStoneTitle(stone) {
            if(this.lang === 'ru') {
                return stone.titleRu
            } else {
                return stone.titleEng
            }
        },
    },
    computed: {
        ...mapState('localization', [
            'lang',
        ]),
    },
}
</script>
<style lang="stylus">
.torero-container
    position relative
    display flex
    align-items center

    &__bg-pic
        position absolute
        left 0
        right 0
        margin 0 auto
        width 100%
        height 758px
        background linear-gradient(142.6deg, rgba(17, 17, 17, 0) 21.67%, #111111 90.98%), url('~assets/img/toreroMap/bg-main.png')
        background-repeat no-repeat
        background-position center

    &__stones
        position relative
        padding 0
        list-style-type none

        & li + li
            padding-top 57px

    &__wrapper-stone
        display flex
        align-items center

    &__stone-slot
        flex-shrink 0
        width 62px
        height 62px
        padding 6px
        margin-right 30px
        border 1px solid transparent
        border-radius 50%
        cursor pointer

        &:hover
            border 1px solid goldNew

    &__stone-pic
        width 100%
        height 100%
        border-radius 50%
        background-repeat no-repeat
        background-position center
        background-size cover

    &__stone-title
        font-size 16px
        line-height 24px
        text-align left
        color #9F9F9F

    &__pic
        position relative
        left 0
        right 0
        margin 0 auto
        width 670px
        height 1059px
        background url('~assets/img/toreroMap/torero.png')
        background-repeat no-repeat
        background-position center

    &__point
        position absolute
        width 26px
        height 26px
        display flex
        justify-content center
        align-items center
        font-family $TenorSans-Regular
        font-size 14px
        letter-spacing 0.03em
        color whiteMain
        background rgba(0, 0, 0, 0.45)
        border-radius 50%

        &--digit-1
            top 741px
            left 516px

        &--digit-3
            top 243px
            left 252px

        &--digit-4
            top 636px
            left 448px

        &--digit-5
            top 920px
            left 372px

        &--digit-6
            top 598px
            left 152px

        &--digit-7
            top 832px
            left 243px

        &--digit-8
            top 126px
            left 295px

        &--digit-9
            top 256px
            left 126px

    
</style>