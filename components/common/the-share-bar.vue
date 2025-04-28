<script setup>
import { ref } from "vue";
defineProps({
    date: String,
});
const route = useRoute();
const copiedTimer = ref(null);
const isCopiedLabel = ref(false);
const copyInpt = useTemplateRef("copyInpt");

const copyToClipboard = () => {
    copyInpt.value.value = window.location.href;
    copyInpt.value.select();
    document.execCommand("copy");
    isCopiedLabel.value = true;
    copiedTimer.value = setTimeout(() => {
        isCopiedLabel.value = false;
    }, 2000);
};
</script>

<template>
    <div class="uiElements">
        <ul>
            <li>
                <NuxtLink to="/news" class="back">{{ $t("back") }}</NuxtLink>
            </li>
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
                <a href="#" class="isShareLink" @click.prevent="copyToClipboard"
                    ><i class="ic-shareLink"></i>
                    <span v-if="isCopiedLabel" class="copyText">{{
                        $t("textCopyed")
                    }}</span>
                </a>
            </li>
        </ul>
        <span class="date">{{ date }}</span>
        <input type="text" class="copy" ref="copyInpt" />
    </div>
</template>
<style lang="scss">
.uiElements {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // margin-bottom: 50px;
    padding-top: 30px;

    .date {
        font-weight: 400;
        font-size: 12px;
        line-height: 100%;
        color: #777777;
    }

    ul {
        display: flex;
        margin: 0;

        li {
            &.isIco {
                font-size: 20px;
            }

            &:first-of-type {
                margin-right: 20px !important;

                a {
                    width: 107px;
                }
            }

            &:not(:last-of-type) {
                margin-right: 10px;
            }

            a {
                border: 1px solid $c-btn;
                height: 41px;
                min-width: 41px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: $c-btn;
            }
        }
    }
}

.isShareLink {
    position: relative;
}

.copy {
    position: fixed;
    // pointer-events: none;
    left: 100%;
}

.copyText {
    background: #1d1d1d;
    padding: 16px;
    border-radius: 3px;
    position: absolute;
    top: calc(100% + 20px);
    right: 0;
    white-space: nowrap;
}
</style>
