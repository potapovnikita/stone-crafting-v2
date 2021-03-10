<template lang="pug">
    component(v-bind:is="curComp")    
</template>
<script>
export default {
    name: 'DynamicComponents',
    props: {
        pathName: String,
    },
    computed: {
        curComp() {
            console.log(this.pathName)
            return () => import(`~/assets/${this.pathName}`)
        },
    },
}
</script>