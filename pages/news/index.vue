<template lang="pug">
    page-container
        Header(placeholder="true")
        News
</template>

<script>
import News from '~/components/pagesComponents/News.vue'
import PageContainer from '~/components/PageContainer.vue'
import Header from '~/components/Header.vue'


export default {
    components: {
        PageContainer,
        Header,
        News,
    },
}
</script>

<style lang="stylus">
    body
        background-color blackBackground
</style>
