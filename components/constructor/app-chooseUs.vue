<script setup>
import { computed } from "vue";
const props = defineProps({
    propsData: [Object, Array],
});

const hItems = computed(() => {
    let temp = { ...props.propsData.list };
    delete temp[4];
    return temp;
});
const vItem = computed(() => {
    return props.propsData.list[4];
});
// export default {
//     props: {
//         propsData: {
//             type: [Array, Object],
//         },
//     },
//     computed: {
//         hItems() {
//             let temp = { ...this.propsData.list };
//             delete temp[4];
//             return temp;
//         },
//         vItem() {
//             return this.propsData.list[4];
//         },
//     },
// };
</script>

<template>
    <section class="chooseUs container df jcc">
        <div>
            <h2 class="sectionTitle bef">{{ propsData.title }}</h2>
            <div class="Allitems">
                <div class="hItems">
                    <div
                        class="item"
                        v-for="(item, idx) in hItems"
                        :key="idx"
                        :class="{ reverse: idx == 2 }"
                    >
                        <div class="l">
                            <p class="number">{{ item.name }}</p>
                            <p class="descr">
                                {{ item.text }}
                            </p>
                        </div>
                        <div class="r">
                            <img :src="path(item.image)" alt="" />
                        </div>
                    </div>
                </div>
                <div class="vItem item">
                    <div class="l">
                        <img :src="path(vItem.image)" alt="" />
                    </div>
                    <div class="r">
                        <p class="number">{{ vItem.name }}</p>
                        <p class="descr">
                            {{ vItem.text }}
                        </p>
                    </div>
                </div>
            </div>
            <NuxtLink
                v-if="propsData.button_link && propsData.button_title"
                :to="propsData.button_link"
                class="btn"
            >
                {{ propsData.button_title }}
                <i class="icon ic-arrow"></i>
            </NuxtLink>
        </div>
    </section>
</template>
<style lang="scss" scoped>
.chooseUs {
    // padding: $section-offset 0px
    display: flex;
    flex-direction: column;
    align-items: center;

    // @media (max-width: 830px) {
    //   padding: 100px 0px;
    // }

    img {
        width: 100%;
    }

    .Allitems {
        display: flex;
        justify-content: space-between;
        grid-gap: 20px;
        margin-top: 77px;

        @media (max-width: 830px) {
            margin-top: 53px;
            flex-direction: column;

            .hItems,
            .vItem {
                width: 100%;
            }

            .vItem {
                display: flex;
                align-items: center;
            }

            .l {
                width: 100%;
                margin-right: 25px;
            }
        }

        @media (max-width: 576px) {
            margin-top: 0px;
            grid-gap: 0px;
        }
    }

    .item {
        color: #fff;
        margin-bottom: 24px;

        &:hover {
            background-color: unset;
        }

        @media (max-width: 576px) {
            flex-direction: column-reverse !important;
            text-align: center;
            margin-bottom: 0px;

            .l,
            .r {
                width: 100%;
                margin: 0px !important;
            }
        }

        &.reverse {
            flex-direction: row-reverse;

            .l {
                margin-left: 40px;
            }
        }

        .number {
            font-size: 39px;
            line-height: 100%;
            margin-bottom: 22px;

            @media (max-width: 576px) {
                margin-bottom: 10px;
            }
        }

        .descr {
            font-weight: 300;
            font-size: 17px;
            line-height: 150%;
        }
    }

    .hItems {
        width: 70%;

        .item {
            display: flex;
            align-items: center;

            .l {
                margin-right: 40px;

                @media (max-width: 576px) {
                    margin: 30px 0px !important;
                }
            }
        }

        img {
            width: unset;
            max-width: 508px;

            @media (max-width: 1024px) {
                max-width: 391px;
            }

            @media (max-width: 576px) {
                max-width: unset;
                width: 100%;
            }
        }
    }

    .vItem {
        width: 30%;

        @media (max-width: 576px) {
            flex-direction: column !important;
        }

        .r {
            margin-top: 114px;

            @media (max-width: 1024px) {
                margin-top: 49px;
            }

            @media (max-width: 576px) {
                margin-top: 30px !important;
            }
        }
    }
}
</style>
