import variables from './../variables.js';

export default {
	//inputs
	inputLabel: {
		marginBottom: variables.gap/2,
	},
	textInput: {
		alignSelf: 'stretch',
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
	inputWhite: {
		borderBottomWidth: 1,
		borderColor: '#ffffff'
	},
	picker: {
		height: variables.inputHeight,
	},

	//text
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
}