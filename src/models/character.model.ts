export interface ICharacterPreview {
  id: number;
  name: string;
  image: string;
}

export interface ICharacter {
  id: number;
  name: string;
  type: string;
  image: string;
  gender: string;
  status: string;
  species: string;
  created: string;
}

export class Character implements ICharacterPreview {
  id: number;
  name: string;
  image: string;

  constructor(id: number, name: string, image: string) {
    this.id = id;
    this.name = name;
    this.image = image;
  }
}
