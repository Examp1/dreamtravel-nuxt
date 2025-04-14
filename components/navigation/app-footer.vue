<template>
    <div class="footerWrapper" v-if="!isUiLocked">
      <footer>
        <div class="container df jcsb fContainer">
          <div class="l">
            <component
              :is="$route.name == 'Home' ? 'span' : 'router-link'"
              :to="{name: 'Home', params: { locale: $i18n.locale == 'en' ? null : $i18n.locale  }}"
              ><img
                :src="path(globalSetting.site_logo_footer)"
                alt="logo"
                class="logo"
            /></component>
            <p>{{ $t("logoText") }}</p>
            <ul class="socLinks">
              <li v-for="(item, idx) in globalSetting.links" :key="idx">
                <a :href="item.link" target="_blank">
                  <img :src="path(item.image)" alt="socLogo" class="socialIcon" />
                </a>
              </li>
            </ul>
          </div>
          <div class="r">
            <ul class="footerMenu" v-if="footerMenuList">
              <li
                v-for="(item, idx) in footerMenuList.items"
                :key="idx"
              >
                <!-- <router-link :to="item.url">{{ item.name }}</router-link> -->
                <app-link class="appLink" :link="item"></app-link>
              </li>
            </ul>
            <p class="ceoText">
              {{ globalSetting.footer_text }}
            </p>
          </div>
        </div>
        <span class="hr"></span>
      </footer>
      <div class="bottomFooter">
        <div class="container df jcsb">
          <ul class="df jcc payment">
            <li>
              <a href="#">
                <img :src="require('@/assets/image/visa.svg')" alt="visa-logo" />
              </a>
            </li>
            <li>
              <a href="#">
                <img
                  :src="require('@/assets/image/mastercard-logo.svg')"
                  alt="mastercard-logo"
                />
              </a>
            </li>
          </ul>
          <ul class="df jcsb">
            <li>{{ globalSetting.copy }}</li>
            <!-- <li>{{ globalSetting.developer_text }} <i class="icon ic-owl"></i></li> -->
            <li class="copy">
              <a href="https://owlweb.com.ua/" rel="nofollow">
                {{ globalSetting.developer_text }} <i class="icon ic-owl"></i>
              </a>
            </li>
          </ul>
          <p class="lisence">{{ globalSetting.license }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  export default {
    computed: {
      ...mapGetters(["globalSetting", "isUiLocked", "getSize", "footerMenuList"])
    }
  };
  </script>
  
  <style lang="sass" scoped>
  footer
      background-color: darken(#17171D, 1)
      color: #fff
      padding-top: 44px
      @media (max-width: 576px)
          padding-top: 34px
  p, li
      font-size: 12px
  .l
      width: 25%
      @media (max-width: 576px)
          width: 100%
          text-align: center
      p
          font-weight: 600
          font-size: 16px
          line-height: 130%
          color: #FFFFFF
      ul
          display: flex
          justify-content: center
      li
          &:hover
              i
                  color: $c-btn
          &:first-of-type
              margin-right: 22px
  .r
      width: 70%
      ul
          display: flex
      li
          a
              font-weight: 600
              font-size: 15px
              line-height: 100%
              color: #FFFFFF
          &:not(:last-of-type)
              margin-right: 20px
      .ceoText
          font-weight: 300
          font-size: 17px
          line-height: 150%
          color: #CACACA
  .logo
      display: flex
      justify-content: center
      width: 100%
      margin-bottom: 25px
      @media (max-width: 1024px)
          width: unset
          margin: 0 auto 25px auto
  .hr
      display: block
      margin-top: 44px
      border-bottom: 1px solid #333
      @media (max-width: 576px)
          margin-top: 45px
  .bottomFooter
      padding: 14px 0px
      background-color: darken(#17171D, 1)
      color: #777777
      @media (max-width: 576px)
          .container
              display: flex
              flex-wrap: wrap
              flex-direction: column
              // ul:first-of-type
              //     display: none
              ul
                  order: 3
                  // justify-content: space-between
              p
                  color: #FFFFFF
                  margin-bottom: 20px
                  font-size: 12px
              .lisence
                  order: 2
              .payment
                  order: 1
                  margin-bottom: 15px
  ul, p
      margin: 0px
  ul
      display: flex
      justify-content: center
      li:not(:last-of-type)
          margin-right: 7px
  .fContainer
      .r .ceoText
          @media (max-width: 768px)
              display: none
      @media (max-width: 1024px)
          flex-direction: column
          align-items: center
          .r, .l
              width: 100%
          .r
              margin-top: 28px
      .l
          text-align: center
  .lisence
      color: #fff
  .copy
      margin-left: 44px
      position: static
  .socLinks
      margin-top: 18px
  .footerMenu
      justify-content: flex-start
      margin-bottom: 38px
      li
          a
              transition: .3s
          &:hover a
              color: $c-btn
      @media (max-width: 1024px)
          justify-content: center
      @media (max-width: 768px)
          margin-bottom: 0px
      @media (max-width: 576px)
          flex-direction: column
          align-items: center
          li
              margin-right: 0px !important
              display: block
              width: 100%
              text-align: center
              &:first-of-type
                  a
                      border-top: 1px solid #28292F
              a
                  width: 100%
                  display: block
                  color: $c-btn
                  padding: 17px 0px
                  border-bottom: 1px solid #28292F
  </style>