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

    <div v-if="character.origin && character.origin.type">
      <h2>Origin</h2>

      <p class="character__info">
        <span class="character__info-title">{{ character.origin.type }}:</span>
        <span>{{ character.origin.name }}</span>
      </p>
      <p class="character__info">
        <span class="character__info-title">Dimension:</span>
        <span>{{ character.origin.dimension }}</span>
      </p>
    </div>

    <div v-if="character.location && character.location.type">
      <h2>Location</h2>

      <p class="character__info">
        <span class="character__info-title"
          >{{ character.location.type }}:</span
        >
        <span>{{ character.location.name }}</span>
      </p>
    </div>
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
