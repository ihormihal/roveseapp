import React, { Component } from 'react';
import {
	BackAndroid,
	AsyncStorage,
	View,
	Text,
	Keyboard,
	Alert,
	Image,
	StatusBar,
	Animated,
	TextInput,
	TouchableOpacity
} from 'react-native'

import variables from './../theme/variables.js';
import styles from './../theme/styles.js';
import t from './../Translations';
import settings from './../Settings';


var backgroundImage = require('./../images/bg/login.jpg');

export default class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			domain: settings.domain,
			language: this.props.lang,
			setlang: this.props.setlang,
			anim: new Animated.Value(0),
			online: false,
			form: {
				email: '',
				password: ''
			}
		};
	};
	// email: 'zlata@tits.com',
	// password: 'Pass1234'


	setForm(key, value) {
		var form = this.state.form;
		if(key in form){
			form[key] = value;
		}
		this.setState({
			form: form
		});
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

	_setLanguage(lng){
		this.setState({
			language: lng
		});
	}

	valid() {
		return true;
	}

	_submit() {
		if(this.valid()){
			fetch(settings.domain+'/api/login', {
				method: "POST",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
					//'Cookie': null
					credentials: 'omit',
				},
				body: settings.serialize(this.state.form)
			})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if(data.token){
					//save token
					AsyncStorage.setItem('access_token', data.token, () => {
						this.navigate('root');
					});
				}else{
					Alert.alert(t.error.error, t.message.login);
				}
			})
			.catch((error) => {
				Alert.alert(t.error.error, t.error.offline);
			});
		}
	}

	//http://192.168.1.11:3001/sessions/create

	render() {

		return (
			<Image
				style={[styles.scene, styles.background, styles.container, styles.center]}
				source={backgroundImage}>
				<StatusBar translucent={false} backgroundColor={variables.colorPrimaryDark} />

				<View style={styles.section}>
					<Animated.Image
						style={[this.fadeIn(0), styles.logo]}
						source={require('./../images/logo-splash.png')}
					/>
				</View>

				<View style={[styles.section, styles.middle]}>
					<Animated.View style={[styles.sectionLogin, this.fadeIn(500, 20)]}>

						<Text style={[styles.white, styles.textLG, styles.textCenter]}>{t.title.login.toUpperCase()}</Text>

							<View style={[styles.textInput, styles.inputWhite, styles.mt2]}>
								<TextInput
									style={[ styles.textInputInput, styles.textCenter, styles.white ]}
									underlineColorAndroid='transparent'
									placeholderTextColor="#ffffff"
									selectionColor={variables.colorPrimaryRGBA}
									placeholder={t.form.email}
									keyboardType="email-address"
									onChangeText={(value) => { settings.domain = value; }}
									value={this.state.domain}
								/>
							</View>

						<View style={[styles.textInput, styles.inputWhite, styles.mt2]}>
							<TextInput
								style={[ styles.textInputInput, styles.textCenter, styles.white ]}
								underlineColorAndroid='transparent'
								placeholderTextColor="#ffffff"
								selectionColor={variables.colorPrimaryRGBA}
								placeholder={t.form.email}
								keyboardType="email-address"
								onChangeText={(value) => this.setForm('email', value)}
								value={this.state.form.email}
							/>
						</View>

						<View style={[styles.textInput, styles.inputWhite, styles.mt2]}>
							<TextInput
								style={[ styles.textInputInput, styles.textCenter, styles.white ]}
								underlineColorAndroid='transparent'
								placeholder={t.form.password}
								placeholderTextColor="#ffffff"
								secureTextEntry={true}
								onChangeText={(value) => this.setForm('password', value)}
								value={this.state.form.password}
							/>
						</View>

						<TouchableOpacity
						  onPress={() => this.navigate('password-reset')}>
						  <Text style={[ styles.white, styles.opacity50, styles.textSM, styles.textCenter ]}>{t.btn.forgotPassword}</Text>
						</TouchableOpacity>


					</Animated.View>

					<Animated.View style={[styles.center, styles.mt1, this.fadeIn(1500, 20)]}>

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
							<Text style={[styles.inputText, styles.white]}>{t.btn.registration}</Text>
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
