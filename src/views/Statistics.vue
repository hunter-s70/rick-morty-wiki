<template>
  <div class="statistics">
    <h1>Statistics should be here</h1>
    <ol class="list">
      <li>Statistics have no sense</li>
      <li>
        Could be applicable for single types: Location, Episode, Character
      </li>
      <li>There is not so match data</li>
      <li>
        Here is a simple example of D3.js line chart generation in Vue app
      </li>
    </ol>
    <line-chart :data="[99, 71, 78, 25, 36, 92]" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LineChart from "@/components/LineChart.vue";

export default defineComponent({
  name: "Statistics",
  components: {
    LineChart,
  },
});
</script>

<style lang="scss">
.list {
  text-align: left;
}
</style>
