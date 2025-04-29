<template>
    <div class="pagePreloader">
        <div class="text">
            <p class="bef">Сьогодні Dream, вже завтра Travel</p>
            <p>Dream Travel</p>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.pagePreloader {
    position: fixed;
    inset: 0;
    background-color: $c-black;
    z-index: 1002;
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    p {
        color: #fff;
        font-size: 100px;
        font-weight: 600;
        animation: textSize 5s ease infinite;

        @media (max-width: 830px) {
            animation: textSize-medium 5s ease infinite;
        }

        @media (max-width: 576px) {
            animation: textSize-small 5s ease infinite;
        }

        &:first-of-type {
            font-weight: 500;
            font-size: 26.0889px;
            line-height: 140%;
            animation: textSize2 5s ease infinite;

            @media (max-width: 830px) {
                animation: textSize2-medium 5s ease infinite;
            }

            @media (max-width: 576px) {
                animation: textSize2-small 5s ease infinite;
            }
        }
    }
}

@keyframes textSize {
    0% {
        font-size: 100px;
    }
    50% {
        font-size: 130px;
    }
    100% {
        font-size: 100px;
    }
}

@keyframes textSize2 {
    0% {
        font-size: 26px;
    }
    50% {
        font-size: 35px;
    }
    100% {
        font-size: 26px;
    }
}

@keyframes textSize-medium {
    0% {
        font-size: 60px;
    }
    50% {
        font-size: 80px;
    }
    100% {
        font-size: 60px;
    }
}

@keyframes textSize2-medium {
    0% {
        font-size: 20px;
    }
    50% {
        font-size: 28px;
    }
    100% {
        font-size: 20px;
    }
}

@keyframes textSize-small {
    0% {
        font-size: 40px;
    }
    50% {
        font-size: 50px;
    }
    100% {
        font-size: 40px;
    }
}

@keyframes textSize2-small {
    0% {
        font-size: 14px;
    }
    50% {
        font-size: 22px;
    }
    100% {
        font-size: 14px;
    }
}

.bef {
    position: relative;

    @media (max-width: 576px) {
        &::after {
            top: 50% !important;
            width: 37px;
            right: -50px;
        }

        &::before {
            top: 50% !important;
            width: 37px;
            left: -50px;
        }
    }
}
</style>
