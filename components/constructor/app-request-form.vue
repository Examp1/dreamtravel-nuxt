<script setup>
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
            return formInput;
        case "email":
            return formEmail;
        case "time":
            return "time-picker";
        case "select":
            return formSelect;
        case "list":
            return "check-box-group";
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

const onSubmit = (values) => {
    const FormValues = {...requestForm.value.values}
    console.log("Данные формы2:", FormValues);
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
            <div class="formWrp" ref="formBody">
                <Form
                    :validation-schema="validationSchema"
                    @submit="onSubmit"
                    ref="requestForm"
                >
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
        </div>
    </section>
</template>

<!-- <transition v-if="false" name="locfade" mode="out-in">
    <div v-if="!successMessage" key="k1">
        <div class="inputs">
            <template v-for="(item, index) in componentsList">
                <div
                    v-if="item.type == 'label'"
                    :key="index"
                    class="labelcomponent"
                >
                    {{ item.placeholder }}
                </div>
                <div
                    v-else
                    :key="index + 'dq'"
                    class="inputWrp"
                    :class="getColSpan(item.type)"
                >
                    <component
                        :is="getComponentName(item.type)"
                        :mask="
                            item.type == 'phone'
                                ? '+###################'
                                : ''
                        "
                        :placeholder="item.placeholder"
                        :propname="item.name"
                        :validate="$v.fieldsData[item.name]"
                        :showError="showError"
                        :title="item.title"
                        :items="buildItemsArray(item.list)"
                        v-model="
                            $v.fieldsData[item.name].$model
                        "
                    ></component>
                </div>
            </template>
        </div>
        <div class="btnsWrp">
            <button class="submit" @click="onSubmit">
                {{ propsData.button_title }}
            </button>
        </div>
    </div>
    <div v-else class="success" key="k2">
        <transition name="imgAppear" appear
            ><img src="@/assets/image/succesfull.svg" alt=""
        /></transition>
        <div class="txt">
            {{ $t("requestFormSuccess") }}
        </div>
    </div>
</transition> -->
<!-- <script>
import DefaultInput from "./inputs/DefaultInput.vue";
import TextareaInput from "./inputs/TextareaInput.vue";
import DatePickerField from "./inputs/DatePickerField.vue";
import {
    required,
    minLength,
    maxLength,
    email,
} from "vuelidate/lib/validators";
import TimePicker from "./inputs/TimePicker.vue";
import SelectInput from "./inputs/SelectInput.vue";
import CheckBoxGroup from "./inputs/CheckBoxGroup.vue";
const timeCheck = (value) => {
    if (value == "") {
        return true;
    } else {
        const splited = value.split(":");
        if (splited.length == 2 && splited[1].length == 2) {
            if (+splited[0] <= 23 && +splited[1] <= 59) return true;
            else return false;
        } else return false;
    }
};
export default {
  
  
    data() {
        return {
            showError: false,
            successMessage: false,

            fieldsData: {},

            apiFieldData: [],
        };
    },,
    methods: {
        
        buildItemsArray(a) {
            const t = [];
            for (const key in a) {
                if (Object.hasOwnProperty.call(a, key)) {
                    const item = a[key];
                    t.push(item.item);
                }
            }
            return t;
        },
        async onSubmit() {
            this.showError = true;
            if (!this.$v.$invalid) {
                const fieldNames = {};
                this.propsData.fields.forEach((item) => {
                    fieldNames[item.name] = item.title || item.placeholder;
                });
                const data = {
                    fieldNames: fieldNames,
                    ...this.fieldsData,
                };
                for (const key in data) {
                    if (Object.hasOwnProperty.call(data, key)) {
                        const element = data[key];
                        if (typeof element.getMonth == "function") {
                            const d = Intl.DateTimeFormat("en", {
                                day: "numeric",
                            }).format(element);
                            const m = Intl.DateTimeFormat("en", {
                                month: "2-digit",
                            }).format(element);
                            const y = Intl.DateTimeFormat("en", {
                                year: "numeric",
                            }).format(element);
                            data[key] = `${d}.${m}.${y}`;
                        }
                    }
                }

                data.page_title = window.location.href;
                data.fieldNames.page_title = "Посилання на сторінку";
                console.log(data);

                const result = await this.axios.post("/api/add-notice", data);
                if (result.data.success) {
                    this.successMessage = true;
                } else {
                    alert("Error, see console");
                    console.log(result);
                }
            } else {
                window.scrollTo({ top: this.$refs.formBody.offsetTop - 100 });
            }
        },
    },
    async created() {
        this.apiFieldData = this.propsData.fields;
        this.apiFieldData.forEach((item) => {
            this.$set(this.fieldsData, item.name, "");
        });
    },
    validations() {
        let obj = { fieldsData: {} };
        this.apiFieldData.forEach((item) => {
            this.$set(this.fieldsData, item.name, "");
            obj.fieldsData[item.name] = { required };
            switch (item.name) {
                case "firstname":
                    obj.fieldsData[item.name] = {
                        required,
                        minLength: minLength(2),
                    };
                    break;
                case "email":
                    obj.fieldsData[item.name] = {
                        required,
                        email,
                    };
                    break;
                case "phone":
                    obj.fieldsData[item.name] = {
                        required,
                        minLength: minLength(2),
                        maxLength: maxLength(20),
                    };
                    break;
                case "time":
                    obj.fieldsData[item.name] = { timeCheck };
                    break;
                case "comment":
                    obj.fieldsData[item.name] = { maxLength: maxLength(1000) };
                    break;
                default:
                    obj.fieldsData[item.name] = {};
                    break;
            }
        });
        return obj;
    },
};
</script> -->

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
