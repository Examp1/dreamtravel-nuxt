<script setup>
import { GoogleMap, Marker } from 'vue3-google-map'
import { computed } from "vue";
import { useGlobalStore } from "@/stores/global";
const { globalSetting } = useGlobalStore();
const props = defineProps({
    propsData: Object,
});
const markers = ref([
    {
        position: {
            lat: props.propsData.coords_lat,
            lng: props.propsData.coords_lng,
        },
    },
]);
const phoneNumbers = computed(() => {
    const temp = [];
    temp.push(
        {
            number: props.propsData.phone,
            label: props.propsData.phone_name,
        },
        {
            number: props.propsData.phone2,
            label: props.propsData.phone_name2,
        },
        {
            number: props.propsData.phone3,
            label: props.propsData.phone_name3,
        },
    );
    return temp;
});
</script>

<template>
    <section class="mapWrapper container">
        <div class="mapInfo">
            <ul>
                <li>
                    <p class="title">{{ propsData.name }}</p>
                    <div v-html="propsData.description" class="mapDesc"></div>
                </li>
                <li v-if="phoneNumbers">
                    <p class="title">{{ propsData.our_contacts }}</p>
                    <a
                        class="contactItem"
                        :href="`mailto:${propsData.email}`"
                        >{{ propsData.email }}</a
                    >
                    <a
                        class="contactItem"
                        :href="`tel:${item.number}`"
                        v-for="(item, idx) in phoneNumbers"
                        :key="idx"
                    >
                        {{ item.label }}
                    </a>
                </li>
            </ul>
        </div>
      
        <GoogleMap class="map" :center="coords" :api-key="globalSetting.maps_api_key" :zoom="17" style="height: 600px">
            <Marker 
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="center = m.position"
            />
        </GoogleMap>
    </section>
</template>

<style lang="scss" scoped>
.mapWrapper {
    position: relative;
    height: 600px;
    margin-bottom: 70px;

    @media (max-width: 1024px) {
        height: 512px;
        padding: 0px !important;
    }

    @media (max-width: 576px) {
        height: auto;
        display: flex;
        flex-direction: column;
    }
}

.mapInfo {
    position: absolute;
    left: 0px;
    top: 0px;
    max-width: 450px;
    width: 100%;
    background-color: rgba(#000, 0.8);
    padding: 50px;
    z-index: 2;
    height: inherit;
    display: flex;
    justify-content: center;
    flex-direction: column;

    @media (max-width: 1024px) {
        padding: 46px;
        height: inherit;
        max-width: 358px;
    }

    @media (max-width: 830px) {
        padding: 25px;
    }

    @media (max-width: 576px) {
        position: static;
        max-width: unset;
        text-align: center;
        background-color: rgba(#000, 0.8);
    }

    .title {
        font-weight: 500;
        margin-bottom: 15px;
        font-size: 25px;
        line-height: 140%;
        color: #ffffff;

        @media (max-width: 830px) {
            font-size: 16px;
            line-height: 140%;
        }
    }

    ul {
        margin: 0px;
    }

    li {
        &:not(:last-of-type) {
            margin-bottom: 78px;

            @media (max-width: 1024px) {
                margin-bottom: 60px;
            }

            @media (max-width: 830px) {
                margin-bottom: 51px;
            }
        }

        .mapDesc,
        .contactItem {
            font-weight: 300;
            font-size: 14px;
            line-height: 140%;
            color: #ffffff;

            &:not(:last-of-type) {
                margin-bottom: 10px;
            }
        }

        .contactItem {
            display: block;
        }
    }
}

:deep(.map) {
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 1;
    /* overflow: hidden; */
    padding: 0;
    /* .mapdiv{
        overflow: auto !important;
    } */
    @media (max-width: 1024px) {
        height: 512px !important;
    }

    @media (max-width: 576px) {
        // position: static;
        // height: auto !important;
    }
}
</style>
