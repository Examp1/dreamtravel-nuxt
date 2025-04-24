<script setup>
const route = useRoute();
defineProps({
    propsData: [Object, Array],
});
</script>

<template>
    <div
        class="contentWrapper quote-block"
        :class="{ container: route.name.includes('pageSlug___') }"
    >
        <div
            ref="textWrapper"
            class="contentWrapper"
            v-html="propsData.text"
        ></div>
        <div class="author" v-html="propsData.title"></div>
    </div>
</template>

<style lang="scss" scoped>
:deep(.contentWrapper) {
    font-style: italic;
    font-weight: 300;
    font-size: 17px;
    line-height: 150%;
    color: $c-white;
    // margin-bottom: 35px;
    *,
    * > * {
        color: inherit !important;
    }
}

.author {
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 150%;
    color: $c-btn;

    padding-left: 30px;
    margin-top: 20px;
    position: relative;

    &:before {
        content: "";
        position: absolute;
        top: 11px;
        left: 2px;
        width: 17px;
        height: 2px;
        background-color: $c-btn;
    }
}
</style>
