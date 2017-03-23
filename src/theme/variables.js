import { PixelRatio, Dimensions } from 'react-native';

var ratio = PixelRatio.get();
var screen = {
	w: Dimensions.get('window').width,
	h: Dimensions.get('window').height
};

var pixelRatio = 1;
if(screen.w > 375){
	pixelRatio = screen.w/320;
}

const base_unit = 16;

export default {
	PIXEL_RATIO: pixelRatio,
	screenWidth: screen.w,
	screenHeight: screen.h,
	gap: base_unit,
	inputHeight: 40,
	inputGAP: 20,
	inputPadding: 5*pixelRatio,
	buttonPV: 8*pixelRatio,//paddingVertial
	buttonPH: 20*pixelRatio,//paddingHorizontal
	colorPrimary: '#00ade2',
	colorPrimaryRGBA: 'rgba(0, 173, 226, 0.7)',
	colorPrimaryDark: '#27599e',
	colorPrimaryLight: '#22c2e5',
	colorGrey: '#9e9e9e',
	colorGreyLight: '#ccc',
	pagStep: 10,
	pagSize: 10,

	//SIZES
	UNIT: base_unit*pixelRatio,
	//FONT_SIZE
	FONTSIZE_XG: 24*pixelRatio,
	FONTSIZE_LG: 20*pixelRatio,
	FONTSIZE_MD: 12*pixelRatio,
	FONTSIZE_SM: 10*pixelRatio,
}
