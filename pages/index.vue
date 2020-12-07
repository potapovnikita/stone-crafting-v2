;<template lang="pug">
    page-container
        //page-preload
        Header(placeholder="true")
        main-page

</template>

<script>
import MainPage from '~/components/pagesComponents/Main.vue'
import PageContainer from '~/components/PageContainer.vue'
import PagePreload from '~/components/PagePreload.vue'
import Header from '~/components/HeaderNew.vue'

export default {
    components: {
        MainPage,
        PageContainer,
        PagePreload,
        Header,
    },
    head() {
        return {
            title: 'Stone-Crafting House',
            meta: [
                { name: 'description', hid: 'description', content: 'Stone-Crafting House' },
                // todo добавить верификацию
                // { name: 'yandex-verification', content: '485b955cf4f2b178' },
                // { name: 'google-site-verification', content: 'FADBUe6o6qRd_Tx-A7le_zE46341TfCqNWA31PsXYug' },
                // Open Graph
                { property: 'og:title', content: 'Stone-Crafting House' },
                { property: 'og:description', content: 'by Alexey Antonov' },
                { property: 'og:type', content: 'website' },
                { property: 'og:url', content: 'stone-crafting.ru' },
                { property: 'og:image', content: 'https://stone-crafting.ru/favicon.ico' }
            ]
        }
    }
}




</script>




<style lang="stylus">
    body
        background-color blackBackground
</style>

