<script setup>
import { ref, watch } from "vue";
import { useField, ErrorMessage } from "vee-validate";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps({
    propsData: Object,
});

const date = ref();

const formatDate = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const dayName = days[date.getDay()];

    return `${day} ${month}, ${dayName}`;
};

const { handleChange } = useField(props.propsData.name);

watch(date, () => {
    handleChange(date.value)
});
</script>

<template>
    <div class="inputComponentWrp">
        <div class="inputComponent">
            <label class="wrpimp">
                <span class="placeholder" v-if="propsData.title">{{
                    propsData.title
                }}</span>
                <!-- <Field
                    :name="propsData.name"
                    type="text"
                    :placeholder="propsData.placeholder"
                    class="hidden"
                /> -->
                <VueDatePicker
                    class="date-picker"
                    v-model="date"
                    auto-apply
                    :enable-time-picker="false"
                    :format="'dd.MM.yyyy'"
                    :preview-format="formatDate"
                ></VueDatePicker>
            </label>
        </div>
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
:deep(.date-picker) {
    position: absolute;
    bottom: 0;
    border: none;
    .dp__pointer {
        border: none !important;
    }
}
:deep(.dp__input_icon) {
    left: auto !important;
    right: 10px !important;
    top: 30%;
}
:deep(.dp--clear-btn) {
    display: none;
}

:deep(.dp__input) {
    padding-left: 16px;
    padding-right: 40px;
}
.placeholder {
    z-index: 1;
}
</style>
