<script setup>
defineProps({
    tabList: {
        type: [Array, Object],
        require: true,
        default: () => [],
    },
    morfTitle: String,
});

const route = useRoute()
</script>

<template>
    <section class="seeAlso">
        <div class="container">
            <h2 class="sectionTitle bef">
                {{ $t("seeAlsoTitle") }} <span>{{ morfTitle }}</span>
            </h2>
            <div class="variants">
                <div class="item" v-for="(item, idx) in tabList" :key="idx">
                    <!-- TODO {
                            name: 'ContryHotels',
                            params: {
                                countryName: $route.params.countryName,
                                locale: currentLangForLink,
                            },
                        } -->
                    <NuxtLink v-if="item.type === 'hotels'" :to="`/country/${route.params.countryName}/hotels`"
                        >{{ item.tab_name || item.name }}
                        <i class="ic-arrow"></i
                    ></NuxtLink>
                    <!-- TODO {
                            name: 'CountryTours',
                            params: {
                                countryName: $route.params.countryName,
                                locale: currentLangForLink,
                            },
                        } -->
                    <NuxtLink v-else-if="item.type === 'tours'" :to="`/country/${route.params.countryName}/tours`"
                        >{{ item.tab_name || item.name }}
                        <i class="ic-arrow"></i
                    ></NuxtLink>
                    <!-- TODO {
                            name: 'CountryInfos',
                            params: {
                                countryName: $route.params.countryName,
                                infoPageSlug: item.slug,
                                locale: currentLangForLink,
                            },
                        } -->
                    <NuxtLink v-else-if="item.type === 'info'" :to="`/country/${route.params.countryName}`"
                        >{{ item.tab_name || item.name }}
                        <i class="ic-arrow"></i
                    ></NuxtLink>
                    <!-- TODO {
                            name: 'Contry',
                            params: {
                                countryName: $route.params.countryName,
                                locale: currentLangForLink,
                            },
                        } -->
                    <NuxtLink v-else :to="`/country/${route.params.countryName}`">
                        {{ item.tab_name || item.name }}
                        <i class="ic-arrow"></i>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.sectionTitle {
    span {
        text-transform: capitalize;
    }
}

.seeAlso {
    text-align: center;
}

.variants {
    margin-top: 70px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
    @media (max-width: 830px) {
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 22px;
    }
    @media (max-width: 576px) {
        margin-top: 0px;
        grid-template-columns: 1fr;
    }
    .item {
        padding: 0px;
        > a {
            width: 100%;
            transition: 0.3s;
            background-color: #28292f;
            padding: 30px 32px;
            display: flex;
            justify-content: space-between;
            text-align: left;
            font-size: 17px;
            line-height: 150%;
            color: #ffffff;
            i {
                color: $c-btn;
            }
            &.router-link-exact-active.router-link-active {
                background-color: $c-btn;
                color: #fff;
            }
            &:hover {
                background-color: #2a4651;
            }
        }
    }
}
</style>
