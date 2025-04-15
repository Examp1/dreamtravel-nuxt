<script setup>
defineProps({
    propsData: [Object, Array],
});
</script>

<template>
    <section
        class="info container"
        :class="{ reverse: propsData.image_position == 'left' }"
    >
        <div class="blockWrapper">
            <img :src="path(propsData.image)" alt="" />
            <div class="infoWrapper">
                <p class="title">{{ propsData.title }}</p>
                <div class="descr" v-html="propsData.description"></div>
                <NuxtLink
                    v-if="propsData.button_link && propsData.button_title"
                    to="https://google-fonts.nuxtjs.org/getting-started/setup/"
                    class="btn"
                    :class="propsData.button_style"
                >
                    {{ propsData.button_title }}
                    <i
                        v-if="propsData.button_style == 'read-more'"
                        class="icon ic-arrow-drop"
                    ></i
                ></NuxtLink>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.info {
    text-align: right;
    margin-bottom: 70px;

    @media (max-width: 830px) {
        margin-bottom: 50px;
    }

    @media (max-width: 576px) {
        margin-bottom: 0px;
    }

    img {
        max-width: 1071px;
        margin-left: auto;

        @media (max-width: 1071px) {
            max-width: 784px;
        }

        @media (max-width: 784px) {
            max-width: 516px;
            margin-bottom: -5px;
        }

        @media (max-width: 576px) {
            max-width: 100%;
        }
    }

    .infoWrapper {
        position: absolute;
        background-color: $c-gray;
        bottom: 0px;
        width: 520px;
        padding: 35px;
        left: 0px;
        text-align: left;

        @media (max-width: 576px) {
            bottom: -130px !important;
            position: static;
            width: unset;
        }

        @media (max-width: 830px) {
            padding: 25px;

            .title {
                margin-bottom: 20px;
                font-weight: 500;
                font-size: 16px !important;
                line-height: 140%;
            }

            .descr {
                font-weight: 300;
                font-size: 17px;
                line-height: 150%;
            }
        }

        @media (max-width: 576px) {
            text-align: center;
        }

        .title {
            font-weight: 500;
            font-size: 25px;
            line-height: 140%;
            color: #fff;
            margin-bottom: 25px;

            @media (max-width: 576px) {
                font-size: 16px;
            }
        }

        .descr {
            font-weight: 300;
            font-size: 17px;
            line-height: 150%;
            color: $t-gray;

            @media (max-width: 576px) {
                font-size: 14px !important;
            }
        }
    }

    &.reverse {
        text-align: left;

        .infoWrapper {
            right: 0px;
            left: unset;
        }

        img {
            margin-left: unset;
        }
    }
}

.blockWrapper {
    position: relative;
}
</style>
