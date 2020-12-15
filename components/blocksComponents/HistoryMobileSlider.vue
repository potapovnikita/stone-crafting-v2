<template lang="pug">
    ul.historyMobileSlider(v-if="slidesList" :style="{'transform': `translate(${offset}px, 0)`}")
        li(v-for="(item, index) in slidesList" :key="`$slide_${index}`")
            .historyMobileSlider__box
                .historyMobileSlider__label(v-if="item.pagination.showLabel") {{item.year}}
                .historyMobileSlider__wrapper-dot(:class="item.pagination.class")
                    .historyMobileSlider__dot(:class="{'active': index === currentDot}" @click="() => navigateTo(index)")
    
</template>
<script>
export default {
    name: 'HistoryMobileSlider',
    props: {
        dotsCount: Number,
        currentDot: Number,
        slidesList: Array,
    },
    data() {
        return {
            offset: 0,
        }
    },
    methods: {
        navigateTo(index) {
            this.$emit("mobilepaginationclick", index);
        },
    },
    watch: {
        currentDot(newVal) {
            //#TODO нужно алгоритм нормально написать
            console.log(`watch current dot is ${newVal}`)
            // Это число = ширина блока с точкой и линией задана в стилях
            const dotWidth = 92
            // Если 0 или 3(3 если всего 4 точки) то скорее всего нужно пагинатор подвинуть
            const dif = newVal % this.dotsCount
            console.log('dif', dif)
            // Листаем слайдер
            if (dif === this.dotsCount - 1) {
                // Если листаем влево и точка слева "за видимой областью"
                if (Math.abs(this.offset) !== 0 && newVal * dotWidth < Math.abs(this.offset)) {
                    this.offset = this.offset - 4 * dotWidth * -1
                }
            }
            if (dif === 0) {
                // Если листаем вправо и точка справа "за видимой областью"
                if (newVal * dotWidth > this.offset * -1)
                    this.offset = newVal * dotWidth * -1
                // Если листаем влево и точка справа "первая для видимой области"
                else if (newVal * dotWidth === Math.abs(this.offset)) return
                // Если листаем влево и точка слева "за видимой областью"
                else 
                    this.offset = this.offset - 4 * dotWidth * -1
            }
        },
    },
}
</script>
<style lang="stylus" scoped>
.historyMobileSlider
    display flex
    justify-content flex-start
    padding 0
    list-style-type none
    transition transform 2s ease

    & > li:first-child
        .historyMobileSlider__label
            left 7px

    &__box
        display flex
        align-items flex-end
        position relative
        height 72px

    &__label
        position absolute
        top 0
        left -17px
        font-family $TenorSans-Regular
        font-weight normal
        font-size 20px
        line-height 150%
        text-align center
        letter-spacing 0.03em
        color rgba(255, 255, 255, 0.36)

    &__wrapper-dot
        text-align left

        &.dot-1968
            width 112px //105+7 = 112
            padding-left 20px
            background url('~assets/img/history/iphoneLines/line-start.png') center no-repeat

        &.dot-1988
            width 92px //12+80 = 92
            background url('~assets/img/history/iphoneLines/line-middle.png') 21px center no-repeat

        &.dot-1991
            width 92px //12+80 = 92
            background url('~assets/img/history/iphoneLines/line-middle.png') 21px center no-repeat
        
        &.dot-1992
            width 92px //12+80 = 92
            background url('~assets/img/history/iphoneLines/line-middle.png') 21px center no-repeat

        &.dot-1996
            width 92px //12+80 = 92
            background url('~assets/img/history/iphoneLines/line-middle.png') 21px center no-repeat

        &.dot-2000
            width 92px //12+80 = 92
            background url('~assets/img/history/iphoneLines/line-middle.png') 21px center no-repeat

        &.dot-2006
            width 92px //12+80 = 92
            background url('~assets/img/history/iphoneLines/line-middle.png') 21px center no-repeat

        &.dot-2007
            width 92px //12+80 = 92
            background url('~assets/img/history/iphoneLines/line-middle.png') 21px center no-repeat

        &.dot-2007_2
            width 92px //12+80 = 92
            background url('~assets/img/history/iphoneLines/line-middle.png') 21px center no-repeat

        &.dot-2010
            width 92px //12+80 = 92
            background url('~assets/img/history/iphoneLines/line-middle.png') 21px center no-repeat

        &.dot-2016
            width 92px //12+80 = 92
            background url('~assets/img/history/iphoneLines/line-middle.png') 21px center no-repeat

        &.dot-2017
            width 92px //12+80 = 92
            background url('~assets/img/history/iphoneLines/line-middle.png') 21px center no-repeat

        &.dot-2017_2
            width 92px //12+80 = 92
            background url('~assets/img/history/iphoneLines/line-middle.png') 21px center no-repeat

        &.dot-2018
            width 92px //12+80 = 92
            background url('~assets/img/history/iphoneLines/line-middle.png') 21px center no-repeat

        &.dot-2018_2
            width 92px //12+80 = 92
            background url('~assets/img/history/iphoneLines/line-middle.png') 21px center no-repeat

        &.dot-2019
            width 92px //12+80 = 92
            background url('~assets/img/history/iphoneLines/line-middle.png') 21px center no-repeat
        
        &.dot-2020
            width 92px //12+80 = 92
            background url('~assets/img/history/iphoneLines/line-middle.png') 21px center no-repeat

    &__dot
        width 12px
        height 12px
        border 1px solid #616D76
        border-radius 50%
        cursor pointer

        &.active
            background goldNew

</style>