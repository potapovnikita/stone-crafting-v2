<template lang="pug">
    .common-container.virtual-museum_container
        h1.virtual-museum_container__title(v-html="lang === 'ru' ? 'Виртуальный музей' : 'Virtual museum'")
        p.virtual-museum_container__sub-title(v-html="lang === 'ru' ? 'камнерезного дома' : 'of the stone crafting house'")
        p.virtual-museum_container__lead-text(v-html="lang === 'ru' ? museum.name : museum.nameEng")

        .virtual-museum_container__wrapper
            ul.virtual-museum_container__levels
                li(v-for="(num, index) in floors" :key="`dot_${index}`")
                    .virtual-museum_container__wrapper-dot
                        p.virtual-museum_container__lead-text {{num}}
                        .virtual-museum_container__dot(:class="{ 'active': num === activeFloor }")
                        p {{lang === 'ru' ? 'этаж' : 'floor'}}
                    

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

        &__sub-title
            margin-bottom 27px
            font-size 19px
            line-height 27px
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
</style>
