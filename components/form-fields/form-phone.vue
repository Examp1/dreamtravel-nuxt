<script setup>
import { vMaska } from "maska/vue";
import { Field, ErrorMessage } from "vee-validate";

const props = defineProps({
    propsData: Object,
});
</script>

<template>
    <div class="inputComponent">
        <label class="wrpimp">
            <span class="placeholder" v-if="propsData.title">{{
                propsData.title
            }}</span>
            <Field
                :name="propsData.name"
                type="phone"
                v-maska="'+###################'"
                :placeholder="propsData.placeholder"
                class="input"
            />
        </label>

        <ErrorMessage :name="propsData.name" v-slot="{ message }">
            <span class="tip">{{ message }}</span>
        </ErrorMessage>
    </div>
</template>

<style lang="scss" scoped src="./form-field.scss"></style>
