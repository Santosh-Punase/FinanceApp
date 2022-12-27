import { Icon } from "./Icon";

interface Props {
  isSelected: boolean,
  size?: number,
  color?: string,
  selectedColor?: string
}

export function RadioButton({ isSelected, size = 24, selectedColor = 'blue' }: Props) {

  if(isSelected) {
    return <Icon type="Ionicons" name='radio-button-on' size={size} color={selectedColor} />;
  }
  return <Icon type="Ionicons" name='radio-button-off' size={size} />;
}

export function Checkbox({ isSelected, size = 24, color = 'black', selectedColor = 'blue' }: Props) {

  if(isSelected) {
    return <Icon type="Ionicons" name='ios-checkbox' size={size} color={selectedColor} />;
  }
  return <Icon type="Ionicons" name='ios-checkbox-outline' size={size} />;
}
