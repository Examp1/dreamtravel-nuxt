<script setup>
const porps = defineProps({
    pagination: Object,
});
const route = useRoute();
const currentPage = ref(+route.query.page || 0);

const prevPage = computed(() => {
    if (currentPage.value <= 1) {
        return `${route.path}?page=1`;
    } else {
        return `${route.path}?page=${Math.max(1, currentPage.value - 1)}`;
    }
});
const nextPage = computed(() => {
    return `${route.path}?page=${Math.max(porps.pagination.last_page, +currentPage.value++)}`;
});
</script>

<template>
    <ul class="pagination">
        <template v-for="(item, index) in pagination.links">
            <NuxtLink
                v-if="item.label.includes('Previous')"
                :key="item.label + '-' + index"
                :to="prevPage"
                :class="{ disabled: currentPage-- <= 1 }"
                class="arrow prev"
                ><i class="ic-arrow"></i
            ></NuxtLink>
            <NuxtLink
                v-if="
                    !item.label.includes('Previous') &&
                    !item.label.includes('Next')
                "
                :key="item.label + '-' + index"
                :to="`${route.path}?page=${item.label}`"
                :class="{ current: item.active }"
                >{{ item.label }}</NuxtLink
            >
            <NuxtLink
                v-if="item.label.includes('Next')"
                :key="item.label + '-' + index"
                :to="nextPage"
                :class="{ disabled: currentPage === pagination.last_page }"
                class="arrow next"
                ><i class="ic-arrow"></i
            ></NuxtLink>
        </template>
    </ul>
</template>

<style lang="scss" scoped>
.pagination {
    display: flex;
    justify-content: center;
    width: 100%;
    // margin-bottom: 65px;
    padding: 60px 0;

    a,
    span {
        width: 20px;
        height: 20px;
        border: 1px solid #777;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        line-height: 100%;
        text-align: center;
        color: #777777;
        font-weight: 500;
        margin: 0 5px;
        transition: 0.3s;

        &.current {
            background-color: $c-btn;
            color: #fff;
            border-color: $c-btn;

            &:hover {
                color: $c-white;
            }
        }

        &.disabled {
            display: none;
        }

        &:hover {
            color: $c-btn;
            border-color: $c-btn;
        }
    }

    .prev,
    .next {
        border: none;
    }

    .prev {
        transform: rotate(180deg);
    }
}

.gc5 {
    grid-column: 1 / 5;
}
</style>
