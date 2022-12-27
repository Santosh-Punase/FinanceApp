import { Icon } from "./Icon";

interface Props {
  isSelected: boolean;
  size?: number;
  style?: {};
}

export function RadioButton({ isSelected, size = 24, style }: Props) {

  if(isSelected) {
    return <Icon type="Ionicons" name='radio-button-on' size={size} style={style} color={'blue'} />;
  }
  return <Icon type="Ionicons" name='radio-button-off' size={size} style={style} />;
}

export function Checkbox({ isSelected, size = 24, style }: Props) {

  if(isSelected) {
    return <Icon type="Ionicons" name='ios-checkbox' size={size} style={style} color={'blue'} />;
  }
  return <Icon type="Ionicons" name='ios-checkbox-outline' size={size} style={style} />;
}
