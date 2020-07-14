<template lang="pug">
    .common-container.policy-container
        h1(v-html="lang === 'ru' ? 'Правовая политика' : 'Legal policy'")
        .tabs
            .tab(:class="{'active': activeTab === 1}" v-html="lang === 'ru' ? 'Политика 1' : 'Policy 1'" @click="activeTab = 1")
            .tab(:class="{'active': activeTab === 2}" v-html="lang === 'ru' ? 'Политика 2' : 'Policy 2'" @click="activeTab = 2")
        .policy-content(v-if="activeTab === 1") Политика 1
        .policy-content(v-if="activeTab === 2") Политика 2






</template>

<script>
import { mapState } from 'vuex'

import Company from '~/assets/staticData/company.json'

export default {
    data() {
        return {
            activeTab: 1,
        }
    },
    components: {
    },
    computed: {
        ...mapState('localization', [
            'lang',
        ]),
    },
}
</script>

<style lang="stylus">
    .policy-container
        h1
         padding-bottom 36px

        .tabs
            display inline-flex
            justify-content center
            .tab
                cursor pointer
                padding 10px 5px
                font-size $FontSize3
                opacity 0.8

                &:hover
                    text-decoration underline
                    opacity 0.9

                &.active
                    text-decoration underline
                    opacity 1




</style>
