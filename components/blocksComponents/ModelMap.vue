<template lang="pug">
    .model-container
        div(:class="toreroMap.modelClassName")
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
    }
}
</script>
<style lang="stylus">
.model-container

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
            background-color goldNew
            color #000

    @media only screen and (max-width 1280px)
        &__point
            width 22px
            height 22px

.torero
    display flex
    justify-content space-between
    position relative
    max-width 1320px

    .model-container__stones
        margin-top 170px
        padding-left 20px

    &__bg-pic
        position absolute
        width 100%
        height 100%
        background linear-gradient(142.6deg, rgba(17, 17, 17, 0) 21.67%, #111111 90.98%), url('~assets/img/toreroMap/bg-main.png')
        background-repeat no-repeat
        background-position left bottom

    &__pic
        position relative
        left 0
        right 0
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

    @media only screen and (max-width 1440px)
        max-width 1120px

        .model-container__stones
            margin-top 120px
            padding-left 10px

        &__bg-pic
            background-size 70%

        &__pic
            width 506px
            height 800px
            background-size cover

        &--stone1
            top 552px
            left 385px

        &--stone3
            top 182px
            left 193px

        &--stone4
            top 473px
            left 338px

        &--stone5
            top 695px
            left 274px

        &--stone6
            top 440px
            left 115px

        &--stone7
            top 621px
            left 183px

        &--stone8
            top 90px
            left 216px

        &--stone9
            top 189px
            left 99px

    @media only screen and (max-width 1280px)
        max-width 974px

        .model-container__stones
            margin-top 30px
            padding-left 0

        &__bg-pic
            background-position 40% 108%

        &__pic
            width 422px
            height 669px
            margin-left 60px

        &--stone1
            top 466px
            left 318px

        &--stone3
            top 149px
            left 157px

        &--stone4
            top 400px
            left 270px

        &--stone5
            top 576px
            left 231px

        &--stone6
            top 378px
            left 101px

        &--stone7
            top 519px
            left 150px

        &--stone8
            top 75px
            left 181px

        &--stone9
            top 157px
            left 82px

</style>