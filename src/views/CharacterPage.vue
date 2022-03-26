<template>
  <div v-if="character" class="character">
    <h1>{{ character.name }}</h1>
    <img :src="character.image" :alt="character.name" />
    <p class="character__info">
      <span class="character__info-title">Gender:</span>
      <span>{{ character.gender }}</span>
    </p>
    <p class="character__info">
      <span class="character__info-title">Status:</span>
      <span>{{ character.status }}</span>
    </p>
    <p class="character__info">
      <span class="character__info-title">Species:</span>
      <span>{{ character.species }}</span>
    </p>
    <p v-if="character.type" class="character__info">
      <span class="character__info-title">Type:</span>
      <span>{{ character.type }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useResult } from "@vue/apollo-composable";
import { getCharacterInfo } from "@/api/characters.requests";

export default defineComponent({
  name: "CharactersPage",
  setup() {
    const route = useRoute();

    const id = route.params.id;
    const { result } = getCharacterInfo(id);
    const character = useResult(result);

    return {
      character,
    };
  },
});
</script>

<style lang="scss">
.character {
  &__info {
    &-title {
      padding-right: 10px;
    }
  }
}
</style>
