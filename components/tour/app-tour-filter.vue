<script setup>
import { ref, watch } from "vue";
import appAccordionWrapper from "~/components/ui/app-accordion-wrapper.vue";
import appAccordionItem from "~/components/ui/app-accordion-item.vue";
import { getWindowSize } from "@/stores/windowSize";
const { getSize } = storeToRefs(getWindowSize());
const route = useRoute();

const accActive = ref(false);

defineProps({
    data: Array,
    filteredItems: Array,
});
const emit = defineEmits(["change"]);

watch(route, () => {
    accActive.value = false;
});

const onItemClick = (key1, key2) => {
    emit("change", { key1, key2 });
    if (data[key1].options[e.key2].checked != undefined) {
        data[e.key1].options[e.key2].checked =
          !data[e.key1].options[e.key2].checked;
      } else {
        data[e.key1].options[e.key2].checked = true;
      }
    //   $set(data, e.key1, { ...data[e.key1] });
      sendQuery();
};
</script>

<template>
    <div class="filter" v-if="getSize == 'desktop' || getSize == 'tablet'">
        <div class="filterTour">
            <ul>
                <li v-for="(item, key) in data" :key="item.slug">
                    <i :class="item.icon"></i>
                    {{ item.name }}
                    <i class="ic-dropdown"></i>
                    <ul class="submenu">
                        <li
                            v-for="(option, optionKey) in item.options"
                            :key="option.slug"
                            :class="{ active: option.checked }"
                            @click="onItemClick(key, optionKey)"
                        >
                            {{ option.text }}
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- <div class="filterResult" v-if="filteredItems.length">
            <ul>
                <li
                    v-for="(item, index) in filteredItems"
                    :key="index"
                    @click="
                        $emit('onDelete', { key1: item.key1, key2: item.key2 })
                    "
                >
                    {{ item.text }}
                    <i class="ic-plus"></i>
                </li>
            </ul>
            <p class="reset" @click="$emit('clearAll')">{{ $t("clearAll") }}</p>
        </div> -->
    </div>
    <div v-else class="accrodionWrapper">
        <div class="filterWrapper">
            <div class="accTitle" @click="accActive = !accActive">
                {{ $t("filtration") }} <i class="ic-dropdown"></i>
            </div>
            <div class="accContent" :class="{ active: accActive }">
                <accordion>
                    <accordion-item
                        v-for="(item, key) in data"
                        :key="item.slug"
                    >
                        <template slot="accordion-trigger">
                            <div class="triggerWrp">
                                <i :class="item.icon"></i>
                                {{ item.name }}
                            </div>
                            <i :key="key" class="ic-dropdown"></i>
                        </template>
                        <template slot="accordion-content">
                            <li
                                v-for="(option, optionKey) in item.options"
                                :key="option.slug"
                                :class="{ active: option.checked }"
                                @click="onItemClick(key, optionKey)"
                            >
                                {{ option.text }}
                            </li>
                        </template>
                    </accordion-item>
                </accordion>
            </div>
        </div>
        <!-- <div class="filterResult" v-if="filteredItems.length">
            <ul>
                <li
                    v-for="(item, index) in filteredItems"
                    :key="index"
                    @click="
                        $emit('onDelete', { key1: item.key1, key2: item.key2 })
                    "
                >
                    {{ item.text }}
                    <i class="ic-plus"></i>
                </li>
            </ul>
            <p class="reset" @click="$emit('clearAll')">{{ $t("clearAll") }}</p>
        </div> -->
    </div>
</template>

<style lang="scss" scoped>
.filterTour {
    margin-bottom: 30px;
    padding: 15px;
    background-color: $c-gray;
    width: 100%;

    ul {
        margin: 0;
        display: flex;
        justify-content: center;
    }

    li {
        font-size: 16px;
        line-height: 130%;
        font-weight: 600;
        color: #cacaca;
        position: relative;
        cursor: pointer;

        &:not(:last-of-type) {
            margin-right: 40px;
        }

        &:hover {
            .submenu {
                transition-delay: 0s;
                opacity: 1;
                z-index: 1;
                visibility: visible;
            }
        }
    }

    .submenu {
        position: absolute;
        width: 183px;
        padding: 20px;
        background-color: $c-gray;
        display: flex;
        flex-direction: column;
        padding-left: 25px;
        opacity: 0;
        visibility: hidden;
        transition: 0.3s;

        li {
            margin: 0;
            font-weight: 600;
            font-size: 12px;
            line-height: 100%;
            color: #777777;
            cursor: pointer;
            position: relative;
            padding-left: 15px;

            &:not(:last-of-type) {
                margin-bottom: 13px;
            }

            &::before {
                content: "\e914";
                position: absolute;
                width: 16px;
                height: 16px;
                border: 1px solid #777777;
                top: 0;
                left: -15px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: transparent;
                font-family: "dreamTravel" !important;
                speak: never;
                font-style: normal;
                font-weight: normal;
                font-variant: normal;
                text-transform: none;
                line-height: 1;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }

            &.active {
                color: $c-btn;

                &::before {
                    border-color: $c-btn;
                    background-color: $c-btn;
                    color: $c-white;
                }
            }

            &:hover {
                color: $c-btn;
            }
        }
    }
}

.filterResult {
    display: flex;
    align-items: center;

    .ic-plus {
        transform: rotate(45deg);
        display: inline-block;
    }

    ul {
        display: flex;
    }

    li {
        border: 1px solid #4aa7bc;
        padding: 10px 7px;
        font-weight: 500;
        font-size: 12px;
        line-height: 100%;
        color: #4aa7bc;
        margin-right: 20px;
        cursor: pointer;
    }

    .reset {
        font-weight: 500;
        font-size: 12px;
        line-height: 100%;
        text-align: right;
        color: #2a4651;
        cursor: pointer;
    }
}

.filterWrapper {
    padding: 15px;
    background-color: $c-gray;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: #cacaca;
    margin-bottom: 20px;

    .accContent {
        opacity: 0;
        visibility: hidden;
        max-height: 0;
        transition: 0.3s;
        font-weight: 600;

        li {
            &:not(:last-of-type) {
                margin-bottom: 25px;
            }

            &.active {
                color: $c-btn;

                &::before {
                    border-color: $c-btn;
                    background-color: $c-btn;
                    color: $c-white;
                }
            }
        }

        &.active {
            margin-top: 35px;
            max-height: 15000px;
            opacity: 1;
            visibility: visible;
        }
    }
}

.accTitle {
    display: flex;
    justify-content: space-between;
}
</style>

<style lang="scss">
.accContent .accordion__content {
    margin-top: 22px;

    li {
        margin: 0;
        font-weight: 600;
        font-size: 12px;
        line-height: 100%;
        color: #777777;
        cursor: pointer;
        position: relative;
        padding-left: 35px;

        &:not(:last-of-type) {
            margin-bottom: 13px;
        }

        &::before {
            content: "\e914";
            position: absolute;
            width: 16px;
            height: 16px;
            border: 1px solid #777777;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            color: transparent;
            font-family: "dreamTravel" !important;
            speak: never;
            font-style: normal;
            font-weight: normal;
            font-variant: normal;
            text-transform: none;
            line-height: 1;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
    }
}
</style>
