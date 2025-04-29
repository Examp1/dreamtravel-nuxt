<script setup>
defineProps({
    propsData: Object,
});
</script>

<template>
    <div v-if="propsData.placeholder" class="labelcomponent">
        {{ propsData.placeholder }}
    </div>
    <div v-else class="labelcomponent" v-html="propsData.value"></div>
</template>

<style lang="scss" scoped>
.labelcomponent {
    grid-column: 1 / -1;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    color: #ffffff;
    margin-top: 15px;
    & > *,
    & > * > * {
        font-weight: inherit !important;
        font-size: inherit !important;
        line-height: inherit !important;
        color: inherit !important;
        font-family: inherit !important;
    }
    @media (max-width: 567px) {
        grid-column: unset;
    }
}
</style>
