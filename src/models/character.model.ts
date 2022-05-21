export interface ICharacterPreview {
  id: string | null;
  name: string | null;
  image: string | null;
}

export interface ICharacter {
  id: string | null;
  name: string | null;
  type: string | null;
  image: string | null;
  gender: string | null;
  status: string | null;
  species: string | null;
  created: string | null;
}

export class Character implements ICharacterPreview {
  id: string | null;
  name: string | null;
  image: string | null;

  constructor(id: string | null, name: string | null, image: string | null) {
    this.id = id;
    this.name = name;
    this.image = image;
  }
}
