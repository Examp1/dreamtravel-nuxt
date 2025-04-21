// composables/useClickOutside.ts
import { ref, onMounted, onBeforeUnmount, type Ref } from "vue";

export function useClickOutside(
    elementRef: Ref<HTMLElement | null> | string,
    callback: (event: MouseEvent) => void,
) {
    const isClickOutside = ref(false);

    const handler = (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        if (typeof elementRef === "string") {
            // Работаем с классом
            isClickOutside.value = !target.closest(`.${elementRef}`);
        } else {
            // Работаем с ref
            isClickOutside.value = !!(
                elementRef.value && !elementRef.value.contains(target)
            );
        }

        if (isClickOutside.value) {
            callback(event);
        }
    };

    onMounted(() => {
        document.addEventListener("click", handler);
    });

    onBeforeUnmount(() => {
        document.removeEventListener("click", handler);
    });

    return { isClickOutside };
}
