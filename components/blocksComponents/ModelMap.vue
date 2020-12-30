<template lang="pug">
    .model-container(:class="toreroMap.modelClassName")
        div(:class="`${toreroMap.modelClassName}__bg-pic`")
        ul.model-container__stones(v-if="toreroMap")
            li(v-for="stone in toreroMap.stonesLeft")
                .model-container__wrapper-stone
                    .model-container__stone-slot(:class="{'active': stone.id === activeStone}" @click="() => onStoneClick(stone.id)")
                        .model-container__stone-pic(:style="{backgroundImage: getBgImg(stone.background)}")
                    p.model-container__stone-title {{getStoneTitle(stone)}}

        div(:class="`${toreroMap.modelClassName}__pic`")
            .model-container__point(
                v-for="(stone, index) in stonesList"
                v-if="stone.stoneClassName"
                :key="stone.id"
                :class="[`${toreroMap.modelClassName}--${stone.stoneClassName}`, {'active': stone.id === activeStone}]") {{stone.label}}

        ul.model-container__stones(v-if="toreroMap")
            li(v-for="stone in toreroMap.stonesRight")
                .model-container__wrapper-stone
                    .model-container__stone-slot(:class="{'active': stone.id === activeStone}" @click="() => onStoneClick(stone.id)")
                        .model-container__stone-pic(:style="{backgroundImage: getBgImg(stone.background)}")
                    p.model-container__stone-title {{getStoneTitle(stone)}}
    
</template>
<script>
import { mapState } from 'vuex'
import { getBgImgLocal } from '~/plugins/getUrl'
export default {
    name: 'ModelMap',
    props: {
        toreroMap: Object,
    },
    data() {
        return {
           stonesList: [],
           activeStone: '',
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
        onStoneClick(value) {
            this.activeStone = value;
        },
    },
    computed: {
        ...mapState('localization', [
            'lang',
        ]),
    },
    mounted() {
        this.stonesList = [].concat(this.toreroMap.stonesLeft, this.toreroMap.stonesRight)
        console.log(this.stonesList)
    }
}
</script>
<style lang="stylus">
.model-container
    position relative
    display flex
    align-items center

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
        
        &.active
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

        &.active
            width 36px
            height 36px
            font-size 18px
            color red

    .torero
        padding 100px 30px

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

        &--stone1
            top 741px
            left 516px

        &--stone3
            top 243px
            left 252px

        &--stone4
            top 636px
            left 448px

        &--stone5
            top 920px
            left 372px

        &--stone6
            top 598px
            left 152px

        &--stone7
            top 832px
            left 243px

        &--stone8
            top 126px
            left 295px

        &--stone9
            top 256px
            left 126px

    

    
</style>