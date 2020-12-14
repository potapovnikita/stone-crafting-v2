<template lang="pug">
    div(v-show="isActive" :name="name" :class="['tab',  classNames? classNames : '']")
        slot
</template>
<script>
export default {
    name: 'Tab',
    props: {
        name: String,
        selected: Boolean,
        classNames: Array,
    },
    data() {
        return {
            isActive: false
        };
    },
    computed: {
        href() {
            return '#' + this.name.toLowerCase();
        }
    },
    mounted() {
        this.isActive = this.selected
    },
}
</script>