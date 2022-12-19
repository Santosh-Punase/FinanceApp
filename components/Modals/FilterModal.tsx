import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, Modal } from "react-native";
import { View, Text } from "../Themed";
import { modalStyles } from "./modal.styles";
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
      onRequestClose={onClose}>
      <View style={modalStyles.modalBackdrop}>
        <View style={modalStyles.screenOverlay}>
          <View style={modalStyles.dialogPrompt}>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>
                {title}
              </Text>
              <TouchableOpacity onPress={onClose}>
                <AntDesign name="close" size={20} />
              </TouchableOpacity>
            </View>
            {React.isValidElement(children) ? children : null}
            <ModalFooter cancelText={cancelText} submitText={submitText} onSubmit={onSubmit} onCancel={onCancel} showCancelButtonIcon />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
