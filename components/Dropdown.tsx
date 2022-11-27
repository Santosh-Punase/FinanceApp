import { Text, View, StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";

export function Dropdown({ onPress, disabled, label, style, labelStyles, iconStyle, value, placeholder, ...rest }: TouchableOpacityProps & { label?: string, labelStyles?: {}, iconStyle?: {}, placeholder?: string, value?: string }) {

  return (
    <TouchableOpacity style={[styles.dropdown, style]} onPress={onPress} { ...rest }>
      { label && <Text style={[styles.label, labelStyles]}>{label}</Text> }
      { !value || value === ''
      ? <Text style={{ color: 'gray' }}>{placeholder}</Text>
      : <Text>{value}</Text>
      }
      <View style={[styles.dropdownIcon, iconStyle]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    position: 'relative',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 16,
    paddingTop: 14,
    marginBottom: 30,
  },
  label: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: -11,
    left: 10,
    paddingHorizontal: 6,
  },
  dropdownIcon: {
    height: 15,
    width: 15,
    position: 'absolute',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    borderRightColor: 'black',
    borderRightWidth: 2,
    right: 15,
    top: 14.5,
    transform: [{ rotateZ: '45deg' }],
  },
});
