/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { ColorSchemeName, Text as DefaultText, View as DefaultView } from 'react-native';

import Colors from '../constants/Colors';
import { useTheme } from '../theme';
import { LinearGradient as DefaultGradiant, LinearGradientProps } from 'expo-linear-gradient';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const currentTheme:ColorSchemeName = useTheme();

  const colorFromProps = props[currentTheme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[currentTheme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const borderColor = useThemeColor({ }, 'border');

  return <DefaultView style={[{ backgroundColor, borderColor }, style]} {...otherProps} />;
}

export function LinearGradient(props: LinearGradientProps) {
  return <DefaultGradiant {...props} dither={false} />;
}
