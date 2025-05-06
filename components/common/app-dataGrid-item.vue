<script setup>
import useUtils from "@/composables/useUtils.js";
const { getMediaPath } = useUtils();
defineProps({
    item: [Object, Array],
});
</script>
<template>
    <NuxtLink
        :to="`/country/${item.slug}`"
        class="dataGridItem"
        :style="`background-image: url(${getMediaPath(item.image)})`"
    >
        <p class="title">{{ item.name }}</p>
        <p class="description">
            {{ item.excerpt }}
        </p>
        <p class="price">{{ item.price }}</p>
    </NuxtLink>
</template>

<style lang="scss" scoped>
.title {
    font-weight: bold;
    font-size: 19px;
    line-height: 110%;
    color: #ffffff;
}

.description,
.price {
    font-weight: 300;
    font-size: 14px;
    line-height: 140%;
    color: #ffffff;
}

.description {
    opacity: 0;
    max-height: 0px;
    transition: 0.3s;
}

.dataGridItem {
    overflow: hidden;
    height: 215px;
    position: relative;
    padding: 15px;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 2;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;

    @media (max-width: 576px) {
        text-align: center;

        .title {
            font-size: 14px;
        }
    }

    &::before {
        transition: 0.3s;
        position: absolute;
        content: "";
        background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.75) 100%
        );
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: -1;
    }

    &:hover {
        .description {
            opacity: 1;
            max-height: 180px;
            margin-bottom: auto;
        }

        &::before {
            background: rgba(0, 0, 0, 0.7);
        }
    }
}
</style>
