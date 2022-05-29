<template>
  <div class="load-more">
    <div class="load-more__state">{{ pagesText }}</div>
    <button class="load-more__btn" @click="$emit('click')">Load more</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadMore",

  emits: ["click"],

  props: {
    page: {
      type: [String, Number],
      required: true,
    },
    pages: {
      type: [String, Number],
      default: "",
    },
  },

  computed: {
    pagesText(): string {
      return this.pages ? `${this.page} of ${this.pages}` : `${this.page}`;
    },
  },
});
</script>

<style scoped lang="scss">
.load-more {
  padding: 25px 5px 50px;

  &__state {
    padding-bottom: 15px;
    font-weight: bold;
    font-size: 20px;
  }

  &__btn {
    font-size: 25px;
    cursor: pointer;
  }
}
</style>
