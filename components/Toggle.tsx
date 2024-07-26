import React, { useRef } from 'react';
import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  Easing,
  ColorSchemeName
} from 'react-native';

import { View } from './Themed';
import Colors from "../constants/Colors";
import { useTheme } from '../theme';

const TOGGLE_HEIGHT = 50;
const TOGGLE_MARGIN = 3;
const TOGGLE_BORDER = 1;
const TOGGLE_BORDER_RADIUS = 50;
const width = 260;

export default function Toggle({ value, onPress }: { value: boolean, onPress: () => void }) {
  const positionButton = useRef(new Animated.Value(value ? 1 : 0)).current;
  const currentTheme:ColorSchemeName = useTheme();

  const startAnim = (value: Animated.AnimatedInterpolation<string | number>) => {
    Animated.timing(positionButton, {
      toValue: value,
      duration: 300,
      easing:Easing.ease,
      useNativeDriver: true
    }).start()
  };

  const positionNewValue = positionButton.interpolate({inputRange:[0,1],outputRange:[1, 0]})
  const positionInterPol = positionButton.interpolate({inputRange:[0,1],outputRange:[0, width / 2 - (2 * TOGGLE_MARGIN) - (2 * TOGGLE_BORDER)]})
  const colorLink = '#2f95dc';
  const colorButton = '#fff';

  const onChange = () => {
    onPress();
    startAnim(positionNewValue);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ borderRadius: TOGGLE_BORDER_RADIUS, backgroundColor: 'green', width: width }}  activeOpacity={0.9} onPress={onChange} >
        <Animated.View style={[styles.mainStyes,{
          borderColor: Colors[currentTheme].buttonPrimaryBG,
          backgroundColor: Colors[currentTheme].background
        }]} >
          <View style={styles.viewWrapper}>
            <Animated.Text
              style={[
                styles.eachStyles,
                {
                  color: value ? colorLink : colorButton,
                },
              ]}>
              Income
            </Animated.Text>
          </View>
          <View style={styles.viewWrapper}>
            <Animated.Text
              style={[
                styles.eachStyles,
                {
                  color: value ? colorButton : colorLink,
                },
              ]}>
              Expense
            </Animated.Text>
          </View>
          <Animated.View style={[styles.basicStyle, {
            backgroundColor: Colors[currentTheme].buttonPrimaryBG,
            transform:[{
              translateX: positionInterPol
            }]
          }]} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
  },
  basicStyle: {
    height: TOGGLE_HEIGHT - (2 * TOGGLE_MARGIN) - (2 * TOGGLE_BORDER),
    width: '50%',
    borderRadius: TOGGLE_BORDER_RADIUS,
    margin: TOGGLE_MARGIN,
    position: 'absolute',
    top: 0,
    zIndex: 10,
  },
  eachStyles: {
    fontSize: 16,
    lineHeight: 20,
    zIndex: 20,
  },
  viewWrapper: {
    borderRadius: TOGGLE_BORDER_RADIUS,
    height: '100%',
    width: '50%',
    flex: 1,
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  mainStyes: {
    borderRadius: TOGGLE_BORDER_RADIUS,
    borderWidth: TOGGLE_BORDER,
    height: TOGGLE_HEIGHT,
    width: '100%',
    flexDirection: 'row',
    elevation: 5,
  },
});