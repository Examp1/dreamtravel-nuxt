<script setup>
const localePath = useLocalePath()
const porps = defineProps({
    pagination: Object,
});
const route = useRoute();
const currentPage = ref(+route.query.page || 0);

const prevPage = computed(() => {
    const prev  = currentPage.value -1
    if (currentPage.value <= 1) {
        return `${route.path}?page=1`;
    } else {
        return `${route.path}?page=${Math.max(1, prev)}`;
    }
});
const nextPage = computed(() => {
    const next = currentPage.value + 1;
    return `${route.path}?page=${Math.min(next, porps.pagination.last_page)}`;
});
const isPrevDisabled = computed(() => currentPage.value <= 1);
</script>

<template>
    <ul v-if="pagination.links" class="pagination">
        <template v-for="(item, index) in pagination.links">
            <NuxtLink
                v-if="item.label.includes('Previous')"
                :key="item.label + '-' + index"
                :to="localePath(prevPage)"
                :class="{ disabled: isPrevDisabled }"
                class="arrow prev"
                ><i class="ic-arrow"></i
            ></NuxtLink>
            <NuxtLink
                v-if="
                    !item.label.includes('Previous') &&
                    !item.label.includes('Next')
                "
                :key="item.label + '-' + index"
                :to="localePath(`${route.path}?page=${item.label}`)"
                :class="{ current: item.active }"
                >{{ item.label }}</NuxtLink
            >
            <NuxtLink
                v-if="item.label.includes('Next')"
                :key="item.label + '-' + index"
                :to="localePath(nextPage)"
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
    padding:  60px 0px;

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
