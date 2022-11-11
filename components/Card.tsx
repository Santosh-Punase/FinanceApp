import { View, StyleSheet, ViewProps } from "react-native";

export function Card({ style, children }: ViewProps) {

  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
});
