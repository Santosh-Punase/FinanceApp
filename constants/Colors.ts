const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';
const primary = 'rgba(17, 60, 214, 1)';

export default {
  light: {
    text: '#000',
    invertedText: '#fff',
    background: '#fff',
    invertedBackground: '#000',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tintButton: primary,
    selectedOption: 'rgba(47, 148, 220, 0.1)',
    border: 'rgba(0, 0, 0, 0.4)',
    buttonColor: '#fff',
    progressBG: '#919492',
    buttonSuccessBG: '#51ed51',
    buttonWarningBG: '#eaed51',
    buttonErrorBG: '#ed5151',
    buttonPrimaryBG: tintColorLight,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    invertedText: '#000',
    background: '#000',
    invertedBackground: '#fff',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tintButton: tintColorLight,
    buttonColor: '#000',
    progressBG: '#919492',
    buttonSuccessBG: '#51ed51',
    buttonWarningBG: '#eaed51',
    buttonErrorBG: '#ed5151',
    buttonPrimaryBG: tintColorLight,
    selectedOption: 'rgba(255, 255, 255, 0.2)',
    border: 'rgba(255, 255, 255, 0.4)',
    tabIconSelected: tintColorDark,
  },
};
