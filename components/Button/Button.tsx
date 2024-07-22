import { Text, StyleSheet, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from "react-native";

export interface ButtonProps extends TouchableOpacityProps {
  label: string,
  rounded?: boolean,
  isLoading?: boolean,
  labelStyles?: {}
}

export function Button({
  onPress,
  disabled,
  label,
  rounded,
  isLoading,
  style,
  labelStyles,
  ...rest
}: ButtonProps) {
  const borderRadius = rounded ? 14 : 8;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.wrapper, style, { borderRadius, opacity: disabled ? 0.6 : 1 }]}
      { ...rest }
    >
      { isLoading
      ? <ActivityIndicator size={"small"} color={"#fff"} style={[styles.buttonLabel, { borderRadius }, labelStyles]} />
      : <Text style={[styles.buttonLabel, { borderRadius }, labelStyles]}>{label}</Text>
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 50,
    // backgroundColor: '#dadada',
    marginVertical: 20,
  },
  buttonLabel: {
    flex: 1,
    alignSelf: 'stretch',
    textAlign: 'center',
    verticalAlign: 'middle',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
