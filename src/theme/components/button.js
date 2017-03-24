import variables from './../variables.js';

export default {
	btn: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	buttonCircle: {
		alignItems: 'center',
		justifyContent: 'center',
		height: variables.BUTTON_CIRCLE_SIZE,
		width: variables.BUTTON_CIRCLE_SIZE,
		borderRadius: variables.BUTTON_CIRCLE_SIZE,
		backgroundColor: variables.colorPrimaryDark
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
		marginBottom: 4
	},
	btnPrimary: {
		backgroundColor: variables.colorPrimary,
	},
	btnTransparent: {
		backgroundColor: 'transparent'
	},
	btnIcon: {
		marginRight: 5,
		fontSize: variables.FONTSIZE_MD
	},
}
