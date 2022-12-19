import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, Modal, Platform } from "react-native";
import Layout from "../../constants/Layout";
import { View, Text } from "../Themed";
import { ModalFooter } from "./ModalFooter";

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
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>
                {title}
              </Text>
              <TouchableOpacity onPress={onClose}>
                <AntDesign name="close" size={20} />
              </TouchableOpacity>
            </View>
            {React.isValidElement(children) ? children : null}
            <ModalFooter cancelText={cancelText} submitText={submitText} onSubmit={onSubmit} onCancel={onCancel} />
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
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
