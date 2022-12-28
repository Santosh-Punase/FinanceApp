import { StyleSheet, ViewProps } from "react-native";

import { View } from '../components/Themed';

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
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
  },
});
