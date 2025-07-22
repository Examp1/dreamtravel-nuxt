<script setup>
import { ref } from "vue";
const localePath = useLocalePath()
const props = defineProps({
    propData: Object,
});

let submenuList = ref(null);
let currentIdx = ref(null);

const getCurrentIdx = (idx) => {
    currentIdx.value = idx;
    submenuList.value = props.propData.items[idx].children;
};
</script>
<template>
    <!-- v-if="!isUiLocked" -->
    <nav class="df ait">
        <ul class="df menu" v-if="propData">
            <li
                v-for="(item, idx) in propData"
                :class="{ hasSubmenu: item.children.length }"
                :key="idx"
                @click="getCurrentIdx(idx)"
            >
                <span v-if="item.children.length">
                    {{ item.name }}
                    <i class="icon ic-dropdown" v-if="item.children.length"></i>
                </span>
                <nuxtLink class="appLink" :to="localePath(item.url)" v-else
                    ><i class="icon ic-dropdown" v-if="item.children.length"></i
                >{{ item.name }}</nuxtLink>
            </li>
        </ul>
        <ul class="submenu" v-if="submenuList && submenuList.length">
            <li>
                <nuxtLink :to="localePath(propData[currentIdx].url)">{{ propData[currentIdx].name }}</nuxtLink>
            </li>
            <li v-for="(item, idx) in submenuList" :key="idx">
                <nuxtLink :to="localePath(item.url)">{{ item.name }}</nuxtLink>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" scoped>
.menu {
    position: relative;
    height: 100%;

    li {
        font-style: normal;
        font-weight: 600;
        font-size: 15px;
        line-height: 100%;
        color: #ffffff;

        &:not(:last-of-type) {
            margin-right: 40px;

            @media (max-width: 1024px) {
                margin-right: 48px;
            }

            @media (max-width: 830px) {
                margin-right: 20px;
            }
        }

        a {
            transition: 0.3s;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &:hover {
            .appLink {
                color: $c-btn;
            }
        }
    }
}

.hasSubmenu {
    position: relative;

    @media (max-width: 1024px) {
        position: static;
    }

    &:before {
        content: "";
        bottom: -12px;
        left: 50%;
        width: 10px;
        height: 10px;
        transform: translate(-50%, 0) rotate(45deg);
        background-color: $c-gray;
        position: absolute;
        z-index: 5;
        opacity: 0;
        transition: 0.3s;
        // transition-delay: 0.2s;
    }

    .ic-dropdown {
        vertical-align: bottom;
    }

    &:hover {
        &:before {
            transition-delay: 0s;
            opacity: 1;
        }

        .subMenu {
            transition-delay: 0s;
            opacity: 1;
            visibility: visible;
        }
    }
}

.subMenu {
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;
    // transition-delay: 0.3s;
    // position: absolute;
    background-color: #ccc;
    z-index: 3;
    padding: 15px;
    max-height: 235px;
    top: calc(100% + 5px);
    left: 0px;
    background-color: $c-gray;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

// new style
nav {
    display: flex;
    flex-direction: column;
}

.submenu {
    width: 100%;
    margin-top: 12px;
    background-color: $c-black;
    display: grid;
    padding: 15px;
    position: relative;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 30px;

    &::before {
        content: "";
        width: 100%;
        top: -10px;
        height: 10px;
        left: 0;
        position: absolute;
    }

    li {
        font-weight: 300;
        font-size: 14px;
        line-height: 100%;
        padding-bottom: 10px;
        border-bottom: 1px solid #2a4651;
        margin-bottom: 10px;
        text-align: left;

        * {
            text-align: left;
        }

        a {
            display: block;
        }

        &:hover {
            a {
                color: $c-btn;
            }
        }
    }
}
// new style end
</style>
