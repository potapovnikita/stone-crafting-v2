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

    scarlet: () => import('@/components/modelComponents/scarletModels/ScarletBig'),
    scarlet1: () => import('@/components/modelComponents/scarletModels/ScarletMiddle'),
    scarlet2: () => import('@/components/modelComponents/scarletModels/ScarletSmall'),

    babayaga: () => import('@/components/modelComponents/babayagaModels/BabayagaBig'),
    babayaga1: () => import('@/components/modelComponents/babayagaModels/BabayagaMiddle'),
    babayaga2: () => import('@/components/modelComponents/babayagaModels/BabayagaSmall'),

    groznyy: () => import('@/components/modelComponents/groznyyModels/GroznyyBig'),
    groznyy1: () => import('@/components/modelComponents/groznyyModels/GroznyyMiddle'),
    groznyy2: () => import('@/components/modelComponents/groznyyModels/GroznyySmall'),

    watery: () => import('@/components/modelComponents/wateryModels/WateryBig'),
    watery1: () => import('@/components/modelComponents/wateryModels/WateryMiddle'),
    watery2: () => import('@/components/modelComponents/wateryModels/WaterySmall'),

    dvorovoy: () => import('@/components/modelComponents/dvorovoyModels/DvorovoyBig'),
    dvorovoy1: () => import('@/components/modelComponents/dvorovoyModels/DvorovoyMiddle'),
    dvorovoy2: () => import('@/components/modelComponents/dvorovoyModels/DvorovoySmall'),

    goldfish: () => import('@/components/modelComponents/goldfishModels/GoldfishBig'),
    goldfish1: () => import('@/components/modelComponents/goldfishModels/GoldfishMiddle'),
    goldfish2: () => import('@/components/modelComponents/goldfishModels/GoldfishSmall'),

    kikimora: () => import('@/components/modelComponents/kikimoraModels/KikimoraBig'),
    kikimora1: () => import('@/components/modelComponents/kikimoraModels/KikimoraMiddle'),
    kikimora2: () => import('@/components/modelComponents/kikimoraModels/KikimoraSmall'),

    koschei: () => import('@/components/modelComponents/koscheiModels/KoscheiBig'),
    koschei1: () => import('@/components/modelComponents/koscheiModels/KoscheiMiddle'),
    koschei2: () => import('@/components/modelComponents/koscheiModels/KoscheiSmall'),

    pussBoots: () => import('@/components/modelComponents/pussBootsModels/PussBootsBig'),
    pussBoots1: () => import('@/components/modelComponents/pussBootsModels/PussBootsMiddle'),
    pussBoots2: () => import('@/components/modelComponents/pussBootsModels/PussBootsSmall'),

    ovinnik: () => import('@/components/modelComponents/ovinnikModels/OvinnikBig'),
    ovinnik1: () => import('@/components/modelComponents/ovinnikModels/OvinnikMiddle'),
    ovinnik2: () => import('@/components/modelComponents/ovinnikModels/OvinnikSmall'),

    bannik: () => import('@/components/modelComponents/bannikModels/BannikBig'),
    bannik1: () => import('@/components/modelComponents/bannikModels/BannikMiddle'),
    bannik2: () => import('@/components/modelComponents/bannikModels/BannikSmall'),

    viking: () => import('@/components/modelComponents/vikingModels/VikingBig'),
    viking1: () => import('@/components/modelComponents/vikingModels/VikingMiddle'),
    viking2: () => import('@/components/modelComponents/vikingModels/VikingSmall'),

    lesovichek: () => import('@/components/modelComponents/lesovichekModels/LesovichekBig'),
    lesovichek1: () => import('@/components/modelComponents/lesovichekModels/LesovichekMiddle'),
    lesovichek2: () => import('@/components/modelComponents/lesovichekModels/LesovichekSmall'),

    rusalka: () => import('@/components/modelComponents/rusalkaModels/RusalkaBig'),
    rusalka1: () => import('@/components/modelComponents/rusalkaModels/RusalkaMiddle'),
    rusalka2: () => import('@/components/modelComponents/rusalkaModels/RusalkaSmall'),

    snowqueen: () => import('@/components/modelComponents/snowqueenModels/SnowqueenBig'),
    snowqueen1: () => import('@/components/modelComponents/snowqueenModels/SnowqueenMiddle'),
    snowqueen2: () => import('@/components/modelComponents/snowqueenModels/SnowqueenSmall'),

    lebed: () => import('@/components/modelComponents/lebedModels/LebedBig'),
    lebed1: () => import('@/components/modelComponents/lebedModels/LebedMiddle'),
    lebed2: () => import('@/components/modelComponents/lebedModels/LebedSmall'),

    popovich: () => import('@/components/modelComponents/popovichModels/PopovichBig'),
    popovich1: () => import('@/components/modelComponents/popovichModels/PopovichMiddle'),
    popovich2: () => import('@/components/modelComponents/popovichModels/PopovichSmall'),
    popovichMbWidth: () => import('@/components/modelComponents/popovichModels/PopovichMbWidth'),
    popovichMbSmall: () => import('@/components/modelComponents/popovichModels/PopovichMbSmall'),

    muromets: () => import('@/components/modelComponents/murometsModels/MurometsBig'),
    muromets1: () => import('@/components/modelComponents/murometsModels/MurometsMiddle'),
    muromets2: () => import('@/components/modelComponents/murometsModels/MurometsSmall'),
    murometsMbWidth: () => import('@/components/modelComponents/murometsModels/MurometsMbWidth'),

    svyatogor: () => import('@/components/modelComponents/svyatogorModels/SvyatogorBig'),
    svyatogor1: () => import('@/components/modelComponents/svyatogorModels/SvyatogorMiddle'),
    svyatogor2: () => import('@/components/modelComponents/svyatogorModels/SvyatogorSmall'),
    svyatogorMbWidth: () => import('@/components/modelComponents/svyatogorModels/SvyatogorMbWidth'),
    svyatogorMbSmall: () => import('@/components/modelComponents/svyatogorModels/SvyatogorMbSmall'),

    dobrynya: () => import('@/components/modelComponents/dobrynyaModels/DobrynyaBig'),
    dobrynya1: () => import('@/components/modelComponents/dobrynyaModels/DobrynyaBig'),
    dobrynya2: () => import('@/components/modelComponents/dobrynyaModels/DobrynyaMiddle'),
    dobrynyaMbWidth: () => import('@/components/modelComponents/dobrynyaModels/DobrynyaMiddle'),
    dobrynyaMbSmall: () => import('@/components/modelComponents/dobrynyaModels/DobrynyaMbSmall'),

    tsarevich: () => import('@/components/modelComponents/tsarevichModels/TsarevichBig'),
    tsarevich1: () => import('@/components/modelComponents/tsarevichModels/TsarevichMiddle'),
    tsarevich2: () => import('@/components/modelComponents/tsarevichModels/TsarevichSmall'),
    tsarevichMbWidth: () => import('@/components/modelComponents/tsarevichModels/TsarevichMbWidth'),
    tsarevichMbSmall: () => import('@/components/modelComponents/tsarevichModels/TsarevichMbSmall'),
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