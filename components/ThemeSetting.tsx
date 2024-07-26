import { useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Layout from "../constants/Layout";
import { ThemeContextType } from "../store/type";
import { ThemeContext } from "../theme";
import { Card } from "./Card";
import { Icon } from "./Icon";
import { RadioButton } from "./RadioButton";
import { Text, View } from "./Themed";

export function ThemeSetting() {
  const { setTheme, theme } = useContext(ThemeContext) as ThemeContextType;

  return (
    <Card style={{ flexDirection: 'column' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Icon type="FontAwesome" name='circle-half-stroke' size={24} />
        <TouchableOpacity style={styles.themeWrapper} activeOpacity={1} onPress={() => setTheme('default')}>
          <Text style={styles.themeName}>Automatic</Text>
          <RadioButton isSelected={theme === 'default'} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Icon type="Ionicons" name='sunny-outline' size={24} />
        <TouchableOpacity style={styles.themeWrapper} activeOpacity={1} onPress={() => setTheme('light')}>
          <Text style={styles.themeName}>Light</Text>
          <RadioButton isSelected={theme === 'light'} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon type="Ionicons" name='moon' size={24} />
        <TouchableOpacity style={styles.themeWrapper} activeOpacity={1} onPress={() => setTheme('dark')}>
          <Text style={styles.themeName}>Dark</Text>
          <RadioButton isSelected={theme === 'dark'} />
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
    marginLeft: 5,
    alignItems: 'center',
  },
});
