import { computed } from "vue";
import type { ComputedRef } from "vue";
import { paginationInfo_info } from "@/api/__generated__/paginationInfo";

export interface IListContentData<T> {
  info: paginationInfo_info | null;
  results: T | null;
}

export interface IListContent<T> {
  info: ComputedRef<paginationInfo_info | null>;
  list: ComputedRef<T | null[]>;
}

export function useListContent<T>(
  data: ComputedRef<Readonly<IListContentData<T>> | null>
): IListContent<T> {
  const list = computed(() => data.value?.results || []);
  const info = computed(() => data.value?.info || null);

  return {
    list,
    info,
  };
}
