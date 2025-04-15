<template>
    <section class="darkBg">
        <div class="showcase tours container">
            <h2 class="sectionTitle bef">{{ propData.title }}</h2>
            <div class="toursWrapper">
                <router-link
                    :to="mainTour.link"
                    v-if="mainTour.link"
                    class="mainTour"
                    :style="`background-image: url(${path(mainTour.image)})`"
                >
                    <p class="title">{{ mainTour.name }}</p>
                    <p class="price">{{ mainTour.text }}</p>
                </router-link>
                <div class="tours">
                    <template v-for="(item, idx) in tours">
                        <router-link
                            :to="item.link"
                            class="tour"
                            v-if="item.link"
                            :key="idx"
                            :style="`background-image: url(${path(item.image)})`"
                        >
                            <p class="title">{{ item.name }}</p>
                            <p class="price">{{ item.text }}</p>
                        </router-link>
                    </template>
                </div>
            </div>
            <component
                v-if="propData.button_link && propData.button_title"
                class="btn"
                :is="
                    isExtUrl(propData.button_link)
                        ? 'default-link'
                        : 'router-link'
                "
                :target="isExtUrl(propData.button_link) ? '_blank' : '_self'"
                :to="propData.button_link"
            >
                {{ propData.button_title }} <i class="icon ic-arrow"></i>
            </component>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        propData: {
            type: [Array, Object],
        },
    },
    computed: {
        tours() {
            let temp = { ...this.propData.list };
            delete temp[1];
            return temp;
        },
        mainTour() {
            return this.propData.list[1];
        },
    },
};
</script>

<style lang="scss" scoped>
// showcase
.showcase {
    // padding: $section-offset 0px
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .toursWrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 100%;
        grid-gap: 10px;
        margin-top: 77px;

        @media (max-width: 830px) {
            margin-top: 53px;
        }

        @media (max-width: 576px) {
            grid-template-columns: 1fr;
        }

        .tours {
            display: grid;
            grid-gap: 10px;
            grid-template-columns: 2fr 2fr;
        }
    }

    // @media (max-width: 830px) {
    //   padding: 100px 0px;
    // }
}

.mainTour,
.tour {
    position: relative;
    z-index: 2;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 15px;
    background-size: cover;

    &::before {
        content: "";
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        z-index: -1;
        background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.75) 100%
        );
    }

    .title {
        font-weight: bold;
        font-size: 19px;
        line-height: 110%;
        margin: 0px;

        @media (max-width: 830px) {
            font-size: 17px;
            line-height: 110%;
        }

        @media (max-width: 576px) {
            font-size: 14px;
        }
    }

    .price {
        font-weight: 300;
        font-size: 17px;
        line-height: 150%;
        color: $t-gray;
        margin-top: 5px;
        margin-bottom: 0px;
    }
}

.tour {
    height: 280px;

    @media (max-width: 1024px) {
        height: 220px;
    }

    @media (max-width: 830px) {
        height: 170px;
    }

    @media (max-width: 576px) {
        height: 135px;
        text-align: center;
    }
}

.mainTour {
    @media (max-width: 1024px) {
        max-height: 450px;
    }

    @media (max-width: 830px) {
        max-height: 350px;
    }

    @media (max-width: 576px) {
        height: 278px;
        text-align: center;
    }
}
</style>
