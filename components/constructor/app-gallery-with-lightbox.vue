<script setup>
import { ref } from "vue";
import useUtils from "@/composables/useUtils.js";
const { getMediaPath } = useUtils();
defineProps({
    propsData: [Object, Array],
});

const isShown = ref(false);
const modalImg = ref(null);

const openModal = (img) => {
    modalImg.value = img;
    isShown.value = true;
};
</script>

<template>
    <div class="contentWrapper container">
        <h2>{{ propsData.title }}</h2>
        <ul>
            <li
                v-for="(item, idx) in propsData.list"
                :key="idx"
                @click="openModal(item.image)"
            >
                <img :src="getMediaPath(item.image)" :alt="item.image_title" />
            </li>
        </ul>
        <div class="lightbox" v-if="isShown" @click.self="isShown = false">
            <span class="close" @click="isShown = false">&times;</span>
            <img :src="getMediaPath(modalImg)" alt="lightbox image" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
ul {
    padding-left: 0px !important;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 28px;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    li {
        position: relative;
        margin-bottom: 0px;
        cursor: pointer;

        &::before {
            content: "\e906" !important;
            top: 0px;
            transition: 0.3s;
            left: 0px !important;
            width: 100%;
            opacity: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            background-color: rgba(#000, 0.54);
        }

        &:hover {
            &::before {
                opacity: 1;
            }
        }
    }
}

.lightbox {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(#000, 0.6);
    z-index: 1002;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        @media (max-width: 576px) {
            width: 90%;
        }
    }

    .close {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 40px;
        line-height: 40px;
        color: #fff;
        cursor: pointer;
    }
}
</style>
