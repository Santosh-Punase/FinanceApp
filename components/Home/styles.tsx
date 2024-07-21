import { StyleSheet } from "react-native";
import { WIDTH } from "../../constants/Layout";

export const styles = StyleSheet.create({
  cardStyle: { marginTop: 10, marginHorizontal: 10, width: WIDTH - 20, flexDirection: 'column' },
  header: {
    fontSize: 16,
    marginVertical: 10,
    marginLeft: 20,
  },
});
