import { StyleSheet } from "react-native";

import { Text, View } from "./Themed";

type NoRecordProps = {
  header: string;
  subHeader: string;
}

export function NoRecord({ header, subHeader }: NoRecordProps) {

  return (
    <View style={styles.noResult}>
      <Text style={styles.noResultHeader}>{header}</Text>
      <Text style={styles.noResultSubHeader}>{subHeader}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noResult: {
    height: 300,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultHeader: {
    fontSize: 22,
  },
  noResultSubHeader: {
    fontSize: 14,
    marginTop: 10,
  },
});
