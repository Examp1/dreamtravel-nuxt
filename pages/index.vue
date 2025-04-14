<script setup>
// import { createError } from "vue";
import { useNuxtApp } from "#app";
const { $httpService } = useNuxtApp();
const { data, status } = await $httpService.post("/api/page/get-by-slug", {
    lang: "en",
    slug: "/",
});

console.log(data);

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
    <div>
        <!-- {{ data }} -->
    </div>
</template>

<style lang="scss" scoped></style>
