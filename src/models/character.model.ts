export interface ICharacter {
  id: number;
  name: string;
  image: string;
}

export class Character implements ICharacter {
  id: number;
  name: string;
  image: string;

  constructor(id: number, name: string, image: string) {
    this.id = id;
    this.name = name;
    this.image = image;
  }
}
