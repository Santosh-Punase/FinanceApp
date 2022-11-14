import { Text, StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonType = 'success' | 'error' | 'primary' | 'link' | 'outline';

export function Button({ onPress, label, rounded, selected, style, labelStyles, buttonType = "primary", ...rest }: TouchableOpacityProps & { label: string, rounded?: boolean, buttonType?: ButtonType, selected: boolean, labelStyles?: {} }) {

  const borderRadius = rounded ? 14 : 4;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.wrapper, style, { borderRadius }]}
      { ...rest }
    >
      <Text style={[styles.buttonLabel, { borderRadius }, labelStyles, selected ? styles[buttonType] : {}]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#dadada',
  },
  buttonLabel: {
    paddingTop: 4,
    paddingBottom: 6,
    paddingHorizontal: 10,
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
  },
  outline: {
    color: 'blue',
    backgroundColor: '#fff',
    borderColor: 'blue',
    borderWidth: 1,
  },
});
