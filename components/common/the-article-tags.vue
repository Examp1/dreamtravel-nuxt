<script setup>
import { ref } from "vue";
const route = useRoute();
const copiedTimer = ref(null);
const isCopiedLabel = ref(false);
const copyInpt = useTemplateRef("copyInpt");
defineProps({
    propsData: [Array, Object],
});

const copyToClipboard = () => {
    copyInpt.value.value = window.location.href;
    copyInpt.value.select();
    document.execCommand("copy");
    isCopiedLabel.value = true;
    copiedTimer.value = setTimeout(() => {
        isCopiedLabel.value = false;
    }, 2000);
};

// export default {
//     props: {
//         propsData: {
//             type: [Array, Object],
//         },
//     },
//     data() {
//         return {
//             isCopiedLabel: false,
//         };
//     },
//     computed: {
//         currentLocation() {
//             return window.location.href;
//         },
//     },
//     methods: {
//         copyToClipboard() {
//             this.$refs.copyInpt.value = window.location.href;
//             this.$refs.copyInpt.select();
//             document.execCommand("copy");
//             this.isCopiedLabel = true;
//             this.copiedTimer = setTimeout(() => {
//                 this.isCopiedLabel = false;
//             }, 2000);
//         },
//     },
// };
</script>

<template>
    <section>
        <div class="container contentWrapper">
            <h2>
                {{ $t("tags") }}
            </h2>
            <div class="wrp df jcsb">
                <ul class="tags">
                    <li v-for="(item, idx) in propsData" :key="idx">
                        <NuxtLink :to="`/news/tag/${item.slug}`">
                            {{ item.name }}
                        </NuxtLink>
                    </li>
                </ul>
                <ul class="soc">
                    <li class="isIco">
                        <a
                            :href="`https://www.facebook.com/sharer/sharer.php?u=${route.path}`"
                            target="_blank"
                            ><i class="ic-fsi"></i
                        ></a>
                    </li>
                    <li class="isIco">
                        <a
                            :href="`https://twitter.com/intent/tweet?text=${route.path}`"
                            target="_blank"
                            ><i class="ic-twi"></i
                        ></a>
                    </li>
                    <li class="isIco">
                        <a
                            href="#"
                            class="isShareLink"
                            @click.prevent="copyToClipboard"
                            ><i class="ic-shareLink"></i>
                            <span v-if="isCopiedLabel" class="copyText">{{
                                $t("textCopyed")
                            }}</span>
                        </a>
                        <input type="text" class="copy" ref="copyInpt" />
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.wrp {
    ul {
        padding-left: 7px !important;
        display: flex;

        @media (max-width: 576px) {
            &:first-of-type {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                margin-top: 0px;

                li {
                    height: fit-content;
                }
            }
        }
    }
}
.copy {
    position: fixed;
    // pointer-events: none;
    left: 100%;
}
.soc {
    display: flex;
    margin: 0;

    @media (max-width: 576px) {
        display: flex;
        flex-direction: column;

        li {
            margin-right: 0px !important;
        }
    }

    li {
        &.isIco {
            font-size: 20px;
        }

        // &:first-of-type {
        //   margin-right: 20px !important;
        // }

        &:not(:last-of-type) {
            margin-right: 10px;
        }

        a {
            border: 1px solid $c-btn;
            height: 41px !important;
            min-width: 41px;
            display: flex;
            align-items: center;
            text-decoration: none;
            justify-content: center;
            color: $c-btn;
        }
    }
}

.tags {
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    li {
        margin-right: 25px;
        padding-left: 7px;
        font-size: 12px;
        position: relative; // Обязательно для ::before

        a {
            text-decoration: none;
        }

        &::before {
            content: "" !important;
            background-color: $c-btn;
            width: 2px;
            height: 100%;
            position: absolute;
            left: -7px !important;
        }
    }
}
</style>
