import { defineNuxtPlugin } from "#app";
import { configure } from "vee-validate";

export default defineNuxtPlugin((nuxtApp) => {
    configure({
        validateOnInput: true, // Валидация при вводе
        validateOnBlur: true, // Можно оставить для резерва
        validateOnChange: false,
        bails: false, // Показывать все ошибки, а не только первую
    });
});
