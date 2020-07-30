<template lang="pug">
    .common-container.policy-container
        h1(v-html="lang === 'ru' ? 'Правовая политика' : 'Legal policy'")
        .tabs
            .tab(:class="{'active': activeTab === 1}" v-html="lang === 'ru' ? 'Политика персональных данных' : 'Personal data policy'" @click="activeTab = 1")
            .tab(:class="{'active': activeTab === 2}" v-html="lang === 'ru' ? 'Термины и определения' : 'Terms and conditions'" @click="activeTab = 2")


        .policy-content(v-if="activeTab === 1")
            div(v-html="lang === 'ru' ? policy.personalRu : policy.personalEng")
        .policy-content(v-if="activeTab === 2")
            div(v-html="lang === 'ru' ? policy.policyRu : policy.policyEng")






</template>

<script>
import { mapState } from 'vuex'

import Policy from '~/assets/staticData/policy.json'

export default {
    data() {
        return {
            activeTab: 1,
            policy: Policy,
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

        .policy-content
            text-align left
            margin 20px 30px

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
