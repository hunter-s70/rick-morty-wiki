/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCharacter
// ====================================================

export interface getCharacter_character {
  __typename: "Character";
  /**
   * The id of the character.
   */
  id: string | null;
  /**
   * The name of the character.
   */
  name: string | null;
  /**
   * The gender of the character ('Female', 'Male', 'Genderless' or 'unknown').
   */
  gender: string | null;
  /**
   * The type or subspecies of the character.
   */
  type: string | null;
  /**
   * The status of the character ('Alive', 'Dead' or 'unknown').
   */
  status: string | null;
  /**
   * Link to the character's image.
   * All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
   */
  image: string | null;
  /**
   * The species of the character.
   */
  species: string | null;
  /**
   * Time at which the character was created in the database.
   */
  created: string | null;
}

export interface getCharacter {
  /**
   * Get a specific character by ID
   */
  character: getCharacter_character | null;
}

export interface getCharacterVariables {
  id: string;
}
