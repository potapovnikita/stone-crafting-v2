<template lang="pug">
    .common-container.virtual-museum_container
        h1.virtual-museum_container__title(v-html="lang === 'ru' ? 'Виртуальный музей' : 'Virtual museum'")
        p.virtual-museum_container__sub-title(v-html="lang === 'ru' ? 'камнерезного дома' : 'of the stone crafting house'")
        p.virtual-museum_container__lead-text(v-html="lang === 'ru' ? museum.name : museum.nameEng")

        .virtual-museum_container__wrapper
            .virtual-museum_container__wrapper-controls
                ul.virtual-museum_container__levels
                    li(v-for="(num, index) in floors" :key="`dot_${index}`")
                        .virtual-museum_container__wrapper-dot
                            p.virtual-museum_container__lead-text.virtual-museum_container__lead-text--label {{num}}
                            .virtual-museum_container__dot(:class="{ 'active': num === activeFloor }")
                            p.virtual-museum_container__floor-name {{lang === 'ru' ? 'этаж' : 'floor'}}
                        

                ul.virtual-museum_container__items-names
                    li(
                        v-for="(virtual, index) in virtuals"
                        :key="`name_${index}`"
                        @click="() => selectVirtual(virtual, index)"
                    )
                        p.virtual-museum_container__lead-text.virtual-museum_container__lead-text--link(v-html="lang === 'ru' ? virtual.name : virtual.nameEng")
            
            ul.virtual-museum_container__items
                li(
                    v-for="(virtual, index) in virtuals"
                    :key="`item_${index}`"
                    :style="{'display': activeNumber === index ? 'block' : 'none'}"
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
                activeNumber: 0,
                activeFloor: -1,
                floors: [-1,0,1],
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
                        console.log(width)
                        return width / 1.78 + 'px';
                    }
                    return'600px';
                }
                return'600px';
            },
            selectVirtual(virtual, idx) {
                this.activeNumber = idx
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

        &__lead-text
            font-size 26px
            line-height 150%

            &--link
                max-width 300px
                white-space nowrap
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

        &__levels,
        &__items-names,
        &__items
            list-style-type none
            padding 0

        &__levels
            display flex
            position relative
            justify-content space-between
            max-width 1174px
            padding-left 95px
            padding-right 109px
            background url('~assets/img/virtualMuseum/levels.png') 0 56%  no-repeat

        &__items-names
            display flex
            flex-direction column
            align-items center
            max-width 1195px
            max-height 126px
            flex-wrap wrap
            margin-top 12px
            margin-bottom 78px

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

        .link_others
            cursor pointer
            text-decoration underline
            margin-bottom 40px
            &:hover
                text-decoration none

        .hint
            margin-bottom 20px

        .videoVirtual
            margin-bottom 30px

            video
            iframe
                background black
                height 400px
                max-width 700px
                @media only screen and (max-width 500px)
                    height 250px

                @media only screen and (max-width 400px)
                    height 210px

        @media only screen and (max-width 1280px)
            padding-top 96px

            &__title
                margin-bottom 14px

            &__sub-title
                margin-bottom 24px
                font-size 18px

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
                padding 32px 20px 51px

            &__levels
                padding-left 78px
                padding-right 75px
                background url('~assets/img/virtualMuseum/levels.png') 0 53%  no-repeat

            &__items-names
                margin-bottom 47px

        @media only screen and (max-width 1000px)
            padding-top 96px

            &__title
                font-size 44px
                margin-bottom 7px

            &__sub-title
                margin-bottom 20px
                font-size 16px

            &__lead-text
                font-size 18px

                &--link
                    max-width 280px
                    font-size 18px

            &__wrapper
                min-height 500px
                padding 25px 15px 40px

            &__levels
                padding-left 60px
                padding-right 60px
                background url('~assets/img/virtualMuseum/levels.png') 0 51%  no-repeat

            &__items-names
                max-height 85px

        @media only screen and (max-width 850px)
            padding-top 90px

            &__title
                font-size 40px
                margin-bottom 5px

            &__sub-title
                margin-bottom 16px
                font-size 14px

            &__lead-text
                font-size 16px

                &--link
                    max-width 190px
                    font-size 16px

            &__wrapper
                min-height 480px
                padding 20px 10px 35px

            &__levels
                padding-left 55px
                padding-right 55px
                background url('~assets/img/virtualMuseum/levels.png') 0 48%  no-repeat

            &__items-names
                max-height 85px
                margin-bottom 40px

        @media only screen and (max-width 767px)
            padding-top 74px

            &__title
                font-size 28px
                margin-bottom 19px

            &__sub-title
                margin-bottom 20px
                font-size 13px

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
                margin-bottom 38px

            &__levels
                flex-direction column
                padding 0 10px
                background transparent

            &__items-names
                flex-direction row
                max-width 240px
                max-height unset
                margin 0
                padding-left 32px

                & > li:nth-child(3)
                    margin-bottom 30px

            &__dot
                margin-top 0
                margin-bottom 5px

</style>
