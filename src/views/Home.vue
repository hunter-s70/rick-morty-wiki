<template>
  <div class="home">
    <div v-if="result">{{ result }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
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

    return {
      result,
    };
  },
});
</script>
