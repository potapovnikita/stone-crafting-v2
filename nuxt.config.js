module.exports = {
    /*
    ** Headers of the page
    */
    head: {
    title: 'Stone-Crafting House',
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' } // todo заменить иконку
    ]
    },
    modules: [
        // [
        //     '@nuxtjs/yandex-metrika',
        //     {
        //         id: '52066491',
        //         webvisor: true,
        //         clickmap:true,
        //         trackLinks:true,
        //         accurateTrackBounce:true,
        //     }
        // ],
        // With options
        ['cookie-universal-nuxt', { alias: 'cookiz' }],
    ],
    css: [
        '~assets/styles/font-awesome.styl',
        '~assets/styles/fonts.styl',
        '~assets/styles/global.styl',
        // 'swiper/dist/css/swiper.css',
    ],
    plugins: [
        // { src: '~/plugins/vue-touch.js', ssr: false },
        { src: '~/plugins/vue-touch', ssr: false },
    ],
    /*
    ** Build configuration
    */
    build: {
        /*
        ** Run ESLint on save
        */
        extend (config, { isDev }) {
            if (isDev && process.client) {

                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                },
                {
                    test: /\.pug$/,
                    resourceQuery: /^\?vue/,
                    loader: 'pug-plain-loader',
                    exclude: /(node_modules)/
                },
                {
                    test: /\.styl/,
                    resourceQuery: /^\?vue/,
                    loader: 'pug-plain-loader',
                    exclude: /(node_modules)/
                })
            }
            config.module.rules.filter(r => r.test.toString().includes('svg')).forEach(r => { r.test = /\.(png|jpe?g|gif|pdf)$/ });

            config.module.rules.push({
                test: /\.svg$/,
                    loader: 'vue-svg-loader',
            });

            [].concat(...config.module.rules
                .find(e => e.test.toString().match(/\.styl/)).oneOf
                .map(e => e.use.filter(e => e.loader === 'stylus-loader'))).forEach(stylus => {
                    Object.assign(stylus.options, {
                        import: [
                            '~assets/styles/colors.styl',
                            '~assets/styles/variables.styl',
                        ]
                    })
                });
        }
    },
    router: {
        middleware: 'routing'
    },
}

