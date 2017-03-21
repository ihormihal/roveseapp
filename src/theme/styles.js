import { StyleSheet, Dimensions } from 'react-native';
import variables from './variables.js';

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
		padding: variables.gap*2,
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
	// left: {
	// 	flex: 0.5,
	// 	alignSelf: 'center',
	// 	alignItems: 'flex-start',
	// },
	last: {
		flex: 1,
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
		elevation: 3,
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
	body: {
		marginTop: 56
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
		maxWidth: 200
	},
	btnIcon: {
		marginRight: 5,
		//marginTop: 3
	},
	inputLabel: {
		marginBottom: variables.gap/2,
	},
	textInput: {
		alignSelf: 'stretch',
	},
	inputUnderline: {

	},
	inputDefault: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 2,
		paddingHorizontal: 5,
	},
	textInputInput: {
		alignSelf: 'stretch',
		height: variables.inputHeight,
		padding: 0,
		fontSize: 18,
		//textAlignVertical: 'bottom'
	},
	textAreaInput: {
		textAlignVertical: 'top',
	},

	linkWhite: {
		color: 'rgba(255,255,255,0.5)'
	},
	inputWhite: {
		borderBottomWidth: 1,
		borderColor: '#ffffff'
	},
	lngButtons: {
		width: 100
	},
	buttonCircle: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 70,
		width: 70,
		borderRadius: 70,
		backgroundColor: variables.colorPrimaryDark
	},
	buttonCircleImg: {
		height: 30,
		width: 30,
	},
	btn: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	btnDefault: {
		paddingVertical: 8,
		paddingHorizontal: 20,
		borderRadius: 2,
		elevation: 1,
		shadowColor: '#000',
		marginBottom: 4
	},
	btnPrimary: {
		backgroundColor: variables.colorPrimary,
	},
	btnTransparent: {
		backgroundColor: 'transparent'
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
	legend: {
		marginTop: variables.gap,
		marginBottom: variables.gap,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center'
	},
	ltext: {
		color: variables.colorPrimary,
		fontSize: 12,
		marginLeft: 8,
		marginRight: 8
	},
	lline: {
		height: 1,
		width: 32,
		backgroundColor: variables.colorPrimary,
	},
	drawer: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	drawerSection: {
		flexDirection: 'column',
		padding: variables.gap
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
		marginTop: 8,
		marginBottom: 8
	},
	menuItemActive: {
		borderLeftWidth: 1,
		paddingLeft: 8,
		borderColor: variables.colorPrimary,
	},


	picker: {
		height: variables.inputHeight,
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
		alignItems: 'stretch',
	},
	presentationBottom: {
		width: screen.w,
		height: parseInt(screen.w*(1030/1536)),
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
		height: 56,
		paddingHorizontal: variables.gap,
		justifyContent: 'center',
	}
};

const slider = {
	slider: {
		flex: 1,
		alignItems: 'center',
		marginVertical: variables.gap,
	},
	slide: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'transparent',
		padding: variables.gap,
	},
	slidePage: {
		flex: 1,
		width: 245,
		backgroundColor: '#fff',
		shadowColor: '#000',
		elevation: 5,
		borderRadius: 4,
	},
	slideImage: {
		width: 245,
		height: 250,
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
	},
	slideText: {
		padding: variables.gap,
	},
	titleDivider: {
		width: 32,
		height: 4,
		backgroundColor: variables.colorPrimary,
		alignSelf: 'center',
		marginTop: 8,
		marginBottom: 8,
	},
	slideTitle: {
		fontSize: 16,
		color: variables.colorPrimary,
		textAlign: 'center'
	},
	slideDescription: {
		fontSize: 12,
		color: variables.colorGrey,
		textAlign: 'center'
	},
	sliderPagination: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignSelf: 'center',
		marginVertical: 10,
		position: 'relative',
	},
	pagDot: {
		height: variables.pagSize,
		width: variables.pagSize,
		marginHorizontal: variables.pagStep/2,
		borderRadius: variables.pagSize/2,
		backgroundColor: 'transparent',
		borderWidth: 1,
		borderColor: '#fff',
	},
	pagDotActive: {
		borderWidth: 0,
		backgroundColor: '#fff',
		position: 'absolute',
		left: 0,
	}
};


export default StyleSheet.create(Object.assign(dimentions, colors, elements, slider));
