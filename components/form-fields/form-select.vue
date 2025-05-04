<script setup>
import { ref } from "vue";
import { createFiedlValidationRules } from "~/composables/createFieldValidationSheme";
import { useField } from "vee-validate";
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
const fieldRules = createFiedlValidationRules(props.propsData);
const { value: selectedItem, errorMessage, handleChange  } = useField(
    props.propsData.name,
    fieldRules,
    {
        initialValue: "",
    },
);

useClickOutside(wrapperRef, () => {
    isSelectOpen.value = false;
});

const selectItem = (item) => {
    handleChange(item.item || item);
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
                <span v-if="selectedItem">{{ selectedItem }}</span>
                <span v-else class="empty">{{ $t("choose") }}</span>
            </div>

            <!-- Выпадающий список -->
            <div class="select" :class="{ open: isSelectOpen }">
                <div
                    v-for="(opt, index) in propsData.list || propsData.options"
                    :key="index"
                    class="option"
                    @click="selectItem(opt)"
                >
                    {{ opt.item || opt }}
                </div>
            </div>
        </label>

        <span class="tip">{{ errorMessage }}</span>
    </div>
</template>

<style lang="scss" scoped src="./form-field.scss"></style>
<style lang="scss" scoped>
.wrpimp {
    cursor: pointer;
}
.hidden {
    visibility: hidden;
    position: absolute;
}
.selected-item {
    position: absolute;
    top: 21px;
    left: 16px;
    font-size: 16px;
    pointer-events: none;
}
.select {
    position: absolute;
    top: 50px;
    background-color: #fff;
    width: 100%;
    transition: 0.3s;
    opacity: 0;
    visibility: hidden;
    z-index: 1;
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
.empty {
    color: #aba7a7;
    font-size: 14px;
}
</style>
