import React from "react";
import { Modal } from "react-native";
import Colors from "../../constants/Colors";

import { Text, View } from "../Themed";
import { modalStyles } from "./modal.styles";
import { ModalFooter } from "./ModalFooter";

type ModalProps = {
  message: string;
  visible: boolean;
  isLoading?: boolean;
  cancelText?: string;
  submitText: string;
  onSubmit: () => void;
  onCancel: () => void;
  onClose: () => void;
}

export function ConcentModal({ visible, message, submitText, onSubmit, isLoading = false, onCancel, onClose }: ModalProps) {

  return (
    <Modal
      transparent={true}
      animationType="slide"
      statusBarTranslucent
      visible={visible}
      onRequestClose={onClose}>
      <View style={modalStyles.modalBackdrop} lightColor={Colors.dark.background} darkColor={Colors.light.background}>
        <View style={modalStyles.screenOverlay}>
          <View style={modalStyles.dialogPrompt}>
            {/* {React.isValidElement(children) ? children : null} */}
            <View style={{ paddingVertical: 20 }}>
              <Text style={{ fontSize: 18, paddingLeft: 20 }}>{message}</Text>
            </View>
            <ModalFooter cancelText={'Cancel'} isLoading={isLoading} submitText={submitText} submitCTALabelStyle={{ backgroundColor: Colors.light.buttonErrorBG }} onSubmit={onSubmit} onCancel={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
