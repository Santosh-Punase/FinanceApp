import { AntDesign } from "@expo/vector-icons";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "./Themed";

type NoRecordProps = {
  header: string;
  subHeader: string;
  onCancel?: () => void;
  cancelText?: string;
}

export function NoRecord({ header, subHeader, onCancel, cancelText = 'Clear All' }: NoRecordProps) {

  return (
    <View style={styles.noResult}>
      <Text style={styles.noResultHeader}>{header}</Text>
      <Text style={styles.noResultSubHeader}>{subHeader}</Text>
      { onCancel && (
        <TouchableOpacity
          style={styles.button}
          onPress={onCancel}>
            <AntDesign name="close" style={{ marginRight: 10, color: 'blue' }} size={18} />
          <Text
            style={styles.cancelButtonText}>
            {cancelText}
          </Text>
        </TouchableOpacity>
      )}
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
  button: {
		flexDirection: "row",
		justifyContent: "center",

		alignItems: "center",
		...Platform.select({
			ios: { flex: 1 },
			android: {}
		}),
		margin: 10,
		padding: 10,
    backgroundColor: '#fff',
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 8,
	},
  cancelButtonText: {
		fontSize: 16,
		fontWeight: "500",
		color: "blue",
    width: 100,
    textTransform: 'uppercase',
	},
});
