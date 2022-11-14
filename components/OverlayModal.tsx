import { useState } from "react";
import { StyleSheet, TouchableOpacity, Modal, Platform } from "react-native";
import Layout from "../constants/Layout";
import { Input } from "./Input";
import { View, Text } from "./Themed";

type ModalProps = {
  title: string;
  visible: boolean;
  placeholder?: string;
  cancelText?: string;
  submitText?: string;
  onChangeText?: (text: string) => void;
  onSubmit: (text: string) => void;
  onCancel: () => void;
}

export function OverlayModal({ title, visible, placeholder, cancelText='Cancel', submitText='Submit', onChangeText, onSubmit, onCancel }: ModalProps) {

  const [value, setValue] = useState<string>('');

  const _onChangeText = (value: string) => {
		setValue(value);
		onChangeText?.(value);
	}

	const _onSubmit = () => {
		onSubmit(value);
    setValue('');
	}

	const _onCancel = () => {
		onCancel();
    setValue('');
	}

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={_onCancel}>
      <View style={styles.modalBackdrop}>
        <View style={styles.screenOverlay}>
          <View style={styles.dialogPrompt}>
            <Text style={styles.title}>
              {title}
            </Text>
            <Input
              placeholder={placeholder}
              style={styles.textInput}
              onChangeText={_onChangeText}
              onSubmitEditing={_onSubmit}
              autoFocus={true}
            />
            <View style={styles.buttonsOuterView}>
              <View style={styles.buttonsInnerView}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={_onCancel}>
                  <Text
                    style={styles.cancelButtonText}>
                    {cancelText}
                  </Text>
                </TouchableOpacity>
                <View style={styles.buttonsDivider} />
                <TouchableOpacity
                  style={styles.button}
                  onPress={_onSubmit}>
                  <Text
                    style={styles.submitButtonText}>
                    {submitText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    height: Layout.window.height,
    backgroundColor: "black",
    opacity: 0.8,
  },
  screenOverlay: {
    borderRadius: 15,
    marginTop: Layout.window.height * 0.25,
	},
	dialogPrompt: {
		...Platform.select({
			ios: {
				opacity: 0.9,
				backgroundColor: "white",
				borderRadius: 15
			},
			android: {
        opacity: 1,
				borderRadius: 5,
				backgroundColor: "white"
			}
		}),
		padding: 10,

    borderRadius: 15,
    width: '100%',

		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center"
	},
	title: {
		fontWeight: "bold",
		fontSize: 26,
		color: "black"
	},
	textInput: {
		height: 40,
		width: "100%",
		marginVertical: 20,
		...Platform.select({
			ios: {
				backgroundColor: "rgba(166, 170, 172, 0.9)"
			},
			android: {}
		})
	},
	buttonsOuterView: {
		flexDirection: "row",
		...Platform.select({
			ios: {},
			android: {
				justifyContent: "flex-end"
			}
		}),
		width: "100%"
	},
	buttonsDivider: {
		...Platform.select({
			ios: {
				width: 1,
				backgroundColor: "rgba(0,0,0,0.5)"
			},
			android: {
				width: 20
			}
		})
	},
	buttonsInnerView: {
		flexDirection: "row",
		...Platform.select({
			ios: {
				borderTopWidth: 0.5,
				flex: 1
			},
			android: {}
		})
	},
	button: {
		flexDirection: "column",
		justifyContent: "center",

		alignItems: "center",
		...Platform.select({
			ios: { flex: 1 },
			android: {}
		}),
		marginTop: 5,
		padding: 10
	},
	cancelButtonText: {
		fontSize: 16,
		fontWeight: "600",
		color: "black"
	},
	submitButtonText: {
		color: "rgb(0, 129, 251)",
		fontWeight: "600",
		fontSize: 16
	}
});
