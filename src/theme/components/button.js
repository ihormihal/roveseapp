import variables from './../variables.js';

export default {
	btn: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexWrap: 'nowrap'
	},
	buttonCircle: {
		alignItems: 'center',
		justifyContent: 'center',
		height: variables.BUTTON_CIRCLE_SIZE,
		width: variables.BUTTON_CIRCLE_SIZE,
		borderRadius: variables.BUTTON_CIRCLE_SIZE,
		backgroundColor: 'rgba(0,91,159,1)'
	},
	buttonCircleImg: {
		height: 30,
		width: 30,
	},
	btnDefault: {
		paddingVertical: variables.BUTTON_V_PADDING,
		paddingHorizontal: variables.BUTTON_H_PADDING,
		borderRadius: 2,
		elevation: 1,
		shadowColor: '#000',
		marginVertical: 2
	},
	btnPrimary: {
		backgroundColor: variables.colorPrimary,
	},
	btnDisabled: {
		backgroundColor: variables.colorDisabled,
	},
	btnSuccess: {
		backgroundColor: variables.colorSuccess,
	},
	btnTransparent: {
		backgroundColor: 'transparent'
	},
	btnIcon: {
		marginRight: 5,
		fontSize: variables.TEXT_MD
	},
	hlSuccess: {
		color: '#fff',
		backgroundColor: variables.colorSuccess,
	},
	hlPrimary: {
		color: '#fff',
		backgroundColor: variables.colorPrimary,
	},
	hlDisabled: {
		color: '#fff',
		backgroundColor: variables.colorDisabled,
	}
}
