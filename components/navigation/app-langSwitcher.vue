<script setup>
import { useI18n } from "vue-i18n";
import { useGlobalStore } from "@/stores/global";
const { locale, locales, setLocale } = useI18n();

const globalStore = useGlobalStore();
const lolizedValue = {
    uk: "Укр",
    en: "Eng",
};

// Обработчик смены языка
const handleLanguageChange = async () => {
    await globalStore.fetchMenus(locale.value);
    await globalStore.fetchGlobalSettings(locale.value);
};
</script>

<template>
    <ul class="lang-switcher df">
        <!-- <li :class="{ active: locale === 'en' }">Eng</li>
        <span></span>
        <li :class="{ active: locale === 'uk' }">Укр</li> -->
        <li
            v-for="lang in locales"
            :class="{ active: locale === lang.code }"
        >
            <NuxtLink
                :key="lang.code"
                :to="lang.code"
                @click.prevent="setLocale(lang.code)"
            >
                {{ lolizedValue[lang.code] }}
            </NuxtLink>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
.lang-switcher {
    margin-left: auto;

    li {
        font-size: 14px;
        line-height: 100%;
        color: $t-gray;
        transition: 0.3s;

        &:hover {
            color: $c-btn;
        }

        &.active {
            color: #fff;
            font-weight: 600;
        }

        &:first-of-type {
            margin-right: 20px;
            position: relative;

            &::after {
                position: absolute;
                content: "";
                width: 1px;
                height: 20px;
                background-color: #28292f;
                top: -2px;
                right: -10px;

                @media (max-width: 576px) {
                    background-color: #777;
                }
            }
        }
    }
}
</style>
