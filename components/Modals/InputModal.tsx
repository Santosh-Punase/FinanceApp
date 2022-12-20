import { AntDesign } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, Modal, Platform, TextInput, KeyboardAvoidingView } from "react-native";
import { Input } from "../Input";
import { View, Text } from "../Themed";
import { modalStyles } from "./modal.styles";
import { ModalFooter } from "./ModalFooter";

type Props = {
  title: string;
  initialValue?: string;
  onSubmit: (text: string) => void;
  placeholder?: string
  onCancel: () => void;
  onChangeText?: (text: string) => void;
}

export function InputModal({ title, onSubmit, initialValue = '', onCancel, onChangeText, placeholder }: Props) {
  const [value, setValue] = useState<string>(initialValue);

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
      visible
      onRequestClose={onCancel}>
      <View style={modalStyles.modalBackdrop}>
        <KeyboardAvoidingView style={modalStyles.screenOverlay} behavior={Platform.OS === "android" ? 'position' : 'height'}>
          <View style={modalStyles.dialogPrompt}>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>
                {title}
              </Text>
              <TouchableOpacity onPress={onCancel}>
                <AntDesign name="close" size={22} />
              </TouchableOpacity>
            </View>

            <View style={{ paddingVertical: 10 }}>
              <Input
                value={value}
                autoFocus
                placeholder={placeholder}
                style={styles.textInput}
                onChangeText={_onChangeText}
                onSubmitEditing={_onSubmit}
              />
            </View>
            
            <ModalFooter cancelText={'cancel'} submitText={'save'} onSubmit={_onSubmit} onCancel={_onCancel} />
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
	title: {
		fontSize: 18,
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
  textInput: {
		width: "95%",
    backgroundColor: 'white',
    borderWidth: 0.5,
    alignSelf: 'center',

		...Platform.select({
			ios: {
				backgroundColor: "rgba(166, 170, 172, 0.9)"
			},
			android: {}
		})
	},
});
