<template>
  <div class="home">
    <div
      v-if="charactersList && charactersList.length"
      class="home__characters"
    >
      <div v-for="result in charactersList" :key="result.id" class="tile">
        <p class="tile__title">{{ result.name }}</p>
        <img class="tile__img" :src="result.image" :alt="result.name" />
      </div>
    </div>
    <div class="home__buttons">
      <button class="home__btn" @click="loadMore">Load more</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";

import { CharactersList } from "@/models/characters-list.model";
import { Character } from "@/models/character.model";
import { ListInfo } from "@/models/list-info.model";

import { getCharactersList } from "@/api/characters.requests";

interface IHomeData {
  charactersList: Character[];
}

export default defineComponent({
  name: "Home",
  setup() {
    const page = ref(1);
    const { result } = getCharactersList(page);

    const getData = computed((): { [key: string]: any } | null => {
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
      charactersList: [],
    };
  },
  computed: {
    charactersResult(): any {
      return this.characters?.results || null;
    },
    nextPage(): any {
      return this.characters?.info.next || null;
    },
  },
  watch: {
    charactersResult(updatedList) {
      this.updateListData(updatedList);
    },
  },
  methods: {
    loadMore(): void {
      if (this.nextPage) {
        this.page = this.nextPage;
      }
    },
    updateListData(listData: Character[]): void {
      if (listData && listData.length) {
        this.charactersList = [...this.charactersList, ...listData];
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
