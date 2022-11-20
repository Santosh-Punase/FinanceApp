import { TextInput, TextInputProps, View, Text, StyleSheet } from "react-native";

export function Input({ placeholder, showLabel=false, label, style, ...rest }: TextInputProps & { showLabel?: boolean, label?: string }) {

  return (
    <View style={styles.inputWrapper}>
      { showLabel && <Text style={styles.inputLabel}>{label || placeholder}</Text> }
      <TextInput style={[styles.input, style ]} placeholder={placeholder} { ...rest } />
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
    backgroundColor: '#fff',
    zIndex: 2,
    paddingHorizontal: 6,
    position: 'absolute',
    top: -11,
    left: 10
  },
});
