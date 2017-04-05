import React, { Component } from 'react';
import {
	AsyncStorage,
	View,
	Text,
	Alert,
	Image,
	StatusBar,
	Animated,
	TextInput,
	TouchableOpacity,
	Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

//import variables from './../theme/variables.js';
import styles from './../theme/styles.js';
import t from './../Translations';
import settings from './../Settings';


var backgroundImage = require('./../images/bg/root.jpg');

export default class SupportOffer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			language: this.props.lang,
			form: {
				type: 'offer',
				subject: '',
				message: ''
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
		if(this.state.form.subject && this.state.form.message){
			return true;
		}
		Alert.alert(t.error.error, t.error.empty);
		return false;
	}

	fetch(token){
		fetch(settings.domain+'/api/support', {
			method: "POST",
			headers: {
				'Authorization': 'Bearer '+token,
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
			},
			body: settings.serialize(this.state.form)
		})
		.then((response) => response.json())
		.then((data) => {
			if(data.status == "success"){
				Alert.alert(t.message.done, t.message.messageSent);
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

	_submit() {
		if(this.valid()){
			AsyncStorage.getItem('access_token',(error, result) => {
				this.fetch(result);
			});
		}
	}

	render() {

		return (
			<Image
				style={[styles.scene, styles.background]}
				source={backgroundImage}>
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
				<View style={styles.pageHeader}>
					<Text style={[styles.white, styles.textMD]}>{t.title.feedback}</Text>
				</View>
				<View style={[styles.container, styles.whiteBg]}>

					<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
						<Text style={styles.required}>*</Text>
						<TextInput
							style={[ styles.textInputInput ]}
							underlineColorAndroid='transparent'
							placeholder={t.form.subject}
							onChangeText={(value) => this.setForm('subject', value)}
							value={this.state.form.subject}
						/>
					</View>

					<View style={[styles.textInput, styles.inputDefault, styles.inputOffsetB]}>
						<Text style={styles.required}>*</Text>
						<TextInput
							style={[ styles.textAreaInput ]}
							multiline = {true}
							numberOfLines = {4}
							underlineColorAndroid='transparent'
							placeholder={t.form.comment}
							onChangeText={(value) => this.setForm('message', value)}
							value={this.state.form.message}
						/>
					</View>

					<View style={styles.center}>
						<TouchableOpacity
							style={[styles.btn, styles.btnDefault, styles.btnPrimary]}
							onPress={() => this._submit()}>
							<Text style={[styles.white, styles.inputText]}>{t.btn.submit}</Text>
						</TouchableOpacity>
					</View>

				</View>
			</Image>
		);
	}


};
