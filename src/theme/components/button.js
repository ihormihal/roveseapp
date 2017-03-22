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
		height: 70,
		width: 70,
		borderRadius: 70,
		backgroundColor: variables.colorPrimaryDark
	},
	buttonCircleImg: {
		height: 30,
		width: 30,
	},
	btnDefault: {
		paddingVertical: variables.buttonPV,
		paddingHorizontal: variables.buttonPH,
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
	},
}