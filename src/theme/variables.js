import { PixelRatio, Dimensions } from 'react-native';

var ratio = PixelRatio.get();
var screen = {
	w: Dimensions.get('window').width,
	h: Dimensions.get('window').height
};

var screenSize = 'SM';
if(screen.w > 320 && screen.w <= 384){
	screenSize = 'SM';
}else if(screen.w > 384 && screen.w <= 480){
	screenSize = 'MD';
}else if(screen.w > 480 && screen.w <= 768){
	screenSize = 'LG';
}else if(screen.w > 768){
	screenSize = 'XL';
}


var pixelRatio = 1;
if(screen.w > 375){
	pixelRatio = screen.w/320;
}

const base_unit = 16;


var COLORS = {
	colorPrimary: '#00ade2',
	colorPrimaryRGBA: 'rgba(0, 173, 226, 0.7)',
	colorPrimaryDark: '#27599e',
	colorPrimaryLight: '#22c2e5',
	colorGrey: '#9e9e9e',
	colorGreyLight: '#ccc',
};


var GENERAL_SIZES = {
	PIXEL_RATIO: pixelRatio,
	screenWidth: screen.w,
	screenHeight: screen.h,

	NAVBAR_HEIGHT: 56,

	gap: 16,
	pagStep: 10,
	pagSize: 10,
};

var DEVICE_SIZES = {};

DEVICE_SIZES['SM'] = {
	UNIT: 16,

	CONTAINER_V_PADDING: 16,
	CONTAINER_H_PADDING: 32,

	LOGIN_FORM_WIDTH: 250,

	INPUT_HEIGHT: 32,
	INPUT_GAP: 16,
	INPUT_TEXT: 12,

	BUTTON_CIRCLE_SIZE: 60,
	BUTTON_V_PADDING: 5,
	BUTTON_H_PADDING: 20,

	TEXT_XL: 24,
	TEXT_LG: 18,
	TEXT_MD: 14,
	TEXT_SM: 12,
	TEXT_XS: 10,


	TEXT_BONUS: 50,
	CHART_ITEM_WIDTH: 40,
	CHART_BAR_WIDTH: 15,
	CHART_BAR_RATIO: 1,


	LOGO_TITLE_IMG: 40,
	LOGO_TITLE_TEXT_1: 16,
	LOGO_TITLE_TEXT_2: 11,
};

DEVICE_SIZES['MD'] = {
	UNIT: 24,

	CONTAINER_V_PADDING: 24,
	CONTAINER_H_PADDING: 48,

	LOGIN_FORM_WIDTH: 320,

	INPUT_HEIGHT: 36,
	INPUT_GAP: 18,
	INPUT_TEXT: 12,

	BUTTON_CIRCLE_SIZE: 120,
	BUTTON_V_PADDING: 8,
	BUTTON_H_PADDING: 30,

	TEXT_BONUS: 70,
	CHART_ITEM_WIDTH: 60,
	CHART_BAR_WIDTH: 20,
	CHART_BAR_RATIO: 1.5,

	TEXT_XL: 24,
	TEXT_LG: 18,
	TEXT_MD: 14,
	TEXT_SM: 12,
	TEXT_XS: 10,

	LOGO_TITLE_IMG: 40,
	LOGO_TITLE_TEXT_1: 16,
	LOGO_TITLE_TEXT_2: 11,
};

DEVICE_SIZES['LG'] = {
	UNIT: 32,

	CONTAINER_V_PADDING: 32,
	CONTAINER_H_PADDING: 64,

	LOGIN_FORM_WIDTH: 400,

	INPUT_HEIGHT: 40,
	INPUT_GAP: 20,
	INPUT_TEXT: 24,

	BUTTON_CIRCLE_SIZE: 140,
	BUTTON_V_PADDING: 15,
	BUTTON_H_PADDING: 50,

	TEXT_BONUS: 100,
	CHART_ITEM_WIDTH: 80,
	CHART_BAR_WIDTH: 30,
	CHART_BAR_RATIO: 2,


	TEXT_XL: 48,
	TEXT_LG: 36,
	TEXT_MD: 28,
	TEXT_SM: 24,
	TEXT_XS: 20,

	LOGO_TITLE_IMG: 80,
	LOGO_TITLE_TEXT_1: 32,
	LOGO_TITLE_TEXT_2: 22,
};

DEVICE_SIZES['XL'] = DEVICE_SIZES['LG'];



export default Object.assign(GENERAL_SIZES, DEVICE_SIZES[screenSize], COLORS);
