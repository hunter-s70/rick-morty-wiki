<template>
  <div class="home">
    <div v-if="charactersList" class="home__characters">
      <div v-for="result in charactersList" :key="result.id" class="tile">
        <p class="tile__title">{{ result.name }}</p>
        <img class="tile__img" :src="result.image" :alt="result.name" />
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
.home {
  padding: 10px;

  &__characters {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 15px 15px;
    max-width: 2000px;
    margin: auto;

    @media (min-width: 992px) {
      & {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1200px) {
      & {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
}

.tile {
  padding: 0 10px 15px;
  font-weight: bold;
  border: 1px solid black;
  background-color: rgba(255, 228, 196, 1);
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 228, 196, 0.8);
  }

  &__img {
    vertical-align: top;
  }

  @media (min-width: 1200px) {
    &:nth-child(1),
    &:nth-child(7) {
      grid-column: 1 / span 2;
    }

    &:nth-child(6),
    &:nth-child(12) {
      grid-column: 3 / span 2;
    }
  }
}
</style>
