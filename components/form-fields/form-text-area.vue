<script setup>
import { useField } from "vee-validate";
import { createFiedlValidationRules } from "~/composables/createFieldValidationSheme";

const props = defineProps({
    propsData: Object,
});

const fieldRules = createFiedlValidationRules(props.propsData);
const { value, errorMessage } = useField(props.propsData.name, fieldRules, {
    initialValue: "",
});
</script>

<template>
    <div class="tawrp">
        <label class="inputComponent">
            <textarea
                v-model="value"
                :name="propsData.name"
                type="text"
                :placeholder="propsData.placeholder"
                as="textarea"
            />
        </label>

        <span class="tip">{{ errorMessage }}</span>

        <span class="desc">{{ propsData.description }}</span>
    </div>
</template>

<style lang="scss" scoped>
.tawrp {
    grid-column: 1 / -1;
}
textarea {
    height: 80px;
    width: 100%;
    border: none;
    background-color: #fff;
    outline: none;
    padding: 18px 15px;
    resize: none;
    display: block;

    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 130%;
    letter-spacing: 0.01em;
    color: #111325;

    &.active {
        box-shadow: 0 0 0px 2px $c-btn;
    }

    &::placeholder {
        color: #aba7a7;
    }
}

.tip {
    color: #ff2e2e;
    display: block;
}
</style>
