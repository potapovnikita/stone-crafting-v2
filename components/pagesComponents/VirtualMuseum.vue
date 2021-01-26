<template lang="pug">
    .common-container.virtual-museum_container
        h1.virtual-museum_container__title(v-html="lang === 'ru' ? 'Виртуальный музей' : 'Virtual museum'")
        p.virtual-museum_container__sub-title(v-html="lang === 'ru' ? 'камнерезного дома' : 'of the stone crafting house'")
        p.virtual-museum_container__lead-text(v-html="lang === 'ru' ? museum.name : museum.nameEng")

        .virtual-museum_container__wrapper
            .virtual-museum_container__wrapper-controls
                .virtual-museum_container__controls-header
                    ul.virtual-museum_container__row
                        li.virtual-museum_container__cell(v-for="schemeItem in scheme" :key="schemeItem.id")
                            .virtual-museum_container__wrapper-dot.mobile-hide
                                p.virtual-museum_container__lead-text.virtual-museum_container__lead-text--label {{schemeItem.floor}}
                                .virtual-museum_container__dot(:class="{ 'active': schemeItem.floor === activeFloor }")
                                p.virtual-museum_container__floor-name {{lang === 'ru' ? 'этаж' : 'floor'}}

                .virtual-museum_container__controls-links
                    ul.virtual-museum_container__row
                        li.virtual-museum_container__cell(v-for="(schemeItem, index) in scheme" :key="schemeItem.id")
                            .virtual-museum_container__wrapper-dot.descktop-hide
                                p.virtual-museum_container__lead-text.virtual-museum_container__lead-text--label {{schemeItem.floor}}
                                .virtual-museum_container__dot(:class="{ 'active': schemeItem.floor === activeFloor }")
                                p.virtual-museum_container__floor-name {{lang === 'ru' ? 'этаж' : 'floor'}}
                                .virtual-museum_container__line(v-if="index !== scheme.length - 1")
                            
                            ul.virtual-museum_container__items
                                li(
                                    v-for="(place, index) in schemeItem.places"
                                    :key="`name_${index}`"
                                    @click="() => selectVirtual(place)"
                                )
                                    p.virtual-museum_container__lead-text.virtual-museum_container__lead-text--link(v-html="lang === 'ru' ? place.name : place.nameEng")
            
            ul.virtual-museum_container__items
                li(
                    v-for="(virtual, index) in virtuals"
                    :key="virtual.id"
                    :style="{'display': activeMapId === virtual.id ? 'block' : 'none'}"
                )
                    div
                        iframe.virtualFrame(
                            :src="virtual.src + '&callback=getHeight(0)'"
                            width="100%"
                            :height="getHeight(0)"
                            frameborder="0"
                            style="border:0;"
                            allowfullscreen=""
                            aria-hidden="false"
                            tabindex="0"
                        )

        Footer

</template>

<script>
    import { mapState } from 'vuex'
    import Virtual from '~/assets/staticData/virtual.json'
    import zenscroll from 'zenscroll'
    import Footer from '~/components/FooterNew.vue'

    export default {
        data() {
            return {
                height: '500px',
                museum: Virtual,
                virtuals: Virtual.virtuals,
                scheme: Virtual.scheme,
                activeMapId: Virtual.scheme[0].places[0].mapId,
                activeFloor: Virtual.scheme[0].floor,
            }
        },
        components: {
            Footer
        },
        methods: {
            getHeight(i) {
                if (process.browser) {
                    const virtual = document.querySelectorAll('.virtualFrame')
                    const width = Array.from(virtual)[i] && Array.from(virtual)[i].clientWidth
                    if (width) {
                        return width / 1.78 + 'px';
                    }
                    return'600px';
                }
                return'600px';
            },
            selectVirtual(virtual) {
                this.activeMapId = virtual.mapId
                this.activeFloor = virtual.floor
            }
        },
        computed: {
            ...mapState('localization', [
                'lang',
            ]),
        },
        mounted() {

        }
    }
</script>

<style lang="stylus">
    .virtual-museum_container
        padding-top 117px
        background url('~assets/img/virtualMuseum/bg.png') no-repeat
        background-size cover

        &__title
            margin-bottom 21px
            line-height 140%

        &__sub-title
            margin-bottom 27px
            font-size 19px
            line-height 140%
            letter-spacing 0.3em
            text-transform uppercase
            color goldNew

        &__wrapper-controls
            padding 0 122px 80px 115px

        &__controls-header
            margin-bottom 16px
            background url('~assets/img/virtualMuseum/levels.png') no-repeat
            background-position 50% 56px

        &__cell
            width 30%

        &__lead-text
            font-size 26px
            line-height 150%

            &--link
                line-height 160%

                &:hover
                    cursor pointer
                    color goldNew

        &__wrapper
            max-width 1680px
            width 100%
            min-height 902px
            margin 0 auto
            padding 73px 36px 43px

        &__items,
        &__row
            list-style-type none
            padding 0

        &__row
            display flex
            justify-content space-between

        &__wrapper-dot
            &.descktop-hide
                display none

        &__dot
            width 12px
            height 12px
            margin-top 12px
            margin-bottom 12px
            border 1px solid whiteMain
            border-radius 50%
            background blackBackground

            &.active
                background goldNew

        &__line
            height 51px
            background url('~assets/img/virtualMuseum/levels-mb.png') no-repeat
            background-position center

        @media only screen and (max-width 1280px)
            padding-top 96px

            &__title
                margin-bottom 14px

            &__sub-title
                margin-bottom 24px
                font-size 18px

            &__wrapper-controls
                padding 0
                padding-bottom 43px

            &__controls-header
                background-position 50% 52px

            &__cell
                width 24%

            &__lead-text
                font-size 22px

                &--link
                    max-width 280px
                    font-size 20px

            &__wrapper
                max-width unset
                width 100%
                min-height 549px
                margin 0
                padding 36px 20px 51px

            &__dot
                margin-top 14px
                margin-bottom 14px

        @media only screen and (max-width 1000px)
            padding-top 96px

            &__title
                font-size 44px
                margin-bottom 7px

            &__sub-title
                margin-bottom 20px
                font-size 16px

            &__controls-header
                background-position 50% 46px

            &__cell
                width 26%

            &__lead-text
                font-size 18px

                &--link
                    font-size 18px

            &__wrapper
                min-height 500px
                padding 25px 15px 40px

        @media only screen and (max-width 850px)
            padding-top 90px

            &__title
                font-size 40px
                margin-bottom 5px

            &__sub-title
                margin-bottom 16px
                font-size 14px

            &__controls-header
                background-position 50% 43px

            &__lead-text
                font-size 16px

                &--link
                    max-width 190px
                    font-size 16px

            &__wrapper
                min-height 480px
                padding 20px 10px 35px

        @media only screen and (max-width 767px)
            padding-top 74px

            &__title
                font-size 28px
                margin-bottom 19px

            &__sub-title
                margin-bottom 20px
                font-size 13px

            &__controls-header
                display none

            &__controls-links
                .virtual-museum_container__row
                    & > li:last-child
                        align-items flex-end

            &__row
                flex-direction column

            &__cell
                display flex
                width 100%

            &__lead-text
                max-width 308px
                margin 0 auto
                font-size 13px

                &--link
                    max-width unset
                    margin 0
                    font-size 22px

                &--label
                    max-width unset
                    margin 0
                    font-size 26px

            &__floor-name
                font-size 14px

            &__wrapper
                min-height 480px
                padding 33px 10px 25px

            &__wrapper-controls
                display flex
                justify-content center
                margin-bottom 38px

            &__wrapper-dot
                &.mobile-hide
                    display none

                &.descktop-hide
                    display block
                    margin-right 42px

            &__dot
                margin-top 0
                margin-bottom 5px

</style>
