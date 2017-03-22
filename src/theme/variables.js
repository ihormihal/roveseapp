import { PixelRatio } from 'react-native';

var ratio = PixelRatio.get();

export default {
	gap: 16*ratio,
	inputHeight: 32,
	buttonPV: 8*ratio,//paddingVertial
	buttonPH: 16*ratio,//paddingHorizontal
	colorPrimary: '#00ade2',
	colorPrimaryDark: '#27599e',
	colorGrey: '#9e9e9e',
	pagStep: 10,
	pagSize: 10,
}