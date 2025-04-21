<script setup>
import { ref } from "vue";
import { ErrorMessage, useField } from "vee-validate";
import { useClickOutside } from "@/composables/useClickOutside";

const props = defineProps({
    propsData: {
        type: Object,
        required: true,
        validator: (data) => {
            return "name" in data && "list" in data;
        },
    },
});

const isSelectOpen = ref(false);
const wrapperRef = ref(null);

// Подключаем поле к vee-validate
const { value: selectedItem, handleChange } = useField(props.propsData.name);

useClickOutside(wrapperRef, () => {
    isSelectOpen.value = false;
});

const selectItem = (item) => {
    handleChange(item.item); // Используем handleChange из useField
    isSelectOpen.value = false;
};
</script>

<template>
    <div class="inputComponent">
        <label
            class="wrpimp"
            ref="wrapperRef"
            @click.self="isSelectOpen = !isSelectOpen"
        >
            <span class="placeholder" v-if="propsData.title">
                {{ propsData.title }}
            </span>

            <!-- Выбранный элемент -->
            <div class="selected-item">
                {{ selectedItem || "Выберите..." }}
            </div>

            <!-- Выпадающий список -->
            <div class="select" :class="{ open: isSelectOpen }">
                <div
                    v-for="(opt, index) in propsData.list"
                    :key="index"
                    class="option"
                    @click="selectItem(opt)"
                >
                    {{ opt.item }}
                </div>
            </div>
        </label>

        <ErrorMessage :name="propsData.name" v-slot="{ message }">
            <span class="tip">{{ message }}</span>
        </ErrorMessage>
    </div>
</template>

<style lang="scss" scoped src="./form-field.scss"></style>
<style lang="scss" scoped>
.hidden {
    visibility: hidden;
    position: absolute;
}
.selected-item {
    position: absolute;
    top: 21px;
    left: 16px;
    font-size: 16px;
}
.select {
    position: absolute;
    top: 50px;
    background-color: #fff;
    width: 100%;
    transition: 0.3s;
    opacity: 0;
    visibility: hidden;
    &.open {
        opacity: 1;
        visibility: visible;
    }
    .option {
        font-size: 16px;
        box-sizing: border-box;
        padding: 5px 10px;
        width: 100%;
        cursor: pointer;
        background-color: #fff;
        &.empty {
            color: #aba7a7;
        }

        &:hover {
            background: #c1dbe1;
        }
    }
}
</style>
