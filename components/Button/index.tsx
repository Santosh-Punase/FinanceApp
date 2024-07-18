import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { ButtonProps } from "./Button";
import { Button } from "./Button";
import Colors from "../../constants/Colors";

export function ButtonPrimary({ labelStyles, ...rest }: ButtonProps) {
  return (
    <Button labelStyles={{ ...styles.primaryLabel, labelStyles }} { ...rest } />
  );
}

export function ButtonLink({ labelStyles, label, onPress, activeOpacity }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity}>
      <Text style={[styles.linkLabel, labelStyles]}>{label}</Text>
    </TouchableOpacity>
  );
}

export function ButtonOutline({ labelStyles, ...rest }: ButtonProps) {
  return (
    <Button labelStyles={{ ...styles.outlineLabel, labelStyles }} { ...rest } />
  );
}

const styles = StyleSheet.create({
  primaryLabel: {
    color: '#fff',
    backgroundColor: Colors.light.buttonPrimaryBG,
    fontSize: 18,
  },
  linkLabel: {
    color: '#2f95dc',
  },
  outlineLabel: {
    color: '#2f95dc',
    borderColor: '#2f95dc',
    borderWidth: 1,
  }
});

export { ButtonPrimary as Button };