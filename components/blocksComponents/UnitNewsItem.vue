<template lang="pug">
    .unitNewsItem(:class="[{'unitNewsItem--full-text': !isShortText}, {'unitNewsItem--wide': isShortText && wideBlock}]")
        .unitNewsItem__media(:class="{'unitNewsItem__media--wide': isShortText && wideBlock }")
            img.unitNewsItem__photo(v-if="img" :src="getImgExternal(img)" alt="pic")
            video.unitNewsItem__photo(v-if="video" playsinline loop="true" autoplay="true" muted="muted")
                source(:src="getImgExternal(video)" type="video/mp4")
            iframe(
                v-if="videoLink"
                height="100%"
                width="100%"
                :src="videoLink"
                frameborder="0"
                allow="accelerometer;autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                :hl="lang === 'ru' ? 'ru' : 'en'"
            )
        .unitNewsItem__info(:class="{'unitNewsItem__info--wide': isShortText && wideBlock }")
            h2.unitNewsItem__title(v-if="title" v-html="lang === 'ru' ? title : titleEng")
            .unitNewsItem__line(v-if="!wideBlock")
            p.unitNewsItem__text(v-if="isShortText" v-html="lang === 'ru' ? text : textEng")
            p.unitNewsItem__text(v-if="!isShortText && more" v-html="lang === 'ru' ? fullText : fullTextEng")
            span.unitNewsItem__btn(
                v-if="more && isShortText"
                @click="showMore"
                v-html="lang === 'ru' ? 'Читать всю новость' : 'more'")

</template>
<script>
import { mapState } from 'vuex'
import { getImgLocal, getImgExternal } from '~/plugins/getUrl'


export default {
    name: 'UnitNewsItem',
    props: {
        img: String,
        video: String,
        videoLink: String,
        title: String,
        titleEng: String,
        text: String,
        textEng: String,
        more: Boolean,
        fullText: String,
        fullTextEng: String,
        wideBlock: Boolean,
    },
    data() {
        return {
            isShortText: true,
        }
    },
    methods: {
        getImgLocal(url) {
            return getImgLocal(url)
        },
        getImgExternal(url) {
            return getImgExternal(url)
        },
        showMore() {
            this.isShortText = false
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
.unitNewsItem
    display flex
    align-items center
    justify-content space-between
    max-width 1151px

    &--full-text
        align-items flex-start

    &--wide
        display block
        max-width 1027px

    &__media
        flex-basis 559px
        padding 3px
        border 1px solid rgba(150, 120, 95, 0.3)

        &--wide
            max-width 1027px
            margin-bottom 46px

        iframe
            max-height 330px
            min-height 300px

    &__photo
        width 100%
        height auto

    &__info
        flex-shrink 2
        max-width 532px
        padding-left 25px
        text-align left

        &--wide
            max-width 1027px
            padding 0
            text-align center

            .unitNewsItem__title
                margin-bottom 15px
                text-align center

            .unitNewsItem__text
                margin-bottom 0
                text-align center

    &__title
        margin-bottom 25px
        line-height 150%
        text-align left

    &__line
        width 38px
        height 1px
        margin-bottom 48px
        border 1px solid goldNew
        display none

    &__text
        margin-bottom 25px
        text-align left

    &__btn
        font-family $TenorSans-Regular
        font-weight normal
        font-size 18px
        line-height 150%
        letter-spacing 0.03em
        text-transform uppercase
        color goldNew
        cursor pointer

    @media only screen and (max-width 1280px)
        justify-content space-around
        max-width unset

        &__media
            flex-basis 480px

            &--wide
                max-width 900px
                margin-bottom 46px

        &__info
            max-width 468px

            &--wide
                max-width 900px

        &__title
            margin-bottom 32px
            font-size 26px

        &__text
            margin-bottom 20px
            font-size 16px

    @media only screen and (max-width 1000px)
        &__media
            flex-basis 352px

            &--wide
                max-width unset
                margin-bottom 46px

        &__info
            max-width 352px

            &--wide
                max-width unset

        &__title
            margin-bottom 25px
            font-size 24px

        &__line
            margin-bottom 30px

        &__text
            margin-bottom 20px
            font-size 16px

    @media only screen and (max-width 767px)
        display block

        &__media
            flex-basis unset
            max-width 352px
            margin-bottom 30px

        &__info
            max-width 352px
            padding 0

            &--wide
                max-width unset
                text-align left

                .unitNewsItem__title
                    text-align left

                .unitNewsItem__text
                    text-align left

        &__title
            font-size 22px

        &__text
            margin-bottom 18px
            font-size 14px

        &__line
            display block

</style>
