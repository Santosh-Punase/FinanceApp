import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef } from "react";
import { TextInput, TextInputProps, StyleSheet, ColorSchemeName } from "react-native";
import Colors from "../constants/Colors";

import { useTheme } from "../theme";
import { View, Text } from "./Themed";

export function Input({ placeholder, showLabel=false, label, style, autoFocus, ...rest }: TextInputProps & { showLabel?: boolean, label?: string }) {
  const textRef = useRef<TextInput>(null);
  const currentTheme:ColorSchemeName = useTheme();
  const backgroundColor =Colors[currentTheme].background;
  const textColor =Colors[currentTheme].text;
  const borderColor =Colors[currentTheme].border;


  useFocusEffect(
    useCallback(() => {
     // When the screen is focused
     const focus = () => {
      setTimeout(() => {
      
       textRef?.current?.focus();
      }, 100);
     };
     focus();
     return focus; // cleanup
    }, [textRef?.current]),
  );

  return (
    <View style={styles.inputWrapper}>
      { showLabel && <Text style={[styles.inputLabel, { backgroundColor: backgroundColor }]}>{label || placeholder}</Text> }
      <View>
        <TextInput
          ref={autoFocus ? textRef : undefined}
          style={[styles.input, { borderColor, color: textColor }, style ]}
          placeholder={placeholder}
          placeholderTextColor={borderColor}
          { ...rest }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    width: '100%',
    height: 50,
    paddingHorizontal: 16,
  },
  inputLabel: {
    // backgroundColor: '#fff',
    zIndex: 2,
    paddingHorizontal: 6,
    position: 'absolute',
    top: -11,
    left: 10
  },
});
