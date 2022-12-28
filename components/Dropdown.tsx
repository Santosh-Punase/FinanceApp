import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Icon } from "./Icon";
import { Text, View } from "./Themed";

export function Dropdown({ onPress, disabled, label, style, labelStyles, iconStyle, value, placeholder, ...rest }: TouchableOpacityProps & { label?: string, labelStyles?: {}, iconStyle?: { size?: number, color?: string }, placeholder?: string, value?: string }) {

  return (
    <TouchableOpacity onPress={onPress} { ...rest }>
      <View style={[styles.dropdown, style]}>
        { label && <Text style={[styles.label, labelStyles]}>{label}</Text> }
        { !value || value === ''
        ? <Text style={[styles.value, { color: 'gray' }]}>{placeholder}</Text>
        : <Text style={styles.value}>{value}</Text>
        }
        <Icon type="AntDesign" name="caretdown" size={iconStyle?.size || 20} color={iconStyle?.color} />
      </View>
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
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
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
  value: {
    marginRight: 5,
  }
});
