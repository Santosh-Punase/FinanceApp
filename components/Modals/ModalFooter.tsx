import React from "react";
import { StyleSheet, TouchableOpacity, Platform } from "react-native";

import { Icon } from "../Icon";
import { View, Text } from "../Themed";

type Props = {
  cancelText: string;
  submitText: string;
  onSubmit: () => void;
  onCancel: () => void;
  showCancelButtonIcon?: boolean;
}

export function ModalFooter({ cancelText, submitText, showCancelButtonIcon=false, onSubmit, onCancel }: Props) {

  return (
    <View style={styles.buttonsOuterView}>
      <View style={styles.buttonsInnerView}>
        <TouchableOpacity onPress={onCancel}>
					<View style={styles.button}>
						{ showCancelButtonIcon && (
							<Icon type="AntDesign" name="close" style={{ marginRight: 10 }} size={18} />
						)}
						<Text
							style={styles.cancelButtonText}>
							{cancelText}
						</Text>
					</View>
        </TouchableOpacity>
        <View style={styles.buttonsDivider} />
        <TouchableOpacity onPress={onSubmit}>
					<View style={styles.button}>
						<Text
							style={styles.submitButtonText}>
							{submitText}
						</Text>
					</View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
	buttonsOuterView: {
		flexDirection: "row",
		...Platform.select({
			ios: {},
			android: {
				justifyContent: "flex-end"
			}
		}),
		width: "100%",
    paddingTop: 10,
		paddingBottom: 20,
	},
	buttonsDivider: {
		...Platform.select({
			ios: {
				width: 1,
				// backgroundColor: "rgba(0,0,0,0.5)"
			},
			android: {
				width: 0
			}
		}),
	},
	buttonsInnerView: {
		flexDirection: "row",
		...Platform.select({
			ios: {
				borderTopWidth: 0.5,
				flex: 1
			},
			android: {}
		}),
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
		paddingVertical: 10,
    paddingHorizontal: 20,
    // backgroundColor: '#fff',
    // borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 8,
	},
	cancelButtonText: {
		fontSize: 16,
		fontWeight: "500",
		// color: "black",
    textTransform: 'uppercase',
	},
	submitButtonText: {
		color: "rgb(0, 129, 251)",
		fontWeight: "500",
		fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
	}
});
