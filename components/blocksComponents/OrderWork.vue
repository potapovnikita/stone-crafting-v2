<template lang="pug">
    .orderWork
        .orderWork__container
            h2.orderWork__title {{ lang === 'ru' ? 'Этапы создания работ' : 'Title on eng' }}
            .orderWork__double-line
            .orderWork__steps(v-if="workSteps && workSteps.length")
                ul.orderWork__list
                    li(v-for="step in workSteps" :key="step.id")
                        .orderWork__cell
                            p.orderWork__label {{step.label}}
                .orderWork__wrapper-bar
                    ul.orderWork__list
                        li(v-for="step in workSteps" :key="step.id")
                            .orderWork__cell
                                .orderWork__dot

            ul.orderWork__steps-content(v-if="workSteps && workSteps.length")
                li(v-for="step in workSteps" :key="step.id")
                    .orderWork__step-container
                        .orderWork__media
                            img.orderWork__photo(:src="getImg(step.img)" alt="pic")
                        .orderWork__content
                            p.orderWork__content-title(v-html="lang === 'ru' ? step.title : step.titleEng")
                            p.orderWork__content-text(v-html="lang === 'ru' ? step.text : step.textEng")

</template>
<script>
import { mapState } from 'vuex'
import { getImgLocal } from '~/plugins/getUrl'
export default {
    name: 'OrderWork',
    props: {
        workSteps: Array,
    },
     methods: {
        getImg(url) {
            return getImgLocal(url)
        },
    },
    computed: {
        ...mapState('localization', [
            'lang',
        ]),
    },
}
</script>
<style lang="stylus" scoped>
.orderWork
    display block

    &__container
        max-width 1358px
        margin 0 auto

    &__title
        margin-bottom 18px
        line-height 150%

    &__double-line
        width 100px
        height 4px
        margin-bottom 46px
        border 1px solid goldNew
        border-left none
        border-right none

    &__steps
        display block
        padding-bottom 52px

    &__list
        display flex
        justify-content space-around
        padding 0
        list-style-type none

    &__cell
        width 35px

    &__label
        font-size 26px
        line-height 150%
        text-align center

    &__wrapper-bar
        display block
        background url('~assets/img/order/steps-line.png') center no-repeat

    &__dot
        width 12px
        height 12px
        margin 0 auto
        border 1px solid whiteMain
        border-radius 50%
        background blackBackground
        cursor pointer

        &.active
            background goldNew

    &__steps-content
        padding 0
        list-style-type none

    &__step-container
        display flex
        justify-content space-between
        align-items center

    &__media
        flex-basis 593px
        padding 10px
        border 1px solid rgba(150, 120, 95, 0.3)

    &__photo
        width 100%

    &__content
        flex-basis 697px
        flex-shrink 2
        padding-left 20px
        text-align left

    &__content-title
        max-width 587px
        margin-bottom 23px
        font-size 26px
        line-height 150%
        text-align left

    &__content-text
        max-width 587px
        text-align left

</style>
