import { StyleSheet } from 'react-native';
import variables from './variables.js';

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
	last: {
		justifyContent: 'flex-end',
	}
};

const elements = {
	container: {
		flex: 1,
		backgroundColor: 'transparent',
		padding: 26,
		width: undefined,
		height: undefined,
	},
	section: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	full: {
		alignSelf: 'stretch',
	},
	center: {
		alignItems: 'center'
	},
	logo: {
		width: 204,
		height: 90,
		marginBottom: 40
	},
	textInput: {
		alignSelf: 'stretch',
		marginTop: variables.gap
	},
	inputUnderline: {

	},
	textInputInput: {
		alignSelf: 'stretch', 
		height: 40,
		padding: 0,
		textAlign: 'center',
		fontSize: 18,
		textCursorDrawable: null
		//textAlignVertical: 'bottom'
	},
	white: {
		color: '#ffffff'
	},
	linkWhite: {
		color: 'rgba(255,255,255,0.5)'
	},
	inputWhite: {
		borderBottomWidth: 1,
		borderColor: '#ffffff'
	},
	h1: {
		fontSize: 24
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
	btnTransparent: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 2,
		alignSelf: 'flex-start',
		flexDirection: 'row',
		elevation: 1,
		shadowColor: '#000',
		// shadowOffset: {width: 0, height: 2},
		// shadowOpacity: 0.2,
		// shadowRadius: 2,
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 4
	}
};

export default StyleSheet.create(Object.assign(dimentions, elements));
