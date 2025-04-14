import { watch } from "vue";
import { useWindowSize, tryOnMounted } from "@vueuse/core";

export function useWindowSizeRange() {
    const { width } = useWindowSize();

    const setWindowSizeRange = () => {
        const ranges = [
            { min: 1280, value: "desktop" },
            { min: 1024, max: 1279, value: "tablet-lg" },
            { min: 768, max: 1023, value: "tablet" },
            { max: 767, value: "mobile" },
        ];

        const foundRange = ranges.find(
            (r) =>
                (!r.max || width.value <= r.max) &&
                (!r.min || width.value >= r.min),
        ) || { value: "unknown" };
        document
            .querySelector("#__nuxt")
            .setAttribute("data-windowsize", foundRange.value);
    };

    tryOnMounted(() => {
        setWindowSizeRange();
        watch(width, setWindowSizeRange);
    });
}
