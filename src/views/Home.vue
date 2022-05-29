<template>
  <div class="home">
    <div
      v-if="charactersList && charactersList.length"
      class="home__characters"
    >
      <CharacterTile
        v-for="character in charactersList"
        :reference="`/characters/${character.id}`"
        :key="character.id"
        :item="character"
        class="home__tile"
      />
    </div>

    <LoadMore v-if="pages" :page="page" :pages="pages" @click="loadMore" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useResult } from "@vue/apollo-composable";
import { usePagination } from "@/composables/usePagination";

import { getCharactersList } from "@/api/characters.gql";
import { getCharacters_characters_results } from "@/api/__generated__/getCharacters";

import CharacterTile from "@/components/CharacterTile.vue";
import LoadMore from "@/components/LoadMore.vue";

type CharactersList = (getCharacters_characters_results | null)[];

interface IHomeData {
  savedList: CharactersList;
}

export default defineComponent({
  name: "Home",
  components: {
    CharacterTile,
    LoadMore,
  },
  setup() {
    const list = computed(() => characters.value?.results);
    const info = computed(() => characters.value?.info || null);

    const { page, pages, next, nextPage } = usePagination(info);
    const { result } = getCharactersList(page);
    const characters = useResult(result);

    return {
      page,
      next,
      pages,
      nextPage,
      list,
    };
  },
  data(): IHomeData {
    return {
      savedList: [],
    };
  },
  computed: {
    currentPageList(): CharactersList {
      return this.list || [];
    },
    charactersList(): CharactersList {
      return [...this.savedList, ...this.currentPageList];
    },
  },
  methods: {
    loadMore(): void {
      this.savePageData(this.currentPageList);
      this.nextPage();
    },
    savePageData(listData: CharactersList): void {
      if (listData && listData.length) {
        this.savedList = [...this.savedList, ...listData];
      }
    },
  },
});
</script>

<style lang="scss">
$tile-width: 360px;

.home {
  padding: 10px;

  &__characters {
    display: grid;
    grid-template-columns: $tile-width;
    grid-gap: 15px 15px;
    justify-content: center;
    max-width: 2000px;
    margin: auto;

    @media (min-width: 768px) {
      & {
        grid-template-columns: repeat(2, $tile-width);
      }
    }

    @media (min-width: 1200px) {
      & {
        grid-template-columns: repeat(3, $tile-width);
      }
    }

    @media (min-width: 1400px) {
      & {
        grid-template-columns: repeat(4, $tile-width);
      }
    }
  }

  &__tile {
    @media (min-width: 1400px) {
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
}
</style>
