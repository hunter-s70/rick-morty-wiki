export interface IListInfo {
  count: number;
}

export class ListInfo implements IListInfo {
  count: number;

  constructor(count: number) {
    this.count = count;
  }
}
