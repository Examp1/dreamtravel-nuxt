<script setup>
const { getMediaPath } = useUtils();
defineProps({
    propsData: [Object, Array],
});
</script>

<template>
    <section class="imgBlock">
        <img :src="getMediaPath(propsData.image)" alt="" />
    </section>
</template>

<style lang="scss" scoped>
.imgBlock {
    img {
        width: 100%;
    }
}
</style>
