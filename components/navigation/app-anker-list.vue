<script setup>
import { onMounted, ref } from "vue";
import appAccordionWrapper from "~/components/ui/app-accordion-wrapper.vue";
import appAccordionItem from "~/components/ui/app-accordion-item.vue";
import { getWindowSize } from "@/stores/windowSize";
const { getSize } = storeToRefs(getWindowSize());

defineProps({
    title: String,
});

const ankerList = ref([]);
const currentH2Idx = ref(0);

onMounted(() => {
    //   if (!this.isUiLocked) {
    const h2List = document.querySelectorAll(".contentWrapper > h2");
    h2List.forEach((el) => {
        ankerList.value.push({
            title: el.innerText,
            link: `#${el.innerText}`,
            cord: el.offsetTop,
        });
        el.id = el.innerText;
    });

    // },
    // getIndex(idx) {
    //   this.currentIdx = idx;
    // }
    //   },
});
</script>
<!-- <script>
import { mapGetters } from "vuex";
import AccordionItem from "../common/Accordion-item.vue";
import Accordion from "../common/Accordion.vue";
export default {
    components: { Accordion, AccordionItem },
    data() {
        return {
            currentH2Idx: 0,
        };
    },
    computed: {
        ...mapGetters(["getSize"]),
    },
    props: {
        ankerList: {
            type: [Array, Object],
        },
        title: {
            type: String,
        },
    },
    methods: {
        onItemClick(e) {
            this.$emit("click", e);
            setTimeout(() => {
                let el = document.getElementById(e);
                if (el) {
                    window.scrollTo({
                        top: el.offsetTop - 120,
                        behavior: "smooth",
                    });
                }
            }, 200);
        },
    },
};
</script> -->

<template>
    <ClientOnly>
        <aside class="aside">
            <template v-if="getSize != 'mobile'">
                <p class="title">{{ title }}</p>
                <ul v-if="ankerList">
                    <li
                        v-for="(item, idx) in ankerList"
                        :key="idx"
                        @click="currentH2Idx = idx"
                    >
                        <a
                            :href="item.link"
                            :class="{ active: currentH2Idx === idx }"
                            @click="onItemClick(item.title)"
                            >{{ item.title }}</a
                        >
                    </li>
                </ul>
            </template>
            <template v-else>
                <appAccordionWrapper class="asideMob">
                    <appAccordionItem>
                        <template #accordion-trigger
                            ><p class="title">
                                {{ title }}
                            </p>
                            <i class="ic-dropdown"></i>
                        </template>
                        <template #accordion-content>
                            <li
                                v-for="(item, idx) in ankerList"
                                :key="idx"
                                @click="currentH2Idx = idx"
                            >
                                <a
                                    :href="item.link"
                                    :class="{ active: currentH2Idx === idx }"
                                    @click="onItemClick(item.title)"
                                    >{{ item.title }}</a
                                >
                            </li>
                        </template>
                    </appAccordionItem>
                </appAccordionWrapper>
            </template>
        </aside>
    </ClientOnly>
</template>

<style lang="scss">
.asideMob {
    li,
    a {
        color: #777 !important;
    }

    li::before {
        display: none;
    }

    .accordion__content {
        margin-bottom: 0px;
        margin-top: 35px;

        ul {
            padding: 0px;
        }
    }

    .accordion__trigger.accordion__trigger_active {
        p {
            color: $c-btn;
        }
    }
}
</style>
