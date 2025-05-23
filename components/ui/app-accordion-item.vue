<template>
    <li class="accordion__item">
        <div
            class="accordion__trigger"
            :class="{ accordion__trigger_active: visible }"
            @click="open"
        >
            <slot name="accordion-trigger"></slot>
        </div>

        <transition
            name="accordion"
            @enter="start"
            @after-enter="end"
            @before-leave="start"
            @after-leave="end"
        >
            <div class="accordion__content" v-show="visible">
                <ul>
                    <slot name="accordion-content"></slot>
                </ul>
            </div>
        </transition>
    </li>
</template>

<script setup>
import { inject, computed, ref, watch } from "vue";

const emit = defineEmits(["activeWrp"]);

// Инжектим состояние аккордеона
const Accordion = inject("Accordion");

// Создаем уникальный индекс для каждого элемента
const index = ref(null);
index.value = Accordion.count++;

// Вычисляемое свойство для видимости
const visible = computed(() => index.value === Accordion.active);

// Наблюдаем за изменениями видимости
watch(visible, (val) => {
    emit("activeWrp", val);
});

// Методы для управления аккордеоном
const open = () => {
    Accordion.active = visible.value ? null : index.value;
};

const start = (el) => {
    el.style.height = `${el.scrollHeight}px`;
};

const end = (el) => {
    el.style.height = "";
};
</script>

<style lang="scss" scoped>
.accordion__item > div {
    cursor: pointer;
    position: relative;

    i::before {
        color: #c3c2c2;
    }
}

.accordion__trigger {
    display: flex;
    justify-content: space-between;
}

.accordion-enter-active,
.accordion-leave-active {
    will-change: height, opacity;
    transition:
        height 0.3s ease,
        opacity 0.3s ease;
    overflow: hidden;
}

.accordion-enter,
.accordion-leave-to {
    height: 0 !important;
    opacity: 0;
}

.accordion__trigger_active {
    color: #fff;
}

.filterTour .accordion__content ul {
    display: grid;
    grid-template-columns: 1fr;
    font-weight: 500;
    font-size: 15px;
    line-height: 125%;
    color: #555555;
    text-decoration-line: underline;
    grid-row-gap: 10px;
}
</style>
