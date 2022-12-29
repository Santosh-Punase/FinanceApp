const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';
const primary = 'rgba(17, 60, 214, 1)';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tintButton: primary,
    selectedOption: 'rgba(47, 148, 220, 0.1)',
    border: 'rgba(0, 0, 0, 0.4)',
    buttonColor: '#fff',
    buttonSuccessBG: 'green',
    buttonErrorBG: 'red',
    buttonPrimaryBG: tintColorLight,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tintButton: tintColorLight,
    buttonColor: '#000',
    buttonSuccessBG: 'green',
    buttonErrorBG: 'red',
    buttonPrimaryBG: tintColorLight,
    selectedOption: 'rgba(255, 255, 255, 0.2)',
    border: 'rgba(255, 255, 255, 0.4)',
    tabIconSelected: tintColorDark,
  },
};
