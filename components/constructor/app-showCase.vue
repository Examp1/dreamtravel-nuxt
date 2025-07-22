<script setup>
const localePath = useLocalePath()
defineProps({
    propsData: [Object, Array],
});
import appHotelItem from "~/components/hotel/app-hotel-item.vue";
</script>

<template>
    <section class="darkBg">
        <div class="showcase container container-s">
            <h2 class="sectionTitle bef">{{ propsData.title }}</h2>
            <div class="hotelList">
                <appHotelItem
                    v-for="(item, idx) in propsData.list"
                    :key="idx"
                    :propsData="item"
                ></appHotelItem>
            </div>

            <div class="bottomInfo">
                <div class="text">
                    <p class="number">{{ propsData.footer_title }}</p>
                    <div class="descr">
                        {{ propsData.footer_text }}
                    </div>
                </div>
                <NuxtLink
                    v-if="propsData.button_link && propsData.button_title"
                    :to="localePath(propsData.button_link)"
                    class="btn"
                >
                    {{ propsData.button_title }}
                    <i class="icon ic-arrow"></i>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
// showcase
.sectionTitle {
    margin-bottom: 0px;
}

.showcase {
    // padding: $section-offset 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .toursWrapper {
        display: grid;
        margin-top: 70px;
        grid-template-columns: 1fr 1fr;
        width: 100%;
        grid-gap: 10px;

        .tours {
            display: grid;
            grid-gap: 10px;
            grid-template-columns: 2fr 2fr;
        }
    }
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
}

.hotelList {
    display: grid;
    grid-gap: 28px;
    margin-bottom: 100px;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 77px;

    @media (max-width: 830px) {
        margin-top: 53px;
        justify-content: center;
        grid-template-columns: repeat(2, 1fr);

        .hotelItem {
            margin-bottom: 0px;
        }
    }

    @media (max-width: 1024px) {
        flex-wrap: wrap;
        grid-template-columns: repeat(2, 1fr);
        justify-content: space-between;
    }

    @media (max-width: 576px) {
        flex-direction: column;
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 25px;
    }
}

.hotelItem {
    @media (max-width: 830px) {
        margin-bottom: 43px;
    }

    @media (max-width: 576px) {
        margin-bottom: 25px;
        transform: unset !important;
        width: 100%;
    }
}

@media (min-width: 768px) and (max-width: 1024px) {
    .hotelItem {
        @media (max-width: 900px) {
            flex-wrap: wrap;
            justify-content: space-between;
        }

        @media (max-width: 830px) {
            margin-bottom: 32px;
        }
    }
}
</style>
