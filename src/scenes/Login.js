import React, { Component } from 'react';
import {
	Platform,
	BackAndroid,
	Linking,
	Dimensions,
	AsyncStorage,
	View,
	Alert,
	Image,
	StatusBar,
	TouchableHighlight
} from 'react-native';
//import { StyleProvider, Toast, Container, Content, Item, Input, Button, Text, Right, Icon } from 'native-base';

import variables from './../theme/variables.js';
import styles from './../theme/styles.js';
//import getTheme from './../theme/components';
//import rovese from './../theme/variables/rovese';
import t from './../Translations';

var STORAGE_KEY = 'id_token';

export default class Login extends Component {

	constructor() {
		super();
		this.state = {

		};
	};

	async _onValueChange(item, selectedValue) {
		try {
			await AsyncStorage.setItem(item, selectedValue);
		} catch (error) {
			Alert.alert("AsyncStorage error:", error.message)
			//console.log('AsyncStorage error: ' + error.message);
		}
	}

	async _getProtectedQuote() {
		var DEMO_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
		fetch("http://localhost:3001/api/protected/random-quote", {
			method: "GET",
			headers: {
				'Authorization': 'Bearer ' + DEMO_TOKEN
			}
		})
		.then((response) => response.text())
		.then((quote) => {
			Alert.alert("Chuck Norris Quote:", quote);
		})
		.done();
	}


	_userLogin() {
		fetch("http://192.168.1.11:3001/sessions/create", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: 'gonto',
				password: 'gonto',
			})
		})
		.then((response) => response.json())
		.then((responseData) => {
			this._onValueChange(STORAGE_KEY, responseData.id_token),
			Alert.alert(
				"Signup Success!",
				"Click the button to get a Chuck Norris quote!"
			);
		})
		.done();
	}


	componentDidMount() {
		//this.loadPosts();

		BackAndroid.addEventListener('hardwareBackPress', () => {
			if (this.props.navigator.getCurrentRoutes().length > 1) {
				this.props.navigator.pop();
				return true; // do not exit app
			} else {
				return false; // exit app
			}
		});
	}

	navigate(routeName, routeData) {
		this.props.navigator.push({
			name: routeName,
			data: routeData
		});
	}

	render() {
		return (
			<Image
				style={styles.container}
				source={require('./../images/bg-login.jpg')}>
				<StatusBar backgroundColor={variables.colorPrimary} />
			</Image>
		);
	}

	fadeIn(delay, from = 0) {
		const { anim } = this.state;
		return {
			opacity: anim.interpolate({
				inputRange: [delay, Math.min(delay + 500, 3000)],
				outputRange: [0, 1],
				extrapolate: 'clamp',
			}),
			transform: [{
				translateY: anim.interpolate({
					inputRange: [delay, Math.min(delay + 500, 3000)],
					outputRange: [from, 0],
					extrapolate: 'clamp',
				})
			}]
		};
	}


};
