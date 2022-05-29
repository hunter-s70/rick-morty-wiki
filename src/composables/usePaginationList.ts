import { computed, ref } from "vue";
import type { ComputedRef, Ref } from "vue";

export interface IPaginationContent<T> {
  resultList: ComputedRef<T | null[]>;
  loadMore: () => void;
}

export function usePaginationList<T>(
  list: ComputedRef,
  nextPage: () => void
): IPaginationContent<T> {
  const savedList: Ref = ref([]);
  const resultList = computed(() => [...savedList.value, ...list.value]);

  const loadMore = () => {
    savedList.value = [...savedList.value, ...list.value];
    nextPage();
  };

  return {
    resultList,
    loadMore,
  };
}
