import { View as DefaultView, StyleSheet } from "react-native";
import { ReactChildren } from "react-native-toast-message";

import { LinearGradient, View, Text } from "./Themed";
import Colors from "../constants/Colors";

export default function HeaderView({ children, title }: { children: ReactChildren, title: string }) {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={Colors.headerGradiant}
        style={{ height: 200, width: '100%', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
        locations={[0.2, 0.9]}
      >
        <DefaultView style={styles.row}>
          <Text style={styles.title}>{title}</Text>
        </DefaultView>
      </LinearGradient>
       {children}
    </View>
  )
}


const styles = StyleSheet.create({
  row: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 80,
    marginLeft: 40,
  }
});
