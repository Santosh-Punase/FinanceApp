import { Text, StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonType = 'success' | 'error' | 'primary' | 'link';

export function Button({ onPress, label, rounded, selected, style, buttonType = "primary", ...rest }: TouchableOpacityProps & { label: string, rounded?: boolean, buttonType?: ButtonType, selected: boolean }) {

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.wrapper, style, rounded ? { borderRadius: 14 } : {}]}
      { ...rest }
    >
      <Text style={[styles.buttonLabel, selected ? styles[buttonType] : {}]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#dadada',
    borderRadius: 4,
  },
  buttonLabel: {
    paddingTop: 4,
    paddingBottom: 6,
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  success: {
    color: '#fff',
    backgroundColor: 'green',
  },
  error: {
    color: '#fff',
    backgroundColor: 'red',
  },
  primary: {
    color: '#fff',
    backgroundColor: 'blue',
  },
  link: {
    color: 'blue',
    backgroundColor: '#fff',
  }
});
