import { Animated, Easing, StyleSheet, ViewProps, View as DefaultView, ViewStyle } from "react-native";

import { View } from "./Themed";
import { useEffect, useState, Children } from "react";

export function LoadingSkeleton({ style, children, itemStyle }: ViewProps & { itemStyle?: ViewStyle }) {
  const [animation] = useState(new Animated.Value(0));
  const sharedAnimationConfig = {
    duration: 1000,
    useNativeDriver: true,
  };

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          ...sharedAnimationConfig,
          toValue: 1,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(animation, {
          ...sharedAnimationConfig,
          toValue: 0,
          easing: Easing.in(Easing.ease),
        }),
      ])
    ).start();
 }

  useEffect(() => {
    startAnimation();

    return () => { animation.stopAnimation() }
  }, []);

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.6],
  });

  return (
    <View style={style}>
      {Children.map(children, child => (
        <Animated.View style={[styles.placeholder, itemStyle, { opacity }]}>{child}</Animated.View>
      ))}
    </View>
  );
}

export function ListLoading() {
  return (
    <LoadingSkeleton style={{ padding: 20 }} itemStyle={{ marginBottom: 20 }}>
      <DefaultView style={styles.listItem} /> 
      <DefaultView style={styles.listItem} /> 
      <DefaultView style={styles.listItem} /> 
      <DefaultView style={styles.listItem} /> 
      <DefaultView style={styles.listItem} /> 
    </LoadingSkeleton>
  )
}

const styles = StyleSheet.create({
  placeholder: { 
    backgroundColor: '#ccc',
    borderRadius: 4, 
  },
  listItem: {
    height: 40,
    marginBottom: 20, 
  }
});
