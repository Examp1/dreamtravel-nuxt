<script setup>
import { useCookie } from "#app";
import { ref, computed } from "vue";
import { useGlobalStore } from "@/stores/global";
const { globalSetting } = storeToRefs(useGlobalStore());
const isAproove = ref(false);
const policyCookie = useCookie("PrivatPolicy");

const agree = () => {
    isAproove.value = true;
    policyCookie.value = "aproove";
};

const isPrivatPolicyAproove = computed(() => {
    return policyCookie.value === "aproove";
});
</script>
<template>
    <transition name="fade">
        <div class="cookie" v-if="!isPrivatPolicyAproove && !isAproove">
            <div class="cookie-content">
                <p class="title">{{ globalSetting.cookie_button_title }}</p>
                <p class="desc" v-html="globalSetting.cookie_text"></p>
                <div class="btns">
                    <a @click="agree" class="btn">{{
                        globalSetting.cookie_button_title
                    }}</a>
                    <a @click="isAproove = !isAproove" class="close">&times;</a>
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="scss">
.cookie .desc > a {
    color: $c-btn;
    text-decoration: underline;
}
</style>

<style lang="scss" scoped>
.cookie {
    position: fixed;
    left: 20px;
    bottom: 20px;
    background-color: $c-gray;
    z-index: 1000;
    padding: 30px 25px;
    color: #fff;
    max-width: 377px;
    width: 100%;

    @media (max-width: 576px) {
        left: 0px;
        bottom: 0px;
    }

    .title {
        font-weight: 700;
        font-size: 19px;
        line-height: 110%;
        margin-bottom: 30px;
    }

    .btn {
        width: 100%;
        text-align: center;
        cursor: pointer;
    }

    .close {
        position: absolute;
        top: 13px;
        right: 13px;
        font-size: 36px;
        line-height: 26px;
        color: #777;
        cursor: pointer;
    }
}
</style>
