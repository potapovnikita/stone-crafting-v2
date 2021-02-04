<template lang="pug">
    .model-container
        div(:class="['model-container__wrapper-content', `${modelMap.modelClassName}`]")
            div(v-if="modelMap.hasBackground" :class="`${modelMap.modelClassName}__bg-pic`")
            ul.model-container__stones.mobile-hide(v-if="modelMap")
                li(v-for="stone in stonesListLeft")
                    .model-container__wrapper-stone
                        .model-container__stone-slot(:class="{'active': stone.id === activeStone}" @click="() => onStoneClick(stone.id)")
                            .model-container__stone-pic(:style="{backgroundImage: getBgImg(stone.background)}")
                        p.model-container__stone-title {{getStoneTitle(stone)}}

            div(:class="['model-container__wrapper-img',`${modelMap.modelClassName}__pic`]")
                img.model-container__photo(:src="getImg(modelMap.img)")
                .model-container__point(
                    v-for="(stone, index) in stonesList"
                    v-if="stone.stoneClassName"
                    :key="stone.id"
                    :class="[`${modelMap.modelClassName}--${stone.stoneClassName}`, {'active': stone.id === activeStone}]") {{stone.label}}

            ul.model-container__stones.mobile-hide(v-if="modelMap")
                li(v-for="stone in stonesListRight")
                    .model-container__wrapper-stone
                        .model-container__stone-slot(:class="{'active': stone.id === activeStone}" @click="() => onStoneClick(stone.id)")
                            .model-container__stone-pic(:style="{backgroundImage: getBgImg(stone.background)}")
                        p.model-container__stone-title {{getStoneTitle(stone)}}

            .model-container__stones-mobile-container
                ul.model-container__stones(v-if="modelMap")
                    li(v-for="stone in stonesListLeft")
                        .model-container__wrapper-stone
                            .model-container__stone-slot(:class="{'active': stone.id === activeStone}" @click="() => onStoneClick(stone.id)")
                                .model-container__stone-pic(:style="{backgroundImage: getBgImg(stone.background)}")
                            p.model-container__stone-title {{getStoneTitle(stone)}}

                ul.model-container__stones(v-if="modelMap")
                    li(v-for="stone in stonesListRight")
                        .model-container__wrapper-stone
                            .model-container__stone-slot(:class="{'active': stone.id === activeStone}" @click="() => onStoneClick(stone.id)")
                                .model-container__stone-pic(:style="{backgroundImage: getBgImg(stone.background)}")
                            p.model-container__stone-title {{getStoneTitle(stone)}}
    
</template>
<script>
import { mapState } from 'vuex'
import { getBgImgLocal, getImgLocal } from '~/plugins/getUrl'
import Stones from '~/assets/staticData/models/stones.json'
export default {
    name: 'ModelMap',
    props: {
        modelMap: Object,
    },
    data() {
        return {
           stonesList: [],
           stonesListLeft: [],
           stonesListRight: [],
           activeStone: '',
           stones: Stones,
        }
    },
    methods: {
        getImg(url) {
            return getImgLocal(url)
        },
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
        mappedStones(list) {
            const mapped = []
            list.forEach((item, index) => {
            const stoneIndex = this.stones.findIndex(stone => stone.id === item.id)
                if (stoneIndex >= 0) {
                    const mappedStone = {
                        id: this.stones[stoneIndex].id,
                        label: item.label,
                        titleRu: `${item.label} ${this.stones[stoneIndex].name}`,
                        titleEng: `${item.label} ${this.stones[stoneIndex].nameEng}`,
                        background: this.stones[stoneIndex].photo,
                    }
                    if (item.stoneClassName) mappedStone.stoneClassName = item.stoneClassName
                    mapped.push(mappedStone)
                }
            })
            return mapped;
        }
    },
    computed: {
        ...mapState('localization', [
            'lang',
        ]),
    },
    mounted() {
        this.stonesListLeft = this.mappedStones(this.modelMap.stonesLeft)
        this.stonesListRight = this.mappedStones(this.modelMap.stonesRight)
        this.stonesList = [].concat(this.stonesListLeft, this.stonesListRight)
    }
}
</script>
<style lang="stylus">
.model-container

    &__wrapper-content
        display flex
        justify-content space-between
        position relative
        max-width 1320px

    &__wrapper-img
        max-width 700px
        max-height 1100px

    &__photo
        width 100%
        height auto

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
        line-height 150%
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

    &__stones-mobile-container
        display none

    @media only screen and (max-width 1440px)
        &__wrapper-content
            max-width 1120px

        &__wrapper-img
            max-width 550px
            max-height 800px

        &__photo
            width auto
            height 100%
    
    @media only screen and (max-width 1280px)
        &__wrapper-content
            max-width 970px

        &__wrapper-img
            max-width 420px
            max-height 670px

        &__photo
            width 100%
            height auto

        &__point
            width 22px
            height 22px

    @media only screen and (max-width 1000px)

        &__wrapper-content
            max-width unset
            padding 0 10px

        &__wrapper-img
            max-width 400px
            max-height 660px

        &__stone-slot
            width 34px
            height 34px
            padding 4px
            margin-right 9px

        &__stone-title
            font-size 12px

        &__point
            font-size 12px

    @media only screen and (max-width 767px)
        &__wrapper-content
            display block
            padding 0

        &__stones
            & li + li
                padding-top 2px

            &.mobile-hide
                display none

        &__stones-mobile-container
            display flex
            justify-content center
            padding 37px 10px 10px

            & > ul + ul
                margin-left 10px

    @media only screen and (max-width 400px)
         &__wrapper-img
            max-width unset
            max-height unset
            width 360px

.torero

    .model-container__stones
        display block
        margin-top 170px
        padding-left 20px

    &__bg-pic
        position absolute
        width 100%
        height 100%
        background linear-gradient(142.6deg, rgba(17, 17, 17, 0) 21.67%, #111111 90.98%), url('~assets/img/collections/torero/card/bg-main.png')
        background-repeat no-repeat
        background-position left bottom

    &__pic
        position relative
        width 670px
        height 1059px

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

        .model-container__stones
            margin-top 120px
            padding-left 10px

        &__bg-pic
            background-size 70%

        &__pic
            width 506px
            height 800px

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

    @media only screen and (max-width 1000px)
        max-width unset
        padding 0 10px

        .model-container__stones
            margin-top 50px

        &__bg-pic
            width 1000px
            height 634px
            background-position 20% 108%

        &__pic
            width 401px
            height 634px
            margin-left 0

        &--stone1
            top 440px
            left 303px

        &--stone3
            top 142px
            left 147px

        &--stone4
            top 380px
            left 265px

        &--stone5
            top 547px
            left 219px

        &--stone6
            top 363px
            left 97px

        &--stone7
            top 494px
            left 141px

        &--stone8
            top 71px
            left 171px

        &--stone9
            top 148px
            left 79px

    @media only screen and (max-width 920px)
        &__bg-pic
            background-position 0 108%

    @media only screen and (max-width 767px)

        .model-container__stones
            margin-top 0

            &.mobile-hide
                display none

        &__bg-pic
            background-position -50px 108%

    @media only screen and (max-width 700px)

        &__bg-pic
            background-position -90px 108%

    @media only screen and (max-width 630px)
        &__bg-pic
            background-position -120px 108%

    @media only screen and (max-width 560px)
        &__bg-pic
            background-position -170px 108%

    @media only screen and (max-width 490px)
        &__bg-pic
            background-position -220px 108%

.joker,
.schemamonk,
.suvorov,
.kikimora,
.pussBoots,
.lebed
    @media only screen and (max-width 1280px)
        &__pic
            img
                width auto
                height 100%

    @media only screen and (max-width 767px)
        &__pic
            img
                height 660px

</style>