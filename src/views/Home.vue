<template>
  <div class="home">
    <div
      v-if="charactersList && charactersList.length"
      class="home__characters"
    >
      <router-link
        v-for="result in charactersList"
        :key="result.id"
        :to="`/characters/${result.id}`"
        class="tile"
      >
        <p class="tile__title">{{ result.name }}</p>
        <img class="tile__img" :src="result.image" :alt="result.name" />
      </router-link>
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

import { getCharactersList } from "@/api/characters.requests";

interface IHomeData {
  savedList: Character[];
}

export default defineComponent({
  name: "Home",
  setup() {
    const page = ref(1);
    const { result } = getCharactersList(page);

    const getData = computed((): ICharactersList => {
      const data = result.value?.characters;
      const charactersInitialResult = data?.results || [];

      // fill list info
      const { count, pages, next, prev } = data?.info || {};
      const finalListInfo = new ListInfo(count, pages, next, prev);

      // fill list
      const finalCharactersList = charactersInitialResult.map((item: any) => {
        const { id, name, image } = item || {};
        return new Character(id, name, image);
      });

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

  &__buttons {
    padding: 20px 0;
  }

  &__btn {
    cursor: pointer;
  }
}

.tile {
  padding: 0 10px 15px;
  color: #000;
  text-decoration: none;
  font-weight: bold;
  border: 1px solid black;
  background-color: rgba(255, 228, 196, 1);
  cursor: pointer;

  &:hover {
    opacity: 0.7;
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
