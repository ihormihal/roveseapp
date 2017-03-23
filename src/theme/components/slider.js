import { Dimensions } from 'react-native';
import variables from './../variables.js';

var slideImageRatio = 1000/980;

export default {
	slider: {
		flex: 1,
		alignItems: 'center',
		marginTop: variables.gap*2,
	},
	slide: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'transparent',
	},
	slidePage: {
		flex: 1,
		alignItems: 'stretch',
		//justifyContent: 'flex-start',

		backgroundColor: '#fff',
		shadowColor: '#000',
		elevation: 5,
		borderRadius: 4,
	},
	slideImage: {
		width: variables.screenWidth*0.6,
		height: variables.screenWidth*0.6*slideImageRatio,
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
		marginVertical: variables.gap,
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
}