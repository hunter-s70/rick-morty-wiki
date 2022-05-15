import { Ref } from "vue";
import { useQuery, UseQueryReturn } from "@vue/apollo-composable";
import gql from "graphql-tag";

export const paginationInfoFragment = gql`
  fragment paginationInfo on Characters {
    info {
      count
      pages
      next
      prev
    }
  }
`;

export const characterPreviewFragment = gql`
  fragment characterPreview on Character {
    id
    name
    image
  }
`;

export const locationInfoFragment = gql`
  fragment locationFragment on Location {
    id
    name
    type
    dimension
    created
  }
`;

export const episodeInfoFragment = gql`
  fragment episodeFragment on Episode {
    id
    name
    episode
    created
  }
`;

export function getCharactersList(
  page: Ref<number>
): UseQueryReturn<{ [key: string]: any }, { page: Ref<number> }> {
  return useQuery(
    gql`
      query getCharacters($page: Int!) {
        characters(page: $page) {
          ...paginationInfo
          results {
            ...characterPreview
          }
        }
      }
      ${paginationInfoFragment}
      ${characterPreviewFragment}
    `,
    { page }
  );
}

export function getCharacterInfo(
  id: string | string[]
): UseQueryReturn<{ [key: string]: any }, { id: string | string[] }> {
  return useQuery(
    gql`
      query getCharacter($id: ID!) {
        character(id: $id) {
          ...characterPreview
          gender
          type
          status
          species
          created
          origin {
            ...locationFragment
          }
          location {
            ...locationFragment
          }
          episode {
            ...episodeFragment
          }
        }
      }
      ${characterPreviewFragment}
      ${locationInfoFragment}
      ${episodeInfoFragment}
    `,
    { id }
  );
}
