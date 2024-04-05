import { Dimensions } from 'react-native';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

export default {
  window: {
    width: WIDTH,
    height: HEIGHT,
  },
  isSmallDevice: WIDTH < 375,
};
