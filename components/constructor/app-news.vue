<script setup>
import AppNewsItem from "../news/app-news-item.vue";

defineProps({
    propsData: [Object, Array],
});
// import { mapGetters } from "vuex";
// import appNewsItem from "./common/app-news-item.vue";
// import CheckBoxGroup from "./common/inputs/CheckBoxGroup.vue";
// export default {
//     components: { appNewsItem, CheckBoxGroup },
//     props: {
//         propsData: {
//             type: [Array, Object],
//         },
//     },
// };
</script>
<template>
    <section>
        <div class="news container">
            <h2 class="sectionTitle bef">
                {{ propsData.title || $t("newsTitle") }}
            </h2>
            <div class="newsWrapper">
                <AppNewsItem
                    v-for="(item, idx) in propsData?.list"
                    :data="item"
                    :key="idx"
                ></AppNewsItem>
            </div>
            <div class="bottomInfo">
                <div class="text" v-if="propsData?.count_articles">
                    <p class="number">{{ propsData.count_articles }}+</p>
                    <div class="descr">
                        {{ propsData.subtitle }}
                    </div>
                </div>
                <NuxtLink
                    v-if="propsData.btn_link && propsData.btn_name"
                    :to="propsData.btn_link"
                    class="btn"
                >
                    {{ propsData.btn_name }}
                    <i class="icon ic-arrow"></i>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.news {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    // @include sectionPadding;
    // @media (max-width: 830px) {
    //   padding: 100px 0px;
    // }

    .newsWrapper {
        margin-top: 77px;
        display: grid;
        width: 100%;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 30px;
        margin-bottom: 80px;

        @media (max-width: 830px) {
            grid-template-columns: repeat(2, 1fr);
            margin-top: 53px;
        }

        @media (max-width: 576px) {
            grid-template-columns: repeat(1, 1fr);
        }

        .newItem {
            transform: unset !important;
        }
    }
}
</style>
