<script setup>
defineProps({
    propsData: Object,
});
</script>

<template>
    <div class="labelcomponent">
        {{ propsData.placeholder }}
    </div>
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

    @media (max-width: 567px) {
        grid-column: unset;
    }
}
</style>
