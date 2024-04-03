import * as React from 'react';
import { StyleSheet, Dimensions, Text, ImageBackground } from "react-native";
import { View } from '../components/Themed';
import Carousel from 'react-native-reanimated-carousel';
import { Card } from './Card';
import { WIDTH } from '../constants/Layout';


export const CardsCarousel = (data: {}) => {

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          height: 150,
          width: WIDTH / 2.5,
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 10,
          alignSelf: 'center',
          backgroundColor: '#dadada',
          justifyContent: 'center',
        }}
      >
        <Text style={{ textAlign: 'center', fontSize: 30 }}>
          {index}
        </Text>
      </View> 
    )
  }

    return (
      <View style={styles.cardsWrapper}>
       {/* <View style={styles.cardsWrapper} lightColor='rgba(0,0,0, 0.1)' darkColor='rgba(255, 255, 255, 0.9)'> */}
       {/* <View style={styles.cardsWrapper} lightColor='rgba(255,255,255, 0.1)' darkColor='rgba(255, 255, 255, 0.1)'> */}
        <Text style={styles.title}>Title One</Text>
       
        {/* <ImageBackground
          source={require('../assets/images/home_bg.jpg')}
          resizeMode="cover"
          imageStyle={{
            height: 200,
            width,
          }}
        > */}
          <Carousel
            loop={false}
            width={WIDTH}
            height={160}
            data={[...new Array(4).keys()]}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={renderItem}
            mode="parallax"
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            modeConfig={{
              parallaxScrollingScale: 0.90,
              parallaxScrollingOffset: 70,
            }}
          />
        {/* </ImageBackground> */}
      </View>
    );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    alignSelf: 'flex-start',
  },
  cardsWrapper: {
    height: 200,
    // width: WIDTH,
    // backgroundColor: 'transparent',
    // backgroundColor: 'black',
    paddingVertical: 10,
  }
});
