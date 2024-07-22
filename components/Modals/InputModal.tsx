import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Modal, Platform, KeyboardAvoidingView, Animated } from "react-native";
import Colors from "../../constants/Colors";

import { Icon } from "../Icon";
import { Input } from "../Input";
import { View, Text } from "../Themed";
import { modalStyles } from "./modal.styles";
import { ModalFooter } from "./ModalFooter";

type Props = {
  title: string;
  required?: boolean;
  isLoading?: boolean;
  initialValue?: string;
  onSubmit: (text: string) => void;
  placeholder?: string
  onCancel: () => void;
  onChangeText?: (text: string) => void;
}

export function InputModal({ title, onSubmit, initialValue = '', required=true, onCancel, onChangeText, placeholder, isLoading }: Props) {
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
    if(required && !value) {
      setErrored(true);
      startShake();
      return;
    }
    onSubmit(value);
    // setValue('');
	}

	const _onCancel = () => {
		onCancel();
    // setValue('');
	}

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible
      statusBarTranslucent
      onRequestClose={onCancel}>
      <View style={modalStyles.modalBackdrop} lightColor={Colors.dark.background} darkColor={Colors.light.background}>
        <KeyboardAvoidingView style={modalStyles.screenOverlay} behavior={Platform.OS === "android" ? 'position' : 'height'}>
          <View style={modalStyles.dialogPrompt}>
            <View style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, }} >
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>
                  {title}
                </Text>
                <TouchableOpacity onPress={onCancel}>
                  <Icon type="AntDesign" name="close" size={22} />
                </TouchableOpacity>
              </View>

              <View>
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
              <ModalFooter cancelText={'Cancel'} submitText={'Save'} onSubmit={_onSubmit} onCancel={_onCancel} isLoading={isLoading} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
	title: {
		fontSize: 18,
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
