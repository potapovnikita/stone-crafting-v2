<template lang="pug">
    .awards
        h3.awards__title {{ lang === 'ru' ? 'Награды и звания' : 'Awards' }}
        .awards__list
            img.awards__award-img(
                v-for="(item, index) in data"
                :key="`$award_${index}`"
                :class="[`${item.className}`, { 'is-active': item.isActive }]"
                :src="getImgExternal(item.img)" alt="award"
                @click="onFocus(item)"
            )
        .awards__details
            p.awards__description(
                v-for="(item, index) in data"
                :key="`$award_desc_${index}`"
                :class="{ 'is-active': item.isActive }"
            ) {{lang === 'ru' ? item.name : item.nameEng}}
    
</template>
<script>
import { mapState } from 'vuex'
import Awards from '~/assets/staticData/awards.json'
import { getImgExternal } from '~/plugins/getUrl'
export default {
    name: 'Avards',
    data() {
        return {
            data: Awards,
        }
    },
    methods: {
        getImgExternal(url) {
            return getImgExternal(url)
        },
        onFocus(focused) {
            const temp = [ ...this.data]
            temp.forEach(award => {
                award.isActive = (award.img === focused.img);
            });
            this.data = temp
        }
    },
    computed: {
        ...mapState('localization', [
            'lang',
        ]),
    },
    mounted() {
        const temp = [ ...this.data]
        temp[0].isActive = true
        this.data = temp
    }
}
</script>
<style lang="stylus" scoped>
.awards
    &__title
        margin-bottom 27px
        text-align left

    &__list
        display flex
        justify-content space-between
        align-items center
        flex-wrap wrap
        margin-bottom 40px
    
    &__award-img
        flex-shrink 0
        opacity .7
        cursor pointer

        &:hover
            opacity 1

        &.is-active
            opacity 1

        &.award_1
            width 64px

        &.award_2
            width 62px

        &.award_3
            width 54px

        &.award_4
            width 43px

        &.award_5
            width 56px

        &.award_6
            width 48px

        &.award_7
            width 56px

    &__details
        position relative
        min-height 96px
        margin-bottom 40px
        text-align left

    &__description
        display none
        max-width 482px
        font-size 16px
        line-height 24px
        text-align left 
        color #9F9F9F

        &.is-active
            display block

    @media only screen and (max-width 1280px)
        &__details
            margin-bottom 20px

    @media only screen and (max-width 767px)
        &__title
            font-size 22px
            line-height 33px

         &__list
            justify-content flex-start
            margin-left -34px
            margin-bottom 0

            img
                margin-left 34px
                margin-bottom 31px
                 
</style>