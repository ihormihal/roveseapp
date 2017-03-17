import React, { Component } from 'react';
import { View, Image, Dimensions, Text } from 'react-native';
import {
	StyleProvider,
	Container,
	Content,
} from 'native-base';
import CarouselCard from 'react-native-card-carousel';


import getTheme from './../theme/components';
import rovese from './../theme/variables/rovese';


const styles = {
	container: {
		flex: 1,
		backgroundColor: '#ffffff'
	},
	box: {
		padding: 16
	},
	carousel: {
		flex: 1,
	}
};

export default class Root extends Component {

	constructor() {
		super();
		this.state = {
			posts: [],
			showToast: false,
			toastText: 'Default text',
			loading: false,
			refreshing: false
		};
	};

	navigate(routeName, routeData){
		this.props.navigator.push({
			name: routeName,
			data: routeData
		});
	}


	goScreen = () => {

	}


	renderSlide = (item) => {
		return (
			<View style={styles.carousel}>
				<Image source={require('./../images/logo.png')} />
				<Text>{item.title}</Text>
			</View>
		);
	}

	render() {
		var itemArr = [
			{
				title: 'Scene 1'
			},
			{
				title: 'Scene 2'
			},
			{
				title: 'Scene 3'
			},
			{
				title: 'Scene 4'
			}
		];
		return (
			<StyleProvider style={getTheme(rovese)}>
				<Container style={styles.container} >

						<CarouselCard
							data = {itemArr}
							onPress = {this.goScreen}
							contentRender = {this.renderSlide}
						/>

				</Container>
			</StyleProvider>
		);
	}

}