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

export default function Toggle({ width, value, onPress }: { width: number, value: boolean, onPress: () => void }) {

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
  const colorLink = Colors[currentTheme].tint;
  const colorButton = Colors[currentTheme].invertedText;

  const onChange = () => {
    onPress();
    startAnim(positionNewValue);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ height:TOGGLE_HEIGHT, width:'100%' }}  activeOpacity={0.9} onPress={onChange} >
        <Animated.View style={[styles.mainStyes,{
          // backgroundColor:backgroundColorAnim,
          borderColor: Colors[currentTheme].buttonPrimaryBG,
          backgroundColor: Colors[currentTheme].background
        }]} >
          <Animated.Text
            style={[
              styles.eachStyles,
              {
                left: 10,
                width: width / 2 - 30,
                color: value ? colorLink : colorButton,
              },
            ]}>
            Income
          </Animated.Text>
          <Animated.Text
            style={[
              styles.eachStyles,
              {
                left: width / 2 + 10,
                width: width / 2 - 30,
                color: value ? colorButton : colorLink,
              },
            ]}>
            Expense
          </Animated.Text>
          <Animated.View style={[styles.basicStyle,{
            backgroundColor: Colors[currentTheme].buttonPrimaryBG,
            transform:[{
              translateX:positionInterPol
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
    justifyContent: 'center',
  },
  basicStyle: {
    height: TOGGLE_HEIGHT - (2 * TOGGLE_MARGIN) - (2 * TOGGLE_BORDER),
    width: '49%',
    borderRadius: TOGGLE_BORDER_RADIUS,
    marginTop: TOGGLE_MARGIN,
    marginLeft: TOGGLE_MARGIN,
  },
  eachStyles: {
    fontSize: 16,
    zIndex: 20,
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    top: TOGGLE_HEIGHT / 2 - 12,
    textAlign: 'center',
  },
  mainStyes: {
    borderRadius: TOGGLE_BORDER_RADIUS,
    borderWidth: TOGGLE_BORDER,
    height: TOGGLE_HEIGHT,
    width: '100%',
    elevation: 5,
  },
});