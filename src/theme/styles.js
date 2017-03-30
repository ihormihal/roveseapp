import { StyleSheet, Dimensions, PixelRatio } from 'react-native';

import variables from './variables.js';
import buttonStyle from './components/button.js';
import formStyle from './components/form.js';
import sliderStyle from './components/slider.js';

var ratio = PixelRatio.get();

const screen = {
	w: Dimensions.get('window').width,
	h: Dimensions.get('window').height
};

const dimentions = {
	mt1: {
		marginTop: variables.gap
	},
	mt2: {
		marginTop: variables.gap*2
	},
	mt3: {
		marginTop: variables.gap*3
	},
	mt4: {
		marginTop: variables.gap*4
	},
	mb1: {
		marginBottom: variables.gap
	},
	mb2: {
		marginBottom: variables.gap*2
	},
	mb3: {
		marginBottom: variables.gap*3
	},
	mb4: {
		marginBottom: variables.gap*4
	},
	mr1: {
		marginRight:  variables.gap
	},
	relative: {
		position: 'relative'
	},
	section: {
		flex: 1,
		flexDirection: 'column',
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		paddingHorizontal: variables.CONTAINER_H_PADDING,
		paddingVertical: variables.CONTAINER_V_PADDING,
	},
	box: {
		flexDirection: 'column',
		paddingHorizontal: variables.CONTAINER_H_PADDING,
		paddingVertical: variables.CONTAINER_V_PADDING,
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		alignSelf: 'stretch',
		//alignItems: 'flex-start',
	},
	cols: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	col: {
		flex: 1,
	},
	tr: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderColor: variables.colorGreyLight
	},
	th: {
		marginVertical: 5,
		paddingHorizontal: 5,
		textAlign: 'center',
		color: '#000',
		fontWeight: '600'
	},
	td: {
		marginVertical: 5,
		paddingHorizontal: 5,
	},
	tdb: {
		borderLeftWidth: 1,
		borderColor: variables.colorGreyLight,
		marginVertical: 5,
		paddingHorizontal: 5,
		textAlign: 'center',
	},
	middle: {
		justifyContent: 'center',
	},
	center: {
		alignItems: 'center',
	},
	middleSelf: {
		alignSelf: 'center',
	},
	full: {
		alignSelf: 'stretch',
	},
	textDivider: {
		marginVertical: variables.gap/2.
	},
	last: {
		justifyContent: 'flex-end',
	},
	textCenter: {
		textAlign: 'center',
	},


	italic: {
		fontStyle: 'italic',
	},
	textXS: {
		fontSize: variables.TEXT_XS
	},
	textSM: {
		fontSize: variables.TEXT_SM
	},
	textMD: {
		fontSize: variables.TEXT_MD
	},
	textLG: {
		fontSize: variables.TEXT_LG
	},
	textXL: {
		fontSize: variables.TEXT_XL
	},
	opacity50: {
		opacity: 0.5,
	},
};

const colors = {
	white: {
		color: '#ffffff'
	},
	whiteBg: {
		backgroundColor: '#ffffff'
	},
	primary: {
		color: variables.colorPrimary
	},
	primaryDark: {
		color: variables.colorPrimaryDark
	}
};

var presentationImgHeight = parseInt(variables.screenWidth*(1030/1536));

const elements = {
	scene: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#ffffff',
	},
	background: {
		backgroundColor: variables.colorPrimary,
		width:  screen.w,
		height: screen.h-20
	},
	scroll: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'transparent',
		padding: 0,
	},

	header: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		paddingHorizontal: 10,
		height: variables.NAVBAR_HEIGHT,
		backgroundColor: '#ffffff',
	},
	shadow: {
		shadowColor: '#000',
		elevation: 4,
	},

	sceneTitle: {
		fontSize: variables.TEXT_LG,
		paddingHorizontal: variables.UNIT,
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: variables.colorGreyLight,
		marginBottom: variables.UNIT,
	},

	opacityLight: {
		backgroundColor: 'rgba(0,0,0,0.1)',
	},
	opacityDark: {
		backgroundColor: 'rgba(23,68,116,0.5)',
	},
	opacityBlue: {
		backgroundColor: 'rgba(0,173,226,0.5)',
	},
	headerLeft: {
		flex: 0.25,
		alignSelf: 'center',
		alignItems: 'flex-start',
	},
	headerRight: {
		flex: 0.25,
		alignSelf: 'center',
		alignItems: 'flex-start',
	},
	headerCenter: {
		flex: 0.5,
		alignSelf: 'center',
		alignItems: 'center',
	},

	logo: {
		width: 204,
		height: 90,
		marginBottom: 40
	},
	logoHeader: {
		width: 40,
		height: 40,
	},
	sectionLogin: {
		width: '100%',
		maxWidth: variables.LOGIN_FORM_WIDTH
	},
	lngButtons: {
		width: 100
	},
	hr: {
		alignSelf: 'center',
		backgroundColor: '#D9D5DC',
		height: 1,
		width: 250,
		marginTop: 16,
		marginBottom: 16
	},
	logoTitle: {
		alignSelf: 'center',
		flexDirection: 'row',
		marginBottom: variables.CONTAINER_V_PADDING,
	},
	logoTitleImg: {
		height: variables.LOGO_TITLE_IMG,
		width: variables.LOGO_TITLE_IMG,
	},
	logoRightText: {
		marginLeft: 10,
		//marginTop: -3,
	},
	logoTitleText1: {
		color: variables.colorPrimary,
		fontSize: variables.LOGO_TITLE_TEXT_1,
		lineHeight: variables.LOGO_TITLE_TEXT_1,
	},
	logoTitleText2: {
		color: variables.colorPrimary,
		fontSize: variables.LOGO_TITLE_TEXT_2,
		lineHeight: variables.LOGO_TITLE_TEXT_2,
	},
	drawer: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	drawerSection: {
		paddingVertical: variables.gap,
		flexDirection: 'column'
	},
	drawerSectionTop: {
		paddingVertical: variables.UNIT*2,
	},
	drawerSectionBottom: {
		flex: 1,
		justifyContent: 'flex-end',
		padding: 0,
	},
	btnDrawerBottom: {
		justifyContent: 'center',
		padding: variables.UNIT*2,
	},
	btnDrawerBottomText: {
		//color: '#fff',
		//fontSize: variables.FONTSIZE_MD
	},
	divider: {
		height: 1,
		alignSelf: 'stretch',
		backgroundColor: '#D9D5DC',
	},
	menuItem: {
		alignSelf: 'stretch',
		paddingVertical: variables.UNIT/2,
		paddingHorizontal: variables.UNIT
	},
	menuItemText: {
		color: '#fff',
		fontSize: variables.TEXT_MD
	},
	menuItemActive: {
		borderLeftWidth: 1,
		paddingLeft: variables.UNIT/2,
		borderColor: variables.colorPrimary,
	},

	//tabs
	tabsContainer: {
		position: 'absolute',
		bottom: presentationImgHeight,
		width: '100%',
		zIndex: 10
	},
	tabs: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'stretch'
	},
	tab: {
		flex: 1,
		justifyContent: 'center',
		height: 56,
	},
	tabText: {
		color: '#fff',
		textAlign: 'center',
		paddingBottom: 5
	},
	tabTextActive: {
		borderBottomWidth: 1,
		borderColor: '#fff'
	},
	//presentation
	presentationsHeader: {
		position: 'absolute',
		top: 0,
		height: variables.NAVBAR_HEIGHT*2,
		zIndex: 2
	},
	presentations: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 1
	},
	presentation: {
		flexDirection: 'column'
	},
	presentationTop: {
		flex: 1,
		width: screen.w,
		flexDirection: 'column',
		alignItems: 'stretch',
		paddingVertical: variables.NAVBAR_HEIGHT,
	},
	presentationTopWrapper: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	presentationBottom: {
		width: screen.w,
		height: presentationImgHeight,
	},
	presentationText: {
		padding: variables.gap,
		color: '#fff',
		textAlign: 'center',
		fontSize: variables.TEXT_LG,
		textShadowColor: 'rgba(0,0,0,0.5)',
		textShadowOffset: {width: 1, height: 1},
		textShadowRadius: 1,
	},

	//
	pageHeader: {
		width: screen.w,
		minHeight: variables.NAVBAR_HEIGHT,
		paddingVertical: variables.gap/2,
		paddingHorizontal: variables.gap,
		justifyContent: 'center',
	},

	sellerInfo: {
		marginVertical: variables.gap/2,
		paddingVertical: variables.gap/2,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#fff',
	},

	chartScroll: {
		//height: 120,
		marginBottom: variables.gap
	},

	chart: {
		flexDirection: 'column',
	},

	chartArea: {
		flexDirection: 'row',
		position: 'relative',
	},

	chartBar: {
		width: variables.CHART_ITEM_WIDTH,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		paddingLeft: 10,
	},
	chartBarBar: {
		position: 'relative',
		zIndex: 1,
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	chartBarText: {
		textAlign: 'left',
		fontSize: variables.TEXT_XS,
		color: '#ccc',
	},
	chartBarValue: {
		width: variables.CHART_BAR_WIDTH,
		height: 0,
		backgroundColor: variables.colorPrimary,
	},
	chartBarShadow: {
		width: variables.CHART_BAR_WIDTH/2,
		height: 0,
		backgroundColor: '#ddd',
	},
	chartX: {
		flexDirection: 'row',
		backgroundColor: '#ddd',
		marginTop: 1,
		paddingVertical: 5,
	},
	chartXitem: {
		width:  variables.CHART_ITEM_WIDTH,
		paddingLeft: 10,
	},
	axisText: {
		fontSize: variables.TEXT_XS,
		color: variables.colorPrimary,
	},
	bonusCircle: {
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: variables.UNIT,
		marginVertical: variables.UNIT,
		width: variables.TEXT_BONUS*3,
		height: variables.TEXT_BONUS*3,
		backgroundColor: '#eee',
		borderRadius: 1000
	},
	bonusText: {
		color: variables.colorPrimary,
		fontSize: variables.TEXT_BONUS,
		lineHeight: variables.TEXT_BONUS,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		paddingBottom: 5,
		color: variables.colorPrimaryLight,
	},

	selectSection: {
		paddingHorizontal: variables.CONTAINER_H_PADDING,
		paddingVertical: variables.CONTAINER_V_PADDING,
	},

	monthPicker: {
		borderWidth: 1,
		borderColor: variables.colorGreyLight,
		borderRadius: 2,
		paddingHorizontal: 5,
		paddingVertical: 5,
	},

	pickerRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderWidth: 1,
		borderRadius: 4,
		borderColor: variables.colorPrimary,
		marginBottom: variables.INPUT_GAP,
		padding: variables.INPUT_GAP/2
	},

	pickerRowSelected: {
		backgroundColor: variables.colorPrimaryLightRGBA
	},

	pickerCol: {
		width: '30%',
		paddingHorizontal: variables.INPUT_GAP/2,
		paddingVertical: variables.BUTTON_V_PADDING+2,
	},

};


export default StyleSheet.create(Object.assign(dimentions, colors,  buttonStyle, formStyle, sliderStyle, elements));
