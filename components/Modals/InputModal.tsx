import { AntDesign } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, Modal, Platform, KeyboardAvoidingView, Animated } from "react-native";
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
  const [errored, setErrored] = useState<boolean>(false);
  const [animation] = useState(new Animated.Value(0));

  const _onChangeText = (value: string) => {
    _setError(value);
		setValue(value);
		onChangeText?.(value);
	}

  const _setError = (value: string) => {
    if(!value) {
      setErrored(true);
    } else {
      setErrored(false);
    }
  }

  const startShake = () => {
    Animated.sequence([
      Animated.timing(animation, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(animation, { toValue: -10, duration: 100, useNativeDriver: true }),
      Animated.timing(animation, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(animation, { toValue: 0, duration: 100, useNativeDriver: true })
    ]).start();
 }

	const _onSubmit = () => {
    if(errored) {
      startShake();
      return;
    } 
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
              <Animated.View style={{ transform: [{ translateX: animation }] }}>
                <Input
                  value={value}
                  autoFocus
                  placeholder={placeholder}
                  style={[errored ? { ...styles.textInput, borderColor: 'red' } : styles.textInput]}
                  onChangeText={_onChangeText}
                  onSubmitEditing={_onSubmit}
                />
              </Animated.View>
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
