import { Ref } from "vue";
import { useQuery, UseQueryReturn } from "@vue/apollo-composable";
import gql from "graphql-tag";

export const paginationInfoFragment = gql`
  fragment paginationInfo on Info {
    count
    pages
    next
    prev
  }
`;

export const characterPreviewFragment = gql`
  fragment characterPreview on Character {
    id
    name
    image
  }
`;

export function getCharactersList(
  page: Ref<number>
): UseQueryReturn<{ [key: string]: any }, { page: Ref<number> }> {
  return useQuery(
    gql`
      query getCharacters($page: Int!) {
        characters(page: $page) {
          info {
            ...paginationInfo
          }
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
        }
      }
      ${characterPreviewFragment}
    `,
    { id }
  );
}
