import { PixelRatio, Dimensions } from 'react-native';

var ratio = PixelRatio.get();
var screen = {
	w: Dimensions.get('window').width,
	h: Dimensions.get('window').height
};

//ratio = PixelRatio.getPixelSizeForLayoutSize(1);

export default {
	screenWidth: screen.w,
	screenHeight: screen.h,
	gap: 16,
	inputHeight: 32,
	buttonPV: 8*ratio,//paddingVertial
	buttonPH: 20*ratio,//paddingHorizontal
	colorPrimary: '#00ade2',
	colorPrimaryRGBA: 'rgba(0, 173, 226, 0.7)',
	colorPrimaryDark: '#27599e',
	colorGrey: '#9e9e9e',
	pagStep: 10,
	pagSize: 10,
}