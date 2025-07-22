<script setup>
import { NuxtLink } from "#components";
import { useGlobalStore } from "@/stores/global";
const { globalSetting, footerMenu } = storeToRefs(useGlobalStore());
import useUtils from "@/composables/useUtils.js";
import visaImg from "~/assets/image/visa.svg";
import mastercard from "~/assets/image/mastercard-logo.svg";
const localePath = useLocalePath()
const { getMediaPath } = useUtils();
const route = useRoute();
</script>
<template>
    <!-- TODO v-if="!isUiLocked" -->
    <div v-if="globalSetting" class="footerWrapper">
        <footer>
            <div class="container df jcsb fContainer">
                <div class="l">
                    <component
                        v-if="globalSetting.site_logo_footer"
                        :is="route.name.includes('index') ? 'span' : NuxtLink"
                        :to="localePath('/')"
                    >
                        <img
                            :src="getMediaPath(globalSetting.site_logo_footer)"
                            alt="logo"
                            class="logo"
                        />
                    </component>
                    <p>{{ $t("logoText") }}</p>
                    <ul class="socLinks">
                        <li
                            v-for="(item, idx) in globalSetting.links"
                            :key="idx"
                        >
                            <a
                                v-if="item.image"
                                :href="item.link"
                                target="_blank"
                            >
                                <img
                                    :src="getMediaPath(item.image)"
                                    alt="socLogo"
                                    class="socialIcon"
                                />
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="r">
                    <ul class="footerMenu" v-if="footerMenu">
                        <li v-for="(item, idx) in footerMenu" :key="idx">
                            <NuxtLink class="appLink" :to="localePath(item.url)">{{
                                item.name
                            }}</NuxtLink>
                        </li>
                    </ul>
                    <p v-if="globalSetting.footer_text" class="ceoText">
                        {{ globalSetting.footer_text }}
                    </p>
                </div>
            </div>
            <span class="hr"></span>
        </footer>
        <div class="bottomFooter">
            <div class="container df jcsb">
                <ul class="df jcc payment">
                    <li>
                        <a href="#">
                            <img :src="visaImg" alt="visa-logo" />
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img :src="mastercard" alt="mastercard-logo" />
                        </a>
                    </li>
                </ul>
                <ul class="df jcsb">
                    <li>{{ globalSetting.copy }}</li>
                    <!-- <li>{{ globalSetting.developer_text }} <i class="icon ic-owl"></i></li> -->
                    <li class="copy">
                        <a href="#" rel="nofollow">
                            {{ globalSetting.developer_text }}
                            <i class="icon ic-owl"></i>
                        </a>
                    </li>
                </ul>
                <p class="lisence">{{ globalSetting.license }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
footer {
    background-color: color.adjust(#17171d, $lightness: -1%);
    color: #fff;
    padding-top: 44px;

    @media (max-width: 576px) {
        padding-top: 34px;
    }
}

p,
li {
    font-size: 12px;
}

.l {
    width: 25%;

    @media (max-width: 576px) {
        width: 100%;
        text-align: center;
    }

    p {
        font-weight: 600;
        font-size: 16px;
        line-height: 130%;
        color: #ffffff;
    }

    ul {
        display: flex;
        justify-content: center;
    }

    li {
        &:hover {
            i {
                color: $c-btn;
            }
        }

        &:first-of-type {
            margin-right: 22px;
        }
    }
}

.r {
    width: 70%;

    ul {
        display: flex;
    }

    li {
        a {
            font-weight: 600;
            font-size: 15px;
            line-height: 100%;
            color: #ffffff;
        }

        &:not(:last-of-type) {
            margin-right: 20px;
        }
    }

    .ceoText {
        font-weight: 300;
        font-size: 17px;
        line-height: 150%;
        color: #cacaca;
    }
}

.logo {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 25px;

    @media (max-width: 1024px) {
        width: unset;
        margin: 0 auto 25px auto;
    }
}

.hr {
    display: block;
    margin-top: 44px;
    border-bottom: 1px solid #333;

    @media (max-width: 576px) {
        margin-top: 45px;
    }
}

.bottomFooter {
    padding: 14px 0px;
    background-color: color.adjust(#17171d, $lightness: -1%);
    color: #777777;

    @media (max-width: 576px) {
        .container {
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;

            ul {
                order: 3;
            }

            p {
                color: #ffffff;
                margin-bottom: 20px;
                font-size: 12px;
            }

            .lisence {
                order: 2;
            }

            .payment {
                order: 1;
                margin-bottom: 15px;
            }
        }
    }
}

ul,
p {
    margin: 0px;
}

ul {
    display: flex;
    justify-content: center;

    li:not(:last-of-type) {
        margin-right: 7px;
    }
}

.fContainer {
    .r .ceoText {
        @media (max-width: 768px) {
            display: none;
        }
    }

    @media (max-width: 1024px) {
        flex-direction: column;
        align-items: center;

        .r,
        .l {
            width: 100%;
        }

        .r {
            margin-top: 28px;
        }
    }

    .l {
        text-align: center;
    }
}

.lisence {
    color: #fff;
}

.copy {
    margin-left: 44px;
    position: static;
}

.socLinks {
    margin-top: 18px;
}

.footerMenu {
    justify-content: flex-start;
    margin-bottom: 38px;

    li {
        a {
            transition: 0.3s;
        }

        &:hover a {
            color: $c-btn;
        }
    }

    @media (max-width: 1024px) {
        justify-content: center;
    }

    @media (max-width: 768px) {
        margin-bottom: 0px;
    }

    @media (max-width: 576px) {
        flex-direction: column;
        align-items: center;

        li {
            margin-right: 0px !important;
            display: block;
            width: 100%;
            text-align: center;

            &:first-of-type a {
                border-top: 1px solid #28292f;
            }

            a {
                width: 100%;
                display: block;
                color: $c-btn;
                padding: 17px 0px;
                border-bottom: 1px solid #28292f;
            }
        }
    }
}
</style>
