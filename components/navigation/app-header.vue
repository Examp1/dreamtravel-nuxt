<script setup>
import { ref, computed, watch } from "vue";
import { NuxtLink } from "#components";
import useUtils from "@/composables/useUtils.js";
const { getMediaPath } = useUtils();

import { getWindowSize } from "@/stores/windowSize";
const { getSize } = storeToRefs(getWindowSize());

import AppLangSwitcher from "./app-langSwitcher.vue";
import NavMenuM from "./nav_menu/navMenu-m.vue";
import NavMenuT from "./nav_menu/navMenu-t.vue";
import NavMenu from "./nav_menu/navMenu.vue";

import { useGlobalStore } from "@/stores/global";
const { globalSetting, headerMenu } = storeToRefs(useGlobalStore());
const route = useRoute();


const menuOpen = ref(false);

const menuView = computed(() => {
    if (getSize.value === "mobile") {
        return NavMenuM;
    } else if (getSize.value === "tablet") {
        return NavMenuT;
    } else {
        return NavMenu;
    }
});

watch(() => route.path, () => {
  menuOpen.value = false;
});

</script>
<!-- <script>
    mounted() {
        setTimeout(() => {
            const headerHeight = this.$refs.header.clientHeight;
            document.addEventListener("scroll", () => {
                if (window.scrollY + 20 >= headerHeight) {
                    this.$refs.header.classList.add("fixed");
                } else {
                    this.$refs.header.classList.remove("fixed");
                }
            });
        }, 1000);
    },
};
</script> -->
<template>
    <header v-if="getSize === 'desktop'" ref="header">
        <div class="header__top container df jcsb">
            <a
                v-if="globalSetting.phones"
                :href="`tel:+${globalSetting.phones[0].number}`"
                class="telephone"
                >{{ globalSetting.phones[0].label }}</a
            >
            <div class="r-block df ait jcsb">
                <app-lang-switcher></app-lang-switcher>
            </div>
        </div>
        <div class="header__bot">
            <div class="container no-p df jcsb">
                <component
                    :is="route.name.includes('index') ? 'span' : NuxtLink"
                    class="logo"
                    to="/"
                    ><img
                        :src="getMediaPath(globalSetting.site_logo_header)"
                        alt="logo"
                        class="logo"
                /></component>
                <nav-menu :propData="headerMenu"></nav-menu>
            </div>
        </div>
    </header>
    <!-- todo  -->
    <header v-else>
        <div class="container header__bot df jcsb">
            <component
                :is="route.name.includes('index') ? 'span' : NuxtLink"
                class="logo"
                to="/"
                >{{ globalSetting.logo_text }}</component
            >
            <button class="burgerTrigger" @click="menuOpen = !menuOpen">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
        <!-- todo -->
        <div class="mobMenu" :class="{ open: menuOpen }">
            <div class="top">
                <a
                    v-if="globalSetting.phones && getSize !== 'desktop'"
                    :href="`tel:+${globalSetting.phones[0].number}`"
                    class="telephone"
                    >{{ globalSetting.phones[0].label }}</a
                >
                <div class="r-block df ait jcsb">
                    <app-lang-switcher></app-lang-switcher>
                    <button
                        class="burgerTriggerClose"
                        @click="menuOpen = !menuOpen"
                    >
                        &times;
                    </button>
                </div>
            </div>
            <div class="bot">
                <component :is="menuView" :propData="headerMenu"></component>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
header {
    background-color: $c-black;
    color: #fff;
    z-index: 1001;
    top: 0px;

    &.fixed {
        @media (min-width: 1200px) {
            width: 100%;
            position: fixed;
            top: -45px;
        }

        // left: 50%;
        // transform: translateX(-50%);
        // transition: .3s;
    }
}

.header__top {
    padding: 10px 0px;
}

.header__bot {
    background-color: $c-gray;
}

.logo {
    font-size: 34px;
    font-weight: 600;
    padding: 8.5px 0px;
    display: flex;
}

ul {
    margin: 0px;
}

.telephone {
    font-weight: 300;
    font-size: 17px;
    line-height: 150%;
    text-align: center;
    color: $t-gray;
    margin-left: 20px;

    @media (max-width: 576px) {
        margin-left: 0px;
    }
}

.burgerTrigger {
    border: none;
    background-color: unset;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;

    span {
        background-color: $c-btn;
        width: 36px;
        height: 3px;

        &:not(:last-of-type) {
            margin-bottom: 6px;
        }
    }
}

// mobMenu style
.mobMenu {
    position: fixed;
    top: -200%;
    transition: 0.5s;
    background-color: $c-gray;
    width: 100%;
    z-index: 1001;
    padding: 20px;

    &.open {
        top: 0px;
    }

    @media (max-width: 1024px) {
        padding-bottom: 38px;
    }

    @media (max-width: 576px) {
        min-height: 100vh;
        padding-bottom: 20px;
    }

    .top {
        margin-bottom: 45px;
        display: flex;
        justify-content: space-between;
        width: 100%;

        @media (max-width: 576px) {
            margin-bottom: 77px;
        }
    }

    .bot {
        display: flex;
        justify-content: center;

        @media (max-width: 576px) {
            width: 100%;
            justify-content: flex-start;
        }
    }

    .burgerTriggerClose {
        padding: 0;
        font-size: 60px;
        line-height: 30px;
        border: unset;
        background-color: unset;
        color: #2a4651;
        transition: 0.3s;
        margin-left: 100px;

        @media (max-width: 830px) {
            margin-left: 40px;
        }

        &:hover {
            color: $c-btn;
        }
    }
}
</style>
