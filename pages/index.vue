<script setup>
import { useNuxtApp } from "#app";
import appSeoText from "~/components/constructor/app-seo-text.vue";
const { $httpService } = useNuxtApp();
const {
    data: { data },
    status,
} = await $httpService.post("/api/page/get-by-slug", {
    lang: "en",
    slug: "/",
});

if (status !== 200) {
    throw createError({
        statusCode: 404,
        statusMessage: "Page Not Found",
        fatal: true,
    });
}
// async created() {
//   this.lockUi();
//   let test = null;
//   if (
//     this.$route.fullPath.split("/").splice(1, 3).join() === "" ||
//     this.$route.fullPath.split("/").splice(1, 3).join() == "uk"
//   ) {
//     test = "/";
//   } else {
//     test = this.$route.fullPath.split("/").splice(1, 3).join();
//   }
//   const res = await this.axios.post("/api/page/get-by-slug", {
//     lang: this.currentLang,
//     slug: test
//   });
//   document.title =
//     res.data.data.translate.meta_title ||
//     res.data.data.translate.title ||
//     "Dream Travel";
//   this.homePageData = res.data.data;
//   this.unlockUi();
// }
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
