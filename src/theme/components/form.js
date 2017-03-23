import variables from './../variables.js';

export default {
	//inputs
	inputLabel: {
		marginBottom: variables.gap/2,
		fontSize: variables.FONTSIZE_SM,
	},
	textInput: {
		alignSelf: 'stretch',
	},
	inputDefault: {
		borderWidth: 1,
		borderColor: variables.colorGreyLight,
		borderRadius: 2,
		paddingHorizontal: variables.inputPadding,
	},
	textInputInput: {
		alignSelf: 'stretch',
		height: variables.inputHeight,
		padding: 0,
		fontSize: variables.FONTSIZE_SM,
		//textAlignVertical: 'bottom'
	},
	textAreaInput: {
		textAlignVertical: 'top',
	},
	inputWhite: {
		borderBottomWidth: 1,
		borderColor: '#ffffff'
	},
	picker: {
		height: variables.inputHeight,
	},
	inputOffsetB: {
		marginBottom: variables.inputGAP
	},
	inputOffsetR: {
		marginRight: variables.inputGAP
	},

	formHR: {
		alignSelf: 'center',
		backgroundColor: variables.colorGreyLight,
		height: 1,
		width: 250,
		marginBottom: variables.inputGAP
	},

	//text
	legend: {
		marginBottom: variables.inputGAP,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center'
	},
	ltext: {
		color: variables.colorPrimary,
		fontSize: variables.FONTSIZE_SM,
		marginLeft: 8,
		marginRight: 8
	},
	lline: {
		height: 1,
		width: 32,
		backgroundColor: variables.colorPrimary,
	},
}
