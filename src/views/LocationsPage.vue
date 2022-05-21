<template>
  <div v-if="locations" class="locations">
    <p>{{ page }}</p>
    <p>{{ locationsList }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useResult } from "@vue/apollo-composable";
import { getLocationsList } from "@/api/locations.gql";

export default defineComponent({
  name: "LocationsPage",
  setup() {
    const page = ref(1);
    const { result } = getLocationsList(page);
    const locations = useResult(result);

    return {
      page,
      locations,
    };
  },

  computed: {
    locationsList(): any {
      console.log(this.locations);
      return this.locations;
    },
  },
});
</script>

<style lang="scss">
.locations {
}
</style>
