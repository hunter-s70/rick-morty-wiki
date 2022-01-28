import { ICharacterPreview } from "@/models/character.model";
import { IListInfo } from "@/models/list-info.model";

export interface ICharactersList {
  info: IListInfo;
  results: ICharacterPreview[];
}

export class CharactersList implements ICharactersList {
  info: IListInfo;
  results: ICharacterPreview[];

  constructor(info: IListInfo, results: ICharacterPreview[]) {
    this.info = info;
    this.results = results;
  }
}
