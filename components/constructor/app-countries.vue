<script setup>
import { ref, computed } from "vue";
import appDataGrid from "../common/app-dataGrid.vue";
import appTabFilter from "../common/app-tab-filter.vue";

const props = defineProps({
    propsData: [Object, Array],
});

const currentRegion = ref("all");
const countriesItems = computed(() => {
    const temp = [];
    if (currentRegion.value !== "all") {
        return props.propsData.items[currentRegion.value];
    } else if (currentRegion.value === "all") {
        for (let el in props.propsData.items) {
            props.propsData.items[el].forEach((item) => {
                temp.push(item);
            });
        }
        return temp;
    } else {
        const region = Object.keys(props.propsData.items)[0];
        return props.propsData.items[region];
    }
});

const getCurrentRegion = (region) => {
    currentRegion.value = region
}

// import appDataGrid from "../app-dataGrid.vue";
// import AppTabsFilter from "../common/app-tabs_filter.vue";
// export default {
//   components: { appDataGrid, AppTabsFilter },
//   props: {
//     propsData: {
//       type: [Array, Object],
//     },
//   },
//   data() {
//     return {
//       tabList: null,
//       items: null,
//       currentRegion: 'all',
//     };
//   },
//   computed: {
//     countriesItems() {
//       const temp = [];
//       if ( this.currentRegion !== 'all' ) {
//         return props.items[this.currentRegion];
//       } else if (this.currentRegion === "all") {
//         for (let el in props.items) {
//           props.items[el].forEach((item) => {
//             temp.push(item);
//           });
//         }
//         return temp;
//       } else {
//         const region = Object.keys(props.items)[0];
//         return props.items[region];
//       }
//     },
//   },
//   methods: {
//     getCurrentRegion(region) {
//       this.currentRegion = region;
//     },
//     getAllRegion() {
//       this.currentRegion = "all";
//     },
//   },
//   mounted() {
//     this.tabList = this.propsData.tabs;
//     props.items = this.propsData.items;
//   },
// };
</script>

<template>
    <div>
        <appTabFilter
            @getCurrentRegion="getCurrentRegion"
            @getAllRegion="getAllRegion"
            :tabList="propsData.tabs"
            class="mt"
            :currentRegion="currentRegion"
        ></appTabFilter>
        <appDataGrid :items="countriesItems"></appDataGrid>
    </div>
</template>

<style lang="sass" scoped></style>
