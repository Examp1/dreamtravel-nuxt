<script setup>
import appDataGridItem from "./app-dataGrid-item.vue";
defineProps({
    items: [Array, Object],
    region: String,
});
</script>

<template>
    <section class="darkBg dataGrid">
        <div class="container">
            {{ region }}
            <appDataGridItem
                v-for="(item, idx) in items"
                :key="idx"
                :item="item"
            ></appDataGridItem>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.dataGrid {
    .container {
        // @include sectionPadding;
        padding-top: 30px;
        display: grid;
        grid-gap: 8px;
        grid-template-columns: repeat(4, 1fr);

        // @media (max-width: 830px) {
        //   padding: 100px 0px;
        // }

        @media (max-width: 1024px) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media (max-width: 830px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (max-width: 576px) {
            grid-template-columns: 1fr;
            grid-gap: 25px;
        }
    }
}
</style>
