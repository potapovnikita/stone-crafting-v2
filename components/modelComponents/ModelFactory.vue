<template lang="pug">
    component(v-bind:is="modelComponent")    
</template>
<script>
const models = {
    // torero: () => import('@/components/modelComponents/toreroModels/ToreroBig'),
    // toreroMid: () => import('@/components/modelComponents/toreroModels/ToreroMid'),
    // toreroSmall: () => import('@/components/modelComponents/toreroModels/ToreroSmall'),

    torero: () => import('@/components/modelComponents/toreroModels/ToreroBigN'),
    toreroMid: () => import('@/components/modelComponents/toreroModels/ToreroMidN'),
    toreroSmall: () => import('@/components/modelComponents/toreroModels/ToreroSmallN'),

    // joker: () => import('@/components/modelComponents/jokerModels/JokerBig'),
    // jokerMid: () => import('@/components/modelComponents/jokerModels/JokerMiddle'),
    // jokerSmall: () => import('@/components/modelComponents/jokerModels/JokerSmall'),

    joker: () => import('@/components/modelComponents/jokerModels/JokerBigN'),
    jokerMid: () => import('@/components/modelComponents/jokerModels/JokerMiddleN'),
    jokerSmall: () => import('@/components/modelComponents/jokerModels/JokerSmallN'),

    // makedon: () => import('@/components/modelComponents/makedonModels/MakedonBig'),
    // makedonMid: () => import('@/components/modelComponents/makedonModels/MakedonMiddle'),
    // makedonSmall: () => import('@/components/modelComponents/makedonModels/MakedonSmall'),

    makedon: () => import('@/components/modelComponents/makedonModels/MakedonBigN'),
    makedonMid: () => import('@/components/modelComponents/makedonModels/MakedonMiddleN'),
    makedonSmall: () => import('@/components/modelComponents/makedonModels/MakedonSmallN'),

    genghiskhan: () => import('@/components/modelComponents/genghiskhanModels/GenghiskhanBig'),
    genghiskhanMid: () => import('@/components/modelComponents/genghiskhanModels/GenghiskhanMiddle'),
    genghiskhanSmall: () => import('@/components/modelComponents/genghiskhanModels/GenghiskhanSmall'),

    tamerlan: () => import('@/components/modelComponents/tamerlanModels/TamerlanBig'),
    tamerlan1: () => import('@/components/modelComponents/tamerlanModels/TamerlanMiddle'),
    tamerlan2: () => import('@/components/modelComponents/tamerlanModels/TamerlanSmall'),

    suvorov: () => import('@/components/modelComponents/suvorovModels/SuvorovBig'),
    suvorov1: () => import('@/components/modelComponents/suvorovModels/SuvorovMiddle'),
    suvorov2: () => import('@/components/modelComponents/suvorovModels/SuvorovSmall'),

    peter: () => import('@/components/modelComponents/peterModels/PeterBig'),
    peter1: () => import('@/components/modelComponents/peterModels/PeterMiddle'),
    peter2: () => import('@/components/modelComponents/peterModels/PeterSmall'),

    catherine: () => import('@/components/modelComponents/catherineModels/CatherineBig'),
    catherine1: () => import('@/components/modelComponents/catherineModels/CatherineMiddle'),
    catherine2: () => import('@/components/modelComponents/catherineModels/CatherineSmall'),

    schemamonk: () => import('@/components/modelComponents/schemamonkModels/SchemamonkBig'),
    schemamonk1: () => import('@/components/modelComponents/schemamonkModels/SchemamonkMiddle'),
    schemamonk2: () => import('@/components/modelComponents/schemamonkModels/SchemamonkSmall'),
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