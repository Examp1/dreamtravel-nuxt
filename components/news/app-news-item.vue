<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
    link: {
        type: String,
        default: "",
    },
});

const tagUrl = computed(() => {
    const url = props.data.category
        ? props.data.category.url
        : props.data.category_url;
    return isBlogRoute.value ? url : `/${url}`;
});

const tagName = computed(() => {
    return props.data.category
        ? props.data.category.name
        : props.data.category_title;
});
</script>

<template>
    <NuxtLink v-if="link" :to="props.link" class="newItem">
        <NuxtLink v-if="tagName" :to="tagUrl" class="tag">{{ tagName }}</NuxtLink>
        <p class="title">
            {{ data.name }}
        </p>
        <div class="descr" v-html="data.text"></div>
        <p class="date">{{ data.public_date }}</p>
    </NuxtLink>
</template>

<style lang="scss" scoped>
.newItem {
    padding: 20px;
    background-color: #28292f;
    transition: 0.3s;

    &:hover {
        box-shadow:
            0px 16px 24px rgba(0, 0, 0, 0.14),
            0px 6px 30px rgba(0, 0, 0, 0.12),
            0px 8px 10px rgba(0, 0, 0, 0.2);
    }

    .tag {
        font-weight: 600;
        font-size: 12px;
        display: block;
        line-height: 130%;
        color: #4aa7bc;
        position: relative;
        margin-bottom: 20px;
        transition: 0.3s;

        &:hover {
            color: #82ccdc;
        }

        &::before {
            content: "|";
            color: #4aa7bc;
            margin-right: 10px;
        }
    }

    .title {
        font-size: 16px;
        line-height: 130%;
        color: #ffffff;
        font-weight: 600;
        margin-bottom: 10px;
    }

    .descr {
        font-weight: 300;
        font-size: 17px;
        line-height: 150%;
        color: #cacaca;
        min-height: 105px;
        margin-bottom: 25px;
        max-height: 105px;
        overflow-y: hidden;
    }

    .date {
        font-size: 12px;
        line-height: 100%;
        color: #cacaca;
    }
}
</style>
