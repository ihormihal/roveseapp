import React, { Component } from 'react';
import {
	AsyncStorage,
	View,
	Text,
	Alert,
	Image,
	TextInput,
	TouchableOpacity,
	Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

//import variables from './../theme/variables.js';
import styles from './../theme/styles.js';
import t from './../Translations';
import settings from './../Settings';


export default class PasswordReset extends Component {

	constructor(props) {
		super(props);
		this.state = {
			language: this.props.lang,
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
			if(settings.valid.email(this.state.form.email)){
				return true;
			}else{
				Alert.alert(t.error.error, t.error.email);
				return false;
			}
		}else{
			Alert.alert(t.error.error, t.error.empty);
			return false;
		}
	}

	_submit(){
		if(this.valid()){
			fetch(settings.domain+'/api/password/reset', {
				method: "POST",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
				},
				body: settings.serialize(this.state.form)
			})
			.then((response) => response.json())
			.then((data) => {
				if(data.status == 'success'){
					Alert.alert(
						'',
						t.message.passwordResetSuccess,
						[{text: 'OK', onPress: () => this.props.navigator.pop() }]
					);
				}else{
					if(data.code && data.message){
						Alert.alert(t.error.error, t.message.errorCode+': '+data.code+'\n'+t.message.errorDescription+': '+data.message);
					}else{
						Alert.alert(t.error.error, t.error.serverError);
					}
				}
			})
			.catch((error) => {
				Alert.alert(t.error.error, t.error.offline);
			});
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
							<Text style={[styles.textSM, styles.primary]}>{t.btn.back}</Text>
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
						<Text style={styles.sceneTitle}>{t.title.passwordRecovery.toUpperCase()}</Text>
					</View>

					<Text style={styles.inputLabel}>{t.form.enterYourEmail}</Text>
					<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
						<TextInput
							style={[ styles.textInputInput ]}
							underlineColorAndroid='transparent'
							keyboardType="email-address"
							onChangeText={(value) => this.setForm('email', value)}
							value={this.state.form.email}
						/>
					</View>

					<View style={styles.center}>
						<TouchableOpacity
							onPress={() => this._submit()}
							style={[styles.btn, styles.btnDefault, styles.btnPrimary]}>
							<Text style={[styles.white, styles.inputText]}>{t.btn.change}</Text>
						</TouchableOpacity>
					</View>

				</View>
			</View>
		);
	}


};
