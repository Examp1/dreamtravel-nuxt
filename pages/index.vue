<script setup>
import { useNuxtApp } from "#app";
import appSeoText from "~/components/constructor/app-seo-text.vue";
import constructorRender from "~/components/constructor/constructor-render.vue";
import { useMetaHead } from "~/composables/useMetaHead.js";
const { $httpService } = useNuxtApp();
const { locale } = useI18n();

const { data, status } = await $httpService.post("/api/page/get-by-slug", {
    lang: locale.value,
    slug: "/",
});

if (status !== 200) {
    throw createError({
        statusCode: 404,
        statusMessage: "Page Not Found",
        fatal: true,
    });
}

if (data.meta) {
    useMetaHead(data.meta);
}
</script>

<template>
    <div class="home">
        <!-- TODO v-if="!isUiLocked" -->
        <section
            class="firstScreen"
            style="
                background-image: url(https://ohmydream.club/images/first_bg.png);
            "
        >
            <div class="text">
                <span class="bef">{{ data.translate.description }}</span>
                <h1>{{ data.translate.title }}</h1>
            </div>
        </section>
        <constructorRender
            :constructor="data.constructor"
            :widgets="data.widgets"
        />
        <appSeoText
            v-if="data.translate?.seo_text"
            :propsData="data.translate?.seo_text"
        />
    </div>
</template>

<style lang="scss">
.firstScreen {
    height: calc(100vh - 130px);
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    text-align: center;
    color: #fff;
    z-index: 2;

    &::before {
        content: "";
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.9) 100%
        );
        z-index: -1;
    }

    .text {
        h1 {
            font-weight: bold;
            font-size: 91px;
            line-height: 100%;
            margin-top: 0px;
            margin-bottom: 95px;

            @media (max-width: 1024px) {
                font-size: 52px;
                margin-bottom: 60px;
            }

            @media (max-width: 830px) {
                font-size: 35px;
                margin-bottom: 30px;
            }

            @media (max-width: 576px) {
                font-size: 35px;
                line-height: 100%;
                margin-top: 20px;
            }
        }

        span {
            font-weight: 500;
            font-size: 25px;
            line-height: 140%;
            position: relative;

            @media (max-width: 830px) {
                font-size: 16px;
                line-height: 140%;
            }
        }
    }
}

.bottomInfo {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;

    @media (max-width: 830px) {
        .descr {
            max-width: 293px;
        }
    }

    @media (max-width: 576px) {
        flex-direction: column;
        text-align: center;
    }

    .number {
        font-size: 39px;
        margin-bottom: 5px;
        margin-top: 0px;
    }
}
</style>
