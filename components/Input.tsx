import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import { TextInput, TextInputProps, StyleSheet, ColorSchemeName } from "react-native";
import Colors from "../constants/Colors";

import { useTheme } from "../theme";
import { View, Text } from "./Themed";

export function Input({ placeholder, showLabel=false, label, style, autoFocus, error, onBlur, ...rest }: TextInputProps & { showLabel?: boolean, label?: string, error?: string }) {
  const [touched, setTouched] = useState<boolean>(false);
  const textRef = useRef<TextInput>(null);
  const currentTheme:ColorSchemeName = useTheme();
  const backgroundColor =Colors[currentTheme].background;
  const textColor = Colors[currentTheme].text;
  const borderColor = touched && error ? Colors[currentTheme].buttonErrorBG : Colors[currentTheme].border;


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
      <View style={{ marginBottom: 30 }}>
        <TextInput
          ref={autoFocus ? textRef : undefined}
          style={[styles.input, { borderColor, color: textColor }, style ]}
          placeholder={placeholder}
          // placeholderTextColor={borderColor}
          { ...rest }
          onBlur={(e) => { onBlur?.(e); setTouched(true)}}
        />
        { touched && error && <Text style={{ color: Colors[currentTheme].buttonErrorBG, marginTop: 5, fontSize: 12, paddingLeft: 2 }}>{error}</Text>}
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
