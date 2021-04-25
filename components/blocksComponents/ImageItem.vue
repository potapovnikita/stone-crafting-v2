<template lang="pug">
.img-wrapper.loading
    img(
        :class="classNames? classNames : ''"
        :data-url="source"
        alt="img"
        )    
</template>
<script>
export default {
    name: 'ImageItem',
    props: {
        classNames: Array,
        source: {
            type: String,
            required: true,
        }
    },
    mounted() {
        const loadImage = () => {
            const imgElement = Array.from(this.$el.children).find(item => item.nodeName === 'IMG')
            if (imgElement) {
                imgElement.addEventListener('load', () => {
                    this.$el.classList.remove('loading')
                })
                imgElement.src = imgElement.dataset.url
            }
        };

        const createObserver = () => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        return
                    } else {
                        loadImage();
                        observer.unobserve(this.$el)
                    }
                })
            }, { threshold: 0 })
            observer.observe(this.$el);
        }

        if (!window['IntersectionObserver']) {
            loadImage()
        } else {
            createObserver()
        }
    },
}
</script>
<style scoped lang="stylus">
.img-wrapper

    img
        opacity 1
        transition opacity .5s

    &.loading
        position absolute
        height 100%

        img
            opacity 0

</style>
