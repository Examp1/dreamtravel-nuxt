<script setup>
import { ref, computed, watch } from "vue";
import { useField, ErrorMessage } from "vee-validate";

const props = defineProps({
    propsData: {
        type: Object,
        required: true,
        validator: (data) => "name" in data && "list" in data,
    },
});

const { value: fieldValue, handleChange } = useField(props.propsData.name);

const checkGroup = ref(fieldValue.value ? fieldValue.value.split(",") : []);

watch(
    checkGroup,
    (newValue) => {
        handleChange(newValue.join(","));
    },
    { deep: true },
);

// 4. Обработчик выбора элемента
const setCheckBoxValue = (checkBoxValue) => {
    const index = checkGroup.value.indexOf(checkBoxValue);
    if (index === -1) {
        checkGroup.value.push(checkBoxValue);
    } else {
        checkGroup.value.splice(index, 1);
    }
};
</script>

<template>
    <div class="checkGroup">
        <div
            class="item"
            v-for="({ item }, index) in propsData.list"
            :key="index"
            :class="{ active: checkGroup.includes(item) }"
            @click="setCheckBoxValue(item)"
        >
            <div class="deco"><i class="ic-check1"></i></div>
            {{ item }}
        </div>
    </div>
    <ErrorMessage :name="propsData.name" v-slot="{ message }">
        <span class="tip">{{ message }}</span>
    </ErrorMessage>
</template>

<style lang="scss" scoped>
.checkGroup {
    grid-column: 1 / -1;
    margin: 25px 0;

    .item {
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 100%;
        color: #777777;
        cursor: pointer;

        .deco {
            width: 16px;
            height: 16px;
            box-shadow: 0 0 0 1px #777777;
            display: inline-block;
            vertical-align: middle;
            margin-right: 10px;

            i {
                height: 100%;
                width: 100%;
                text-align: center;
                color: #fff;
                font-size: 10px;
                justify-content: center;
                align-items: center;
                display: none;
            }
        }

        & + .item {
            margin-top: 14px;
        }

        &.active {
            color: $c-btn;

            .deco {
                background-color: $c-btn;
                box-shadow: 0 0 0 1px $c-btn;

                i {
                    display: flex;
                }
            }
        }
    }
}
</style>
