<script setup>
import { useNuxtApp } from "#app";
const { $httpService } = useNuxtApp();
import { useForm } from "vee-validate";
import { computed, ref, onMounted } from "vue";
import useUtils from "@/composables/useUtils.js";
import formInput from "../form-fields/form-input.vue";
import formLabel from "../form-fields/form-label.vue";
// import formEmail from "../form-fields/form-email.vue";
import formSelect from "../form-fields/form-select.vue";
import formDataPicker from "../form-fields/form-data-picker.vue";
import formTextArea from "../form-fields/form-text-area.vue";
// import formPhone from "../form-fields/form-phone.vue";
import formTimePicker from "../form-fields/form-time-picker.vue";
import FormCheckboxGroup from "../form-fields/form-checkbox-group.vue";

const route = useRoute();
const isLoaded = ref(false);
const { validateField, handleSubmit } = useForm();
const { getMediaPath } = useUtils();

const props = defineProps({
    propsData: [Array, Object],
});

const bg = computed(() => {
    const path = getMediaPath(props.propsData.form_image);
    return path ? { backgroundImage: `url('${path}')` } : null;
});
const isSuccess = ref(false);

const getComponentName = (name) => {
    switch (name) {
        case "form-input":
            return formInput;
        // case "phone":
        //     return formPhone;
        // case "email":
        //     return formEmail;
        case "form-time-picker":
            return formTimePicker;
        case "form-select":
            return formSelect;
        case "form-checkbox-group":
            return FormCheckboxGroup;
        case "form-text":
            return formLabel;
        case "form-editor":
            return formTextArea;
        case "form-data-picker":
            return formDataPicker;
        default:
            return "";
    }
};

const onSubmit = handleSubmit((values) => {
    $httpService.post("/api/request/send", {
        form_id: props.propsData.form_id,
        ...values,
    });
    isSuccess.value = true;
});

onMounted(() => {
    isLoaded.value = true;
});
</script>

<template>
    <section class="specContainer">
        <div class="bgWrp" :style="bg">
            <div v-if="!isSuccess" class="formWrp" ref="formBody">
                <form @submit="onSubmit" ref="requestForm">
                    <component
                        v-for="(field, idx) in propsData.form_data"
                        :key="field.name + '-' + idx"
                        :is="getComponentName(field.type)"
                        :propsData="field"
                    />
                    <div class="btnsWrp">
                        <button
                            class="submit"
                            type="submit"
                            :class="{ disabled: !isLoaded }"
                        >
                            {{ propsData.form_btn_name }}
                        </button>
                    </div>
                </form>
            </div>
            <div v-else class="formWrp">
                <div class="success" key="k2">
                    <transition name="imgAppear" appear
                        ><img src="@/assets/image/succesfull.svg" alt=""
                    /></transition>
                    <div class="txt">
                        {{ $t("requestFormSuccess") }}
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.locfade-enter-active,
.locfade-leave-active {
    transition: opacity 0.5s;
}

.locfade-enter,
.locfade-leave-to {
    opacity: 0;
}

.imgAppear-enter-active,
.imgAppear-leave-active {
    transition: 0.5s ease;
    transform: translate(0, 0);
    transition-delay: 0.5s;
}

.imgAppear-enter,
.imgAppear-leave-to {
    opacity: 0;
    transform: translate(0, -100px);
}

.titleWrp {
    text-align: center;
}

.descr {
    margin: 0 auto 45px;
    font-weight: 300;
    font-size: 17px;
    line-height: 150%;
    text-align: center;
    color: #ffffff;
    max-width: 586px;
}

.bgWrp {
    padding: 168px 0;
    background-position: center;
    background-size: cover;

    @media (max-width: 567px) {
        padding: 0;
    }

    .formWrp {
        width: 100%;
        max-width: 565px;
        margin: 0 auto;
        padding: 40px;
        background: rgba(0, 0, 0, 0.7);

        @media (max-width: 567px) {
            padding: 15px;
        }
        form {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }

        .btnsWrp {
            margin-top: 40px;

            .submit {
                display: block;
                border: none;
                padding: 24px 10px;
                background-color: $c-btn;
                font-style: normal;
                font-weight: 600;
                font-size: 18px;
                line-height: 120%;
                color: #ffffff;
                width: 100%;

                &:hover {
                    background-color: #82ccdc;
                }
            }
        }
    }
    .success {
        padding: 80px 0;

        img {
            display: block;
            margin: 0 auto;
        }

        .txt {
            font-style: normal;
            font-weight: 500;
            font-size: 25px;
            line-height: 140%;
            text-align: center;
            color: #ffffff;
            margin-top: 40px;
        }
    }
}

.specContainer {
    &.isFocus {
        box-shadow: 0 0 0 1px inset red;
    }

    @media (max-width: 576px) {
        padding: 50px 0;

        .titleWrp {
            padding: 0 25px;
        }
    }
}

#requestForm {
    .titleWrp {
        padding-bottom: 0;
    }
}
.disabled {
    pointer-events: none;
    opacity: 0.5;
}
</style>

<style lang="scss">
*::placeholder {
    font-size: 14px;
}
</style>
