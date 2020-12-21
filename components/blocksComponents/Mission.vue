<template lang="pug">
    .mission
        h2.mission__title {{lang === 'ru' ? data.titleRu : data.titleEng}}
        .mission__double-line
        p.mission__text {{lang === 'ru' ? data.textRu : data.textEng}}
        h3.mission__sub-title(v-if="data.features") {{lang === 'ru' ? data.features.titleRu : data.features.titleEng}}
        ul.mission__list(v-if="data.features && data.features.items")
            li(
                v-for="(item, index) in data.features.items"
                :key="`item_${index}`"
            )
                .mission__opt
                    .mission__icon
                    p.mission__opt-text {{lang === 'ru' ? item.textRu : item.textEng}}

</template>
<script>
import { mapState } from 'vuex'
import Mission from '~/assets/staticData/mission.json'
export default {
    name: "Mission",
    data() {
        return {
            data: Mission,
        }
    },
    computed: {
        ...mapState('localization', [
            'lang',
        ]),
    },
}
</script>
<style lang="stylus">
.mission
    display block
    position relative
    padding 65px 50px
    margin 0 40px
    border 1px solid rgba(252, 224, 134, 0.3)

    &__title
        margin-bottom 18px

    &__double-line
        width 100px
        height 4px
        margin-bottom 30px
        border 1px solid goldNew
        border-left none
        border-right none

    &__text
        max-width 954px
        margin-bottom 86px
        font-size 30px
        line-height 45px

    &__sub-title
        margin-bottom 40px
        font-size 30px
        line-height 45px
        color goldNew

    &__list
        display flex
        justify-content space-around
        padding 0
        list-style-type none

    &__icon
        width 40px
        height 40px
        margin-bottom 25px
        background url('~assets/img/mission/icon.png') no-repeat
        background-size contain

    &__opt-text
        max-width 422px

    @media only screen and (max-width 1280px)
        padding 35px 10px 45px
        margin 0 20px 40px

        &__title
            margin-bottom 20px
            line-height 48px

        &__double-line
            margin-bottom 20px

        &__text
            max-width 779px
            margin-bottom 36px
            font-size 21px
            line-height 31px

        &__sub-title
            margin-bottom 30px
            font-size 22px
            line-height 33px

        &__opt-text
            max-width 284px

    @media only screen and (max-width 767px)
        padding 30px 0 60px 18px

        &__double-line
            width 50px

        &__text
            max-width unset
            margin-bottom 40px
            font-size 16px
            line-height 24px

        &__sub-title
            line-height 29px

        &__list
            display block

            > li + li
                margin-top 30px

        &__opt
            display flex
            align-items flex-start

        &__icon
            flex-shrink 0
            width 26px
            height 26px
            margin 0
            margin-right 17px

        &__opt-text
            max-width unset
            font-size 16px
            line-height 24px
            text-align left

</style>