import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Layout from "../constants/Layout";
import { Theme, ThemeContextType } from "../store/type";
import { ThemeContext } from "../theme";
import { Card } from "./Card";
import { RadioButton } from "./RadioButton";
import { Text, View } from "./Themed";

export function ThemeSetting() {
  const { setTheme, theme } = useContext(ThemeContext) as ThemeContextType;

  return (
    <Card style={{ flexDirection: 'column' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Ionicons name='md-sync-circle-outline' color={'black'} size={30} />
        <TouchableOpacity style={styles.themeWrapper} activeOpacity={1} onPress={() => setTheme(Theme.DEFAULT)}>
          <Text style={styles.themeName}>Automatic</Text>
          <RadioButton isSelected={theme === Theme.DEFAULT} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Ionicons name='sunny-outline' color={'black'} size={30} />
        <TouchableOpacity style={styles.themeWrapper} activeOpacity={1} onPress={() => setTheme(Theme.LIGHT)}>
          <Text style={styles.themeName}>Light</Text>
          <RadioButton isSelected={theme === Theme.LIGHT} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name='moon' color={'black'} size={30} />
        <TouchableOpacity style={styles.themeWrapper} activeOpacity={1} onPress={() => setTheme(Theme.DARK)}>
          <Text style={styles.themeName}>Dark</Text>
          <RadioButton isSelected={theme === Theme.DARK} />
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  themeName: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 10,
    marginRight: 'auto',
  },
  themeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Layout.window.width - 70,
    height: 30,
    alignItems: 'center',
  },
});
