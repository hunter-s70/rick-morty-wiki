<template>
  <div class="home">
    <div v-if="charactersList">
      <div v-for="result in charactersList" :key="result.id">
        <div class="tile">
          <p class="tile__title">{{ result.name }}</p>
          <img class="tile__img" :src="result.image" :alt="result.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

export default defineComponent({
  name: "Home",
  setup() {
    const { result } = useQuery(gql`
      query getCharacters {
        characters(page: 1) {
          info {
            count
          }
          results {
            id
            name
            image
          }
        }
      }
    `);

    const getData = computed((): { [key: string]: any } | null => {
      return result.value?.characters || null;
    });

    return {
      result,
      characters: getData,
    };
  },
  computed: {
    charactersList(): any {
      return this.characters?.results || null;
    },
  },
});
</script>

<style lang="scss">
.tile {
}
</style>
