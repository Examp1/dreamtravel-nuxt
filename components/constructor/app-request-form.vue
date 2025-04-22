<script setup>
import { useNuxtApp } from "#app";
const { $httpService } = useNuxtApp();
import { Form } from "vee-validate";
import { computed, ref, onMounted } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import useUtils from "@/composables/useUtils.js";
import formInput from "../form-fields/form-input.vue";
import formLabel from "../form-fields/form-label.vue";
import formEmail from "../form-fields/form-email.vue";
import formSelect from "../form-fields/form-select.vue";
import formDataPicker from "../form-fields/form-data-picker.vue";
import formTextArea from "../form-fields/form-text-area.vue";
import formPhone from "../form-fields/form-phone.vue";
import formTimePicker from "../form-fields/form-time-picker.vue";
import FormCheckboxGroup from "../form-fields/form-checkbox-group.vue";

const route = useRoute()
const isLoaded = ref(false);

const { getMediaPath } = useUtils();

const props = defineProps({
    propsData: [Array, Object],
});


const bg = computed(() => {
    const path = getMediaPath(props.propsData.block_background);
    return path ? { backgroundImage: `url('${path}')` } : null;
});

const requestForm = useTemplateRef("requestForm");
const isSuccess = ref(false);

const componentsList = computed(() => {
    const a = [];
    props.propsData.fields.forEach((item) => {
        if (item.label) {
            a.push({ type: "label", placeholder: item.label });
        }
        a.push(item);
    });
    return a;
});

const getComponentName = (name) => {
    switch (name) {
        case "text":
            return formInput;
        case "phone":
            return formPhone;
        case "email":
            return formEmail;
        case "time":
            return formTimePicker;
        case "select":
            return formSelect;
        case "list":
            return FormCheckboxGroup;
        case "label":
            return formLabel;
        case "textarea":
            return formTextArea;
        case "date":
            return formDataPicker;
        default:
            return "";
    }
};

const validationSchema = toTypedSchema(
    zod.object({
        firstname: zod.string().min(1, { message: "This is required" }),
        date: zod.date().transform((val) => val.toISOString()),
        quantity_list: zod.string().min(1, { message: "This is required" }),
        phone: zod
            .string()
            .min(2, { message: "Minimum number of characters: 2" }),
        email: zod
            .string()
            .min(1, { message: "This is required" })
            .email({ message: "Must be a valid email" }),
    }),
);

const onSubmit = async () => {
    const FormValues = { ...requestForm.value.values };
    console.log(FormValues);
    // const { data, status } = await $httpService.post("/api/add-notice", {
    //     page_title: route.path,
    //     ...FormValues,
    // });
    // if (status === 200) {
    //     isSuccess.value = true;
    // }
};

onMounted(() => {
    isLoaded.value = true;
});
</script>

<template>
    <section class="specContainer">
        <div class="titleWrp">
            <h2 class="sectionTitle bef" v-html="propsData.block_title"></h2>
            <p class="descr" v-html="propsData.block_subtitle"></p>
        </div>

        <div class="bgWrp" :style="bg">
            <div v-if="!isSuccess" class="formWrp" ref="formBody">
                <Form
                    :validation-schema="validationSchema"
                    @submit="onSubmit"
                    ref="requestForm"
                    >
                    <!-- v-slot="{ errors }"
                {{ errors }} -->
                    <component
                        v-for="(field, idx) in componentsList"
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
                            {{ propsData.button_title }}
                        </button>
                    </div>
                </Form>
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
