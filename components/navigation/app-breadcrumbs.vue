<script setup>
defineProps({
    breadcrumbs: [Array, Object],
});
</script>

<template>
    <ul class="breadcrumbs">
        <li v-for="(item, idx) in breadcrumbs" :key="idx">
            <a :href="item.url">{{ item.title || item.name }}</a>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
.breadcrumbs {
    display: flex;
    align-items: center;
    margin-bottom: 29px;

    @media (max-width: 576px) {
        flex-wrap: wrap;
        // overflow-x: scroll;
    }

    li {
        font-weight: 300;
        font-size: 14px;
        line-height: 140%;
        text-align: center;
        color: #cacaca;
        position: relative;

        @media (max-width: 576px) {
            white-space: nowrap;
            margin-bottom: 10px;
        }

        &:last-of-type {
            color: $c-btn;
            pointer-events: none;
        }

        &:not(:last-of-type) {
            margin-right: 26px;

            &::after {
                content: ">";
                position: absolute;
                top: 55%;
                transform: translateY(-50%);
                right: -16px;
                line-height: 140%;
            }
        }
    }
}
</style>
