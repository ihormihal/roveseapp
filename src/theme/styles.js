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
	section: {
		flex: 1,
		flexDirection: 'column',
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		paddingHorizontal: variables.gap*2,
		paddingVertical: variables.gap*2,
	},
	box: {
		flexDirection: 'column',
		padding: variables.gap*2,
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
	h1: {
		fontSize: 24
	},
	h2: {
		fontSize: 20
	},
	small: {
		fontSize: 12
	},
	italic: {
		fontStyle: 'italic',
	}

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
		height: 56,
		backgroundColor: '#ffffff',
	},
	shadow: {
		shadowColor: '#000',
		//shadowOpacity: 0.1,
		//shadowRadius: 5,
		elevation: 4,
	},
	opacityLight: {
		backgroundColor: 'rgba(0,0,0,0.1)',
	},
	opacityDark: {
		backgroundColor: 'rgba(0,0,0,0.5)',
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
		maxWidth: 320
	},
	linkWhite: {
		color: 'rgba(255,255,255,0.5)'
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
		paddingTop: 5,
		marginBottom: variables.gap*2
	},
	logoRightText: {
		marginLeft: 10,
		marginTop: -5,
	},
	lrtBig: {
		color: variables.colorPrimary,
		fontSize: 18,
		lineHeight: 18
	},
	lrt: {
		color: variables.colorPrimary,
		fontSize: 14,
		lineHeight: 14
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
		paddingVertical: variables.gap*4,
	},
	drawerSectionBottom: {
		flex: 1,
		justifyContent: 'flex-end',
		padding: 0,
	},
	btnDrawerBottom: {
		padding: variables.gap*2,
	},
	divider: {
		height: 1,
		alignSelf: 'stretch',
		backgroundColor: '#D9D5DC',
	},
	menuItem: {
		alignSelf: 'stretch',
		paddingVertical: variables.gap/2,
		paddingHorizontal: variables.gap
	},
	menuItemActive: {
		borderLeftWidth: 1,
		paddingLeft: 8,
		borderColor: variables.colorPrimary,
	},

	//tabs
	tabs: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor: 'rgba(0,0,0,0.5)',
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
		height: 56*2,
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
		justifyContent: 'flex-end',
		alignItems: 'stretch',
	},
	presentationBottom: {
		width: screen.w,
		height: parseInt(variables.screenWidth*(1030/1536)),
	},
	presentationText: {
		padding: variables.gap,
		color: '#fff',
		textAlign: 'center',
		fontSize: 18,
		textShadowColor: 'rgba(0,0,0,0.5)',
		textShadowOffset: {width: 1, height: 1},
		textShadowRadius: 1,
	},

	//
	pageHeader: {
		width: screen.w,
		minHeight: 56,
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
		height: 120,
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
		position: 'relative',
		zIndex: 1,
		width: 30,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	chartBarValue: {
		width: 5,
		height: 70,
		backgroundColor: variables.colorPrimary,
	},
	chartBarShadow: {
		width: 5,
		height: 65,
		backgroundColor: 'rgba(0,0,0,0.2)',
	},
	chartX: {
		flexDirection: 'row',
	},
	chartXitem: {
		width: 30,
		textAlign: 'center',
		fontSize: 11,
	},

	chartGridH: {
		position: 'absolute',
		zIndex: 0,
		left: 0,
		right: 0,
		height: 1,
		backgroundColor: '#ccc'
	},

	bonusText: {
		color: variables.colorPrimary,
		fontSize: 50,
		fontWeight: "300",
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		marginTop:  variables.gap,
		paddingVertical: variables.gap/2,
	}
};


export default StyleSheet.create(Object.assign(dimentions, colors,  buttonStyle, formStyle, sliderStyle, elements));
