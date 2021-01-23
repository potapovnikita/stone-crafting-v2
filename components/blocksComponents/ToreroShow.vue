<template lang="pug">
    .torero-show-container(v-if="showData")
        .torero-show-container__pic.desktop-hide(:style="{backgroundImage: getBgImg(showData.background)}")
        .torero-show-container__info-mb
            img(:class="showData.iconPathMobileClass" :src="getImg(showData.iconPathMobile)")
            h2.torero-show-container__title {{lang === 'ru' ? showData.titleRu : showData.titleEng}}
            ul.torero-show-container__list.torero-show-container__list--mb
                li(v-for="(item, index) in showData.infoList" :key="`info_${index}`")
                    .torero-show-container__icon
                        img(:class="item.iconClass" :src="getImg(item.iconPath)")

                    p.torero-show-container__sub-title {{lang === 'ru' ? item.titleRu : item.titleEng}}
                    ul.torero-show-container__list.torero-show-container__list--sub-list(v-if="item.options")
                        li.torero-show-container__list-item(v-for="opt in item.options" :class="{ 'torero-show-container__list-item--gray': opt.isTextGrey }")
                            p.torero-show-container__opt {{lang === 'ru' ? opt.textRu : opt.textEng}}

                    .torero-show-container__btn-mb
                        Button(v-if="item.btn") {{lang === 'ru' ? item.btn.textRu : item.btn.textEng}}

        .torero-show-container__info
            h2.torero-show-container__title {{lang === 'ru' ? showData.titleRu : showData.titleEng}}
            .torero-show-container__wrapper-text(v-for="item in showData.infoList")
                .torero-show-container__table
                    .torero-show-container__table-row
                        .torero-show-container__table-cell.mobile-hide
                            .torero-show-container__icon
                                img(:class="item.iconClass" :src="getImg(item.iconPath)")
                        .torero-show-container__table-cell
                            p.torero-show-container__sub-title {{lang === 'ru' ? item.titleRu : item.titleEng}}
                    .torero-show-container__table-row
                        .torero-show-container__table-cell.mobile-hide
                        .torero-show-container__table-cell
                            ul.torero-show-container__list.torero-show-container__list--sub-list(v-if="item.options")
                                li.torero-show-container__list-item(v-for="opt in item.options" :class="{ 'torero-show-container__list-item--gray': opt.isTextGrey }")
                                    p.torero-show-container__opt {{lang === 'ru' ? opt.textRu : opt.textEng}}

                .torero-show-container__btn-descktop
                    Button(v-if="item.btn" large) {{lang === 'ru' ? item.btn.textRu : item.btn.textEng}}

                .torero-show-container__btn-mb
                    Button(v-if="item.btn") {{lang === 'ru' ? item.btn.textRu : item.btn.textEng}}
        
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
        list-style-type none

        &--sub-list
            max-width 445px

            & > li:before
                content "\2022"
                padding 0 9px 0 0
                display table-cell
                width .5rem

        &--mb
            & > li + li
                margin-top 60px

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

    &__btn-descktop
        margin-top 34px
        text-align left

    &__btn-mb
        display none

    &__info-mb
        display none

    @media only screen and (max-width 1280px)
        &__pic
            width 472px
            height 944px
            background-position 60% 0%

        &__info
            padding 42px
            & > div + div
                margin-top 60px

    @media only screen and (max-width 1150px)
        &__title
            font-size 26px
            margin-bottom 20px
            text-align left
        
        &__icon
            width 60px

            .icon-place
                width 35px
                height auto

            .icon-exhibit
                width 41px
                height auto

        &__sub-title
            max-width 344px

        &__list
            &--sub-list
                max-width 344px

        &__btn-descktop
            display none

        &__btn-mb
            display block
            margin-top 20px

            button
                min-width 355px !important

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

        &__info
            display none

        &__info-mb
            display block
            padding 40px 12px 87px

            .icon-mb
                margin-bottom 15px

        &__title
            margin-bottom 30px
            font-size 22px
            text-align center

        &__sub-title
            margin-bottom 16px

        &__icon
            width 100%
            text-align center

            .icon-place
                display none

            .icon-exhibit
                width  auto
                margin-bottom 30px

    @media only screen and (max-width: 767px)

        &__btn-mb
            margin-top 25px

            button
                min-width 315px !important
                padding 17px 0 22px !important

    @media only screen and (max-width 490px)
        &__pic
            width 350px
            height 550px

    @media only screen and (max-width 370px)

        &__pic
            width 300px
            height 480px

</style>