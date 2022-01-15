import { ICharacter } from "@/models/character.model";
import { IListInfo } from "@/models/list-info.model";

export interface ICharactersList {
  info: IListInfo;
  results: ICharacter[];
}

export class CharactersList implements ICharactersList {
  info: IListInfo;
  results: ICharacter[];

  constructor(info: IListInfo, results: ICharacter[]) {
    this.info = info;
    this.results = results;
  }
}
