import { Platform, StyleSheet, TouchableOpacity } from "react-native";

import { Icon } from "./Icon";

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
        <TouchableOpacity onPress={onCancel}>
          <View style={styles.button}>
            <Icon type="AntDesign" name="close" style={{ marginRight: 10, }} size={18} />
            <Text
              style={styles.cancelButtonText}>
              {cancelText}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  noResult: {
    height: 300,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 80,
  },
  noResultHeader: {
    fontSize: 22,
  },
  noResultSubHeader: {
    fontSize: 14,
    marginVertical: 10,
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
    borderWidth: 1,
    borderRadius: 8,
	},
  cancelButtonText: {
		fontSize: 16,
		fontWeight: "500",
    width: 100,
    textTransform: 'uppercase',
	},
});
