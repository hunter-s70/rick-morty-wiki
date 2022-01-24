<template>
  <div class="character">
    <h1>Character info will be here. id: {{ $route.params.id }}</h1>
    <p>{{ result }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { getCharacterInfo } from "@/api/characters.requests";

export default defineComponent({
  name: "CharactersPage",
  setup() {
    const route = useRoute();

    const id = route.params.id;
    const { result } = getCharacterInfo(id);

    return {
      result,
    };
  },
});
</script>
