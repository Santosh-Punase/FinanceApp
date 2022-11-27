import { Ionicons } from "@expo/vector-icons";

interface Props {
  isSelected: boolean,
  size?: number,
  color?: string,
  selectedColor?: string
}

export function RadioButton({ isSelected, size = 24, color = 'black', selectedColor = 'blue' }: Props) {

  if(isSelected) {
    return <Ionicons name='radio-button-on' size={size} color={selectedColor} />;
  }
  return <Ionicons name='radio-button-off' size={size} color={color} />;
}

export function Checkbox({ isSelected, size = 24, color = 'black', selectedColor = 'blue' }: Props) {

  if(isSelected) {
    return <Ionicons name='ios-checkbox' size={size} color={selectedColor} />;
  }
  return <Ionicons name='ios-checkbox-outline' size={size} color={color} />;
}
