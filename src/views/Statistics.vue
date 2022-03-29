<template>
  <div class="statistics">
    <h1>Statistics should be here</h1>
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
