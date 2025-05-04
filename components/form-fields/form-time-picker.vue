<script setup>
import { vMaska } from "maska/vue";
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
    <div class="inputComponent">
        <label class="wrpimp">
            <span class="placeholder" v-if="propsData.title">{{
                propsData.title
            }}</span>
            <input
                v-model="value"
                :name="propsData.name"
                as="input"
                type="text"
                v-maska="'##:##'"
                :placeholder="propsData.placeholder"
                class="input"
            />
        </label>

        <span class="tip">{{ errorMessage }}</span>
    </div>
</template>

<style lang="scss" scoped src="./form-field.scss"></style>
