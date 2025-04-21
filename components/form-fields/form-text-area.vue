<!-- <script>
import defaultinput from "./DefaultInputMixin.js";
export default {
    name: "TextArea",
    mixins: [defaultinput],
    props: {
        description: {
            type: String,
            default: "",
        },
    },
};
</script> -->

<script setup>
import { Field, ErrorMessage } from "vee-validate";

const props = defineProps({
    propsData: Object,
});
</script>

<template>
    <div class="tawrp">
        <label class="inputComponent">
            <Field
                :name="propsData.name"
                type="text"
                :placeholder="propsData.placeholder"
                as="textarea"
            />
            <!-- <textarea
                :id="`input${_uid}`"
                :type="itype ? itype : 'text'"
                v-model.trim="value"
                @keyup="onKeyUp"
                :name="propname"
                @focus="onFocus"
                @blur="onBlur"
                :placeholder="placeholder"
                :class="{ active: isFocus }"
            ></textarea> -->
            <!-- <span class="labeltxt" :class="{ active: value != '' || isFocus }">{{
                  placeholder
              }}</span> -->
        </label>
        <ErrorMessage :name="propsData.name" v-slot="{ message }">
            <span class="tip">{{ message }}</span>
        </ErrorMessage>
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
