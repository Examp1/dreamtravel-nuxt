<script setup>
import { useI18n } from "vue-i18n";
const { locale, locales, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const lolizedValue = {
    uk: "Укр",
    en: "Eng",
};
</script>
!
<template>
    <ul class="lang-switcher df">
        <li v-for="lang in locales" :class="{ active: locale === lang.code }">
            <NuxtLink
                :key="lang.code"
                :to="switchLocalePath(lang.code)"
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
