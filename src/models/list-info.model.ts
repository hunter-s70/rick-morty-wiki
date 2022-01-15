export interface IListInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export class ListInfo implements IListInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;

  constructor(
    count: number,
    pages: number,
    next: number | null,
    prev: number | null
  ) {
    this.count = count;
    this.pages = pages;
    this.next = next;
    this.prev = prev;
  }
}
