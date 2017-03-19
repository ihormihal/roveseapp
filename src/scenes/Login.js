import React, { Component } from 'react';
import {
	Platform,
	BackAndroid,
	Linking,
	Dimensions,
	AsyncStorage,
	View,
	Text,
	Alert,
	Image,
	StatusBar,
	Animated,
	TextInput,
	TouchableHighlight,
	TouchableOpacity,
} from 'react-native'

import variables from './../theme/variables.js';
import styles from './../theme/styles.js';
import t from './../Translations';

var STORAGE_KEY = 'id_token';

export default class Login extends Component {

	constructor() {
		super();
		this.state = {
			anim: new Animated.Value(0),
			email: '',
			password: ''
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
		Animated.timing(this.state.anim, {toValue: 3000, duration: 3000}).start();

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
				style={[styles.scene, styles.background, styles.container]}
				source={require('./../images/bg-login.jpg')}>

				<StatusBar backgroundColor={variables.colorPrimary} />

				<View style={[styles.section, styles.middle, styles.center]}>

					<Animated.Image
						style={[this.fadeIn(0), styles.logo]}
						source={require('./../images/logo-splash.png')}
					/>

					<Animated.View style={[styles.sectionLogin, this.fadeIn(500, 20)]}>

						<Text style={[styles.white, styles.h1, styles.textCenter]}>{t.login.toUpperCase()}</Text>

						<View style={[styles.textInput, styles.inputUnderline, styles.inputWhite, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput, styles.textCenter, styles.white ]}
								underlineColorAndroid='transparent'
								placeholderTextColor="#ffffff"
								placeholder={t.email}
								onChangeText={(email) => this.setState({email: email})}
								value={(this.state && this.state.email) || ''}
							/>
						</View>

						<View style={[styles.textInput, styles.inputUnderline, styles.inputWhite, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput, styles.textCenter, styles.white ]}
								underlineColorAndroid='transparent'
								placeholder={t.password}
								placeholderTextColor="#ffffff"
								onChangeText={(password) => {this.setState({password: password})}}
								onSubmitEditing={() => {this.setState({email: ''})}}
								value={(this.state && this.state.password) || ''}
							/>
						</View>

						<TouchableOpacity
							onPress={() => this.navigate('password-reset')}
							activeOpacity={75 / 50}>
							<Text style={[ styles.linkWhite, styles.textCenter ]}>{t.forgotPassword}</Text>
						</TouchableOpacity>

					</Animated.View>

					<Animated.View style={[styles.center, styles.mt1, this.fadeIn(1500, 20)]}>
						<View style={[styles.cols, styles.lngButtons]}>
							<TouchableOpacity
								onPress={() => {}}
								activeOpacity={75 / 100}
								style={[]}>
								<Text style={styles.white}>RU</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {}}
								activeOpacity={75 / 100}
								style={[]}>
								<Text style={styles.white}>UA</Text>
							</TouchableOpacity>
						</View>
						<TouchableOpacity
							onPress={() => this.navigate('root')}
							activeOpacity={75 / 100}
							style={[styles.buttonCircle, styles.mt1]}>
							<Image
								style={styles.buttonCircleImg}
								resizeMode={"contain"}
								source={require('./../images/btn-circle-arrow-right.png')}
							/>
						</TouchableOpacity>
					</Animated.View>

					<Animated.View style={[styles.section, styles.last, this.fadeIn(2500, 20)]}>
						<TouchableOpacity
							onPress={() => this.navigate('registration')}
							activeOpacity={75 / 100}
							style={[styles.btn, styles.btnDefault, styles.btnTransparent]}>
							<Text style={styles.white}>{t.registration}</Text>
						</TouchableOpacity>
					</Animated.View>

				</View>
			</Image>
		);
	}

	fadeIn(delay, from = 0) {
		const anim = this.state.anim;
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
