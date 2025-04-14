<template>
    <router-link :to="link">{{ link.name }}<slot></slot></router-link>
    <!-- <componten
          :is="isExternal ? 'default-link' : 'router-link'"
          @click.native.prevent.capture="onClick"
          :to="url"
      >
      {{ link.name }}
    </componten> -->
  </template>
  
  <script>
  export default {
    props: {
      link: {
        type: [Object, String]
      }
    },
    computed: {
      url() {
        const temp = {
          params: {
            locale: this.$i18n.locale == "en" ? null : this.$i18n.locale
          }
        };
        if (this.link.type === 0) {
          temp.path = this.link.url;
        } else if (
          (this.link.type === 1 && this.link.slug != "katalog")
        ) {
          temp.name = "TextPage";
          temp.params.textPageSlug = this.link.slug;
        } else if (this.link.type === 1 && this.link.slug == "katalog") {
          temp.name = "Catalog";
        } else if (typeof this.link == "string") {
          temp.path = this.link;
        }
        return temp;
      },
      isExternal() {
        if (typeof this.link == "string") {
          if (this.isExtUrl(this.link)) return true;
          else return false;
        } else if (typeof this.link == "object") {
          return false;
        } else {
          return null;
        }
      },
      linkUrl() {
        //   return this.link == null ? "" : this.link;
        if (typeof this.link == "string") {
          return this.link;
        } else {
          return this.url;
        }
      }
    },
    methods: {
      onClick(e) {
        e.preventDefault();
        if (this.isExternal) {
          e.preventDefault();
          window.location.assign(this.link);
        } else {
          this.$router.push(this.link).catch((error) => {
            if (!(error.type == 16)) {
              throw error;
            }
          });
        }
      }
    }
  };
  </script>
  
  <style lang="scss" scoped></style>
  