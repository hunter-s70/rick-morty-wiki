import { ICharacter } from "@/models/character.model";
import { IListInfo } from "@/models/list-info.model";

export interface ICharactersList {
  info: IListInfo;
  characters: ICharacter[];
}

export class CharactersList implements ICharactersList {
  info: IListInfo;
  characters: ICharacter[];

  constructor(info: IListInfo, characters: ICharacter[]) {
    this.info = info;
    this.characters = characters;
  }
}
