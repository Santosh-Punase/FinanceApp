import { TextInput, TextInputProps, View, Text, StyleSheet } from "react-native";

export function Input({ placeholder, ...rest }: TextInputProps) {

  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{placeholder}</Text>
      <TextInput style={styles.input} placeholder={placeholder} { ...rest } />
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
    paddingHorizontal: 10,
    position: 'absolute',
    top: -12,
    left: 16
  },
});
