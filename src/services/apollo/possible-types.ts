// PossibleTypes is currently null for all types http://joxi.ru/MAjEXJdFdkbWq2
// For more details check https://v4.apollo.vuejs.org/guide-composable/fragments.html#fragments-on-unions-and-interfaces
import {
  IntrospectionInterfaceType,
  IntrospectionNamedTypeRef,
  IntrospectionObjectType,
} from "graphql/utilities/getIntrospectionQuery";
import { PossibleTypesMap } from "@apollo/client/core";

/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function getPossibleTypes(data: any): PossibleTypesMap {
  /* eslint-enable @typescript-eslint/no-explicit-any */
  const possibleTypes: PossibleTypesMap = {};

  data.__schema.types.forEach((supertype: IntrospectionInterfaceType) => {
    if (supertype.possibleTypes) {
      possibleTypes[supertype.name] = supertype.possibleTypes.map(
        (subtype: IntrospectionNamedTypeRef<IntrospectionObjectType>): string =>
          subtype.name
      );
    }
  });

  return possibleTypes;
}
