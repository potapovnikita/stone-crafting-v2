export default function (context) {
    // current route
    // console.log('route=', context.route.name)
    // previous route
    if (process.client) {
        const from = context.from
        // console.log('context.app', context.app)
        if (from.name !== 'gallery-name') context.app.$cookiz.remove('scroll');
    }
}
