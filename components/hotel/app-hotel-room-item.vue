<script setup>
import { useNuxtApp } from "#app";
import { ref, computed } from "vue";
import useUtils from "@/composables/useUtils.js";
const { getMediaPath } = useUtils();
import { useI18n } from "vue-i18n";
import appHotelRoomPreview from "./app-hotel-room-preview.vue";
const { locale } = useI18n();
const { $httpService } = useNuxtApp();

defineProps({
    roomInfo: [Object, Array],
});

const currentRoomInfo = ref(null);
const previewShown = ref(false);

const langUse = computed(() => {
    return locale === "en" ? "0" : "1";
});

const getRoomInfo = async (slug) => {
    try {
    const {
        data,
    } = await $httpService.post("/api/room/get-by-slug", {
        lang: locale.value,
        slug,
    });
    console.log(data);
    currentRoomInfo.value = data;
    document.querySelector("html").style.overflow = "hidden";
    previewShown.value = true;
    } catch (error) {
        console.error(error);
    }
};
</script>

<template>
    <div class="wrp">
        <div @click="getRoomInfo(roomInfo.slug)" class="hotelRoom">
            <!-- :style="`background-image: url(${path(roomInfo.image)})`" -->
            <img
                class="bgimg"
                :src="getMediaPath(roomInfo.image)"
                :alt="getMediaPath(roomInfo.image)"
            />
            <ul>
                <li>
                    <i
                        class="icon"
                        :class="roomInfo.translations[langUse].attr1_icon"
                    ></i
                    >{{ roomInfo.translations[langUse].attr1_value }}
                </li>
                <li>
                    <i
                        class="icon"
                        :class="roomInfo.translations[langUse].attr2_icon"
                    ></i
                    >{{ roomInfo.translations[langUse].attr2_value }}
                </li>
                <li>{{ roomInfo.name }}</li>
            </ul>
        </div>
        <appHotelRoomPreview
            v-if="previewShown"
            :roomInfo="currentRoomInfo"
            @close="previewShown = false"
        ></appHotelRoomPreview>
    </div>
</template>

<style lang="scss" scoped>
.hotelRoom {
    height: 242px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 25px 15px;
    color: #fff;
    cursor: pointer;
    position: relative;
    z-index: 1;
    transition: 0.3s;
    background-position: center;
    overflow: hidden;

    @media (max-width: 576px) {
        height: auto;
    }

    &::after {
        content: "";
        position: absolute;
        z-index: 4;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.75) 100%
        );
    }

    .bgimg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        transition: 0.3s ease;
        object-fit: cover;
    }

    &:hover {
        .bgimg {
            transform: scale(1.1);
        }
    }

    ul {
        margin: 0;
        position: relative;
        padding-left: 0;
        z-index: 5;

        li {
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 100%;
            margin-bottom: 10px;
            position: static;

            .icon {
                margin-right: 7px;
            }

            &:last-of-type {
                margin-top: 18px;
                font-weight: 700;
                font-size: 19px;
                line-height: 110%;
                margin-bottom: 0;

                @media (max-width: 1024px) {
                    margin-top: 45%;
                    height: 43px;
                    overflow-y: hidden;
                }

                @media (max-width: 830px) {
                    margin-top: 35%;
                }

                @media (max-width: 576px) {
                    margin-top: 20%;
                }
            }
        }
    }
}
</style>
