<script setup>
defineProps({
    propData: Object,
});
</script>

<template>
    <nav class="df ait">
        <ul class="df menu" v-if="propData">
            <li
                v-for="(item, idx) in propData"
                :class="{ hasSubmenu: item.children.length }"
                :key="idx"
            >
                <!-- <router-link :to="{ path: item.url }">{{ item.name }}</router-link> -->
                <!-- <app-link class="appLink" :link="item"
                    ><i class="icon ic-dropdown" v-if="item.children.length"></i
                ></app-link> -->
                <NuxtLink class="appLink" :to="item.url"
                    ><i class="icon ic-dropdown" v-if="item.children.length"></i
                >{{ item.name }}</NuxtLink>
                <!-- <i class="icon ic-dropdown" v-if="item.children.length"></i> -->
                <ul v-if="item.children.length" class="subMenu">
                    <li v-for="(childItem, idx) in item.children" :key="idx">
                        <NuxtLink :to="childItem.url">{{ childItem.name }}</NuxtLink>
                    </li>
                </ul>
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
        position: relative;

        &:not(:last-of-type) {
            margin-right: 28px;

            @media (max-width: 1024px) {
                margin-right: 20px;
            }
        }

        &:before {
            content: "";
            bottom: -6px;
            transform: translate(20px, 0);
            position: absolute;
            z-index: 5;
            opacity: 0;
            transition: 0.3s;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 7px 7px 7px;
            border-color: transparent transparent $c-gray transparent;
        }

        a {
            transition: 0.3s;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row-reverse;
        }

        &:hover {
            .appLink {
                color: $c-btn;
            }
        }
    }
}

.hasSubmenu {
    @media (max-width: 1024px) {
        position: static;
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
    position: absolute;
    background-color: #ccc;
    z-index: 3;
    padding: 15px;
    max-height: 235px;
    top: calc(100% + 5px);
    left: 0px;
    background-color: $c-gray;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 630px;

    @media (max-width: 1024px) {
        width: 100%;
        background-color: $c-black;
    }

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
        margin-right: 40px;
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
</style>
