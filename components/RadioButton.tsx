import { ColorSchemeName } from "react-native";

import { useTheme } from "../theme";
import Colors from "../constants/Colors";
import { Icon } from "./Icon";

interface Props {
  isSelected: boolean;
  size?: number;
  style?: {};
}

export function RadioButton({ isSelected, size = 24, style }: Props) {

  const currentTheme:ColorSchemeName = useTheme();
  const iconColor = Colors[currentTheme]['tint']

  if(isSelected) {
    return <Icon type="Ionicons" name='radio-button-on' size={size} style={style} color={iconColor} />;
  }
  return <Icon type="Ionicons" name='radio-button-off' size={size} style={style} />;
}

export function Checkbox({ isSelected, size = 24, style }: Props) {

  const currentTheme:ColorSchemeName = useTheme();
  const iconColor = Colors[currentTheme]['tint']

  if(isSelected) {
    return <Icon type="Ionicons" name='checkbox' size={size} style={style} color={iconColor} />;
  }
  return <Icon type="Ionicons" name='checkbox-outline' size={size} style={style} />;
}
