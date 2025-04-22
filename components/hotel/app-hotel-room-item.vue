<script setup>
defineProps({
    roomInfo: [Object, Array],
});
const getRoomInfo = (slug) => {
    this.axios
        .post("/api/room/get-by-slug", {
            lang: this.currentLang,
            slug,
        })
        .then((res) => {
            this.currentRoomInfo = res.data.data;
            document.querySelector("html").style.overflow = "hidden";
            this.previewShown = true;
        });
};

// import hotelRoomPreview from "./hotel-room-preview.vue";
// export default {
//     components: { hotelRoomPreview },
//     props: {
//         roomInfo: {
//             type: [Array, Object],
//         },
//     },
//     data() {
//         return {
//             currentRoomInfo: null,
//             previewShown: false,
//         };
//     },
//     computed: {
//         langUse() {
//             return this.$i18n.locale === "en" ? "0" : "1";
//         },
//     },
//     methods: {
//         getRoomInfo(slug) {
//             this.axios
//                 .post("/api/room/get-by-slug", {
//                     lang: this.currentLang,
//                     slug,
//                 })
//                 .then((res) => {
//                     this.currentRoomInfo = res.data.data;
//                     document.querySelector("html").style.overflow = "hidden";
//                     this.previewShown = true;
//                 });
//         },
//     },
// };
</script>

<template>
    <div class="wrp">
        <div @click="getRoomInfo(roomInfo.slug)" class="hotelRoom">
            <!-- :style="`background-image: url(${path(roomInfo.image)})`" -->
            <img
                class="bgimg"
                :src="path(roomInfo.image)"
                :alt="path(roomInfo.image)"
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
        <hotel-room-preview
            v-if="previewShown"
            :roomInfo="currentRoomInfo"
            @close="previewShown = false"
        ></hotel-room-preview>
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
