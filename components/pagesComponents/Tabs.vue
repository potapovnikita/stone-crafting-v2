<template lang="pug">
    div
        ul(:class="['tabs',  classNames? classNames : '']")
            li(v-for="(tab, index) in tabs" :key="`tab_${index}`")
                a(:href="tab.href" @click="selectTab(tab)")
                    h3.tabs__label(:class="{ 'is-active': tab.isActive }") {{tab.name}}

        .tabs__details
            slot

</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'Tabs',
    props: {
        classNames: Array,
    },
    data() {
        return {
            tabs: [],
        }
    },
    methods: {
        selectTab(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = (tab.name == selectedTab.name);
            });
        }
    },
    computed: {
        ...mapState('localization', [
            'lang',
        ]),
    },
    mounted() {
        this.tabs = this.$children      
    }
}
</script>
<style lang="stylus">
.tabs
    display flex
    justify-content center
    padding 0
    margin-bottom 64px
    list-style-type none

    & > li + li
        margin-left 124px

    &__label
        font-size 30px
        line-height 150%
        color #9F9F9F

        &:hover
            color goldNew

        &.is-active
            color goldNew

    &__details
        display block
        margin-bottom 128px

    @media only screen and (max-width 1280px)
        margin-bottom 39px

        &__label
            font-size 22px

    @media only screen and (max-width 767px)
        margin-bottom 27px

        & > li + li
            margin-left 45px

        &__label
            font-size 20px

        &__details
            margin-bottom 70px

</style>