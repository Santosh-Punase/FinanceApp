import { Text, StyleSheet, TouchableOpacity, TouchableOpacityProps, ColorSchemeName } from "react-native";
import Colors from "../constants/Colors";
import { useTheme } from "../theme";

type ButtonType = 'success' | 'error' | 'primary' | 'link' | 'outline';

export function Button({ onPress, disabled, label, rounded, selected, style, labelStyles, buttonType = "primary", ...rest }: TouchableOpacityProps & { label: string, rounded?: boolean, buttonType?: ButtonType, selected: boolean, labelStyles?: {} }) {

  const currentTheme:ColorSchemeName = useTheme();
  const borderRadius = rounded ? 14 : 4;
  const opacity = disabled ? 0.6 : 1;

  const success = {
    color: Colors[currentTheme].buttonColor,
    backgroundColor: Colors[currentTheme].buttonSuccessBG
  }

  const error = {
    color: Colors[currentTheme].buttonColor,
    backgroundColor: Colors[currentTheme].buttonErrorBG
  }

  const primary = {
    color: Colors[currentTheme].buttonColor,
    backgroundColor: Colors[currentTheme].buttonPrimaryBG
  }

  const link = {
    color: Colors[currentTheme].buttonPrimaryBG,
    backgroundColor: Colors[currentTheme].background
  }

  const outline = {
    color: Colors[currentTheme].buttonPrimaryBG,
    backgroundColor: Colors[currentTheme].background,
    borderWidth: 1,
    borderColor: Colors[currentTheme].buttonPrimaryBG
  }

  const buttonStyles = StyleSheet.create({ success, error, primary, link, outline })


  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.wrapper, style, { borderRadius, opacity }]}
      { ...rest }
    >
      <Text style={[styles.buttonLabel, { borderRadius }, labelStyles, selected ? buttonStyles[buttonType] : {}]}>{label}</Text>
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
});
