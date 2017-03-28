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
	Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import variables from './../theme/variables.js';
import styles from './../theme/styles.js';
import t from './../Translations';

import { InputText } from './../components/Form';

export default class PasswordReset extends Component {

	constructor(props) {
		super(props);
		this.state = {
			form: {
				email: ''
			}
		};
	};

	setForm(key, value) {
		var form = this.state.form;
		if(key in form){
			form[key] = value;
		}
		this.setState({
			form: form
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
		if(this.state.form.email){
			if(this.state.form.email.indexOf('@') !== -1){
				return true;
			}
		}else{
			Alert.alert(t.error, t.errorEmptyField);
			return false;
		}
	}

	_submit(){
		if(this.valid()){
			fetch('http://rovese.jaya-test.com/api/request_password_reset', {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: this.state.form.reset
				})
			})
			.then((response) => response.json())
			.then((data) => {
				Alert.alert(
					'',
					t.passwordResetSuccess,
					[{text: 'OK', onPress: () => this.props.navigator.pop() }]
				);
			})
			.done();
		}
	}

	render() {
		return (
			<View style={styles.scene}>
				<View style={[styles.header, styles.shadow]}>
					<View style={styles.headerLeft}>
						<TouchableOpacity
							style={styles.btn}
							onPress={() => this.props.navigator.pop()}>
							<Icon style={[styles.btnIcon, styles.primary]} size={20} name="arrow-back"/>
							<Text style={[styles.textSM, styles.primary]}>{t.back}</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.headerCenter}>
						<Image
							style={[ styles.logoHeader ]}
							source={require('./../images/logo-header.png')}
						/>
					</View>
					<View style={styles.headerRight}>
					</View>
				</View>
				<View style={styles.container}>
					<View style={styles.center}>
						<Text style={styles.sceneTitle}>{t.passwordRecovery.toUpperCase()}</Text>
					</View>

					<Text style={styles.inputLabel}>{t.enterEmail}</Text>
					<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
						<TextInput
							style={[ styles.textInputInput ]}
							underlineColorAndroid='transparent'
							onChangeText={(value) => this.setForm('email', value)}
							value={this.state.form.email}
						/>
					</View>

					<View style={styles.center}>
						<TouchableOpacity
							onPress={() => this._submit()}
							style={[styles.btn, styles.btnDefault, styles.btnPrimary]}>
							<Text style={[styles.white, styles.inputText]}>{t.change}</Text>
						</TouchableOpacity>
					</View>

				</View>
			</View>
		);
	}


};
