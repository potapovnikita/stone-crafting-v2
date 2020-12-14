<template lang="pug">
    .torero-show-container(v-if="showData")
        .torero-show-container__info
            h2.torero-show-container__title {{lang === 'ru' ? showData.titleRu : showData.titleEng}}
            .torero-show-container__wrapper-text(v-for="item in showData.infoList")
                .torero-show-container__table
                    .torero-show-container__table-row
                        .torero-show-container__table-cell
                            .torero-show-container__icon
                                img(:src="getImg(item.iconPath)")
                        .torero-show-container__table-cell
                            p.torero-show-container__sub-title {{lang === 'ru' ? item.titleRu : item.titleEng}}
                    .torero-show-container__table-row
                        .torero-show-container__table-cell
                        .torero-show-container__table-cell
                            ul.torero-show-container__list(v-if="item.options")
                                li.torero-show-container__list-item(v-for="opt in item.options" :class="{ 'torero-show-container__list-item--gray': opt.isTextGrey }")
                                    p.torero-show-container__opt {{lang === 'ru' ? opt.textRu : opt.textEng}}

                .torero-show-container__btn
                    Button(v-if="item.btn" :name="lang === 'ru' ? item.btn.textRu : item.btn.textEng" large)
        
        .torero-show-container__pic(:style="{backgroundImage: getBgImg(showData.background)}")
</template>
<script>
import { mapState } from 'vuex'
import { getBgImgLocal, getImgLocal } from '~/plugins/getUrl'
import ToreroShow from '~/assets/staticData/toreroShow.json'
import Button from "@/components/ui/Button";
export default {
    name: 'ToreroShow',
    components: {
        Button,
    },
    data() {
        return {
            showData: ToreroShow,
        }
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

    &__wrapper-text
        text-align left

    &__info
        padding 66px
        background-color #111111
        & > div + div
            margin-top 60px

    &__title
        line-height 52px
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

</style>