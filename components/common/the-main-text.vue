<script setup>
defineProps({
    title: String,
    descr: String,
});
</script>

<template>
    <div>
        <h1 class="sectionTitle bef" v-html="title"></h1>
        <p class="descr" v-html="descr"></p>
    </div>
</template>

<style lang="scss" scoped>
.smallmb{
    .descr{
        margin-bottom: 17px
    }
}
</style>
