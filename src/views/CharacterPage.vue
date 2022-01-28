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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { getCharacterInfo } from "@/api/characters.requests";
import { ICharacter } from "@/models/character.model";

export default defineComponent({
  name: "CharactersPage",
  setup() {
    const route = useRoute();

    const id = route.params.id;
    const { result } = getCharacterInfo(id);

    const getData = computed((): ICharacter => {
      return result.value?.character;
    });

    return {
      result,
      character: getData,
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
