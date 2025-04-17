<script setup>
import { computed } from "vue";
import { useGlobalStore } from "@/stores/global";
const { globalSetting } = useGlobalStore();
defineProps({
    propsData: [Object, Array],
    currency: String,
});

const route = useRoute();
const chekPage = computed(() => {
    return route.name === "TextPage" || route.name === "Home";
});
</script>
<!-- <script>
import { mapGetters } from "vuex";
export default {
    props: {
        propsData: {
            type: [Object, Array],
            require: true,
        },
        currency: {
            type: String,
        },
    },
    computed: {
        ...mapGetters(["isUiLocked", "globalSetting"]),
        chekPage() {
            if (
                this.$route.name === "TextPage" ||
                this.$route.name === "Home"
            ) {
                return true;
            } else {
                return false;
            }
        },
    },
    methods: {
        priceTable() {
            if (
                this.propsData.description.match(/price-table/gm) &&
                !this.$store.state.tableMultiplication
            ) {
                this.$store.state.tableMultiplication = true;
                const pTable =
                    this.$refs.textWrapper.querySelectorAll(".price-table");
                // const pTable = document.querySelectorAll(".contentWrapper > .price-table");
                pTable.forEach((table) => {
                    const td = table.querySelectorAll("td");
                    td.forEach((el) => {
                        if (!isNaN(+el.innerHTML * 2)) {
                            if (this.currency == "eur") {
                                el.innerHTML = Math.round(
                                    +el.innerHTML * this.globalSetting.eur,
                                );
                            } else {
                                el.innerHTML = Math.round(
                                    +el.innerHTML * this.globalSetting.usd,
                                );
                            }
                        }
                    });
                });
            }
        },
    },
    mounted() {
        this.createAnkerListing();
        this.priceTable();
        // console.log(this.$refs.textWrapper.querySelector('.price-table'));
    },
};
</script> -->

<template>
    <div class="contentWrapper" :class="{ container: chekPage }">
        <h2 class="anker" v-if="propsData.title">{{ propsData.title }}</h2>
        <div
            ref="textWrapper"
            class="contentWrapper"
            v-html="propsData.description"
            v-if="!isUiLocked"
        ></div>
        <component
            v-if="propsData.button_link && propsData.button_title"
            class="btn"
            :class="propsData.button_style"
            :is="
                isExtUrl(propsData.button_link) ? 'default-link' : 'router-link'
            "
            :target="isExtUrl(propsData.button_link) ? '_blank' : '_self'"
            :to="propsData.button_link"
        >
            {{ propsData.button_title }}
            <i
                v-if="propsData.button_style == 'read-more'"
                class="icon ic-arrow-drop"
            ></i>
        </component>
    </div>
</template>

<style lang="scss" scoped>
li {
    margin: 0px !important;
}

h2 {
    font-weight: 500;
    font-size: 25px;
    line-height: 140%;
    color: #fff;
    margin-bottom: 35px;
}
</style>
