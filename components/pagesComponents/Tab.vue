<template lang="pug">
    div(v-show="isActive" :tabName="tabName" :name="name" :class="['tab',  classNames? classNames : '']")
        slot(v-bind:activated="isActive")
</template>
<script>
export default {
    name: 'Tab',
    props: {
        tabName: String,
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
            return '#' + this.tabName.toLowerCase()
        }
    },
    mounted() {
        this.isActive = this.selected
    },
}
</script>