<script setup>
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";

// Пропсы
const props = defineProps({
    tabList: {
        type: [Array, Object],
        required: true,
        default: null,
    },
    currentRegion: {
        type: String,
    },
});

const emit = defineEmits(["getCurrentRegion"]);

const currentIdx = ref(0);
function getCurrentRegion(region, key) {
    emit("getCurrentRegion", region);
    currentIdx.value = key;
}
</script>

<template>
    <div v-if="tabList" class="tabs2" :options="flickityOptions">
        <div
            class="item"
            :class="{ active: currentRegion == 'all' }"
            @click="$emit('getAllRegion')"
        >
            {{ $t("all") }}
        </div>
        <div
            class="item"
            v-for="(item, idx, key) in tabList"
            :key="key"
            @click="getCurrentRegion(idx, key)"
            :class="{ active: key == currentIdx && currentRegion != 'all' }"
        >
            {{ item }}
        </div>
    </div>
</template>

<style lang="scss">
.tabs2 {
    display: flex;
    justify-content: center;
}

.item {
    padding: 12px 20px;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 100%;
    color: $c-btn;
    box-shadow: 0 0 0px 1px inset $c-btn;

    &.router-link-exact-active.router-link-active,
    &.active {
        color: #17171d;
        font-weight: 600;
        background-color: #4aa7bc;
    }
}
</style>
