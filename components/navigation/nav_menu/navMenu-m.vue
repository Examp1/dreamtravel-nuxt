<script setup>
import appAccordionWrapper from "~/components/ui/app-accordion-wrapper.vue";
import appAccordionItem from "~/components/ui/app-accordion-item.vue";
import { useGlobalStore } from "@/stores/global";
const { globalSetting } = storeToRefs(useGlobalStore());

defineProps({
    propData: Object,
});
</script>

<template>
    <nav class="df ait w100-m">
        <appAccordionWrapper class="df menu" v-if="propData">
            <template v-for="(item, idx) in propData">
                <appAccordionItem
                    v-if="item.children.length"
                    :class="{ hasSubmenu: item.children.length }"
                    :key="'accordion-item-' + idx"
                >
                    <template #accordion-trigger>
                        <span class="appLink"
                            >{{ item.name
                            }}<i
                                class="icon ic-dropdown"
                                v-if="item.children.length"
                            ></i
                        ></span>
                    </template>
                    <template
                        #accordion-content
                        v-if="item.children.length"
                        class="subMenu"
                    >
                        <li class="submenuItem">
                            <NuxtLink :to="item.url">{{ item.name }}</NuxtLink>
                        </li>
                        <li
                            class="submenuItem"
                            v-for="(childItem, idx) in item.children"
                            :key="idx"
                        >
                            <NuxtLink :to="childItem.url">{{
                                childItem.name
                            }}</NuxtLink>
                        </li>
                    </template>
                </appAccordionItem>

                <li v-else :key="'li-' + idx" class="noSubmenu">
                    <NuxtLink :to="item.url">{{ item.name }}</NuxtLink>
                </li>
            </template>
        </appAccordionWrapper>
        <a
            v-if="globalSetting.phones"
            :href="`tel:+${globalSetting.phones[0].number}`"
            class="telephone"
            >{{ globalSetting.phones[0].label }}</a
        >
    </nav>
</template>

<style lang="scss">
.appLink {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.menu {
    .accordion__trigger {
        border-bottom: 1px solid #2a4651;
        padding-bottom: 10px;
    }

    .accordion__content {
        margin-top: 27px;

        li {
            border-bottom: 1px solid #2a4651;
        }

        li:last-of-type {
            // border-bottom: none;
            // margin-bottom: 20px;
        }
    }

    .accordion__trigger_active {
        border-bottom: none !important;
        color: $c-btn;

        i::before {
            color: inherit !important;
        }
    }

    .router-link-active {
        color: $c-btn;
    }
}

.accordion__content {
    .submenuItem {
        font-weight: 300 !important;
    }

    margin-bottom: 40px !important;
}
</style>

<style lang="scss" scoped>
.w100-m {
    @media (max-width: 576px) {
        width: 100%;
        display: flex;
        flex-direction: column;

        .telephone {
            margin-top: 50px;
        }
    }
}

.menu {
    position: relative;
    height: 100%;

    @media (max-width: 576px) {
        display: flex;
        flex-direction: column;
        width: 100%;
        overflow-y: scroll;
        max-height: 70vh;

        li {
            margin-right: 0px !important;
            padding-bottom: 10px;

            &:not(:first-of-type) {
                margin-top: 27px;
            }

            a {
                justify-content: space-between !important;
                width: 100%;
            }
        }
    }

    li {
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 100%;
        color: #ffffff;

        &:not(:last-of-type) {
            margin-right: 40px;
        }

        a {
            transition: 0.3s;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &:hover {
            .appLink {
                color: $c-btn;
            }
        }
    }
}

.noSubmenu {
    border-bottom: 1px solid #2a4651;
}

.hasSubmenu {
    position: relative;

    &:before {
        content: "";
        bottom: -12px;
        left: 50%;
        width: 10px;
        height: 10px;
        transform: translate(-50%, 0) rotate(45deg);
        background-color: $c-gray;
        position: absolute;
        z-index: 5;
        opacity: 0;
        transition: 0.3s;
        // transition-delay: 0.2s;
    }

    .ic-dropdown {
        vertical-align: bottom;
    }

    &:hover {
        &:before {
            transition-delay: 0s;
            opacity: 1;
            max-height: 1000px;
        }

        .subMenu {
            transition-delay: 0s;
            opacity: 1;
            visibility: visible;
        }
    }
}

.subMenu {
    opacity: 0;
    margin-top: 27px;
    visibility: hidden;
    transition: 0.3s;
    // transition-delay: 0.3s;
    max-height: 0px;
    background-color: #ccc;
    padding: 15px;
    top: calc(100% + 5px);
    left: 0px;
    background-color: $c-gray;
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;

    &::before {
        content: "";
        width: 100%;
        top: -10px;
        height: 10px;
        left: 0;
        position: absolute;
    }

    li {
        font-weight: 300;
        font-size: 14px;
        line-height: 100%;
        padding-bottom: 10px;
        border-bottom: 1px solid #2a4651;
        margin-bottom: 10px;
        margin-right: 40px;
        text-align: left;

        * {
            text-align: left;
        }

        a {
            display: block;
        }

        &:hover {
            a {
                color: $c-btn;
            }
        }
    }
}
</style>
