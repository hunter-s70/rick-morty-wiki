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

    <div class="home__buttons">
      <button class="home__btn" @click="loadMore">Load more</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";

import {
  CharactersList,
  ICharactersList,
} from "@/models/characters-list.model";
import { Character, ICharacterPreview } from "@/models/character.model";
import { ListInfo } from "@/models/list-info.model";

import { getCharactersList } from "@/api/characters.gql";
import { getCharacters_characters_results } from "@/api/__generated__/getCharacters";
import CharacterTile from "@/components/CharacterTile.vue";

interface IHomeData {
  savedList: Character[];
}

export default defineComponent({
  name: "Home",
  components: {
    CharacterTile,
  },
  setup() {
    const page = ref(1);
    const { result } = getCharactersList(page);

    const getData = computed((): ICharactersList => {
      const data = result.value?.characters;
      const charactersInitialResult = data?.results || [];

      // fill list info
      const {
        count = null,
        pages = null,
        next = null,
        prev = null,
      } = data?.info || {};
      const finalListInfo = new ListInfo(count, pages, next, prev);

      // fill list
      const finalCharactersList = charactersInitialResult.map(
        (item: getCharacters_characters_results | null): ICharacterPreview => {
          const { id = null, name = null, image = null } = item || {};
          return new Character(id, name, image);
        }
      );

      return new CharactersList(finalListInfo, finalCharactersList);
    });

    return {
      result,
      page,
      characters: getData,
    };
  },
  data(): IHomeData {
    return {
      savedList: [],
    };
  },
  computed: {
    currentPageList(): ICharacterPreview[] {
      return this.characters.results;
    },
    charactersList(): ICharacterPreview[] {
      return [...this.savedList, ...this.currentPageList];
    },
    nextPage(): number | null {
      return this.characters.info.next || null;
    },
  },
  methods: {
    loadMore(): void {
      this.savePageData(this.currentPageList);
      this.changePage();
    },
    changePage(): void {
      if (this.nextPage) {
        this.page = this.nextPage;
      }
    },
    savePageData(listData: Character[]): void {
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

  &__buttons {
    padding: 20px 0;
  }

  &__btn {
    cursor: pointer;
  }
}
</style>
