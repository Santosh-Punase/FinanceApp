import { Text, StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";

export function FloatingButton({ onPress, disabled, label, style, labelStyles, ...rest }: TouchableOpacityProps & { label: string, labelStyles?: {} }) {

  return (
    <TouchableOpacity style={[styles.buttonWrapper, style]} onPress={onPress} { ...rest }>
      <Text style={[styles.button, labelStyles]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 60,  
    height: 60,   
    borderRadius: 30,            
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
});
