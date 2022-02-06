// PossibleTypes is currently null for all types http://joxi.ru/MAjEXJdFdkbWq2
// For more details check https://v4.apollo.vuejs.org/guide-composable/fragments.html#fragments-on-unions-and-interfaces
export default function getPossibleTypes(data: any) {
  const possibleTypes: any = {};

  data.__schema.types.forEach((supertype: any) => {
    if (supertype.possibleTypes) {
      possibleTypes[supertype.name] = supertype.possibleTypes.map(
        (subtype: any) => subtype.name
      );
    }
  });

  return possibleTypes;
}
