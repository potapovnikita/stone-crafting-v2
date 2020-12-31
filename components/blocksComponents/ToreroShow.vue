<template lang="pug">
    .torero-show-container(v-if="showData")
        .torero-show-container__pic.desktop-hide(:style="{backgroundImage: getBgImg(showData.background)}")
        .torero-show-container__info
            h2.torero-show-container__title {{lang === 'ru' ? showData.titleRu : showData.titleEng}}
            .torero-show-container__wrapper-text(v-for="item in showData.infoList")
                .torero-show-container__table
                    .torero-show-container__table-row
                        .torero-show-container__table-cell.mobile-hide
                            .torero-show-container__icon
                                img(:src="getImg(item.iconPath)")
                        .torero-show-container__table-cell
                            p.torero-show-container__sub-title {{lang === 'ru' ? item.titleRu : item.titleEng}}
                    .torero-show-container__table-row
                        .torero-show-container__table-cell.mobile-hide
                        .torero-show-container__table-cell
                            ul.torero-show-container__list(v-if="item.options")
                                li.torero-show-container__list-item(v-for="opt in item.options" :class="{ 'torero-show-container__list-item--gray': opt.isTextGrey }")
                                    p.torero-show-container__opt {{lang === 'ru' ? opt.textRu : opt.textEng}}

                .torero-show-container__btn
                    Button(v-if="item.btn" large) {{lang === 'ru' ? item.btn.textRu : item.btn.textEng}}
        
        .torero-show-container__pic.mobile-hide(:style="{backgroundImage: getBgImg(showData.background)}")
</template>
<script>
import { mapState } from 'vuex'
import { getBgImgLocal, getImgLocal } from '~/plugins/getUrl'
import Button from "@/components/ui/Button";
export default {
    name: 'ToreroShow',
    props: {
        showData: Object,
    },
    components: {
        Button,
    },
    methods: {
        getBgImg(url) {
            return getBgImgLocal(url)
        },
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
<style lang="stylus">
.torero-show-container
    display flex
    justify-content center

    &__pic
        width 838px
        height 870px
        background-repeat no-repeat
        background-position center

        &.desktop-hide
            display none

    &__wrapper-text
        text-align left

    &__info
        padding 66px
        & > div + div
            margin-top 60px

    &__title
        line-height 130%
        letter-spacing 0.03em
        margin-bottom 48px

    &__table
        display table

    &__table-row
        display table-row

    &__table-cell
        display table-cell
        vertical-align middle

    &__icon
        width 88px
        text-align left

    &__sub-title
        max-width 464px
        text-align left

    &__list
        padding 0
        max-width 445px
        list-style-type none

        & > li:before
            content "\2022"
            padding 0 9px 0 0
            display table-cell
            width .5rem

    &__list-item
        display table
        width 100%
        margin-bottom 8px

        &--gray
            color #9F9F9F

            p
                color inherit

    &__opt
        font-size 16px
        line-height 24px
        text-align left

    &__btn
        margin-top 34px
        text-align left

    @media only screen and (max-width 1280px)
        &__pic
            width 472px
            height 944px
            background-position 60% 0%

        &__info
            padding 42px
            & > div + div
                margin-top 60px

    @media only screen and (max-width 1000px)
        display block

        &__pic
            width 436px
            height 653px
            background-position center
            background-size cover

            &.mobile-hide
                display none
            &.desktop-hide
                display block

        &__title
            margin-bottom 30px
            font-size 22px

        &__table-cell
            display table-cell
            vertical-align middle

            &.mobile-hide
                display none

    @media only screen and (max-width 490px)
        &__pic
            width 350px
            height 550px

    @media only screen and (max-width 370px)

        &__pic
            width 300px
            height 480px

</style>