<script setup>
import { watch, ref } from "vue";
import { useNuxtApp } from "#app";
import useUtils from "@/composables/useUtils.js";
const { getMediaPath } = useUtils();
import { useGlobalStore } from "@/stores/global";
const { globalSetting } = storeToRefs(useGlobalStore());
const { $httpService } = useNuxtApp();

const email = ref(null);
const isSuccess = ref(null);

const formSubmit = () => {
    try {
        $httpService.post("/api/news/subscribe", {
            email: email.value,
        });
        isSuccess.value = true;
        email.value = null;
    } catch (err) {
        isSuccess.value = false;
    }
};

watch((isSuccess) => {
    isSuccess.value = null;
});
// import { mapGetters } from "vuex";
// export default {
//     data() {
//         return {
//             email: null,
//             isSuccess: null,
//         };
//     },
//     computed: {
//         ...mapGetters(["globalSetting"]),
//     },
//     methods: {
//         async formSubmit() {
//             try {
//                 const res = await this.axios.post("/api/news/subscribe", {
//                     email: this.email,
//                 });
//                 this.isSuccess = res.data.success;
//                 this.email = "";
//             } catch (err) {
//                 this.isSuccess = false;
//             }
//         },
//     },
//     watch: {
//         isSuccess(newValue) {
//             if (newValue) {
//                 setTimeout(() => {
//                     this.isSuccess = null;
//                 }, 2000);
//             }
//         },
//     },
// };
</script>

<template>
    {{ isSuccess }}
    <section class="subscribeForm">
        <img :src="getMediaPath(globalSetting.blog_subscribe_image)" alt="" />
        <div class="form">
            <p class="title">{{ globalSetting.blog_subscribe_title }}</p>
            <p class="desc">
                {{ globalSetting.blog_subscribe_text }}
            </p>
            <form @submit.prevent="formSubmit">
                <input
                    type="text"
                    class="formInput"
                    v-model="email"
                    :placeholder="
                        globalSetting.blog_subscribe_input_placeholder
                    "
                />
                <button type="submit" class="submit">
                    {{ globalSetting.blog_subscribe_btn_name }}
                    <i class="icon ic-arrow"></i>
                </button>
                <span class="success" v-if="isSuccess">{{
                    globalSetting.blog_subscribe_success_text
                }}</span>
            </form>
            <span class="error" v-if="isSuccess === false">{{
                $t("emailError")
            }}</span>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.subscribeForm {
    position: relative;

    @media (max-width: 576px) {
        text-align: center;
    }

    img {
        width: 70%;
        margin-left: auto;

        @media (max-width: 830px) {
            width: 685px;
        }

        @media (max-width: 576px) {
            width: 100%;
        }
    }

    .form {
        background-color: $c-gray;
        max-width: 950px;
        position: absolute;
        bottom: 0px;
        left: 0px;
        padding: 89px 200px;
        color: #fff;

        @media (max-width: 1024px) {
            padding: 50px;
            max-width: 650px;
        }

        @media (max-width: 830px) {
            max-width: 491px;
            padding: 25px;
        }

        @media (max-width: 576px) {
            position: static;
        }

        .title {
            font-weight: 500;
            font-size: 25px;
            line-height: 140%;
            margin-bottom: 20px;

            @media (max-width: 830px) {
                font-size: 16px;
            }
        }

        .desc {
            margin-bottom: 35px;
            font-weight: 300;
            font-size: 17px;
            line-height: 150%;
            color: #cacaca;

            @media (max-width: 576px) {
                font-size: 14px;
            }
        }

        form {
            display: flex;
            justify-content: space-between;
            position: relative;

            &::before {
                transition: 0.3s;
            }

            @media (max-width: 576px) {
                display: flex;
                flex-direction: column;

                .formInput {
                    width: 100% !important;
                    margin-bottom: 10px;
                }
            }

            .formInput {
                height: 63px;
                padding: 0px 16px;
                border: none;
                width: 100%;
            }

            .submit {
                height: 63px;
                background-color: $c-btn;
                border: none;
                color: #fff;
                padding: 0px 22px;
                font-weight: 600;
                font-size: 18px;
                width: 50%;
                transition: 0.3s;

                @media (max-width: 830px) {
                    width: 70%;
                }

                @media (max-width: 576px) {
                    width: 100%;
                }

                i {
                    font-size: 14px;
                    margin-left: 9px;
                }

                &:hover {
                    background-color: #82ccdc;
                }
            }
        }

        .error {
            color: red;
        }
    }
}

.success {
    position: absolute;
    text-align: center;
    font-weight: 600;
    line-height: 63px;
    width: 100%;
    height: 100%;
    background-color: #6cc39f;
}
</style>
