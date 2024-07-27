import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { ButtonProps } from "./Button";
import { Button } from "./Button";
import Colors from "../../constants/Colors";
import { useTheme } from "../../theme";
import { StyleTheme } from "../../store/type";

export function ButtonPrimary({ labelStyles, ...rest }: ButtonProps) {
  const theme: StyleTheme = useTheme();
  return (
    <Button labelStyles={{ ...styles(theme).primaryLabel, ...labelStyles }} { ...rest } />
  );
}

export function ButtonLink({ labelStyles, label, disabled, onPress, activeOpacity }: ButtonProps) {
  const theme: StyleTheme = useTheme();

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={activeOpacity}>
      <Text style={[styles(theme).linkLabel, labelStyles]}>{label}</Text>
    </TouchableOpacity>
  );
}

export function ButtonOutline({ labelStyles, ...rest }: ButtonProps) {
  const theme: StyleTheme = useTheme();

  return (
    <Button labelStyles={{ ...styles(theme).outlineLabel, ...labelStyles }} loaderColor={Colors[theme].buttonPrimaryBG} { ...rest } />
  );
}

const styles = (theme: StyleTheme) => StyleSheet.create({
  primaryLabel: {
    color: '#fff',
    backgroundColor: Colors[theme].buttonPrimaryBG,
    fontSize: 18,
  },
  linkLabel: {
    color: Colors[theme].buttonPrimaryBG,
  },
  outlineLabel: {
    color: Colors[theme].buttonPrimaryBG,
    borderColor: Colors[theme].buttonPrimaryBG,
    borderWidth: 1,
  }
});

export { ButtonPrimary as Button };