import Vue from 'vue'
import Vue2TouchEvents from 'vue2-touch-events'
import VueMask from 'v-mask'
import VueCarousel, { Carousel, Slide } from 'vue-carousel'

Vue.use(VueMask)
Vue.use(Vue2TouchEvents)
Vue.use(VueCarousel)

Vue.component('carousel', Carousel)
Vue.component('slide', Slide)
