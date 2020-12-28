<template lang="pug">
    .unitNews
        .unitNews__media
            | Media
        .unitNews__info
            | Text
    
</template>
<script>
export default {
    name: 'UnitNews',
}
</script>
<style lang="stylus" scoped>
.unitNews
    display block

    &__media
        flex-basis 559px

    &__info
        flex-basis 507px
        max-width 507px

</style>