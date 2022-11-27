import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, Modal, Platform } from "react-native";
import Layout from "../../constants/Layout";
import { View, Text } from "../Themed";

type ModalProps = {
  title: string;
  visible: boolean;
  cancelText?: string;
  submitText?: string;
  onSubmit: () => void;
  onCancel: () => void;
  onClose: () => void;
  children: React.ReactNode
}

export function FilterModal({ title, visible, cancelText='Clear All', submitText='Apply', onSubmit, onCancel, onClose, children }: ModalProps) {

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onCancel}>
      <View style={styles.modalBackdrop}>
        <View style={styles.screenOverlay}>
          <View style={styles.dialogPrompt}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingTop: 10, }}>
              <Text style={styles.title}>
                {title}
              </Text>
              <TouchableOpacity onPress={onClose}>
                <AntDesign name="close" size={20} />
              </TouchableOpacity>
            </View>
            {React.isValidElement(children) ? children : null}
            <View style={styles.buttonsOuterView}>
              <View style={styles.buttonsInnerView}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={onCancel}>
                    <AntDesign name="close" style={{ marginRight: 10, }} size={18} />
                  <Text
                    style={styles.cancelButtonText}>
                    {cancelText}
                  </Text>
                </TouchableOpacity>
                <View style={styles.buttonsDivider} />
                <TouchableOpacity
                  style={styles.button}
                  onPress={onSubmit}>
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 'auto',
	},
	dialogPrompt: {
		...Platform.select({
			ios: {
				opacity: 0.9,
				backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
			},
			android: {
        opacity: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
				backgroundColor: "white"
			}
		}),
		padding: 10,

    width: '100%',

		flexDirection: "column",
		justifyContent: "flex-start",
	},
	title: {
		fontSize: 16,
		color: "black",
		marginBottom: 20,
	},

	buttonsOuterView: {
		flexDirection: "row",
		...Platform.select({
			ios: {},
			android: {
				justifyContent: "flex-end"
			}
		}),
		width: "100%",
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
		marginVertical: 10,
		padding: 10,
    backgroundColor: '#fff',
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 8,
	},
	cancelButtonText: {
		fontSize: 16,
		fontWeight: "500",
		color: "black",
    width: 100,
    textTransform: 'uppercase',
	},
	submitButtonText: {
		color: "rgb(0, 129, 251)",
		fontWeight: "500",
		fontSize: 16,
    width: 100,
    textAlign: 'center',
    textTransform: 'uppercase',
	}
});
