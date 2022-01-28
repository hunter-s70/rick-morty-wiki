import { Ref } from "vue";
import { useQuery, UseQueryReturn } from "@vue/apollo-composable";
import gql from "graphql-tag";

export function getCharactersList(
  page: Ref<number>
): UseQueryReturn<{ [key: string]: any }, { page: Ref<number> }> {
  return useQuery(
    gql`
      query getCharacters($page: Int!) {
        characters(page: $page) {
          info {
            count
            pages
            next
            prev
          }
          results {
            id
            name
            image
          }
        }
      }
    `,
    { page }
  );
}

export function getCharacterInfo(
  id: string | string[]
): UseQueryReturn<{ [key: string]: any }, { id: string | string[] }> {
  return useQuery(
    gql`
      query getCharacters($id: ID!) {
        character(id: $id) {
          id
          name
          gender
          type
          status
          image
          species
          created
        }
      }
    `,
    { id }
  );
}
