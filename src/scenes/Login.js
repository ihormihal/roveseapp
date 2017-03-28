import React, { Component } from 'react';
import {
	Platform,
	BackAndroid,
	Linking,
	Dimensions,
	AsyncStorage,
	View,
	Text,
	Keyboard,
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


var backgroundImage = require('./../images/bg/login.jpg');

export default class Login extends Component {

	constructor() {
		super();
		this.state = {
			anim: new Animated.Value(0),
			form: {
				email: 'testuser',
				password: 'Pass1234'
			}
		};
	};

	// setForm(key, value) {
	// 	var form = this.state.form;
	// 	if(key in form){
	// 		form[key] = value;
	// 	}
	// 	this.setState({
	// 		form: form
	// 	});
	// }

	async _setStorageValue(item, selectedValue) {
		try {
			await AsyncStorage.setItem(item, selectedValue);
		} catch (error) {
			Alert.alert("AsyncStorage error:", error.message);
		}
	}

	async _getProtectedQuote() {
		var ACCESS_TOKEN = await AsyncStorage.getItem('id_token');
		fetch("http://localhost:3001/api/protected/random-quote", {
			method: "GET",
			headers: {
				'Authorization': 'Bearer ' + ACCESS_TOKEN
			}
		})
		.then((response) => response.text())
		.then((quote) => {
			Alert.alert("Chuck Norris Quote:", quote);
		})
		.done();
	}


	componentDidMount() {
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
		Keyboard.dismiss();
		this.props.navigator.push({
			name: routeName,
			data: routeData
		});
	}

	valid() {
		return true;
	}

	_submit() {
		if(this.valid()){
			fetch('https://raw.githubusercontent.com/ihormihal/roveseapp/master/api/success.json', {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state.form)
			})
			.then((response) => response.json())
			.then((data) => {
				if(data.status == "success"){
					//save token
					this.navigate('root');
				}else{
					Alert.alert(t.error, data.message);
				}
			})
			.done();
		}
	}

	//http://192.168.1.11:3001/sessions/create

	render() {
		return (
			<Image
				style={[styles.scene, styles.background, styles.container, styles.center]}
				source={backgroundImage}>
				<StatusBar backgroundColor={variables.colorPrimary} />

				<View style={styles.section}>
					<Animated.Image
						style={[this.fadeIn(0), styles.logo]}
						source={require('./../images/logo-splash.png')}
					/>
				</View>

				<View style={[styles.section, styles.middle]}>
					<Animated.View style={[styles.sectionLogin, this.fadeIn(500, 20)]}>

						<Text style={[styles.white, styles.textLG, styles.textCenter]}>{t.login.toUpperCase()}</Text>

						<View style={[styles.textInput, styles.inputWhite, styles.mt2]}>
							<TextInput
								style={[ styles.textInputInput, styles.textCenter, styles.white ]}
								underlineColorAndroid='transparent'
								placeholderTextColor="#ffffff"
								selectionColor={variables.colorPrimaryRGBA}
								placeholder={t.email}
								onChangeText={(value) => this.setFrom('email', value)}
								value={this.state.form.email}
							/>
						</View>

						<View style={[styles.textInput, styles.inputWhite, styles.mt1]}>
							<TextInput
								style={[ styles.textInputInput, styles.textCenter, styles.white ]}
								underlineColorAndroid='transparent'
								placeholder={t.password}
								placeholderTextColor="#ffffff"
								secureTextEntry={true}
								onChangeText={(value) => this.setFrom('password', value)}
								value={this.state.form.password}
							/>
						</View>

						<TouchableOpacity
							onPress={() => this.navigate('password-reset')}>
							<Text style={[ styles.white, styles.opacity50, styles.textSM, styles.textCenter ]}>{t.forgotPassword}</Text>
						</TouchableOpacity>

					</Animated.View>

					<Animated.View style={[styles.center, styles.mt1, this.fadeIn(1500, 20)]}>
						<View style={[styles.cols, styles.lngButtons]}>
							<TouchableOpacity
								onPress={() => {}}
								style={[]}>
								<Text style={[styles.white, styles.textMD]}>RU</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {}}
								style={[]}>
								<Text style={[styles.white, styles.textMD, styles.opacity50]}>UA</Text>
							</TouchableOpacity>
						</View>
						<TouchableOpacity
							onPress={() => this._submit()}
							style={[styles.buttonCircle, styles.mt2]}>
							<Image
								style={styles.buttonCircleImg}
								resizeMode={"contain"}
								source={require('./../images/btn-circle-arrow-right.png')}
							/>
						</TouchableOpacity>
					</Animated.View>
				</View>

				<View style={[styles.section, styles.last]}>
					<Animated.View style={[this.fadeIn(2500, 20)]}>
						<TouchableOpacity
							onPress={() => this.navigate('registration')}
							style={[styles.btn, styles.btnDefault, styles.btnTransparent]}>
							<Text style={[styles.inputText, styles.white]}>{t.registration}</Text>
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
