<template lang="pug">
    component(v-bind:is="modelComponent")    
</template>
<script>
const models = {
    torero: () => import('@/components/modelComponents/toreroModels/ToreroBig'),
    toreroMid: () => import('@/components/modelComponents/toreroModels/ToreroMid'),
    toreroSmall: () => import('@/components/modelComponents/toreroModels/ToreroSmall'),

    joker: () => import('@/components/modelComponents/jokerModels/JokerBig'),
    jokerMid: () => import('@/components/modelComponents/jokerModels/JokerMiddle'),
    jokerSmall: () => import('@/components/modelComponents/jokerModels/JokerSmall'),

    makedon: () => import('@/components/modelComponents/makedonModels/MakedonBig'),
    makedonMid: () => import('@/components/modelComponents/makedonModels/MakedonMiddle'),
    makedonSmall: () => import('@/components/modelComponents/makedonModels/MakedonSmall'),
}
export default {
    name: 'ModelFactory',
    props: {
        modelName: {
            type: String,
            required: true,
            validator(value) {
                return Object.prototype.hasOwnProperty.call(models, value)
            }
        },
    },
    computed: {
        modelComponent() {
            return models[this.modelName]
        },
    },
}
</script>