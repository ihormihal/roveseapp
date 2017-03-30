import variables from './../variables.js';

export default {
	//inputs
	inputLabel: {
		marginBottom: 5,
		fontSize: variables.TEXT_SM,
	},
	textInput: {
		alignSelf: 'stretch',
		position: 'relative'
	},
	required: {
		position: 'absolute',
		right: 5,
		top: 0,
		color: '#f00'
	},
	inputDefault: {
		borderWidth: 1,
		borderColor: variables.colorGreyLight,
		borderRadius: 2,
		paddingHorizontal: variables.INPUT_GAP/2,
	},
	inputPickerDefault: {
		borderWidth: 1,
		borderColor: variables.colorGreyLight,
		borderRadius: 2,
		paddingHorizontal: 0,
	},
	textInputInput: {
		alignSelf: 'stretch',
		height: variables.INPUT_HEIGHT,
		padding: 0,
		fontSize: variables.INPUT_TEXT
	},
	textAreaInput: {
		textAlignVertical: 'top',
		paddingVertical: 5,
		paddingHorizontal: 0,
		fontSize: variables.INPUT_TEXT
	},
	inputText: {
		fontSize: variables.INPUT_TEXT
	},

	inputWhite: {
		borderBottomWidth: 1,
		borderColor: '#ffffff'
	},
	pickerWrapper: {
		padding: 0,
	},
	picker: {
		height: variables.INPUT_HEIGHT,
	},
	inputOffsetB: {
		marginBottom: variables.INPUT_GAP
	},
	inputOffsetR: {
		marginRight: variables.INPUT_GAP
	},

	formHR: {
		alignSelf: 'center',
		backgroundColor: variables.colorGreyLight,
		height: 1,
		width: 250,
		marginBottom: variables.INPUT_GAP
	},

	//text
	legend: {
		marginBottom: variables.INPUT_GAP,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center'
	},
	ltext: {
		color: variables.colorPrimary,
		fontSize: variables.TEXT_SM,
		marginLeft: 8,
		marginRight: 8
	},
	lline: {
		height: 1,
		width: 32,
		backgroundColor: variables.colorPrimary,
	},
}
