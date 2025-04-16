<script setup>
import { ref, computed } from "vue";
import appAccordionWrapper from "~/components/ui/app-accordion-wrapper.vue";
import appAccordionItem from "~/components/ui/app-accordion-item.vue";
import appDataGridItem from "~/components/common/app-dataGrid-item.vue";
import { getWindowSize } from "@/stores/windowSize";
const { getSize } = storeToRefs(getWindowSize());

const props = defineProps({
    propsData: [Object, Array],
});
const currentIdx = ref(1);

const getIdxMob = () => {
    currentIdx.value = +idx;
    const acc = document.querySelector(".accordion__trigger"),
        accCont = document.querySelector(".accordion__content");
    acc.classList.remove("accordion__trigger_active");
    accCont.style.display = "none";
};

const filteredList = computed(() => {
    return {
        idx: currentIdx.value,
        list: props.propsData.items[currentIdx.value]
    }
})
</script>

<!-- <script>
import Flickity from "vue-flickity";
import { mapGetters } from "vuex";
import appDataGridItem from "./app-dataGrid-item.vue";
import appAccordionWrapper from "~/components/ui/app-accordion-wrapper.vue";
import appAccordionItem from "~/components/ui/app-accordion-item.vue";
export default {
    components: { appDataGridItem, Flickity, Accordion, AccordionItem },
    props: {
        propsData: {
            type: [Array, Object],
        },
    },
    data() {
        return {
            // currentIdx: 1,
            flickityOptions: {
                // prevNextButtons: false,
                pageDots: false,
                contain: true,
                cellAlign: "center",
                groupCells: true,
            },
        };
    },
    computed: {
        ...mapGetters(["getSize"]),
    },
    methods: {
        getIdx(idx) {
            this.currentIdx = +idx;
        },
        getIdxMob(idx) {
            this.currentIdx = +idx;
            const acc = document.querySelector(".accordion__trigger"),
                accCont = document.querySelector(".accordion__content");
            acc.classList.remove("accordion__trigger_active");
            accCont.style.display = "none";
        },
    },
};
</script> -->
<template>
    <section class="calendar">
        <div>
            <h2 class="sectionTitle bef bef-fix">{{ propsData.title }}</h2>
            <div class="container" v-if="getSize === 'desktop'">
                <div class="filter tabs3">
                    <div
                        v-for="(month, idx) in propsData.months"
                        :class="{ active: currentIdx == idx }"
                        :key="idx"
                        @click="currentIdx = idx"
                        class="item"
                    >
                        {{ month }}
                    </div>
                </div>
            </div>
            <div class="container" v-else>
                <appAccordionWrapper class="mob_accordion">
                    <appAccordionItem>
                        <template #accordion-trigger>
                            Оберіть місяць <i class="icon ic-dropdown"></i
                        ></template>
                        <template #accordion-content>
                            <ul>
                                <li
                                    v-for="(item, idx) in propsData.months"
                                    :key="idx"
                                    @click="getIdxMob(idx)"
                                >
                                    {{ item }}
                                </li>
                            </ul>
                        </template>
                    </appAccordionItem>
                </appAccordionWrapper>
            </div>
            <div>
                <div class="container">
                    <ul class="filterTour">
                        <appDataGridItem
                            v-for="(item, idx) in filteredList.list"
                            :key="idx"
                            :item="item"
                        >
                        </appDataGridItem>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>
<style lang="scss">
.calendar {
    .flickity-button:hover {
        background-color: #2a4651;
    }

    .next {
        right: -15px;
    }

    .previous {
        left: -15px;
    }
}
</style>

<style lang="scss" scoped>
.calendar {
    display: flex;
    flex-direction: column;
    align-items: center;
    // @include sectionPadding
    // padding-bottom: 0px
    // @media (max-width: 830px) {
    //   padding: 100px 0px;
    // }
}

.filterTour {
    display: grid;
    width: 100%;
    margin-top: 35px;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 8px;
    // padding-bottom: $section-offset;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 830px) {
        grid-template-columns: repeat(2, 1fr);
        // padding-bottom: 100px;
    }

    @media (max-width: 576px) {
        grid-template-columns: 1fr;
        grid-gap: 25px;
    }

    li {
        width: 100%;
    }
}

.filterTitle {
    font-size: 12px;
    line-height: 100%;
    color: $t-gray;
}

.type {
    display: flex;
    border: 2px solid #4aa7bc;
    box-sizing: border-box;
    margin-top: 10px;
    margin-bottom: 35px;

    li {
        padding: 10px 14px;
        font-weight: 300;
        font-size: 14px;
        line-height: 100%;
        color: #4aa7bc;

        &.active {
            color: $c-black;
            font-weight: 600;
            background-color: #4aa7bc;
        }
    }
}

.tour {
    height: 210px;
    position: relative;
    z-index: 2;
    background-size: cover;

    a {
        display: flex;
        width: 100%;
        height: 100%;
        padding: 15px;
        justify-content: flex-end;
        flex-direction: column;
        // align-items: flex-end;
    }

    &::after {
        content: "";
        position: absolute;
        z-index: -1;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.75) 100%
        );
    }

    .title {
        font-weight: 700;
        font-size: 19px;
        line-height: 110%;
        color: #ffffff;
    }

    .price {
        font-weight: 300;
        font-size: 17px;
        line-height: 150%;
        color: #ffffff;
    }
}

.active {
    color: $c-btn;
    background-color: $c-black;
}

.darkBg {
    width: 100%;
}
</style>

<style lang="scss">
.tabs3 {
    .item {
        color: #fff;
    }
}

.flickity-button {
    padding: 0;
    background-color: #2a4651;
    transform: unset;
    border-radius: 0;
    width: 40px;
    height: unset;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 100%;
    color: $c-btn;
    box-shadow: 0 0 0px 1px inset $c-btn;

    svg {
        height: 12px;
    }

    &:disabled {
        opacity: 0;
    }

    .flickity-button-icon {
        width: 15px;
        left: unset;
        right: unset;
        top: unset;
        bottom: unset;
        position: static;
    }
}

.previous {
    left: 0;
    bottom: 0;
    top: 0;
}

.next {
    right: 0;
    bottom: 0;
    top: 0;
}

.item {
    margin-right: -1px;
    cursor: pointer;
    padding: 8px 16px;
    transition: 0.3s;

    &:hover {
        background-color: #2a4651;
    }

    &:not(:last-of-type) {
        position: relative;
        // &::after {
        //   content: '';
        //   width: 1px;
        //   height: 60%;
        //   position: absolute;
        //   background-color: #28292F;
        //   right: 0px;
        //   top: 50%;
        //   transform: translateY(-50%);
        // }
    }
}

.filter .item.active {
    color: $c-btn;
}

.mob_accordion {
    width: 100%;
    background: #28292f;
    display: flex;
    justify-content: center;
    padding: 17px 30px;
    font-weight: 300;
    font-size: 14px;
    line-height: 100%;
    color: #777777;
}
</style>

<style lang="scss">
.mob_accordion {
    li {
        width: 100%;
        text-align: center;
    }

    .accordion__trigger {
        font-weight: 600;
        font-size: 14px;
        line-height: 100%;
        color: #4aa7bc;
        padding: 17px 0px;
        display: flex;
        justify-content: center;

        i::before {
            color: inherit !important;
        }
    }

    .accordion__content {
        li {
            margin-bottom: 30px;

            &:first-of-type {
                // margin-top: 30px;
            }
        }
    }
}

.tabs3.filter {
    display: flex;
    justify-content: center;
}
</style>
